import { imgDims } from "@/data/imageDimensions";
import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import CaseImage from "../components/CaseImage";
import { CaseBlock, CaseHero, CaseSection, CardGrid, MediaGroup, NextProject, ToolsList, Prose, Reflection, StatGrid } from "../components/case-study/CaseLayout";
const coreImages = [
  { src: "/images/work/marsh-core.webp", alt: "CORE component overview" },
  { src: "/images/work/marsh-storybook-buttons.png", alt: "Button variants documented in Storybook" },
  { src: "/images/work/marsh-storybook-colours.png", alt: "CORE colour tokens in Storybook" },
  { src: "/images/work/marsh-storybook-prototype.png", alt: "A prototype assembled from CORE components" },
];
import HiringCTA from "../components/HiringCTA";
import { SEO } from "@/components/SEO";
import { projects } from "../data/projects";
import { CpuArchitecture } from "../components/ui/cpu-architecture";

const products = [
  {
    num: "01",
    name: "Colleague Profile",
    description: "Work queue and client onboarding tool for relationship managers.",
    image: "/images/work/marsh-colleague-profile.webp",
    link: "https://precise-ui-wonder.lovable.app/work-item/1001234567",
  },
  {
    num: "02",
    name: "Client Milestones",
    description: "Milestone tracking and timeline visibility for client engagements.",
    image: "/images/work/marsh-client-milestones.webp",
    link: "https://figma-to-reality-express.lovable.app/milestones",
  },
  {
    num: "03",
    name: "Notifications Hub",
    description: "Centralised notification management across applications and channels.",
    image: "/images/work/marsh-notifications-hub.webp",
    link: "https://notify-flow-91.lovable.app/",
  },
];

const approaches = [
  {
    num: "01",
    title: "AI-Accelerated Prototyping",
    text: "I embedded Claude and Lovable directly into my design workflow to compress concept-to-prototype cycles. LLM-assisted ideation and rapid prototyping meant I could explore, evaluate, and validate ideas at a pace that wasn't previously possible.",
  },
  {
    num: "02",
    title: "Design System as Foundation",
    text: "I built and maintained the CORE component library across the full engagement — tokens, components, and UX copy standards deployed across all three products from day one. Consistency wasn't retrofitted; it was the starting point.",
  },
  {
    num: "03",
    title: "Figma × Claude MCP",
    text: "I implemented Claude MCP connected to Figma, bringing AI-generated prototypes back into the design file. This improved design-system fidelity, made developer handoff cleaner, and kept the broader team aligned without additional process overhead.",
  },
];

const stats = [
  { value: "3", label: "Products designed and shipped in parallel" },
  { value: "1", label: "Unified design system serving all products" },
  { value: "↑", label: "Exponential reduction in concept-to-prototype cycle time" },
];

const PrototypeLink = ({ href }: { href: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
    }
  };

  return (
    <div className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
      >
        View Prototype <span>→</span>
      </a>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-full left-0 mb-2 rounded-lg bg-foreground px-3 py-1.5 text-sm text-background shadow-lg whitespace-nowrap"
        >
          Web only I'm afraid 😌
        </motion.div>
      )}
    </div>
  );
};

