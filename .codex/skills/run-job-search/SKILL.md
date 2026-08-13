---
name: run-job-search
description: Research, verify, deduplicate, merge, and publish Lithuania-relevant RPA, automation, workflow, process, business-analysis, product, transformation, and AI-automation vacancies. Use whenever Codex searches for jobs, adds or refreshes listings, rechecks known vacancies, updates vacancy status, or performs a recurring Jobflow search run.
---

# Run Job Search

Maintain one ranked vacancy pool across all role families and three primary review focuses: `developer`, `manager`, and `analyst`. Optimize for accuracy, current evidence, direct URLs, historical continuity, and Lithuania eligibility.

## Required workflow

1. Read [protocol.md](references/protocol.md) completely before researching.
2. Read `data/vacancies.json` and `data/search-runs.json` before searching. Build a recheck list from every non-closed record plus the historical roles in the protocol.
3. Record the run start time in UTC. Search each primary focus independently, plus named employers, local boards, recent LinkedIn roles, and official career/ATS pages. Prefer official sources.
4. Verify each candidate against the quality checklist. Never invent a URL, requisition ID, salary, eligibility, deadline, or application status.
5. Prepare a JSON array conforming to [data-contract.md](references/data-contract.md). Preserve visible titles and evidence; use `null` or `Unknown` when verification fails.
6. Run:

   `node .codex/skills/run-job-search/scripts/merge-results.mjs --input <candidate-file>`

   The merger updates first/last-seen timestamps, status history, deduplication, and the search-run ledger. It never closes a missing role automatically.
7. Run the merger with `--validate`, inspect the diff, and spot-check every new or changed direct URL.
8. Build and publish the site. Commit and push the vacancy data and search-run record.

## Research rules

- Search deeply enough to cover exact titles, technologies, employers, official career systems, and historical rechecks.
- Treat all roles as one result pool, but assign exactly one primary `roleFocus` from `developer`, `manager`, or `analyst`. Classify by dominant responsibilities, not title alone.
- Search all three focuses on every full run. Do not force equal counts or retain weak roles merely to balance the sections.
- Prefer a verified role-specific official/ATS URL. Strip tracking parameters. Store `directUrl: null` when no role-specific URL can be verified.
- Use only the four canonical statuses. Do not infer closure from age, a passed date, disappearance, or one missing index result.
- Merge duplicates across sources, languages, legal company suffixes, and minor title variants. Prefer the strongest source and merge useful evidence.
- Treat a changed requisition ID or clearly new application window as a reposted vacancy.
- Revalidate known records on every run. Update `lastSeenAt` only when the vacancy is actually seen; update `lastVerifiedAt` whenever its status is checked.

## Completion standard

Report new roles and active counts by focus, status changes, unresolved conflicts, and rechecks. Do not report the run complete until validation passes and the published dataset matches the committed dataset.
