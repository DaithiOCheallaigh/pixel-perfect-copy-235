import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { projects } from "../data/projects";
import claudeLogo from "@/assets/logos/claude.png";

const approaches = [
  {
    num: "01",
    title: "Brand Token Translation",
    text: "Marsh's updated brand guidelines arrived as a PDF — new colours, type ramps, spacing rules, and iconography. I translated every token into design-system variables, ensuring the rebrand propagated across all existing components without visual regression.",
  },
  {
    num: "02",
    title: "Claude-Accelerated Buildout",
    text: "Using Claude as a pair-programming partner, I generated Storybook stories, variant matrices, and accessibility audits at pace. What would normally take weeks of manual documentation was compressed into days — with higher fidelity.",
  },
  {
    num: "03",
    title: "GitHub-First Delivery",
    text: "The entire component library was version-controlled and pushed to GitHub ahead of the official rebrand launch. Engineering could pull the latest tokens and components directly — no handoff decks, no ambiguity, no lag.",
  },
];

const stats = [
  { value: "60+", label: "Components rebranded and documented" },
  { value: "1", label: "Unified token layer powering the full system" },
  { value: "↑", label: "Library shipped to GitHub before rebrand launch" },
];

const MarshDesignSystem = () => {
  const project = projects.find((p) => p.id === "marsh-design-system");
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
              <span>Design Systems · Brand Implementation · AI-Led Workflow</span>
            </div>
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              Marsh Design System Rebrand
            </h1>
            <p className="mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
              A new brand identity, an existing component library, and an AI-first workflow —
              translated into a production-ready design system pushed to GitHub before the rebrand launched.
            </p>
            <img
              src="/images/work/marsh-logo-white.png"
              alt="Marsh"
              className="h-6 mb-4 brightness-0 dark:brightness-100 max-w-full"
            />
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono-label text-xs text-muted-foreground">
              <span>
                <span className="uppercase tracking-wider">Role:</span>{" "}
                <span className="text-foreground">Freelance Product Designer</span>
              </span>
              <span>
                <span className="uppercase tracking-wider">Deliverable:</span>{" "}
                <span className="text-foreground">Atomic Design Component Library + Storybook Documentation</span>
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                <img src={claudeLogo} alt="Claude" className="h-5 w-5 rounded-full object-cover" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                <svg viewBox="0 0 16 16" className="h-4 w-4 fill-foreground" aria-label="GitHub">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE BRIEF */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>The Brief</SectionLabel>
            <div className="max-w-3xl space-y-4">
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                Marsh was undergoing a company-wide rebrand. The existing CORE design system — tokens,
                components, and documentation — needed to be updated to reflect the new brand identity.
                The challenge: deliver the fully rebranded component library to GitHub before the official
                launch date, with zero visual regressions across the product suite.
              </p>
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                Working as the sole designer on the rebrand implementation, I used Claude as an
                AI co-pilot to accelerate token translation, component updates, Storybook documentation,
                and accessibility validation — compressing what would typically be a multi-sprint effort
                into a focused, high-velocity engagement.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. HERO IMAGE */}
      <section className="px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src="/images/work/marsh-design-system.webp"
                alt="Marsh Design System — Notifications Hub Dashboard"
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. LIVE PROTOTYPE */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Working Prototype</SectionLabel>
            <p className="mb-8 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground">
              A fully interactive prototype of the Notifications Hub, built inside Storybook
              to validate layout, navigation, and data-density decisions before a single line
              of production code was written. Stakeholders could click through real flows
              and leave feedback directly against the living artefact.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                src="https://daithiocheallaigh.github.io/MarshDesign2//iframe.html?globals=backgrounds.grid%3A!false&args=&id=prototypes-notifications-hub--default&viewMode=story"
                title="Notifications Hub Prototype"
                className="w-full aspect-[16/10] border-0"
                loading="lazy"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. DESIGN SYSTEM EMBEDS */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Rebranded Component Library</SectionLabel>
            <p className="mb-8 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground">
              Every component in the CORE library was updated to reflect the new brand identity —
              colour tokens, typography scales, border radii, elevation shadows, and icon treatments.
              The full library was documented in Storybook with interactive variant previews and
              usage guidelines, then shipped to GitHub as the single source of truth for engineering.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {/* Logo */}
            <ScrollReveal delay={0.08}>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground">Logo</h3>
                <p className="mb-4 max-w-2xl text-[15px] leading-[1.7] text-muted-foreground">
                  The cornerstone of the rebrand. The updated Marsh logo was codified as a
                  sub-atomic token — available in multiple colour variants, with clear-space
                  rules and minimum-size constraints enforced at the component level.
                </p>
                <div className="overflow-hidden rounded-xl border border-border">
                  <iframe
                    src="https://daithiocheallaigh.github.io/MarshDesign2//?path=/docs/sub-atomic-logo--docs&globals=backgrounds.grid:!false"
                    title="Logo Documentation"
                    className="w-full aspect-[16/10] border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Colours */}
            <ScrollReveal delay={0.08}>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground">Colour Tokens</h3>
                <p className="mb-4 max-w-2xl text-[15px] leading-[1.7] text-muted-foreground">
                  The full colour palette was rebuilt from Marsh's new brand guidelines —
                  primary, secondary, semantic, and neutral scales translated into
                  design tokens that propagate across every component automatically.
                  Each swatch includes contrast ratios and WCAG accessibility grades.
                </p>
                <div className="overflow-hidden rounded-xl border border-border">
                  <iframe
                    src="https://daithiocheallaigh.github.io/MarshDesign2//?path=/docs/sub-atomic-colours--docs&globals=backgrounds.grid:!false"
                    title="Colour Tokens Documentation"
                    className="w-full aspect-[16/10] border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Buttons */}
            <ScrollReveal delay={0.08}>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground">Button Components</h3>
                <p className="mb-4 max-w-2xl text-[15px] leading-[1.7] text-muted-foreground">
                  Buttons are the most frequently used interactive element across all three
                  Marsh products. The rebranded variants — primary, secondary, ghost, destructive —
                  were documented with size matrices, icon placement rules, loading states,
                  and disabled treatments, ensuring pixel-perfect consistency at every touchpoint.
                </p>
                <div className="overflow-hidden rounded-xl border border-border">
                  <iframe
                    src="https://daithiocheallaigh.github.io/MarshDesign2//?path=/docs/components-button--docs&globals=backgrounds.grid:!false"
                    title="Button Components Documentation"
                    className="w-full aspect-[16/10] border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Storybook external link */}
          <ScrollReveal delay={0.1}>
            <a
              href="https://daithiocheallaigh.github.io/MarshDesign2/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                <span className="font-mono-label mb-1 block text-xs text-muted-foreground">
                  Explore the Full Library
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

      {/* 5. APPROACH */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>AI-Accelerated Brand Implementation</SectionLabel>
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

      {/* 7. NEXT PROJECT */}
      {nextProject && (
        <section className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <Link
                to={nextProject.id === "marsh-internal-tooling" ? "/work/marsh-internal-tooling" : `/case/${nextProject.id}`}
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

export default MarshDesignSystem;