const MarshInternalTooling = () => {
  const project = projects.find((p) => p.id === "marsh-internal-tooling");

  return (
    <main className="overflow-x-hidden pt-24">
      <SEO title="Marsh Internal Tooling" description="Three Marsh internal enterprise tools designed and shipped in parallel by Dave Kelly, using an AI-accelerated workflow and the shared CORE component library." image={`https://www.lacunadigital.io${project?.pillImage ?? "/images/work/marsh-core.webp"}`} />

      <CaseHero
        client={<img src="/images/work/marsh-logo-new-white.png" alt="Marsh" className="no-lightbox h-6 w-auto max-w-full brightness-0 dark:brightness-100" {...imgDims("/images/work/marsh-logo-new-white.png")} loading="eager" decoding="async" />}
        title="Marsh Internal Tooling"
        summary="Three enterprise internal tools designed and shipped simultaneously — powered by an AI-accelerated workflow and a unified component library."
        meta={[
          { label: "Role", value: "Freelance Product Designer" },
          { label: "Timeline", value: project?.timeline ?? "Ongoing" },
          { label: "Tools", value: <ToolsList tools={project?.tools ?? []} />, wide: (project?.tools?.length ?? 0) > 4 },
        ]}
        media={
          <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card">
            <video
              src="https://raw.githubusercontent.com/DaithiOCheallaigh/lacuna/main/Desktop/Dev/LacunaPortfolioSite/images/Marsh%20Internatl%20Tooling/MarshInternalTools.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              width={1920}
              height={1080}
              aria-label="Showreel of the three Marsh internal tools"
              className="block h-full w-full object-contain"
              poster="/images/work/marsh-internal-tools-poster.webp"
            />
          </div>
        }
      />

      <CaseSection label="Overview">
        <CaseBlock title="What it is">
          <Prose text="Contracted to Marsh via Expleo: a Colleague Profile & Work Queue, a Client Milestones tracker and a Notifications Hub." />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="The Challenge">
        <CaseBlock>
          <Prose text="Designing three products at once meant consistency had to come from one scalable system, not from coordination." />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Exploration & Approach">
        <CaseBlock title="AI-led design at enterprise scale">
          <Prose text="Rather than treating each product in isolation, I built CORE — a shared component library of tokens, patterns, and UI components designed to serve all three products and scale across Marsh's wider digital estate." />
          <div className="mt-8">
            <CardGrid items={approaches.map((a) => ({ eyebrow: a.num, title: a.title, desc: a.text }))} />
          </div>
        </CaseBlock>
        <ScrollReveal>
          <div className="flex justify-center">
            <CpuArchitecture text="AI" className="max-w-2xl" />
          </div>
        </ScrollReveal>
      </CaseSection>

      <CaseSection label="The Solution">
        {products.map((product, i) => (
          <CaseBlock key={product.num} media={<CaseImage src={product.image} alt={`${product.name} screen`} />} flip={i % 2 === 1}>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
              <div>
                <span className="font-mono-label text-xs text-primary">{product.num}</span>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground md:text-2xl">{product.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">{product.description}</p>
              </div>
              <PrototypeLink href={product.link} />
            </div>
          </CaseBlock>
        ))}
        <CaseBlock title="CORE — a shared design system">
          <Prose text="To move quickly without sacrificing consistency, I built CORE — a token-based component library spanning buttons, forms, data tables, navigation patterns, status indicators, and notification primitives. Designed in Figma, documented in Storybook, and built to serve all three products simultaneously — with enough rigour to scale across Marsh's broader product estate." />
          <div className="mt-8">
            <MediaGroup items={coreImages} />
          </div>
          <a
            href="https://daithiocheallaigh.github.io/MarshDesign//?path=/docs/components-button--docs"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors md:hover:border-primary/40"
          >
            <div className="min-w-0">
              <span className="mb-1 block font-mono-label text-xs text-muted-foreground">Explore the Component Library</span>
              <span className="text-lg font-bold text-foreground transition-colors md:group-hover:text-primary">CORE Design System — Storybook Documentation</span>
            </div>
            <ArrowRight size={24} className="shrink-0 text-muted-foreground transition-colors md:group-hover:text-primary" />
          </a>
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Outcome & Reflection">
        <ScrollReveal>
          <StatGrid stats={stats} />
        </ScrollReveal>
        <Reflection text="Consistency wasn't retrofitted; it was the starting point. Building one shared system first, then pairing Claude and Lovable with a Figma MCP loop, is what made it possible to design and ship three products in parallel." />
      </CaseSection>

      <NextProject currentId="marsh-internal-tooling" />

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <HiringCTA />
    </main>
  );
};

export default MarshInternalTooling;
