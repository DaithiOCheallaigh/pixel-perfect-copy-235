import { ReactNode } from "react";
import { Branches, Exploded, Laptop, Loupe, Riffle, Sieve } from "@lucasmarkes/hairline/react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import HiringCTA from "../components/HiringCTA";
import CaseImage from "../components/CaseImage";
import { CaseVideo } from "../components/case-study/CaseLayout";
import { CpuArchitecture } from "../components/ui/cpu-architecture";
import { SEO } from "../components/SEO";
import {
  DraggableCard,
  InterruptibleDemo,
  LayoutAnimationDemo,
  ProgressiveResistance,
  ReducedMotionDemo,
  SpringVsEasing,
  StaggeredGrid,
} from "../components/blog/FluidUIDemos";

const FRAME = "rounded-xl border border-border bg-card p-6 md:p-8";
const FIGURE_CLASS = "mx-auto w-full max-w-[240px] [--hairline-plate:hsl(var(--card))] [--hairline-stroke:1]";

const figures = [
  { C: Loupe, name: "Loupe" },
  { C: Sieve, name: "Sieve" },
  { C: Laptop, name: "Laptop" },
  { C: Branches, name: "Branches" },
  { C: Exploded, name: "Exploded" },
  { C: Riffle, name: "Riffle" },
];

const embeds = [
  { src: "/embeds/hairline-notion.html", title: "Hairline Notion animation study" },
  { src: "/embeds/hairline-relay.html", title: "Hairline relay animation study" },
  { src: "/embeds/hairline-services.html", title: "Hairline hub animation study" },
];

const entries: { name: string; year: string; note: string; demo: ReactNode }[] = [
  {
    name: "Fluid UI studies",
    year: "2025",
    note: "Seven interaction demos from the fluid interfaces article: spring vs easing, interruptible animation, drag, stagger, pull to refresh, layout reorder, reduced motion.",
    demo: (
      <div className="grid gap-6 md:grid-cols-2">
        {[SpringVsEasing, InterruptibleDemo, DraggableCard, StaggeredGrid, ProgressiveResistance, LayoutAnimationDemo, ReducedMotionDemo].map((Demo, i) => (
          <div key={i} className="min-w-0">
            <Demo />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Hairline figures",
    year: "2026",
    note: "Line-art figures used across the site, rendered with the Hairline library.",
    demo: (
      <div className={`${FRAME} grid grid-cols-2 gap-8 md:grid-cols-3`}>
        {figures.map(({ C, name }) => (
          <C key={name} theme="auto" aria-label={`${name} line figure`} className={FIGURE_CLASS} />
        ))}
      </div>
    ),
  },
  {
    name: "Hairline embeds",
    year: "2026",
    note: "Standalone HTML animation studies.",
    demo: (
      <div className="grid gap-6">
        {embeds.map((e) => (
          <div key={e.src} className="aspect-[16/10] overflow-hidden rounded-xl border border-border bg-card">
            <iframe src={e.src} title={e.title} loading="lazy" className="h-full w-full border-0 bg-transparent" style={{ colorScheme: "normal" }} allowTransparency />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Signal flow",
    year: "2025",
    note: "An animated circuit used on the Marsh case study.",
    demo: (
      <div className={`${FRAME} flex justify-center`}>
        <CpuArchitecture text="AI" className="max-w-2xl" />
      </div>
    ),
  },
  {
    name: "Tipping flow loop",
    year: "2023",
    note: "The TipDirect tipping flow as a looping capture.",
    demo: (
      <div className={FRAME}>
        <div className="mx-auto max-w-md">
          <CaseImage src="/images/work/tipping-flow.gif" alt="TipDirect tipping flow, looping screen capture" />
        </div>
      </div>
    ),
  },
  {
    name: "Vistara white-label reel",
    year: "2022",
    note: "Airline white-label product reel.",
    demo: (
      <CaseVideo
        src="/videos/trip-admit-reel-vistara.mp4"
        poster="/images/work/trip-admit-reel-vistara-poster.webp"
        width={720}
        height={1280}
        label="Vistara airline white-label product reel"
      />
    ),
  },
];

const Playground = () => (
  <main className="pt-24">
    <SEO title="Playground" description="Experiments, micro-interactions and animation studies by Dave Kelly." />
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Playground</SectionLabel>
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">Playground</h1>
          <p className="max-w-xl text-lg text-muted-foreground">Small things built to test an idea. Most are live, so click around.</p>
        </ScrollReveal>

        <div className="mt-16 border-b border-border">
          {entries.map((entry, i) => (
            <article key={entry.name} className="border-t border-border py-8">
              <header className="mb-8 grid grid-cols-[3rem_1fr] gap-x-6 gap-y-2 md:grid-cols-[3rem_1fr_6rem_2fr] md:items-baseline">
                <span className="font-mono-label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-sm font-semibold text-foreground">{entry.name}</h2>
                <span className="font-mono-label col-start-2 text-muted-foreground md:col-start-auto">{entry.year}</span>
                <p className="col-start-2 text-sm text-muted-foreground md:col-start-auto">{entry.note}</p>
              </header>
              {entry.demo}
            </article>
          ))}
        </div>
      </div>
    </section>
    <HiringCTA />
  </main>
);

export default Playground;
