import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
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

const MarshInternalTooling = () => {
  const project = projects.find((p) => p.id === "marsh-internal-tooling");
  const nextProject = project?.nextProject
    ? projects.find((p) => p.id === project.nextProject)
    : null;

  return (
    <main className="pt-24 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="px-6 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/work"
              className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary"
            >
              ← Back to Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-2 font-mono-label text-muted-foreground">
              <span>Marsh</span>
              <span className="text-border">|</span>
              <span>Product Design · Design Systems · AI-Led Workflow</span>
            </div>
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              Marsh Internal Tooling
            </h1>
            <p className="mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Three enterprise internal tools designed and shipped simultaneously —
              powered by an AI-accelerated workflow and a unified component library.
            </p>
            <img src="/images/work/marsh-logo-white.png" alt="Marsh" className="h-6 mb-4 brightness-0 dark:brightness-100 max-w-full" />
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono-label text-xs text-muted-foreground">
              <span>
                <span className="uppercase tracking-wider">Role:</span>{" "}
                <span className="text-foreground">Freelance Product Designer</span>
              </span>
              <span>
                <span className="uppercase tracking-wider">Deliverable:</span>{" "}
                <span className="text-foreground">3 Products + Design System</span>
              </span>
            </div>
            <img src="/images/work/marsh-tools.webp" alt="Tools: Figma, Claude, Lovable, Storybook" className="mt-4 h-8 brightness-0 dark:brightness-100 max-w-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. PROJECT OVERVIEW */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>The Brief</SectionLabel>
            <div className="max-w-3xl space-y-4">
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                Contracted to Marsh via Expleo to design and ship three internal enterprise tools
                in parallel — a Colleague Profile & Work Queue, a Client Milestones tracker, and
                a Notifications Hub. Working across all three products simultaneously, the engagement
                demanded a single, scalable design system to ensure consistency at pace.
              </p>
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                Rather than treating each product in isolation, I built CORE — a shared component
                library of tokens, patterns, and UI components designed to serve all three products
                and scale across Marsh's wider digital estate.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VIDEO SHOWREEL */}
      <section className="px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="overflow-hidden rounded-xl border border-border">
              <video
                src="https://raw.githubusercontent.com/DaithiOCheallaigh/lacuna/main/assets/MarshInternalTools.mp4"
                controls
                playsInline
                muted
                autoPlay
                loop
                className="w-full"
                poster=""
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. PRODUCT SHOWCASE — THREE LIVE PROTOTYPE EMBEDS */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Live Prototypes</SectionLabel>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 overflow-hidden">
            {products.map((product, i) => (
              <ScrollReveal key={product.num} delay={i * 0.1} distance={0}>
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm md:transition-transform md:duration-200 md:ease-out md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-primary/5">
                  {/* Numbered label */}
                  <div className="px-5 pt-5">
                    <span className="font-mono-label text-xs text-muted-foreground">
                      {product.num}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="px-5 pb-4">
                    <h3 className="mt-1 text-lg font-bold text-foreground">{product.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                  </div>

                  {/* Product image */}
                  <div className="relative mx-3 mb-3 overflow-hidden rounded-lg border border-border aspect-[16/10] max-w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover object-top block"
                      loading="lazy"
                    />
                  </div>

                  {/* View Prototype link */}
                  <div className="mt-auto px-5 pb-5">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      View Prototype <span>→</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE CORE DESIGN SYSTEM */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>CORE — A Shared Design System</SectionLabel>
            <p className="mb-8 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground">
              To move quickly without sacrificing consistency, I built CORE — a token-based
              component library spanning buttons, forms, data tables, navigation patterns, status
              indicators, and notification primitives. Designed in Figma, documented in Storybook,
              and built to serve all three products simultaneously — with enough rigour to scale
              across Marsh's broader product estate.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <a
              href="https://daithiocheallaigh.github.io/MarshDesign//?path=/docs/components-button--docs"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                <span className="font-mono-label mb-1 block text-xs text-muted-foreground">
                  Explore the Component Library
                </span>
                <span className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  CORE Design System — Storybook Documentation
                </span>
              </div>
              <ArrowRight
                size={24}
                className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* AI Architecture Animation */}
      <section className="px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="flex justify-center">
              <CpuArchitecture text="AI" className="max-w-2xl" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. APPROACH — HOW I WORKED */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>AI-Led Design at Enterprise Scale</SectionLabel>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {approaches.map((col, i) => (
              <ScrollReveal key={col.num} delay={i * 0.08}>
                <div>
                  <span className="font-mono-label mb-2 block text-xs text-muted-foreground">
                    {col.num}
                  </span>
                  <h3 className="mb-3 text-lg font-bold text-foreground">{col.title}</h3>
                  <p className="text-[15px] leading-[1.7] text-muted-foreground">{col.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUTCOMES */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Outcomes</SectionLabel>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <span className="block text-5xl font-black tracking-tighter text-foreground md:text-6xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEXT PROJECT NAVIGATION */}
      {nextProject && (
        <section className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <Link
                to={`/case/${nextProject.id}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div>
                  <span className="font-mono-label mb-1 block text-xs text-muted-foreground">
                    Next Project
                  </span>
                  <span className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight
                  size={24}
                  className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>
  );
};

export default MarshInternalTooling;
