import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Calculator,
  Users,
  FileText,
  Leaf,
  MessageSquare,
  ChevronRight,
  Server,
  AlertTriangle,
  Handshake,
  Rocket,
  ArrowDown,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

/* ─── section IDs for sticky nav ─── */
const sections = [
  { id: "summary", label: "Summary" },
  { id: "understanding", label: "Understanding" },
  { id: "modules", label: "Modules" },
  { id: "systems", label: "Systems" },
  { id: "delivery", label: "Delivery" },
  { id: "risks", label: "Risks" },
  { id: "why-lacuna", label: "Why Lacuna" },
  { id: "next-steps", label: "Next Steps" },
] as const;

/* ─── data ─── */

const challengeMap = [
  { challenge: "Manual, time-consuming job estimating", solution: "AI Estimating Assistant", module: 1 },
  { challenge: "No targeted sales intelligence", solution: "CRM Intelligence Engine", module: 2 },
  { challenge: "Manual PO-to-invoice matching", solution: "Invoice Automation", module: 3 },
  { challenge: "Manual carbon footprint tracking", solution: "Sustainability Reporting Engine", module: 4 },
  { challenge: "Staff time lost to routine client queries", solution: "Client AI Chatbot", module: 5 },
];

const modules = [
  {
    num: 1,
    icon: Calculator,
    title: "AI Estimating Assistant",
    body: "Using Primo's SQL database as its training source, this module analyses thousands of historical estimates, job specs, materials, and outcomes to build a pricing intelligence model. When a new estimate is being prepared, the assistant surfaces comparable historical jobs, suggests pricing ranges, flags margin risks, and tracks estimate-to-job conversion rates in real time.",
    capabilities: [
      "Historical job pattern matching for faster, more accurate quote preparation",
      "Automated estimate delivery to clients via branded email templates",
      "Win/loss reporting dashboard showing which estimate types convert and at what margin",
      "Seasonality and trend analysis to inform proactive pricing",
    ],
  },
  {
    num: 2,
    icon: Users,
    title: "CRM Intelligence Engine",
    body: "Connects to Primo's client, order, and sales data to deliver a living sales intelligence dashboard. The engine segments your 500+ active clients by spend, activity, purchase category, and recency, and surfaces targeted prompts for your sales team: who to call, what to pitch, and when.",
    capabilities: [
      "Automated identification of at-risk, lapsed, and high-potential accounts",
      "AI-generated email prompts triggered by purchase anniversary dates or category trends",
      "Estimate pipeline reporting: estimates raised vs. converted by client, sector, and rep",
      "Sector-level trend analysis to inform campaign targeting",
    ],
  },
  {
    num: 3,
    icon: FileText,
    title: "Invoice Automation",
    body: "Using OCR and document intelligence, this module reads incoming purchase invoices (PDF or scanned), extracts key fields, matches them against open Purchase Orders in Primo, and pushes matched records into Sage Line 50 for processing. Exceptions and mismatches are flagged for human review only.",
    capabilities: [
      "Automated OCR extraction of supplier name, PO reference, line items, and totals",
      "Intelligent PO matching against Primo purchase order records",
      "Automated posting to Sage via import layer with audit trail",
      "Exception dashboard for unmatched or disputed invoices",
    ],
    note: "Sage L50 has limited API capability. Integration will use the Sage 50 Data Service connector or structured CSV import pipeline. We recommend TPI consider a medium-term migration to Sage 200 or equivalent to unlock a clean REST API for this workstream.",
  },
  {
    num: 4,
    icon: Leaf,
    title: "Sustainability Reporting Engine",
    body: "Aggregates data from Primo's purchase records, machinery usage logs, and utility inputs to automate the calculation and reporting of Scope 1, 2, and 3 emissions. Outputs are formatted for EcoVadis, FSC, and internal sustainability reporting requirements.",
    capabilities: [
      "Automated Scope 1 (fuel, vehicle) and Scope 2 (electricity) data aggregation",
      "Scope 3 approximation model using spend-based methodology and published SEAI/GHG Protocol emission factors",
      "Dashboard showing rolling carbon footprint vs. prior periods and targets",
      "Exportable reports in formats aligned to EcoVadis submission requirements",
    ],
    note: "Scope 3 emissions cannot be fully automated without supplier-level carbon data, which TPI does not currently hold. The engine will produce a best-practice spend-based approximation, clearly communicated as such in all outputs.",
  },
  {
    num: 5,
    icon: MessageSquare,
    title: "Client AI Chatbot",
    body: "A trained AI assistant connected to Primo's live job and delivery data, deployable via a web widget on tpi.ie and as an email auto-responder. Clients can query job status, request invoice copies, check delivery ETAs, and get answers to standard product or service questions without account manager involvement.",
    capabilities: [
      "Live job status queries via natural language (web or email)",
      "Automated invoice resend and delivery update responses",
      "Escalation routing to the relevant account manager for complex queries",
      "Query log dashboard to identify the most common client questions",
    ],
  },
];

