import { useEffect } from "react";
import {
  Category2,
  Cpu,
  SearchNormal1,
  Calendar,
  RowVertical,
  ColorFilter,
  Code1,
  ChartSquare,
} from "iconsax-react";
import HeroSection from "@/components/ai-process/HeroSection";
import IconStrip from "@/components/ai-process/IconStrip";
import ProcessCard from "@/components/ai-process/ProcessCard";
import SyncSection from "@/components/ai-process/SyncSection";
import AvailabilityCTA from "@/components/AvailabilityCTA";
import FloatingPills from "@/components/ai-process/visuals/FloatingPills";
import ToolGrid from "@/components/ai-process/visuals/ToolGrid";
import DiscoveryDoc from "@/components/ai-process/visuals/DiscoveryDoc";
import GanttChart from "@/components/ai-process/visuals/GanttChart";
import KanbanBoard from "@/components/ai-process/visuals/KanbanBoard";
import TokenPalette from "@/components/ai-process/visuals/TokenPalette";
import BuildFrame from "@/components/ai-process/visuals/BuildFrame";
import LineChart from "@/components/ai-process/visuals/LineChart";

const steps = [
  {
    eyebrow: "Universal Methodology",
    heading: "The process works for both new and existing products",
    body: "Whether you're validating a fresh idea or improving a live product, the same structured methodology applies — nothing is skipped and every decision is informed by research and context.",
    icon: <Category2 size={22} variant="TwoTone" color="#F471B5" />,
    visual: <FloatingPills />,
    layout: "A" as const,
  },
  {
    eyebrow: "AI-Powered Toolstack",
    heading: "Every step accelerated by a curated set of AI tools",
    body: "Claude for research synthesis and documentation, Notion for knowledge management and sprint planning, Lovable for rapid product prototyping, and Figma for component design and visual systems.",
    icon: <Cpu size={22} variant="TwoTone" color="#F471B5" />,
    visual: <ToolGrid />,
    layout: "B" as const,
  },
  {
    eyebrow: "Discovery",
    heading: "Expedite requirements gathering and competitive research",
    body: "Before any design work begins, we establish a full picture of the problem space — structured requirements sessions, heuristic evaluation of existing products, and deep research into the competitive vertical.",
    icon: <SearchNormal1 size={22} variant="TwoTone" color="#F471B5" />,
    visual: <DiscoveryDoc />,
    layout: "A" as const,
  },
  {
    eyebrow: "Project Management",
    heading: "Clear project roadmaps mapped across time",
    body: "With requirements defined, we build a structured project roadmap using a Gantt chart layout. This surfaces dependencies, maps deliverables across time, and gives stakeholders full visibility into scope from day one.",
    icon: <Calendar size={22} variant="TwoTone" color="#F471B5" />,
    visual: <GanttChart />,
    layout: "B" as const,
  },
  {
    eyebrow: "Agile Delivery",
    heading: "Day-to-day delivery through Kanban in Notion",
    body: "Tasks flow from backlog to in-progress to done in transparent, manageable cycles. Blockers surface early and forward momentum stays consistent without the overhead of rigid sprint ceremonies.",
    icon: <RowVertical size={22} variant="TwoTone" color="#F471B5" />,
    visual: <KanbanBoard />,
    layout: "A" as const,
  },
  {
    eyebrow: "Design Systems",
    heading: "All visual output grounded in a tokenised design system",
    body: "Colours, typography, spacing, and components defined as reusable tokens in Figma. This ensures visual consistency at scale, accelerates handoff, and makes brand evolution effortless as the product grows.",
    icon: <ColorFilter size={22} variant="TwoTone" color="#F471B5" />,
    visual: <TokenPalette />,
    layout: "B" as const,
  },
  {
    eyebrow: "Build & Deploy",
    heading: "Systematic build — user flows, components, live deployment",
    body: "With a design system in place, we build systematically — mapping every user flow, constructing reusable components, and assembling screens with precision. Lovable accelerates the build phase dramatically.",
    icon: <Code1 size={22} variant="TwoTone" color="#F471B5" />,
    visual: <BuildFrame />,
    layout: "A" as const,
  },
  {
    eyebrow: "Analytics · Iteration",
    heading: "Post-launch, the process evolves with real user data",
    body: "Analytics tools surface real user behaviour, which feeds directly back into the design cycle. Each iteration is informed by data — not assumptions — allowing the product to evolve continuously with every release.",
    icon: <ChartSquare size={22} variant="TwoTone" color="#F471B5" />,
    visual: <LineChart />,
    layout: "B" as const,
  },
];

const AIDesignProcess = () => {
  useEffect(() => {
    document.title = "AI-Led Design Process | Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "An end-to-end AI-led design process for building better digital products — faster. Discovery to launch using Claude, Notion, Lovable, and Figma.");
    }
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#07060B" }}>
      <div className="pt-24">
        <HeroSection />
        <IconStrip />

        {/* Process cards */}
        <section className="px-6 py-16 md:px-12 lg:px-24" style={{ background: "#0E0C14" }}>
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            {steps.map((step) => (
              <ProcessCard key={step.eyebrow} {...step} />
            ))}
          </div>
        </section>

        <SyncSection />
        <AvailabilityCTA />
      </div>
    </main>
  );
};

export default AIDesignProcess;
