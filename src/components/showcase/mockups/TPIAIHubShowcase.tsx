import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Sparkles,
  Users,
  FileText,
  Leaf,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Send,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal wrapper (local, no external lib)                     */
/* ------------------------------------------------------------------ */
const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */
const Section = ({
  id,
  dark = true,
  children,
  className = "",
}: {
  id?: string;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`w-full px-6 py-20 md:py-28 ${dark ? "bg-[#0a0a0a]" : "bg-[#111]"} ${className}`}
  >
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Capability pills                                                   */
/* ------------------------------------------------------------------ */
const Pills = ({ items }: { items: string[] }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {items.map((t) => (
      <span
        key={t}
        className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-300"
      >
        {t}
      </span>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Mock UI building blocks                                            */
/* ------------------------------------------------------------------ */
const MockCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-xl border border-white/10 bg-white/[0.03] p-4 ${className}`}
  >
    {children}
  </div>
);

const StatCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) => (
  <MockCard className="text-center">
    <div className={`mx-auto mb-1 h-2 w-2 rounded-full ${color}`} />
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-white/50">{label}</p>
  </MockCard>
);

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */
const Hero = () => (
  <section className="relative flex min-h-[80vh] w-full items-center overflow-hidden bg-[#0a0a0a] px-6">
    {/* Animated rings */}
    <div className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 md:block">
      {[220, 300, 380, 460].map((s, i) => (
        <div
          key={s}
          className="absolute rounded-full border border-pink-500/20"
          style={{
            width: s,
            height: s,
            top: `calc(50% - ${s / 2}px)`,
            left: `calc(50% - ${s / 2}px)`,
            animation: `pulse ${3 + i * 0.6}s ease-in-out infinite alternate`,
            opacity: 0.15 + i * 0.08,
          }}
        />
      ))}
      {/* Centre dot */}
      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500"
        style={{ boxShadow: "0 0 24px 6px rgba(236,72,153,0.35)" }}
      />
      <style>{`@keyframes pulse{0%{transform:scale(1);opacity:0.12}100%{transform:scale(1.06);opacity:0.22}}`}</style>
    </div>

    <div className="relative z-10 mx-auto max-w-6xl py-32">
      <Reveal>
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-pink-400">
          Case Study — The Printed Image
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          Five&nbsp;Modules.
          <br />
          One&nbsp;Intelligence&nbsp;Layer.
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
          A connected AI operations hub built on top of existing systems —
          turning 30&nbsp;years of print industry data into competitive
          advantage.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-6 flex gap-3">
          <Badge className="border-pink-500/30 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20">
            AI Integration
          </Badge>
          <Badge className="border-pink-500/30 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20">
            Data Engineering
          </Badge>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  2. HUB & SPOKE                                                     */
/* ------------------------------------------------------------------ */
const SPOKES = [
  { id: "mod-1", num: "01", label: "Estimating AI", icon: Sparkles, angle: -90 },
  { id: "mod-2", num: "02", label: "CRM Intelligence", icon: Users, angle: -18 },
  { id: "mod-3", num: "03", label: "Invoice Automation", icon: FileText, angle: 54 },
  { id: "mod-4", num: "04", label: "Sustainability Engine", icon: Leaf, angle: 126 },
  { id: "mod-5", num: "05", label: "Client Chatbot", icon: MessageCircle, angle: 198 },
];

const HubSpoke = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const R = 200; // radius

  return (
    <Section id="architecture">
      <Reveal>
        <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
          The Architecture
        </h2>
      </Reveal>

      {/* Desktop radial */}
      <div className="relative mx-auto my-16 hidden aspect-square max-w-[520px] md:block">
        {/* Orbit ring */}
        <div className="absolute inset-[40px] rounded-full border border-white/10" />

        {/* Centre node */}
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#A3122A] bg-[#0a0a0a]"
            style={{
              boxShadow: "0 0 30px 8px rgba(163,18,42,0.3)",
              animation: "hubPulse 2.5s ease-in-out infinite",
            }}
          >
            <Database className="h-8 w-8 text-pink-400" />
          </div>
          <span className="text-xs font-bold text-white">Primo SQL Database</span>
          <span className="text-[10px] text-white/40">The Data Core</span>
          <style>{`@keyframes hubPulse{0%,100%{box-shadow:0 0 20px 4px rgba(163,18,42,0.25)}50%{box-shadow:0 0 40px 12px rgba(163,18,42,0.45)}}`}</style>
        </div>

        {/* Spokes */}
        {SPOKES.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const cx = 50 + (R / 260) * 50 * Math.cos(rad);
          const cy = 50 + (R / 260) * 50 * Math.sin(rad);
          const Icon = s.icon;
          return (
            <div key={s.id}>
              {/* Dashed line */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="50"
                  y1="50"
                  x2={cx}
                  y2={cy}
                  stroke="rgba(236,72,153,0.25)"
                  strokeWidth="0.3"
                  strokeDasharray="1.5 1"
                  style={{
                    strokeDashoffset: loaded ? 0 : 40,
                    transition: `stroke-dashoffset 1s ease ${0.3 + i * 0.15}s`,
                  }}
                />
              </svg>
              {/* Node */}
              <button
                onClick={() => scrollTo(s.id)}
                className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-transform hover:scale-110"
                style={{ left: `${cx}%`, top: `${cy}%` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-pink-500/30 bg-[#0a0a0a] transition-colors group-hover:border-pink-500 group-hover:bg-pink-500/10">
                  <Icon className="h-5 w-5 text-pink-400" />
                </div>
                <span className="whitespace-nowrap text-[10px] font-semibold text-white/70 group-hover:text-white">
                  {s.num} {s.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile list */}
      <div className="my-12 flex flex-col gap-3 md:hidden">
        {/* Centre */}
        <div className="flex items-center gap-3 rounded-xl border border-[#A3122A]/40 bg-[#A3122A]/10 p-4">
          <Database className="h-6 w-6 text-pink-400" />
          <div>
            <p className="text-sm font-bold text-white">Primo SQL Database</p>
            <p className="text-xs text-white/40">The Data Core</p>
          </div>
        </div>
        {SPOKES.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() =>
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-pink-500/40"
            >
              <Icon className="h-5 w-5 text-pink-400" />
              <span className="text-sm font-semibold text-white">
                {s.num} {s.label}
              </span>
              <ChevronRight className="ml-auto h-4 w-4 text-white/30" />
            </button>
          );
        })}
      </div>

      <Reveal>
        <p className="text-center text-sm text-white/50 md:text-base">
          Each module reads from the same data core. Every insight compounds.
        </p>
      </Reveal>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  3. MODULE SECTIONS                                                 */
/* ------------------------------------------------------------------ */

/* ---------- Module 01: Estimating AI ---------- */
const MockEstimating = () => (
  <MockCard>
    <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
      <Sparkles className="h-4 w-4 text-pink-400" />
      <span className="text-sm font-semibold text-white">Estimating Assistant</span>
    </div>
    <p className="mb-3 text-xs text-white/50">
      New Job: <span className="text-white/80">A2 Litho, 5,000 units, 4 colour</span>
    </p>
    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
      Comparable Jobs
    </p>
    <div className="mb-3 space-y-1">
      {[
        { id: "••••12", date: "Mar 24", match: 94, margin: "34%" },
        { id: "••••87", date: "Jan 24", match: 87, margin: "29%" },
        { id: "••••55", date: "Nov 23", match: 81, margin: "31%" },
      ].map((j) => (
        <div
          key={j.id}
          className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-white/60"
        >
          <span className="font-mono">{j.id}</span>
          <span>{j.date}</span>
          <span className="text-pink-300">{j.match}%</span>
          <span>{j.margin}</span>
        </div>
      ))}
    </div>
    <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
        <TrendingUp className="h-4 w-4" />
        Suggested range: €1,840 – €2,100
      </div>
    </div>
    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
      Estimate Conversion Rate — Last 90 Days
    </p>
    <div className="flex items-end gap-1 h-10">
      {[40, 55, 35, 60, 70, 50, 65, 75, 80, 60, 70, 85].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-pink-500/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </MockCard>
);

/* ---------- Module 02: CRM Intelligence ---------- */
const MockCRM = () => (
  <MockCard>
    <div className="mb-3 grid grid-cols-2 gap-2">
      <StatCard label="Active Clients" value={312} color="bg-green-400" />
      <StatCard label="At Risk" value={47} color="bg-amber-400" />
      <StatCard label="Lapsed" value={89} color="bg-red-400" />
      <StatCard label="High Value" value={24} color="bg-pink-400" />
    </div>
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
      Sales Prompts
    </p>
    <div className="space-y-2">
      {[
        {
          company: "Brown Thomas",
          note: "Last order 9 months ago. Seasonal print window opening.",
        },
        {
          company: "Lidl Ireland",
          note: "Estimate raised 14 days ago, not converted.",
        },
        {
          company: "Glanbia",
          note: "YoY spend down 32%. Re-engagement opportunity.",
        },
      ].map((p) => (
        <div
          key={p.company}
          className="flex items-start justify-between rounded-lg bg-white/[0.04] p-3"
        >
          <div>
            <p className="text-xs font-semibold text-white">{p.company}</p>
            <p className="text-[11px] text-white/50">{p.note}</p>
          </div>
          <button className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/50 transition-colors hover:text-white">
            View Client
          </button>
        </div>
      ))}
    </div>
  </MockCard>
);

/* ---------- Module 03: Invoice Automation ---------- */
const MockInvoice = () => {
  const stages = ["Received", "Extracted", "Matched", "Posted"];
  return (
    <MockCard>
      {/* Pipeline */}
      <div className="mb-4 flex items-center justify-between">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-bold text-pink-300">
                {i + 1}
              </div>
              <span className="mt-1 text-[9px] text-white/40">{s}</span>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="mx-1 h-3 w-3 text-white/20" />
            )}
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="mb-3 space-y-1">
        {[
          { supplier: "••••••", amount: "€4,210", po: "PO-8812", status: "Matched ✓", color: "bg-green-500/20 text-green-400" },
          { supplier: "••••••", amount: "€1,870", po: "PO-9104", status: "Matched ✓", color: "bg-green-500/20 text-green-400" },
          { supplier: "••••••", amount: "€3,455", po: "—", status: "Review Required", color: "bg-amber-500/20 text-amber-400" },
        ].map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-white/60"
          >
            <span className="w-16 font-mono">{r.supplier}</span>
            <span>{r.amount}</span>
            <span>{r.po}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.color}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-[11px] text-white/40">
        This week: <span className="text-white/60">34 processed automatically</span> · 2 exceptions flagged
      </p>
    </MockCard>
  );
};

/* ---------- Module 04: Sustainability ---------- */
const Gauge = ({
  label,
  value,
  estimated,
}: {
  label: string;
  value: number;
  estimated?: boolean;
}) => {
  const pct = Math.min(value / 150, 1) * 100;
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-24 w-24 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(rgba(236,72,153,0.5) ${pct * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
          border: estimated ? "2px dashed rgba(255,255,255,0.2)" : "2px solid rgba(236,72,153,0.25)",
        }}
      >
        <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-[#0a0a0a]">
          <span className="text-lg font-bold text-white">{value}</span>
          <span className="text-[9px] text-white/40">tCO₂e</span>
        </div>
      </div>
      <span className="mt-2 text-xs font-semibold text-white/60">{label}</span>
      {estimated && (
        <span className="mt-0.5 rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] text-amber-300">
          Estimated
        </span>
      )}
    </div>
  );
};

const MockSustainability = () => (
  <MockCard>
    <div className="mb-5 flex justify-around">
      <Gauge label="Scope 1" value={12.4} />
      <Gauge label="Scope 2" value={38.1} />
      <Gauge label="Scope 3" value={94.7} estimated />
    </div>
    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
      YTD vs. Target
    </p>
    <div className="mb-1 flex items-center gap-2">
      <Progress value={68} className="h-2 flex-1 bg-white/10 [&>div]:bg-green-500" />
      <span className="text-xs text-green-400">On Track</span>
    </div>
    <div className="mt-4 text-right">
      <button className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white">
        Export Report
      </button>
    </div>
  </MockCard>
);

/* ---------- Module 05: Client Chatbot ---------- */
const MockChatbot = () => (
  <MockCard className="flex flex-col p-0 overflow-hidden">
    {/* Header */}
    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
      <MessageCircle className="h-4 w-4 text-pink-400" />
      <span className="text-sm font-semibold text-white">TPI Assistant</span>
      <span className="ml-1 h-2 w-2 rounded-full bg-green-400" />
    </div>
    {/* Messages */}
    <div className="flex flex-col gap-3 p-4">
      {/* User */}
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-pink-500/20 px-4 py-2 text-xs text-white/80">
        Hi, can you check the status of our Lidl point of sale order?
      </div>
      {/* Bot */}
      <div className="mr-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-2 text-xs text-white/70">
        Your order (Job #TPI-44821) is currently in finishing. Estimated dispatch: Thursday 10th April.
      </div>
      {/* User */}
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-pink-500/20 px-4 py-2 text-xs text-white/80">
        Can you resend the invoice for that job?
      </div>
      {/* Bot */}
      <div className="mr-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-2 text-xs text-white/70">
        Invoice #INV-2024-1847 has been sent to your registered email address. Anything else?
      </div>
    </div>
    {/* Input */}
    <div className="border-t border-white/10 px-4 py-3">
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2">
        <span className="flex-1 text-xs text-white/30">
          Ask about your jobs, invoices or deliveries…
        </span>
        <Send className="h-3.5 w-3.5 text-white/20" />
      </div>
    </div>
  </MockCard>
);

/* ------------------------------------------------------------------ */
/*  Module section template                                            */
/* ------------------------------------------------------------------ */
const MODULES = [
  {
    id: "mod-1",
    num: "01",
    name: "AI Estimating Assistant",
    body: "Reads historical job data from Primo to surface comparable past jobs when a new estimate is being built. Suggests pricing ranges, flags margin risk, and tracks estimate-to-conversion rates in real time.",
    pills: ["Pricing Intelligence", "Win/Loss Reporting", "Automated Delivery"],
    Mock: MockEstimating,
  },
  {
    id: "mod-2",
    num: "02",
    name: "CRM Intelligence Engine",
    body: "Analyses purchase history, spend trends, and recency across 500+ active clients to deliver automated sales prompts and segment-level targeting — without a single Excel export.",
    pills: ["Client Segmentation", "Automated Prompts", "Pipeline Reporting"],
    Mock: MockCRM,
  },
  {
    id: "mod-3",
    num: "03",
    name: "Invoice Automation",
    body: "Monitors incoming purchase invoices, extracts key fields via document intelligence, matches them against open POs in Primo, and routes matched records to Sage for processing. Exceptions only reach a human.",
    pills: ["OCR Extraction", "PO Matching", "Sage Integration"],
    Mock: MockInvoice,
  },
  {
    id: "mod-4",
    num: "04",
    name: "Sustainability Reporting Engine",
    body: "Aggregates Scope 1, 2, and 3 emissions data from Primo purchase records and utility inputs, applies GHG Protocol emission factors, and generates EcoVadis-ready reports automatically.",
    pills: ["Scope 1 & 2 Automated", "Scope 3 Approximation", "EcoVadis Ready"],
    Mock: MockSustainability,
  },
  {
    id: "mod-5",
    num: "05",
    name: "Client AI Chatbot",
    body: "A RAG-powered assistant connected to live Primo job data. Deployed on-site and via email. Clients get instant answers on job status, delivery, and invoices — without touching the account management team.",
    pills: ["Live Job Queries", "Email Integration", "Escalation Routing"],
    Mock: MockChatbot,
  },
];

const ModuleSection = ({
  mod,
  dark,
}: {
  mod: (typeof MODULES)[number];
  dark: boolean;
}) => (
  <Section id={mod.id} dark={dark}>
    <div className="grid gap-10 md:grid-cols-2 md:items-start">
      {/* Description */}
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
          Module {mod.num}
        </span>
        <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          {mod.name}
        </h3>
        <p className="mt-4 leading-relaxed text-white/60">{mod.body}</p>
        <Pills items={mod.pills} />
      </Reveal>
      {/* Mock UI */}
      <Reveal delay={0.15}>
        <mod.Mock />
      </Reveal>
    </div>
  </Section>
);

/* ------------------------------------------------------------------ */
/*  4. COMPOUND SECTION                                                */
/* ------------------------------------------------------------------ */
const CONNECTIONS = [
  {
    a: "Estimating AI",
    b: "CRM Intelligence",
    text: "Estimates that don't convert are automatically flagged to the sales team with context on why — and what to try next.",
  },
  {
    a: "Invoice Automation",
    b: "Sustainability Engine",
    text: "Every supplier invoice processed feeds the Scope 3 model automatically. No manual data entry required.",
  },
  {
    a: "CRM Intelligence",
    b: "Client Chatbot",
    text: "The chatbot knows which clients are high value and routes their queries to account managers automatically.",
  },
];

const CompoundSection = () => (
  <Section dark>
    <Reveal>
      <h2 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
        More Than the Sum of Their Parts
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-white/50">
        Each module creates value independently. Connected, they create a
        feedback loop that gets smarter over time.
      </p>
    </Reveal>

    <div className="grid gap-6 md:grid-cols-3">
      {CONNECTIONS.map((c, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <div className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-pink-300">
              {c.a}
              <ArrowRight className="h-4 w-4 text-white/30" />
              {c.b}
            </div>
            <p className="text-sm leading-relaxed text-white/50">{c.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

/* ------------------------------------------------------------------ */
/*  5. FOOTER CTA                                                      */
/* ------------------------------------------------------------------ */
const FooterCTA = () => (
  <section className="w-full bg-[#0a0a0a] px-6 py-20">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <Reveal>
        <p className="text-lg text-white/60 md:text-xl">
          Interested in what this could look like for your business?
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-600"
        >
          Talk to Lacuna Digital
          <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
const TPIAIHubShowcase = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white">
    <Hero />
    <HubSpoke />
    {MODULES.map((mod, i) => (
      <ModuleSection key={mod.id} mod={mod} dark={i % 2 === 0} />
    ))}
    <CompoundSection />
    <FooterCTA />
  </div>
);

export default TPIAIHubShowcase;
