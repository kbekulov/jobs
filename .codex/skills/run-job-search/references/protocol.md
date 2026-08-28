# Canonical recurring search protocol

## Scope and ranking

Maintain one unified pool for RPA, automation, workflow orchestration, process improvement and architecture, business analysis, product ownership, automation delivery, AI automation, low-code, and adjacent transformation roles.

Prioritize: Vilnius; Kaunas; Klaipėda; other Lithuania locations; Lithuania-based hybrid; remote roles explicitly open to Lithuanian residents; Baltic roles explicitly listing Lithuania. Exclude generic remote-Europe roles without evidence of Lithuania eligibility.

Account-specific market criteria: Kiril and Gabriele receive the full Lithuania pool plus verified Switzerland vacancies; Wren and Rene receive Lithuania vacancies only. Store a normalized `market` country on every vacancy and apply the account filter consistently in Discover, Apply, and Trash.

Gabriele's recurring search profile is RPA-led but deliberately not RPA-exclusive. Prioritize RPA, intelligent automation, workflow automation, Power Platform, UiPath, process automation and Automation CoE roles, then broaden into Business Analyst, Product Owner and Manager/Lead work with substantive overlap in process improvement, senior process analysis, process ownership, operational excellence, transformation, automation delivery, requirements, governance or platform ownership. Do not target generic developer/engineer roles for Gabriele. Her app lanes are `analyst`, explicit `product-owner`, and `manager`; Product Ownership roles are routed to the explicit Product Owner lane, while other manager-level BA, process, improvement and transformation roles remain in Manager/Lead.

## Sources and source priority

Search LinkedIn Jobs, CVbankas, CV-Online/CV.lt, CVMarket, Work in Lithuania, Indeed, Glassdoor, recruiter postings, official careers pages, and employer ATS systems including Workday, Greenhouse, SmartRecruiters, Oracle, SuccessFactors, and Lever.

Resolve conflicts in this order: official vacancy page; official ATS; major local board; direct LinkedIn vacancy; recruiter; aggregator. Prefer the higher source. If an official page still accepts applications, do not mark the vacancy closed because a lower source disagrees. Use `Unknown` when evidence remains irreconcilable.

## Employers to check

Check Swedbank, SEB, Luminor, Danske Bank, Nasdaq, Western Union, Revolut, Adyen, Moody's, Telia, Cognizant, Accenture, EPAM, Devbridge/Cognizant, Baltic Amadeus, Tietoevry, Vinted, Nord Security, Teltonika, Ignitis Group, LTG Group, LTG Link, Girteka, Thermo Fisher Scientific, Citco, Dexcom Lithuania, Mediq Business Services Lithuania, Metso, Registrų centras, CPVA, EKSMA Optics, FL Technics, EUROCASH1, Lietuvos bankas, Litgrid, EPSO-G, Macaw Lithuania, BURGA, CGI, Convera, TAUMONA, Hoptrans, Robodam, and Synergy Effect. Discover additional employers.

## Search families

Combine exact-title, technology, employer-specific, career-page, and historical-recheck searches.

- RPA: RPA Developer/Engineer/Analyst/Architect/Controller/Manager; Robotic Process Automation; Automation Developer/Engineer/Analyst/Architect/Manager; Intelligent/Enterprise/Business Process/Digital Automation; Hyperautomation; Automation CoE.
- Platforms: UiPath, Blue Prism, Automation Anywhere, Power Automate, Power Platform, Power Apps, Copilot Studio, Camunda, BPM/BPMN, n8n, low/no-code, APIs, case management, process mining, workflow/process orchestration.
- Leadership: Automation Lead/Manager/Owner, Delivery/Practice/CoE Lead, Head of Automation, Transformation Lead, Process Excellence Lead, Engineering Manager Automation.
- Process and analysis: Business/Functional/Process Analyst, Process Architect/Manager/Owner, Process Improvement/Design/Governance/Optimization, Operational Excellence, Continuous Improvement.
- Product and delivery: Product/Technical Product Owner, IT/Automation Project Manager, Program/Delivery/Platform/Systems Manager.
- AI: AI/Agentic/LLM automation, AI agents, AI workflows, Generative AI, Copilot, intelligent workflows, AI transformation/operations/platform.

### Professionally adjacent expansion

The user's professional profile spans hands-on automation delivery, analysis, architecture, integrations, leadership, and business transformation. Search these adjacent titles and concepts on every full run, including Lithuanian and English variants, while requiring meaningful overlap in the vacancy description:

- Solution/Platform/Enterprise/Application Architect; Integration Engineer/Architect; API or Middleware Engineer; Enterprise Applications Engineer; Systems Engineer where workflow automation is substantive.
- Business Systems Analyst; Systems Analyst/Modeler; Requirements Analyst; Functional Consultant; Solution Consultant; Technology Consultant; Digital Transformation Consultant; Process Consultant.
- ServiceNow, Dynamics 365, Salesforce platform, Microsoft 365/Digital Workplace, SharePoint, Azure Logic Apps, Copilot adoption, and enterprise workflow roles when they include automation, orchestration, process ownership, or low-code delivery.
- Process Mining, Task Mining, Process Intelligence, Operational Intelligence, Decision Automation, Business Rules, Event Processing, Case Management, and orchestration platforms.
- Continuous Improvement, Lean, Operational Excellence, Service Excellence, Process Governance, Process Controls, Target Operating Model, Shared Services/GBS transformation, and technology adoption roles.
- Automation Portfolio/Program/Delivery Manager; Product or Platform Manager/Owner; Practice/Capability/Chapter Lead; CoE Lead; Transformation Office roles; AI Enablement/Adoption Lead.
- Intelligent document processing, OCR/document automation, conversational automation, virtual agents, AI operations, agent platforms, prompt/agent workflow engineering, and AI solution delivery.

