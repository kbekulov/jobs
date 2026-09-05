import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "vacancies.json");
const runsPath = path.join(root, "data", "search-runs.json");
const allowedStatuses = new Set(["Newly found", "Still open", "Unknown", "Closed/Expired/No longer accepting applications"]);
const allowedModes = new Set(["onsite", "hybrid", "remote", "unknown"]);
const allowedRoleFocuses = new Set(["developer", "manager", "analyst"]);
const args = process.argv.slice(2);
const inputIndex = args.indexOf("--input");
const validateOnly = args.includes("--validate");
const normalizeOnly = args.includes("--normalize");

function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function clean(value = "") { return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim(); }
function canonicalCompany(value = "") { return clean(value).replace(/\b(the|limited|ltd|uab|ab|group)\b/g, "").replace(/\s+/g, " ").trim(); }
function key(job) { return job.requisitionId ? `${canonicalCompany(job.normalizedCompany || job.company)}|id:${clean(job.requisitionId)}` : `${canonicalCompany(job.normalizedCompany || job.company)}|${clean(job.normalizedTitle || job.title)}|${clean(job.location)}`; }
function market(job) {
  if (job.market) return job.market;
  if (/switzerland|schweiz|suisse|svizzera/i.test(job.location)) return "Switzerland";
  if (job.lithuaniaEligible || /lithuania|lietuva|vilnius|kaunas|klaipėda|molėtai/i.test(job.location)) return "Lithuania";
  return "Unknown";
}
function regionalLanguages(job) {
  if (Array.isArray(job.regionalLanguages) && job.regionalLanguages.length && !job.regionalLanguages.includes("Unknown")) return job.regionalLanguages;
  if (market(job) === "Lithuania") return ["Lithuanian"];
  if (market(job) !== "Switzerland") return ["Unknown"];
  if (/geneva|meyrin|lausanne|suisse romande|vaud|neuchatel|fribourg/i.test(job.location)) return ["French"];
  if (/lugano|ticino|bellinzona|locarno/i.test(job.location)) return ["Italian"];
  if (/^(switzerland|schweiz|suisse|svizzera)$/i.test(job.location.trim())) return ["German", "French", "Italian"];
  return ["German"];
}
function stripTracking(url) { if (!url) return null; const parsed = new URL(url); for (const name of [...parsed.searchParams.keys()]) if (/^(utm_|gh_src$|ref$|tracking)/i.test(name)) parsed.searchParams.delete(name); return parsed.toString(); }
function validate(job, index) {
  const errors = [];
  for (const field of ["title","normalizedTitle","company","normalizedCompany","location","salaryText","status","statusReason","matchSummary","firstSeenAt","lastSeenAt","lastVerifiedAt"]) if (!job[field]) errors.push(`record ${index}: missing ${field}`);
  if (!job.market) errors.push(`record ${index}: market eligibility not established`);
  if (!allowedStatuses.has(job.status)) errors.push(`record ${index}: invalid status`);
  if (!allowedModes.has(job.workMode)) errors.push(`record ${index}: invalid workMode`);
  if (!allowedRoleFocuses.has(job.roleFocus)) errors.push(`record ${index}: invalid roleFocus`);
  if (!Array.isArray(job.regionalLanguages) || !job.regionalLanguages.length) errors.push(`record ${index}: missing regionalLanguages`);
  if (!Array.isArray(job.roleFamilies) || !job.roleFamilies.length) errors.push(`record ${index}: missing roleFamilies`);
  if (!(Number.isInteger(job.relevanceScore) && job.relevanceScore >= 0 && job.relevanceScore <= 100)) errors.push(`record ${index}: invalid relevanceScore`);
  if (job.directUrl) { try { const u = new URL(job.directUrl); if (!/^https?:$/.test(u.protocol)) throw new Error(); if (/linkedin\.com\/jobs\/(search|collections)/.test(u.href)) errors.push(`record ${index}: directUrl is a search page`); } catch { errors.push(`record ${index}: invalid directUrl`); } }
  return errors;
}

