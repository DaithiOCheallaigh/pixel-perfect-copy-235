import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { Cpu } from "iconsax-react";
import { Plug, Padlock, Loupe, Riffle, Exploded, Laptop, Branches, Plot } from "@lucasmarkes/hairline/react";
import ScrollReveal from "@/components/ScrollReveal";
import AvailabilityCTA from "@/components/AvailabilityCTA";
import SectionLabel from "@/components/SectionLabel";
import claudeLogo from "@/assets/logos/claude.png";
import notionLogo from "@/assets/logos/notion.png";
import githubLogo from "@/assets/logos/github.svg";
import processVideo from "@/assets/ai-design-process.mp4.asset.json";
import figmaLogo from "@/assets/logos/figma.svg";

const chapters = [
  {
    tag: "00 — Toolstack",
    heading: "Connected tools, orchestrated by Claude",
    body: "Notion, Figma and GitHub are connected to Claude over MCP. One chat researches, plans, designs, builds and ships — no copy-pasting between apps, and every step leaves a trail.",
    tools: "Claude · Notion · Figma · GitHub",
    figure: Plug,
    figureAlt: "A plug drawn toward its socket: tools connected to Claude over MCP",
  },
  {
    tag: "01 — Workspace access",
    heading: "Open the workspace",
    body: "Claude asks Notion for the project workspace. You approve it once, and every tool call is scoped: reading research, writing docs and deploying previews are always allowed, while destructive actions like deleting a project stay blocked.",
    tools: "Notion · MCP permissions",
    figure: Padlock,
    figureAlt: "A padlock swinging open: scoped workspace access",
  },
  {
    tag: "02 — Discovery",
    heading: "Start with the real problem",
    body: "Requirements gathering, a heuristic review of any existing product and research into the vertical, synthesised with Claude. Interview notes become clear themes before a single screen is drawn.",
    tools: "Claude · Notion",
    figure: Loupe,
    figureAlt: "A loupe over a page: discovery and research synthesis",
  },
  {
    tag: "03 — Specs & roadmap",
    heading: "Plan & write product specs",
    body: "Themes from discovery become specs, a roadmap and a Kanban board in Notion. Your specs become the living product roadmap, with sprints mapped back to the research.",
    tools: "Notion · Kanban",
    figure: Riffle,
    figureAlt: "A tray of cards, one lifted out: specs organised into a roadmap",
  },
  {
    tag: "04 — Atomic prototyping",
    heading: "Build the prototype using atomic principles",
    body: "A tokenised design system in Figma (colour, type and spacing tokens) feeds atoms, molecules and organisms, so every build stays consistent as the product scales.",
    tools: "Figma · Design tokens",
    figure: Exploded,
    figureAlt: "An app window separated into layers: atomic design system",
  },
  {
    tag: "05 — Build & prototype",
    heading: "From spec to prototype",
    body: "Claude Code builds the user flows, components and screens into a working prototype, synced to the Figma tokens with no hard-coded values.",
    tools: "Claude Code · Figma",
    figure: Laptop,
    figureAlt: "A laptop opening: the working prototype",
  },
  {
    tag: "06 — Deploy & validate",
    heading: "Ship it to real users",
    body: "Claude pushes to GitHub and ships a live build, then invites testers so the research can be validated with real people, not assumptions.",
    tools: "GitHub · Claude",
    figure: Branches,
    figureAlt: "A branch forking off main and merging back: shipping a build",
  },
  {
    tag: "07 — Analytics & iteration",
    heading: "Measure, then iterate",
    body: "Tracking and usage analytics go in from day one. Real user behaviour after launch drives the next round of refinements, and the loop starts again.",
    tools: "Analytics · Claude",
    figure: Plot,
    figureAlt: "A plotted chart: measuring real usage",
  },
];

const tools = [
  { name: "Claude", logo: claudeLogo },
  { name: "Notion", logo: notionLogo },
  { name: "Figma", logo: figmaLogo },
  { name: "GitHub", logo: githubLogo },
];

const AIDesignProcess = () => {
  return (
    <main className="min-h-screen pt-24">
      <SEO title="AI Design Process" description="How I use AI tools to deliver faster, smarter design work without sacrificing quality or craft." url="/ai-design-process" />
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
              An end-to-end process for building better products, faster. One Claude chat connects research, planning, design, build and analytics, taking ideas from discovery to launch.
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

      {/* Process film */}
      <section className="px-6 pt-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="aspect-video overflow-hidden rounded-xl border border-border bg-background">
              <video
                src={processVideo.url}
                controls
                playsInline
                preload="none"
                poster="/images/ai-design-process-poster.jpg"
                aria-label="AI-Led Design: my Claude process, from toolstack to analytics (1 minute 19)"
                className="block h-full w-full"
              />
            </div>
            <p className="mt-3 font-mono-label text-xs text-muted-foreground">
              Process film · 1:19 · sound on
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Workflow chapters */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>The Process</SectionLabel>
            <p className="text-muted-foreground">
              One Claude chat runs the whole loop. Each stage below is a chapter in the film above.
            </p>
          </ScrollReveal>
          <div className="mt-12 flex flex-col gap-4">
            {chapters.map((chapter, i) => (
              <ScrollReveal key={chapter.tag} distance={0}>
                <article className="grid items-center gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-2 md:gap-10 md:p-10">
                  <div className={`order-2 min-w-0 ${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                    <span className="font-mono-label mb-4 block text-primary">
                      {chapter.tag}
                    </span>
                    <h3 className="mb-4 text-2xl font-extrabold tracking-tight md:text-3xl">
                      {chapter.heading}
                    </h3>
                    <p className="text-[15px] leading-[1.7] text-muted-foreground">
                      {chapter.body}
                    </p>
                    {chapter.tools && (
                      <p className="mt-5 font-mono-label text-xs text-muted-foreground/60">
                        Tools: {chapter.tools}
                      </p>
                    )}
                  </div>
                  <div className={`order-1 min-w-0 ${i % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                    <chapter.figure
                      theme="auto"
                      aria-label={chapter.figureAlt}
                      className="mx-auto w-full max-w-[280px] [--hairline-plate:hsl(var(--card))] [--hairline-stroke:1]"
                    />
                  </div>
                </article>
              </ScrollReveal>
            ))}
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
            <iframe
              src="/embeds/hairline-relay.html"
              title="Claude at the centre, connected to Notion, Figma and GitHub"
              loading="lazy"
              scrolling="no"
              aria-hidden="true"
              tabIndex={-1}
              className="mx-auto block aspect-[5/4] w-full max-w-lg border-0 bg-transparent"
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
                to="/work/spark"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                Elsevier MedEd Workspace →
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
