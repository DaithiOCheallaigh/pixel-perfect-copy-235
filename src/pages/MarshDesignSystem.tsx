import { imgDims } from "@/data/imageDimensions";
import { ArrowRight } from "iconsax-react";
import ScrollReveal from "../components/ScrollReveal";
import HiringCTA from "../components/HiringCTA";
import { SEO } from "@/components/SEO";
import CaseImage from "../components/CaseImage";
import { projects } from "../data/projects";
import claudeLogo from "@/assets/logos/claude.png";
import { CaseBlock, CaseHero, CaseSection, CardGrid, NextProject, Prose, Reflection, StatGrid } from "../components/case-study/CaseLayout";

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

const docs = [
  {
    title: "Logo",
    text: "The cornerstone of the rebrand. The updated Marsh logo was codified as a sub-atomic token — available in multiple colour variants, with clear-space rules and minimum-size constraints enforced at the component level.",
    src: "https://daithiocheallaigh.github.io/MarshDesign2//?path=/docs/sub-atomic-logo--docs&globals=backgrounds.grid:!false",
    image: "/images/work/marsh-storybook-logo.png",
  },
  {
    title: "Colour Tokens",
    text: "The full colour palette was rebuilt from Marsh's new brand guidelines — primary, secondary, semantic, and neutral scales translated into design tokens that propagate across every component automatically. Each swatch includes contrast ratios and WCAG accessibility grades.",
    src: "https://daithiocheallaigh.github.io/MarshDesign2//?path=/docs/sub-atomic-colours--docs&globals=backgrounds.grid:!false",
    image: "/images/work/marsh-storybook-colours.png",
  },
  {
    title: "Button Components",
    text: "Buttons are the most frequently used interactive element across all three Marsh products. The rebranded variants — primary, secondary, ghost, destructive — were documented with size matrices, icon placement rules, loading states, and disabled treatments, ensuring pixel-perfect consistency at every touchpoint.",
    src: "https://daithiocheallaigh.github.io/MarshDesign2//?path=/docs/components-button--docs&globals=backgrounds.grid:!false",
    image: "/images/work/marsh-storybook-buttons.png",
  },
];

/** Live Storybook on desktop; a static screenshot at natural ratio on mobile. */
const StoryEmbed = ({ src, title, image }: { src: string; title: string; image: string }) => (
  <>
    <div className="hidden overflow-hidden rounded-2xl border border-border md:block">
      <iframe src={src} title={title} className="block aspect-[16/10] w-full border-0" loading="lazy" allow="clipboard-read; clipboard-write" />
    </div>
    <CaseImage src={image} alt={title} className="md:hidden" />
  </>
);

