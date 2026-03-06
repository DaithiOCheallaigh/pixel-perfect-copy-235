import { Link } from "react-router-dom";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { motion } from "framer-motion";
import {
  Cpu,
  SearchNormal1,
  Kanban,
  Brush,
  Code,
  Chart,
  Routing,
} from "iconsax-react";
import ScrollReveal from "@/components/ScrollReveal";
import AvailabilityCTA from "@/components/AvailabilityCTA";
import SectionLabel from "@/components/SectionLabel";
import claudeLogo from "@/assets/logos/claude.png";
import notionLogo from "@/assets/logos/notion.png";
import lovableLogo from "@/assets/logos/lovable.png";
import figmaLogo from "@/assets/logos/figma.svg";
import aiSystemImg from "@/assets/images/ai-system-2.webp";

const steps = [
  {
    num: "01",
    icon: <Routing size="36" variant="TwoTone" />,
    heading: "New & Existing Products",
    body: "The process is designed to work across both greenfield builds and established products needing improvement. Whether you're validating a new idea or evolving a live product, the same structured approach applies — ensuring nothing is skipped and every decision is informed.",
    tag: "Universal Methodology",
  },
  {
    num: "02",
    icon: <Cpu size="36" variant="TwoTone" />,
    heading: "AI-Powered Toolstack",
    body: "Every step of this process is accelerated by a curated set of tools: Claude for research synthesis and documentation, Notion for knowledge management and sprint planning, Lovable for rapid product prototyping, and Figma for component design and visual systems.",
    tag: "Claude · Notion · Lovable · Figma",
  },
  {
    num: "03",
    icon: <SearchNormal1 size="36" variant="TwoTone" />,
    heading: "Requirements Gathering, Heuristic Review & Vertical Context",
    body: "Before any design work begins, we establish a full picture of the problem space. This includes a structured requirements gathering session, a heuristic evaluation of any existing product, and deep research into the competitive vertical — giving us the context to design with confidence and direction.",
    tag: "Discovery",
  },
  {
    num: "04",
    icon: <Chart size="36" variant="TwoTone" />,
    heading: "Roadmap & Gantt Planning",
    body: "With requirements defined, we build a clear project roadmap using a Gantt chart structure. This maps deliverables across time, surfaces dependencies, and gives stakeholders full visibility into timeline and scope — keeping the project grounded in reality from day one.",
    tag: "Project Management",
  },
  {
    num: "05",
    icon: <Kanban size="36" variant="TwoTone" />,
    heading: "Kanban Methodology",
    body: "Day-to-day delivery is managed through a Kanban board in Notion. Tasks flow from backlog to in-progress to done in transparent, manageable cycles. This keeps the team aligned, surfaces blockers early, and ensures consistent forward momentum without the overhead of rigid sprint ceremonies.",
    tag: "Agile Delivery",
  },
  {
    num: "06",
    icon: <Brush size="36" variant="TwoTone" />,
    heading: "Tokenised Design System & Brand Identity",
    body: "All visual output is grounded in a tokenised design system — colours, typography, spacing, and components are defined as reusable tokens in Figma. This ensures visual consistency at scale, accelerates handoff, and makes brand evolution effortless when the product grows.",
    tag: "Design Systems",
  },
  {
    num: "07",
    icon: <Code size="36" variant="TwoTone" />,
    heading: "Systematic Build: Userflows, Components & Deployment",
    body: "With a design system in place, we build systematically — mapping every user flow, constructing reusable components, and assembling screens with precision. Lovable accelerates the build phase dramatically, turning design into a live, deployable product without sacrificing quality or structure.",
    tag: "Build & Deploy",
  },
  {
    num: "08",
    icon: <Chart size="36" variant="TwoTone" />,
    heading: "Analytical Observation & Iterative Design",
    body: "Post-launch, the process doesn't stop. Analytics tools surface real user behaviour, which feeds directly back into the design cycle. Each iteration is informed by data — not assumptions — allowing the product to evolve continuously and improve with every release.",
    tag: "Analytics · Iteration",
  },
];

const tools = [
  { name: "Claude", logo: claudeLogo },
  { name: "Notion", logo: notionLogo },
  { name: "Lovable", logo: lovableLogo },
  { name: "Figma", logo: figmaLogo },
];

const AIDesignProcess = () => {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative px-6 py-20 md:px-12 lg:px-24">
        <GlowingStarsBackgroundCard className="absolute inset-0">
          <span />
        </GlowingStarsBackgroundCard>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <div className="mb-6 flex justify-center text-primary">
              <Cpu size="48" variant="TwoTone" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                AI-Led Design
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              An end-to-end process for building better products — faster. Combining AI tooling, structured research, and systematic design to take ideas from discovery to launch.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-center gap-3">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                New Products
              </span>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Existing Products
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tools Strip */}
      <section className="border-y border-border px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6">
          <span className="font-mono-label text-muted-foreground">Tools Used</span>
          {tools.map((tool) => (
            <span
              key={tool.name}
              className="inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground"
            >
              <img src={tool.logo} alt={tool.name} className="h-5 w-5 object-contain" />
              {tool.name}
            </span>
          ))}
        </div>
      </section>

      {/* Steps — bento grid */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>The Process</SectionLabel>
          </ScrollReveal>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {steps.map((step, i) => {
              // Alternate which column gets the "tall" card
              // Row 0: left tall (span 2 rows), right short
              // Row 1: left short, right tall (span 2 rows)
              const rowPair = Math.floor(i / 2);
              const isLeft = i % 2 === 0;
              const isTall = rowPair % 2 === 0 ? isLeft : !isLeft;

              return (
                <ScrollReveal key={step.num} delay={i * 0.04}>
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 md:p-8 ${
                      isTall ? "md:row-span-2 justify-between" : "justify-between"
                    }`}
                  >
                    {/* Background step number */}
                    <span className="pointer-events-none absolute -bottom-4 right-6 select-none text-[120px] font-extrabold leading-none text-foreground/[0.04]">
                      {step.num}
                    </span>

                    {/* Top: tag + icon */}
                    <div>
                      <span className="font-mono-label mb-4 block text-primary">
                        {step.tag}
                      </span>
                      <h3 className="mb-3 text-lg font-extrabold tracking-tight text-foreground md:text-xl">
                        {step.heading}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>

                    {/* Bottom: icon badge */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        {step.icon}
                      </div>
                      <span className="font-mono-label text-muted-foreground/40 text-xs">
                        Step {step.num}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border px-6 py-24 md:px-12 lg:px-24 overflow-hidden">
        <GlowingStarsBackgroundCard className="absolute inset-0">
          <span />
        </GlowingStarsBackgroundCard>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              AI Systems, Working in Sync
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-10 text-lg text-muted-foreground">
              Every tool connected. Every step informed. One unified process.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <img
              src={aiSystemImg}
              alt="AI system architecture diagram showing interconnected tools"
              className="mx-auto w-full max-w-sm"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mt-10 mb-4 text-sm font-semibold text-foreground">
              Projects built using this process
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/work/marsh-internal-tooling"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                Marsh Internal Tooling →
              </Link>
              <Link
                to="/work/marsh-design-system"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                Marsh Design System Rebrand →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AvailabilityCTA />
    </main>
  );
};

export default AIDesignProcess;