Do not require an exact keyword in the title. Read responsibilities and technologies to decide whether the role uses the user's transferable automation/process capabilities.

## Search depth and breadth

Each recurring run is a deep search, not a quick sampling. Cover all of these independent lanes before concluding:

1. Dedicated developer/engineer, manager/lead, and analyst/consultant searches.
2. Exact RPA and automation titles plus the professionally adjacent expansion above.
3. Technology searches for each major platform and concept, including combinations with Lithuania, Vilnius, Kaunas, and remote-Lithuania eligibility.
4. Every named priority employer, plus newly discovered employers and recruiter postings.
5. Local boards, LinkedIn direct jobs, official employer lists, and major ATS platforms.
6. English and Lithuanian title/keyword variants and recent-posting searches.
7. Every non-closed tracked vacancy and every historical role family.

Continue beyond the first result page or first few matches where the source permits it. Vary synonyms and search combinations to uncover roles whose titles mask relevant work. Prefer many verified options, but never trade away the direct-link, Lithuania-eligibility, deduplication, and status-evidence rules merely to increase the count.

Search technologies inside descriptions even when the title lacks “automation.” Deprioritize generic engineering, data, QA automation, marketing automation, and generic project management without strong process/workflow relevance.

## Primary review focus

Assign each vacancy exactly one `roleFocus`. Use the dominant day-to-day responsibility, not a keyword-only title match. Keep `roleFamilies` multi-valued for secondary overlap.

- `developer`: hands-on implementation, engineering, solution/platform architecture, integrations, RPA development, Power Platform/Camunda/n8n delivery, or technical AI/workflow building.
- `manager`: people, practice, portfolio, delivery, product/platform/process ownership, governance, or transformation leadership. Include lead, head, manager, and owner roles when ownership is substantive.
- `analyst`: discovery, requirements, process mapping, opportunity assessment, functional/business analysis, process expertise, consulting, and future-state design.

Run dedicated title, technology, employer, and career-page searches for every focus. A full run must attempt all three, but accuracy outranks numerical balance. Do not duplicate one vacancy across focuses; choose the best primary focus and preserve overlaps in `roleFamilies`.

## Direct URLs

Use a verified role-specific URL. Prefer official company, official ATS, local role page, direct LinkedIn job, then stable recruiter page. Never reconstruct job IDs, guess URLs, use search-result pages, employer home pages as role URLs, malformed links, or tracking-only redirects. Remove `utm_*`, `gh_src`, `ref`, and tracking parameters unless required to identify the vacancy. If no verified direct page exists, set `directUrl` to `null`, retain a supporting URL if useful, and use `Unknown` status.

## Status evidence

- `Newly found`: first dataset appearance with evidence of current availability.
- `Still open`: official page/application form remains live, Apply works, a future deadline exists, days remain, or an official current list includes it.
- `Unknown`: state is ambiguous, deadline passed without explicit closure, sources conflict, only old/indexed evidence exists, or no exact direct page is verified.
- `Closed/Expired/No longer accepting applications`: only explicit source wording such as expired, inactive, removed, applications closed, no longer valid, or no longer accepting.

Never infer closure from age, a passed date, disappearance, or one aggregator dropping the listing.

## Deduplication and normalization

Deduplicate by canonical company, normalized title, location, and requisition ID when available. Merge cross-source, cross-language, legal-suffix, abbreviation, and minor-title variants. Normalize Citco/The Citco Group Limited and Registrų Centras capitalization. Preserve original visible title. Merge useful metadata from duplicates and keep the strongest direct source.

## Classification and score

Use any applicable families: RPA Development, Automation Engineering, Automation Analysis, Automation Architecture, Automation Leadership, Workflow / BPM, Power Platform, AI / Agentic Automation, Process Analysis, Process Architecture, Process Management, Process Excellence, Business Analysis, Product Ownership, Project / Program Management, Digital Transformation, Technical Platform / Architecture.

Score 0–100 using: +30 direct automation/workflow responsibility; +20 named automation platform; +15 process/BPMN; +15 ownership/leadership/delivery; +10 AI automation; +10 Lithuania eligibility. Consider CoE, governance, integrations, requirements, discovery, redesign, architecture, and stakeholder/transformation delivery.

## Historical rechecks

Recheck the same requisition, repost, renamed equivalent, or successor role for:

- Citco: Manager – Intelligent Automation; Automation Developer.
- Vinted: Senior Business Process Architect, AI Automation.
- LTG/LTG Link: Process Management and Automation Architect; Procesų valdymo vadovas.
- Mediq: Business Process Manager; Robotic Process Automation Developer.
- Metso: Automation Analyst.
- Registrų centras: RPA Analyst; RPA Programmer.
- Western Union: Robotic Process Automation Developer.
- Luminor: Unit Manager, Risk Quantification & Automation.
- Dexcom: Senior Lead, Process Excellence & Business Transformation; Sr. Business Analyst, GBS Service & Digital Enablement; Senior Business Analyst, Engagement & Service Management.
- Danske Bank: Business & Functional Specialist and Senior Specialist, Workflow Enablement; Senior Solution Architect, Workflow Orchestration Platform; Platform Architect, Workflow Enablement Tribe.
- EKSMA Optics: Business Process Development Manager.
- FL Technics: IT Project Manager, Automation & Systems.
- EUROCASH1: IT projektų vadovas.
- Cognizant: MS Power Developer; RPA Developer, UiPath.

## Quality gate

Before persistence verify employer identity, specific vacancy, Lithuania eligibility, discovered direct URL, evidence-based status, primary focus, deduplication, genuine relevance, source conflicts, and availability of a stronger source. Use `null` or `Unknown` instead of guessing. Accuracy outranks quantity.
