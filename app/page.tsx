"use client";

import { useEffect, useMemo, useState } from "react";

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

const jobs: Job[] = [
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

const tabs = ["Discover", "Apply", "Trash"] as const;
type Tab = (typeof tabs)[number];

export default function Home() {
  const [tab, setTab] = useState<Tab>("Discover");
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

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
    setExpanded(null);
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

  const current = visible[0];

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setTab("Discover")} aria-label="Go to discover">
          <span>JOB/FLOW</span><sup>LT</sup>
        </button>
        <div className="top-meta"><span>VILNIUS</span><span className="live-dot" />11 AUG 2026</div>
      </header>

      <section className="shell">
        <div className="intro">
          <div><p className="eyebrow">AUTOMATION ROLES / DAILY EDIT</p><h1>{tab === "Discover" ? "Make the call." : tab === "Apply" ? "The shortlist." : "Not this time."}</h1></div>
          <p className="counter">{tab === "Discover" ? `${visible.length} new role${visible.length === 1 ? "" : "s"}` : `${visible.length} saved`}</p>
        </div>

        <nav className="tabs" aria-label="Job folders">
          {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}<span>{item === "Discover" ? jobs.filter(j => !decisions[j.id]).length : jobs.filter(j => decisions[j.id] === (item === "Apply" ? "apply" : "trash")).length}</span></button>)}
        </nav>

        {!ready ? <div className="empty"><div className="spinner" />Loading your shortlist…</div> : !current ? (
          <div className="empty">
            <span className="empty-icon">✓</span>
            <h2>{tab === "Discover" ? "You’re all caught up" : `Nothing in ${tab.toLowerCase()} yet`}</h2>
            <p>{tab === "Discover" ? "Fresh automation roles will appear in your next update." : "Review the daily deck and your choices will stay here."}</p>
            {tab !== "Discover" && <button className="secondary" onClick={() => setTab("Discover")}>Back to discover</button>}
          </div>
        ) : tab === "Discover" ? (
          <article className="job-card" style={{ "--accent": current.accent } as React.CSSProperties}>
            <div className="card-top"><span className="fresh">NEW LISTING</span><span>01 / {String(visible.length).padStart(2, "0")}</span></div>
            <div className="company-row"><p>{current.company}</p><span>{current.location} — {current.mode} — {current.posted}</span></div>
            <h2>{current.title}</h2>
            <div className="salary"><small>MONTHLY / GROSS</small><strong>{current.salary}</strong><span>{current.salary.includes("€") ? "EUR" : ""}</span></div>
            <p className="summary">{current.summary}</p>
            <div className="tags">{current.tags.map((tag, index) => <span key={tag}>{index > 0 && "/ "}{tag}</span>)}</div>
            <button className="details" onClick={() => setExpanded(expanded === current.id ? null : current.id)}>{expanded === current.id ? "Hide details" : "View requirements"}<span>{expanded === current.id ? "↑" : "↓"}</span></button>
            {expanded === current.id && <div className="expanded"><ul>{current.requirements.map(item => <li key={item}>{item}</li>)}</ul><a href={current.url} target="_blank" rel="noreferrer">Open full vacancy ↗</a></div>}
            <div className="actions"><button className="no" onClick={() => decide(current.id, "trash")}><span>×</span><div><small>PASS</small>No</div></button><button className="yes" onClick={() => decide(current.id, "apply")}><span>↗</span><div><small>SHORTLIST</small>Yes</div></button></div>
          </article>
        ) : (
          <div className="saved-list">{visible.map((job, index) => <article className="saved-card" key={job.id}><span className="saved-index">{String(index + 1).padStart(2, "0")}</span><div className="saved-copy"><p>{job.company}</p><h2>{job.title}</h2><strong>{job.salary}</strong><span>{job.location} — {job.mode}</span></div><div className="saved-actions"><a href={job.url} target="_blank" rel="noreferrer">{tab === "Apply" ? "APPLY ↗" : "VIEW ↗"}</a><button onClick={() => reset(job.id)}>UNDO</button></div></article>)}</div>
        )}
        <p className="research-note">Curated for RPA & automation roles in Lithuania · Researched 11 Aug 2026</p>
      </section>
    </main>
  );
}
