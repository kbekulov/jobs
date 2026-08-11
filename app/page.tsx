"use client";

import { useEffect, useMemo, useState } from "react";
import vacancyData from "../data/vacancies.json";

type Decision = "apply" | "trash";
type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  mode: string;
  posted: string;
  summary: string;
  requirements: string[];
  tags: string[];
  url: string;
  accent: string;
};

const companyPalettes = [
  ["#d8ff72", "#253500"],
  ["#dcd5ff", "#342768"],
  ["#bdeedc", "#123e31"],
  ["#ffd5c9", "#672a1b"],
  ["#cbe6ff", "#173f68"],
  ["#ffe3a7", "#543800"],
];

function companyStyle(company: string) {
  const index = [...company].reduce((total, character) => total + character.charCodeAt(0), 0) % companyPalettes.length;
  return { "--company-bg": companyPalettes[index][0], "--company-ink": companyPalettes[index][1] } as React.CSSProperties;
}

function salaryParts(salary: string) {
  const suffix = " gross/month";
  return salary.endsWith(suffix)
    ? { amount: salary.slice(0, -suffix.length), cadence: "gross / month" }
    : { amount: salary, cadence: null };
}

function freshnessLabel(posted: string) {
  return /current official vacancy|recently verified/i.test(posted) ? "Verified" : posted;
}

function displayTitle(title: string) {
  const translatedSuffix = title.match(/^(.*)\s+\(([A-Za-z][A-Za-z0-9 /&+.-]{8,})\)$/);
  return (translatedSuffix?.[1] ?? title).replace(/\(-/g, "(‑");
}

function titleClass(title: string) {
  if (title.length > 72) return "job-title job-title-long";
  if (title.length > 48) return "job-title job-title-medium";
  return "job-title";
}

const legacyJobs: Job[] = [
  {
    id: "ignitis-rpa-2026-08",
    title: "RPA Developer",
    company: "Ignitis Group",
    salary: "€2,770–4,150",
    location: "Vilnius",
    mode: "Hybrid",
    posted: "4 days ago",
    summary: "Build and maintain business process automations with UiPath and Power Automate, partnering closely with business teams to turn repetitive work into reliable workflows.",
    requirements: ["Hands-on UiPath or Power Automate experience", "Power Query and process analysis", "Interest in AI agents and LLM-powered automation"],
    tags: ["UiPath", "Power Automate", "AI agents"],
    url: "https://lt.linkedin.com/jobs/view/proces%C5%B3-automatizavimo-sprendim%C5%B3-programuotoja-as-rpa-developer-at-ignitis-group-4368812328",
    accent: "#7a5cff",
  },
  {
    id: "cognizant-uipath-2026-08",
    title: "RPA Developer (UiPath)",
    company: "Cognizant",
    salary: "€3,370–4,450",
    location: "Vilnius",
    mode: "Hybrid",
    posted: "4 days ago",
    summary: "Join an enterprise automation delivery team building UiPath solutions for international clients in a fast-moving consulting environment.",
    requirements: ["Commercial RPA development experience", "Strong UiPath capability", "English communication and client collaboration"],
    tags: ["UiPath", "Enterprise", "Consulting"],
    url: "https://lt.linkedin.com/jobs/view/rpa-developer-uipath-at-cognizant-4441106174",
    accent: "#18a999",
  },
  {
    id: "mediq-rpa-2026-08",
    title: "RPA Developer",
    company: "Mediq Business Services",
    salary: "Salary not disclosed",
    location: "Vilnius",
    mode: "Hybrid",
    posted: "4 days ago",
    summary: "Create smart automations for finance, sourcing, IT, supply planning and HR services supporting Mediq teams across the Nordics and Europe.",
    requirements: ["RPA solution design and development", "Business process understanding", "Stakeholder collaboration across functions"],
    tags: ["RPA", "Healthcare", "Shared services"],
    url: "https://lt.linkedin.com/jobs/view/robotic-process-automation-rpa-developer-at-mediq-business-services-lithuania-4424395775",
    accent: "#e66a45",
  },
  {
    id: "telia-automation-lead-2026-08",
    title: "Automation Lead",
    company: "Telia",
    salary: "Salary not disclosed",
    location: "Vilnius",
    mode: "Hybrid",
    posted: "2 days ago",
    summary: "Turn hands-on automation experience into an organizational capability by leading engineers, shaping pipelines and replacing messy manual processes at scale.",
    requirements: ["Track record building real automation", "Engineering leadership and mentoring", "Ability to influence teams and operating models"],
    tags: ["Leadership", "Pipelines", "ITSM"],
    url: "https://lt.linkedin.com/jobs/view/automation-lead-at-telia-4439072999",
    accent: "#d44d78",
  },
  {
    id: "paymentology-automation-2026-08",
    title: "Automation Engineer",
    company: "Paymentology",
    salary: "Salary not disclosed",
    location: "Vilnius",
    mode: "Flexible",
    posted: "2 days ago",
    summary: "Build internal tools and SaaS integrations that streamline operations, using AI agents and MCP where they create clear business value.",
    requirements: ["Automation and systems integration", "Internal tooling mindset", "Practical AI, agent or MCP experience"],
    tags: ["AI agents", "MCP", "SaaS"],
    url: "https://lt.linkedin.com/jobs/view/automation-engineer-at-paymentology-4400583458",
    accent: "#2f7de1",
  },
  {
    id: "citco-automation-developer-2026-08",
    title: "Automation Developer",
    company: "The Citco Group",
    salary: "Salary not disclosed",
    location: "Vilnius",
    mode: "Hybrid",
    posted: "3 days ago",
    summary: "Develop automation solutions across UiPath, Automation Anywhere and Power Automate in a global financial services environment.",
    requirements: ["2+ years building RPA solutions", "UiPath, Automation Anywhere or Power Automate", "Reliable delivery and documentation"],
    tags: ["UiPath", "Power Automate", "Finance"],
    url: "https://lt.linkedin.com/jobs/view/automation-developer-at-the-citco-group-limited-4428692880",
    accent: "#c69231",
  },
];

const legacyById = new Map(legacyJobs.map((job) => [job.id, job]));
const jobs: Job[] = vacancyData
  .filter((job) => job.status !== "Closed/Expired/No longer accepting applications")
  .map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    salary: job.salaryText ?? legacyById.get(job.id)?.salary ?? "Salary not disclosed",
    location: job.location.replace(", Lithuania", ""),
    mode: job.workMode === "unknown" ? "Mode unknown" : job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1),
    posted: job.postingAgeText ?? "Recently verified",
    summary: job.matchSummary,
    requirements: job.requirements,
    tags: job.technologies.slice(0, 3),
    url: job.directUrl ?? job.supportingSourceUrl ?? "#",
    accent: "#c8ff19",
  }));