const systems = [
  { name: "Tharstern Primo (SQL 2022)", readiness: "Strong", color: "text-emerald-400", desc: "Primo runs on SQL Server 2022, giving us direct read access to a structured, well-understood schema. 20+ years of clean data. Primary integration target for Modules 1, 2, 4, and 5." },
  { name: "Sage Line 50", readiness: "Limited", color: "text-amber-400", desc: "Sage Line 50 has constrained API capability. Integration for Module 3 will use the Sage 50 Data Service connector or a structured CSV import pipeline." },
  { name: "Enfocus Switch", readiness: "Opportunity", color: "text-sky-400", desc: "Switch is a file-based workflow automation tool. Relevant for routing incoming PDF invoices to the Module 3 processing pipeline. An underutilised asset." },
  { name: "MS Copilot (licensed)", readiness: "Quick Win", color: "text-emerald-400", desc: "Staff already have Copilot licences. Phase 0 opportunity to deploy Copilot against Primo Excel exports for immediate sales intelligence value." },
  { name: "ClickUp", readiness: "Secondary", color: "text-muted-foreground", desc: "Used for project management. Not a primary integration target but relevant for surfacing job-level data in Module 5 chatbot queries." },
  { name: "Network Infrastructure", readiness: "Solid", color: "text-emerald-400", desc: "Dell PowerEdge R760XD2 with 256GB RAM and SQL Server 2022 on-premise. Capable of running AI workloads locally if required." },
];

const phases = [
  { phase: "Phase 0", time: "Months 1–2", title: "Discovery & Quick Wins", items: ["Technical audit of Primo SQL schema, Sage connector, Switch configuration", "Deploy MS Copilot against Primo Excel exports — immediate sales intelligence", "Define data model and integration architecture", "Agree KPIs and success metrics for all five modules", "Full technical specification and final scope confirmation"] },
  { phase: "Phase 1", time: "Months 2–5", title: "Core Intelligence", items: ["Build SQL read layer on Primo — live data pipeline", "Deliver AI Estimating Assistant (Module 1) with win/loss dashboard", "Deliver CRM Intelligence Engine (Module 2) with sales prompts and segmentation", "Stakeholder review and sign-off before Phase 2"] },
  { phase: "Phase 2", time: "Months 5–8", title: "Automation", items: ["Deliver Invoice Automation module (Module 3) with OCR, PO matching, Sage integration", "Deliver Sustainability Reporting Engine (Module 4)", "Staff training on all live modules", "Performance review against Phase 1 KPIs"] },
  { phase: "Phase 3", time: "Months 8–10", title: "Client-Facing AI", items: ["Deploy Client AI Chatbot (Module 5) on tpi.ie and email channel", "Chatbot training on Primo job data, product catalogue, and FAQ content", "Query analytics dashboard and escalation routing live", "Full platform review, optimisation, and handover documentation"] },
];

const risks = [
  { risk: "Sage Line 50 has constrained API capabilities", impact: "High", mitigation: "Use Sage 50 Data Service connector or structured CSV import pipeline. Flag Sage upgrade path as a medium-term recommendation." },
  { risk: "Tharstern Primo API access may require negotiation", impact: "Medium", mitigation: "Engage Tharstern during Phase 0 to confirm API documentation. Direct SQL read access is the fallback." },
  { risk: "Scope 3 emissions data cannot be fully automated", impact: "Medium", mitigation: "Implement spend-based approximation model using GHG Protocol and SEAI emission factors." },
  { risk: "Staff adoption: varying data literacy levels", impact: "Medium", mitigation: "Build role-specific dashboards. Deliver structured onboarding sessions per phase. Design for simplicity first." },
  { risk: "On-premise infrastructure constraints for cloud AI", impact: "Low", mitigation: "PowerEdge server has sufficient capacity for local AI hosting. Secure sync to Azure Ireland region where beneficial." },
  { risk: "Data quality in legacy Primo records", impact: "Low", mitigation: "Phase 0 audit will assess completeness and quality. Cleansing included in scope where required." },
];