const LinkCard = ({ href, eyebrow, title }: { href: string; eyebrow: string; title: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors md:hover:border-primary/40">
    <div className="min-w-0">
      <span className="mb-1 block font-mono-label text-xs text-muted-foreground">{eyebrow}</span>
      <span className="text-lg font-bold text-foreground transition-colors md:group-hover:text-primary">{title}</span>
    </div>
    <ArrowRight size={24} className="shrink-0 text-muted-foreground transition-colors md:group-hover:text-primary" />
  </a>
);

const MarshDesignSystem = () => {
  const project = projects.find((p) => p.id === "marsh-design-system");

  return (
    <main className="overflow-x-hidden pt-24">
      <SEO title="Marsh Design System" description="How Dave Kelly rebuilt the Marsh McLennan design system: tokens, a Figma component library and Storybook documentation for consistent enterprise products." image={`https://www.lacunadigital.io${project?.pillImage ?? "/images/work/marsh-design-system.webp"}`} />

      <CaseHero
        client={<img src="/images/work/marsh-logo-new-white.png" alt="Marsh" className="no-lightbox h-6 w-auto max-w-full brightness-0 dark:brightness-100" {...imgDims("/images/work/marsh-logo-new-white.png")} loading="eager" decoding="async" />}
        title="Marsh Design System Rebrand"
        summary="A new brand identity, an existing component library, and an AI-first workflow — translated into a production-ready design system pushed to GitHub before the rebrand launched."
        meta={[
          { label: "Role", value: "Freelance Product Designer" },
          { label: "Timeline", value: project?.timeline ?? "2 months" },
          {
            label: "Tools",
            value: (
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                  <img src={claudeLogo} alt="Claude" className="no-lightbox h-5 w-5 rounded-full object-cover" width={640} height={640} loading="lazy" decoding="async" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                  <svg viewBox="0 0 16 16" className="h-4 w-4 fill-foreground" aria-label="GitHub" role="img">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.540 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.070-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </span>
                <span className="text-muted-foreground">Claude · GitHub · Storybook</span>
              </span>
            ),
          },
        ]}
        media={<CaseImage src="/images/work/new-marsh-styling-project.webp" alt="Marsh Design System — Notifications Hub Dashboard" eager />}
      />

      <CaseSection label="Overview">
        <CaseBlock title="What it is">
          <Prose text={"Marsh was undergoing a company-wide rebrand. The existing CORE design system — tokens, components, and documentation — needed to be updated to reflect the new brand identity.\n\nDeliverable: an atomic design component library with Storybook documentation."} />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="The Challenge">
        <CaseBlock>
          <Prose text="Deliver the fully rebranded component library to GitHub before the official launch date, with zero visual regressions across the product suite." />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Exploration & Approach">
        <CaseBlock title="AI-accelerated brand implementation">
          <Prose text="Working as the sole designer on the rebrand implementation, I used Claude as an AI co-pilot to accelerate token translation, component updates, Storybook documentation, and accessibility validation — compressing what would typically be a multi-sprint effort into a focused, high-velocity engagement." />
          <div className="mt-8">
            <CardGrid items={approaches.map((a) => ({ eyebrow: a.num, title: a.title, desc: a.text }))} />
          </div>
        </CaseBlock>
      </CaseSection>

      <CaseSection label="The Solution">
        <CaseBlock title="Rebranded component library">
          <Prose text="Every component in the CORE library was updated to reflect the new brand identity — colour tokens, typography scales, border radii, elevation shadows, and icon treatments. The full library was documented in Storybook with interactive variant previews and usage guidelines, then shipped to GitHub as the single source of truth for engineering." />
        </CaseBlock>
        {docs.map((d) => (
          <CaseBlock key={d.title} title={d.title} media={<StoryEmbed src={d.src} title={`${d.title} documentation`} image={d.image} />}>
            <Prose text={d.text} />
          </CaseBlock>
        ))}
        <ScrollReveal>
          <LinkCard href="https://daithiocheallaigh.github.io/MarshDesign2/" eyebrow="Explore the Full Library" title="CORE Design System — Storybook Documentation" />
        </ScrollReveal>
        <CaseBlock
          title="Brand UI showcase"
          media={
            <>
              <div className="hidden overflow-hidden rounded-2xl border border-border md:block">
                <iframe src="https://marsh-clarity-code.lovable.app" title="Marsh Brand UI Showcase" className="block aspect-[16/10] w-full border-0" loading="lazy" allow="clipboard-read; clipboard-write" />
              </div>
              <div className="mt-6">
                <LinkCard href="https://marsh-clarity-code.lovable.app" eyebrow="View Live" title="Marsh Brand UI — Splash Page" />
              </div>
            </>
          }
        >
          <Prose text="A standalone splash page I built to demonstrate how the new Marsh brand identity translates into real UI — applying the rebranded tokens, typography, and visual language beyond the component library into a cohesive, designed experience." />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Build, Test & Launch">
        <CaseBlock
          title="Working prototype"
          media={<StoryEmbed src="https://daithiocheallaigh.github.io/MarshDesign2//iframe.html?globals=backgrounds.grid%3A!false&args=&id=prototypes-notifications-hub--default&viewMode=story" title="Notifications Hub Prototype" image="/images/work/marsh-storybook-prototype.png" />}
        >
          <Prose text="A fully interactive prototype of the Notifications Hub, built inside Storybook to validate layout, navigation, and data-density decisions before a single line of production code was written. Stakeholders could click through real flows and leave feedback directly against the living artefact." />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Outcome & Reflection">
        <ScrollReveal>
          <StatGrid stats={stats} />
        </ScrollReveal>
        <Reflection text="Translating the brand into tokens first meant the rebrand propagated through every existing component, and shipping the library to GitHub ahead of launch let engineering pull the latest tokens and components directly — no handoff decks, no ambiguity, no lag." />
      </CaseSection>

      <NextProject currentId="marsh-design-system" />

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <HiringCTA />
    </main>
  );
};

export default MarshDesignSystem;
