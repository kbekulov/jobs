---
name: run-job-search
description: Research, verify, deduplicate, merge, and publish Lithuania-relevant RPA, automation, workflow, process, business-analysis, product, transformation, and AI-automation vacancies. Use whenever Codex searches for jobs, adds or refreshes listings, rechecks known vacancies, updates vacancy status, or performs a recurring Jobflow search run.
---

# Run Job Search

Maintain one ranked vacancy pool across all role families and three primary review focuses: `developer`, `manager`, and `analyst`. Optimize for accuracy, current evidence, direct URLs, historical continuity, Lithuania eligibility, and broad option discovery. The user values having many credible options, so every run must search substantially beyond the obvious RPA titles without weakening the evidence gate.

## Required workflow

1. Read [protocol.md](references/protocol.md) completely before researching.
2. Read `data/vacancies.json` and `data/search-runs.json` before searching. Build a recheck list from every non-closed record plus the historical roles in the protocol.
3. Record the run start time in UTC. Search each primary focus independently, plus named employers, local boards, recent LinkedIn roles, and official career/ATS pages. Prefer official sources.
4. Verify each candidate against the quality checklist. Never invent a URL, requisition ID, salary, eligibility, deadline, or application status.
5. Prepare a JSON array conforming to [data-contract.md](references/data-contract.md). Preserve visible titles and evidence; use `null` or `Unknown` when verification fails.
6. Run:

   `node .codex/skills/run-job-search/scripts/merge-results.mjs --input <candidate-file>`

   The merger updates first/last-seen timestamps, status history, deduplication, and the search-run ledger. Rechecked roles that cannot be found or positively verified as open must be changed to `Unknown`; the UI keeps the historical record but hides it from every user-facing folder.
7. Run the merger with `--validate`, inspect the diff, and spot-check every new or changed direct URL.
8. Build and publish the site. Commit and push the vacancy data and search-run record.

## Research rules

- Search deeply and widely across exact titles, adjacent titles, technologies, employers, official career systems, local boards, recent postings, multilingual variants, and historical rechecks. Do not stop after the first page or first few good matches; continue across independent search lanes until additional lanes stop producing credible new vacancies.
- Expand queries from the user's professional profile: hands-on RPA and workflow delivery, automation analysis, process discovery and redesign, solution/platform architecture, integrations and APIs, automation leadership, product/platform ownership, transformation delivery, and business-facing technical consulting. Search for work that uses these capabilities even when the title omits RPA or automation.
- Maximize verified options, not raw noise. Include adjacent roles when their responsibilities materially overlap the profile, and keep excluding generic engineering, QA automation, marketing automation, data-only, and project-management roles without a strong workflow/process/transformation connection.
- Treat all roles as one result pool, but assign exactly one primary `roleFocus` from `developer`, `manager`, or `analyst`. Classify by dominant responsibilities, not title alone.
- Search all three focuses on every full run. Do not force equal counts or retain weak roles merely to balance the sections.
- Prefer a verified role-specific official/ATS URL. Strip tracking parameters. Store `directUrl: null` when no role-specific URL can be verified.
- Use only the four canonical statuses. Reserve the closed status for explicit closure evidence. After a broad recheck of official and secondary sources, mark a role `Unknown` when it no longer appears open or cannot be found; `Unknown` roles disappear from Discover, Apply, and Trash while remaining in historical data.
- Merge duplicates across sources, languages, legal company suffixes, and minor title variants. Prefer the strongest source and merge useful evidence.
- Treat a changed requisition ID or clearly new application window as a reposted vacancy.
- Revalidate every non-closed record on every scheduled run. Update `lastSeenAt` only when the vacancy is actually seen; update `lastVerifiedAt` whenever its status is checked. A scheduled run is incomplete until every previously visible role is either positively reverified, explicitly closed, or changed to `Unknown` after the broad recheck fails.

## Completion standard

Report new roles and active counts by focus, status changes, unresolved conflicts, and rechecks. Do not report the run complete until validation passes and the published dataset matches the committed dataset.