const nextSteps = [
  { num: "01", text: "Introductory meeting between Lacuna Digital and TPI to walk through this proposal and answer any questions." },
  { num: "02", text: "Phase 0 discovery scoping call with TPI's IT lead, operations manager, and sales team lead." },
  { num: "03", text: "Lacuna Digital to provide a fixed-price Phase 0 discovery engagement proposal within five working days." },
  { num: "04", text: "Phase 0 commences: technical audit, Copilot quick win deployment, and full specification produced." },
];

const whyPoints = [
  "Deep experience in AI-assisted workflows, automation, and data integration for operational businesses",
  "A proven track record in translating complex technical problems into usable, human-centred tools",
  "Ireland-based with direct accessibility to your team throughout the engagement",
  "A modular approach that protects your investment at every phase",
  "Honest, direct communication about what is achievable and what is not",
];

/* ─── component ─── */

const TPIProposal = () => {
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    document.title = "AI Integration Proposal — The Printed Image | Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "AI Operations Hub proposal for The Printed Image — five modular AI solutions connecting your existing systems.");
  }, []);

  /* intersection observer for sticky nav highlight */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const impactColor = (impact: string) => {
    if (impact === "High") return "bg-red-500/20 text-red-400";
    if (impact === "Medium") return "bg-amber-500/20 text-amber-400";
    return "bg-emerald-500/20 text-emerald-400";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── sticky section nav ── */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-3 scrollbar-hide md:justify-center md:gap-2">
          <Link to="/ai-integration" className="mr-3 flex-shrink-0 text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                activeSection === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── hero ── */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <span className="mb-4 inline-block rounded-full border border-border px-4 py-1 font-mono text-xs text-muted-foreground">
            Prepared for The Printed Image — April 2026
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            AI Integration Proposal
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Connecting your data. Unlocking your people.
          </p>
        </motion.div>
        <motion.button
          onClick={() => scrollTo("summary")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 animate-bounce text-muted-foreground"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </section>

      {/* ── 01 Executive Summary ── */}
      <section id="summary" className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">01</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Turning Data Into Decisions</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              The Printed Image has spent over three decades building one of Ireland's most respected marketing solutions businesses. The operational intelligence to run that business sits in your systems today — but it is locked away, siloed, and time-consuming to access.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Lacuna Digital proposes an <strong className="text-foreground">AI Operations Hub</strong>: a lightweight intelligence layer that connects your existing systems, surfaces actionable insight, and automates the repetitive work that is slowing your team down. Built on top of your current infrastructure — not a rip-and-replace.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-primary">The Goal in One Sentence</p>
              <p className="mt-2 text-base text-foreground">
                Free your people from Excel and give them an AI co-pilot that already knows your business inside out.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-12">
              <h3 className="mb-6 text-lg font-semibold">Challenge → Solution Map</h3>
              <div className="space-y-3">
                {challengeMap.map((item) => (
                  <div key={item.module} className="flex items-start gap-4 rounded-lg border border-border/50 bg-card p-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {item.module}
                    </span>
                    <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-muted-foreground">{item.challenge}</span>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="hidden h-3 w-3 text-muted-foreground sm:block" />
                        <span className="text-sm font-medium text-foreground">{item.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 02 Understanding ── */}
      <section id="understanding" className="border-t border-border/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">02</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">What We Heard</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              TPI's core issue is not a shortage of data. You have 30+ years of rich, accurate operational history sitting in Tharstern Primo. The problem is <strong className="text-foreground">access, connection, and automation</strong>. Your systems do not talk to each other efficiently, reporting is largely manual via Excel, and the staff bandwidth required to pull meaningful insight is consuming time that should be spent on higher-value work.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h3 className="mb-6 mt-12 text-lg font-semibold">The Five Problems You Need Solved</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Estimating", body: "All jobs are estimated manually. Historical data in Primo is not being used to inform or accelerate this process." },
                { title: "Sales & Marketing Intelligence", body: "No automated insight into at-risk clients, trending categories, or when to re-engage inactive accounts." },
                { title: "Invoice Processing", body: "Incoming purchase invoices are manually matched to POs and entered into Sage. Labour-intensive and error-prone." },
                { title: "Sustainability Reporting", body: "Scope 1, 2, and 3 emissions data is tracked manually despite sustainability being central to your brand." },
                { title: "Client Query Handling", body: "Basic client queries about job status, delivery, and invoicing are consuming account manager time." },
              ].map((p, i) => (
                <div key={i} className={`rounded-xl border border-border/50 bg-card p-5 ${i === 4 ? "md:col-span-2" : ""}`}>
                  <h4 className="text-sm font-semibold text-foreground">{p.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 03 Modules ── */}
      <section id="modules" className="border-t border-border/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">03</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">The TPI AI Operations Hub</h2>
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-primary">Architecture Principle</p>
              <p className="mt-2 text-sm text-foreground">
                Build on top of what you have. No system replacements. No data migrations. Tharstern Primo, Sage, ClickUp, and Switch remain unchanged. The Hub reads from them, learns from them, and acts through them.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 space-y-16">
            {modules.map((mod) => (
              <ScrollReveal key={mod.num}>
                <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <mod.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-muted-foreground">Module {mod.num}</span>
                      <h3 className="text-xl font-bold">{mod.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{mod.body}</p>
                  <div className="mt-6 space-y-2">
                    {mod.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{cap}</span>
                      </div>
                    ))}
                  </div>
                  {mod.note && (
                    <p className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-300/80">
                      <strong>Note:</strong> {mod.note}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Systems ── */}
      <section id="systems" className="border-t border-border/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">04</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Working With What You Have</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Before any build commences, Lacuna Digital will conduct a full technical audit of your systems environment. The following assessment sets out our current understanding of integration complexity per system.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 space-y-4">
              {systems.map((s) => (
                <div key={s.name} className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">{s.name}</span>
                    </div>
                    <span className={`text-xs font-medium ${s.color}`}>{s.readiness}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 05 Delivery ── */}
      <section id="delivery" className="border-t border-border/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">05</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">How We Get There</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A phased approach that delivers tangible value at each stage. Each phase is independently valuable and de-risks the investment.
            </p>
          </ScrollReveal>

          <div className="relative mt-12">
            {/* timeline line */}
            <div className="absolute bottom-0 left-5 top-0 w-px bg-border/50 md:left-6" />

            <div className="space-y-10">
              {phases.map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="relative pl-14 md:pl-16">
                    <div className="absolute left-3 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background md:left-4">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-5">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-sm font-bold text-primary">{p.phase}</span>
                        <span className="text-xs text-muted-foreground">{p.time}</span>
                      </div>
                      <h3 className="mt-1 text-base font-semibold">{p.title}</h3>
                      <ul className="mt-3 space-y-1.5">
                        {p.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/50" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 Risks ── */}
      <section id="risks" className="border-t border-border/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">06</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Forewarned Is Forearmed</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We believe in naming risks early. Each has a clear mitigation plan that we will action during the Phase 0 discovery.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 space-y-4">
              {risks.map((r, i) => (
                <div key={i} className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{r.risk}</span>
                    </div>
                    <span className={`inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${impactColor(r.impact)}`}>
                      {r.impact}
                    </span>
                  </div>
                  <p className="mt-3 pl-7 text-sm text-muted-foreground">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 07 Why Lacuna ── */}
      <section id="why-lacuna" className="border-t border-border/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">07</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">The Right Partner for This Work</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Lacuna Digital is a boutique AI design and UX consultancy based in Ireland, working with SMEs to identify where AI creates real commercial value — and then building it. We embed in your business, understand your workflows, and build solutions that your people will actually use.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 space-y-3">
              {whyPoints.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-primary">Our Commitment to TPI</p>
              <div className="mt-3 space-y-2 text-sm text-foreground">
                <p>We will not oversell what AI can do today. Every module has a clear technical path and honest caveats where required.</p>
                <p>You will have a single dedicated point of contact throughout. No handoffs to junior teams.</p>
                <p>If something is better solved with a simpler tool than AI, we will tell you.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 08 Next Steps ── */}
      <section id="next-steps" className="border-t border-border/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <span className="font-mono text-xs text-muted-foreground">08</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">How to Get Started</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 space-y-6">
              {nextSteps.map((s) => (
                <div key={s.num} className="flex items-start gap-5">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {s.num}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-16 text-center">
              <a
                href="https://calendly.com/lacunaconsulting-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <Rocket className="h-4 w-4" />
                Book Your Introductory Call
              </a>
              <p className="mt-6 text-sm text-muted-foreground">
                Dave Connolly · Founder, Lacuna Digital · lacunadigital.io
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* footer bar */}
      <footer className="border-t border-border/30 px-6 py-8 text-center text-xs text-muted-foreground">
        Confidential — Prepared by Lacuna Digital for The Printed Image
      </footer>
    </div>
  );
};

export default TPIProposal;