type Tab = "Discover" | "Apply" | "Trash";

export default function Home() {
  const [tab, setTab] = useState<Tab>("Discover");
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch("/api/decisions")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { decisions: { jobId: string; decision: Decision }[] }) => {
        setDecisions(Object.fromEntries(data.decisions.map((item) => [item.jobId, item.decision])));
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const visible = useMemo(() => {
    if (tab === "Discover") return jobs.filter((job) => !decisions[job.id]);
    const wanted: Decision = tab === "Apply" ? "apply" : "trash";
    return jobs.filter((job) => decisions[job.id] === wanted);
  }, [tab, decisions]);

  const decide = async (jobId: string, decision: Decision) => {
    const previous = decisions[jobId];
    setDecisions((current) => ({ ...current, [jobId]: decision }));
    try {
      const response = await fetch("/api/decisions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jobId, decision }),
      });
      if (!response.ok) throw new Error("Could not save");
    } catch {
      setDecisions((current) => {
        const next = { ...current };
        if (previous) next[jobId] = previous;
        else delete next[jobId];
        return next;
      });
    }
  };

  const reset = async (jobId: string) => {
    setDecisions((current) => { const next = { ...current }; delete next[jobId]; return next; });
    await fetch(`/api/decisions?jobId=${encodeURIComponent(jobId)}`, { method: "DELETE" });
  };

  const refreshJobs = () => {
    setRefreshing(true);
    window.setTimeout(() => window.location.reload(), 120);
  };

  const current = visible[0];

  const discoverCount = jobs.filter((job) => !decisions[job.id]).length;
  const applyCount = jobs.filter((job) => decisions[job.id] === "apply").length;
  const trashCount = jobs.filter((job) => decisions[job.id] === "trash").length;
  const reviewedCount = jobs.length - discoverCount;
  const currentNumber = Math.min(reviewedCount + 1, jobs.length);
  const salary = current ? salaryParts(current.salary) : null;
  const cardTitle = current ? displayTitle(current.title) : "";

  return (
    <main className="app-canvas">
      <div className="phone-app">
        <header className="appbar">
          <button className="brand" onClick={() => setTab("Discover")} aria-label="Open job deck">
            <span className="brand-icon">J</span><span>jobflow</span>
          </button>
          <nav className="folder-nav" aria-label="Job folders">
            <button className={tab === "Trash" ? "active" : ""} onClick={() => setTab("Trash")} aria-label={`Trash, ${trashCount} jobs`}><span>×</span><b>{trashCount}</b></button>
            <button className={tab === "Apply" ? "active" : ""} onClick={() => setTab("Apply")} aria-label={`Apply, ${applyCount} jobs`}><span>♥</span><b>{applyCount}</b></button>
          </nav>
        </header>

        <section className="app-content">
          {!ready ? <div className="empty"><div className="spinner" /><p>Finding your matches…</p></div> : !current ? (
            <div className="empty">
              {tab === "Discover" ? (
                <button className="refresh-jobs" onClick={refreshJobs} disabled={refreshing} aria-label="Refresh and check for new jobs">
                  <span className={refreshing ? "refresh-glyph spinning" : "refresh-glyph"}>↻</span>
                  <b>{refreshing ? "Checking…" : "Refresh"}</b>
                </button>
              ) : <span className="empty-icon">✓</span>}
              <h2>{tab === "Discover" ? "You’re all caught up" : `No jobs in ${tab.toLowerCase()}`}</h2>
              <p>{tab === "Discover" ? "Tap refresh to check for newly added automation roles." : "Your choices will appear here as you review jobs."}</p>
              {tab !== "Discover" && <button className="secondary" onClick={() => setTab("Discover")}>Return to deck</button>}
            </div>
          ) : tab === "Discover" ? (
            <div className="deck-screen">
              <div className="deck-meta"><span><i /> {discoverCount} jobs near you</span><b>Vilnius</b></div>
              <div className="deck">
                <div className="card-ghost card-ghost-two" aria-hidden="true" />
                <div className="card-ghost card-ghost-one" aria-hidden="true" />
                <article className="job-card">
                  <div className="card-progress" aria-hidden="true"><span style={{ width: `${(currentNumber / jobs.length) * 100}%` }} /></div>
                  <div className="card-top"><span>{currentNumber} / {jobs.length}</span><span className="freshness"><i />{freshnessLabel(current.posted)}</span></div>
                  <div className="company-banner" style={companyStyle(current.company)}>
                    <span>COMPANY</span>
                    <strong>{current.company}</strong>
                    <small>{current.location} · {current.mode}</small>
                  </div>
                  <h1 className={titleClass(cardTitle)} title={current.title}>{cardTitle}</h1>
                  <div className="salary"><small>SALARY</small><div><strong>{salary?.amount}</strong>{salary?.cadence && <span>{salary.cadence}</span>}</div></div>

                  <div className="job-visual">
                    <div className="visual-top"><span>THEY&apos;RE LOOKING FOR</span><span>{current.tags[0]}</span></div>
                    <p>{current.requirements.join(". ")}.</p>
                    <div className="skill-row">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="decision-dock" aria-label="Choose this job">
                      <button className="decision no" onClick={() => decide(current.id, "trash")} aria-label="No, move to trash"><span>×</span><b>No</b></button>
                      <a className="open-job" href={current.url} target="_blank" rel="noreferrer" aria-label="Open full vacancy"><span>↗</span><b>View</b></a>
                      <button className="decision yes" onClick={() => decide(current.id, "apply")} aria-label="Yes, save to apply"><span>♥</span><b>Yes</b></button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ) : (
            <div className="folder-screen">
              <div className="folder-heading"><button onClick={() => setTab("Discover")} aria-label="Back to deck">‹</button><div><span>{tab === "Apply" ? "YOUR PICKS" : "PASSED JOBS"}</span><h1>{tab}</h1></div><b>{visible.length}</b></div>
              <div className="saved-list">{visible.map((job) => <article className="saved-card" key={job.id}><div className="saved-copy"><p className="company-chip" style={companyStyle(job.company)}>{job.company}</p><h2>{job.title}</h2><strong>{job.salary}</strong><span>{job.location} · {job.mode}</span></div><div className="saved-actions"><a href={job.url} target="_blank" rel="noreferrer">↗</a><button onClick={() => reset(job.id)}>Undo</button></div></article>)}</div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