const existing = readJson(dataPath).map(job => ({ ...job, market: market(job), regionalLanguages: regionalLanguages(job) }));
if (!Array.isArray(existing)) throw new Error("data/vacancies.json must contain an array");
let allErrors = existing.flatMap(validate);
const existingKeys = existing.map(key);
if (new Set(existingKeys).size !== existingKeys.length) allErrors.push("existing dataset contains duplicate keys");
if (normalizeOnly) { if (allErrors.length) throw new Error(allErrors.join("\n")); fs.writeFileSync(dataPath, JSON.stringify(existing, null, 2) + "\n"); console.log(`Normalized ${existing.length} vacancies`); process.exit(0); }
if (validateOnly && inputIndex === -1) { if (allErrors.length) throw new Error(allErrors.join("\n")); console.log(`Validated ${existing.length} vacancies`); process.exit(0); }
if (inputIndex === -1 || !args[inputIndex + 1]) throw new Error("Use --input <candidate-json> or --validate");

const inputFile = path.resolve(root, args[inputIndex + 1]);
const candidates = readJson(inputFile);
if (!Array.isArray(candidates)) throw new Error("Candidate file must contain an array");
const now = new Date().toISOString();
const runStartedAt = candidates[0]?.runStartedAt || now;
const byKey = new Map(existing.map(job => [key(job), job]));
let created = 0, updated = 0;

for (const raw of candidates) {
  const candidateFields = { ...raw };
  delete candidateFields.runStartedAt;
  const candidate = { ...candidateFields, regionalLanguages: regionalLanguages(candidateFields), directUrl: stripTracking(raw.directUrl), sourceLastCheckedAt: raw.sourceLastCheckedAt || now };
  const candidateErrors = validate({ firstSeenAt: now, lastSeenAt: now, lastVerifiedAt: now, ...candidate }, `candidate ${created + updated + 1}`);
  if (candidateErrors.length) throw new Error(candidateErrors.join("\n"));
  const dedupeKey = key(candidate);
  const prior = byKey.get(dedupeKey);
  if (!prior) {
    const record = { ...candidate, id: candidate.id || `job-${Date.now()}-${created}`, firstSeenAt: candidate.firstSeenAt || now, lastSeenAt: candidate.lastSeenAt || now, lastVerifiedAt: candidate.lastVerifiedAt || now, previousStatus: null, statusChangedAt: candidate.statusChangedAt || now, statusHistory: candidate.statusHistory || [{ status: candidate.status, at: now, reason: candidate.statusReason }] };
    byKey.set(dedupeKey, record); created++;
  } else {
    const changed = prior.status !== candidate.status;
    const history = [...(prior.statusHistory || [])];
    if (changed) history.push({ status: candidate.status, at: now, reason: candidate.statusReason });
    byKey.set(dedupeKey, { ...prior, ...candidate, id: prior.id, firstSeenAt: prior.firstSeenAt, lastSeenAt: candidate.lastSeenAt || now, lastVerifiedAt: candidate.lastVerifiedAt || now, previousStatus: changed ? prior.status : prior.previousStatus, statusChangedAt: changed ? now : prior.statusChangedAt, statusHistory: history });
    updated++;
  }
}

const merged = [...byKey.values()].sort((a,b) => b.relevanceScore - a.relevanceScore || Date.parse(b.lastSeenAt) - Date.parse(a.lastSeenAt));
allErrors = merged.flatMap(validate);
if (allErrors.length) throw new Error(allErrors.join("\n"));
fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2) + "\n");
const runs = readJson(runsPath);
runs.push({ id: `run-${now}`, startedAt: runStartedAt, completedAt: now, candidateCount: candidates.length, newlyFoundCount: created, updatedCount: updated, notes: "Merged through canonical recurring search protocol" });
fs.writeFileSync(runsPath, JSON.stringify(runs, null, 2) + "\n");
console.log(`Merged ${candidates.length} candidates: ${created} new, ${updated} updated`);
