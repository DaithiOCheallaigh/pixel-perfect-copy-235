import { useState } from "react";
import { SEO } from "@/components/SEO";
import ScrollReveal from "../components/ScrollReveal";
import { CaseBlock, CaseHero, CaseSection, CardGrid, NextProject, Prose, Reflection, ToolsList } from "../components/case-study/CaseLayout";
import HiringCTA from "../components/HiringCTA";
import CaseStudyVideo from "../components/CaseStudyVideo";
import walkthroughVideo from "../assets/spark-walkthrough.mp4.asset.json";
import { projects } from "../data/projects";
import { Branches, Exploded, Riffle } from "@lucasmarkes/hairline/react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const roleBreakdown = [
  {
    title: "Reuse vs. New",
    text: "Balanced adapting Elsevier's existing Leyden design system components with designing net-new patterns where gaps existed — feeding those gaps back as candidates for the shared system rather than solving them as one-offs.",
  },
  {
    title: "Designing for a Portfolio, Not Just a Product",
    text: "Made component and pattern decisions with Elsevier's adjacent health-science products (e.g. nursing) in mind, so MedEd Workspace's design stayed reusable rather than bespoke.",
  },
  {
    title: "Student Experience",
    text: "Shaped the self-guided study experience around spiral learning, AI-supported study assistance, mock exams, and exam-readiness signals.",
  },
  {
    title: "Faculty Experience",
    text: "Shaped the LMS-companion experience for instructors: building and assigning study content, and surfacing insights that flag struggling students early.",
  },
];

const featureVideos = [
  {
    title: "USMLE Study Guide",
    text: "Every USMLE system mapped to the student's progress — drill from system to topic and into the resources behind it: Osmosis videos, topic overviews, clinical cases and 3D anatomy.",
    src: "/videos/spark-study-guide.mp4",
    alt: "MedEd Workspace USMLE Study Guide drilling from system to topic",
  },
  {
    title: "AI Coach — diagnose, don't tutor",
    text: "After a wrong answer, students ask the Coach what they missed. It explains why their choice doesn't fit and which findings in the question point to the right answer — building clinical reasoning rather than handing out answers.",
    src: "/videos/spark-ai-coach.mp4",
    alt: "MedEd Workspace AI Coach explaining why a chosen answer doesn't fit",
  },
  {
    title: "Exam Readiness",
    text: "Diagnostic and full-length mock exams, a score predictor, strengths and weaknesses by topic, and a history of past tests, so students know where they stand before exam day.",
    src: "/videos/spark-readiness.mp4",
    alt: "MedEd Workspace exam readiness view with score predictor and topic strengths",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Rapid Prototyping with Claude",
    text: "Used Claude to move from concept to testable interaction quickly, rather than starting from static comps.",
  },
  {
    num: "02",
    title: "Dev-Ready Files via Figma MCP",
    text: "Used Figma's MCP integration to produce robust, developer-ready files that reduced ambiguity in handoff.",
  },
  {
    num: "03",
    title: "Cross-Team Design Collaboration",
    text: "Worked within a large, cross-team design model: regular design critiques ('design pits'), peer feedback, and quick iterative cycles rather than long solo design passes.",
  },
  {
    num: "04",
    title: "Multi-Squad Delivery",
    text: "Supported multiple development squads concurrently, continuously supplying ready-to-build design files rather than working to a single team's cadence.",
  },
  {
    num: "05",
    title: "Process & Documentation Ownership",
    text: "Took ownership of workflow and feature documentation in Confluence and Jira, keeping design decisions and specs traceable across teams.",
  },
  {
    num: "06",
    title: "Spec-Driven Design (SDD)",
    text: "Helped pioneer a spec-driven design process that narrows the gap between design and development, working directly with front-end (.js) component libraries to hand off components engineers could drop straight into the front end — blurring the traditional design/dev handoff line.",
  },
  {
    num: "07",
    title: "Building a Workbench Tool",
    text: "Built an internal 'workbench' tool to speed up rapid design-and-development cycles by leveraging AI, cutting the loop time between idea, prototype, and dev-ready output.",
  },
];

/* Outcomes — short title with a supporting line */
const stats = [
  {
    title: "Shared Components",
    label: "Reusable components contributed back to the shared design system",
    figure: Riffle,
    figureAlt: "A tray of cards, one lifted out: components contributed back to the shared design system",
  },
  {
    title: "Parallel Squads",
    label: "Development squads supported in parallel",
    figure: Branches,
    figureAlt: "A branch forking off main and merging back: squads working in parallel",
  },
  {
    title: "Faster Handoff",
    label: "Faster design-to-dev handoff via spec-driven, dev-ready Figma files",
    figure: Exploded,
    figureAlt: "An app window separated into layers: spec-driven design handoff",
  },
];

const SparkCaseStudy = () => {
  const [prototypeLoaded, setPrototypeLoaded] = useState(false);
  const isMobile = useIsMobile();
  const project = projects.find((p) => p.id === "spark");

  return (
    <main className="overflow-x-hidden pt-24">
      <SEO title="MedEd Workspace" description="Private case study: designing MedEd Workspace, a healthcare-education product for Elsevier, with shared components, parallel squads and faster design handoff." image={`https://www.lacunadigital.io${project?.pillImage ?? "/images/work/spark-pill.webp"}`} noindex />

      <CaseHero
        client="Elsevier"
        title="MedEd Workspace"
        summary="A self-guided study companion for nursing and health-sciences students, and an LMS-companion for the faculty who teach them — designed on and extended into Elsevier's Leyden design system."
        meta={[
          { label: "Role", value: "Contract UI/UX Designer" },
          { label: "Timeline", value: project?.timeline ?? "Contract" },
          { label: "Tools", value: <ToolsList tools={project?.tools ?? []} />, wide: (project?.tools?.length ?? 0) > 4 },
        ]}
        media={
          <>
            <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card">
              <video
                src={walkthroughVideo.url}
                controls
                playsInline
                preload="none"
                poster="/images/work/spark-walkthrough-poster.jpg"
                width={1600}
                height={900}
                aria-label="Spark walkthrough: two curricula, one experience (narrated, 3 minutes)"
                className="block h-full w-full object-contain"
              />
            </div>
            <p className="mt-3 font-mono-label text-xs text-muted-foreground">Narrated walkthrough · 3 min · sound on</p>
          </>
        }
      />

      <CaseSection label="Overview">
        <CaseBlock title="What it is">
          <Prose text="MedEd Workspace is a two-sided learning product built on Elsevier's existing content and design system rather than as a green-field build. For students, it's a self-guided exam-prep companion built around spiral learning — spaced, repeated exposure to concepts rather than one-and-done review — combined with AI-supported study assistance and mock exams designed to build genuine exam readiness. For faculty, MedEd Workspace complements the LMS rather than replacing it: instructors build and assign study content and get visibility into class performance, so struggling students can be identified before an exam rather than after." />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="The Challenge">
        <CaseBlock>
          <Prose text="Elsevier runs comparable learning products across other health-science markets — nursing among them — so every design decision on MedEd Workspace had to hold up as a reusable pattern across that wider portfolio, not just as a one-off solution for a single product." />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Exploration & Approach">
        <CaseBlock title="My role">
          <Prose text="As contract UI/UX designer on MedEd Workspace, I worked across both the student and faculty experiences, embedded in cross-functional squads alongside product, engineering, and content teams." />
          <div className="mt-8">
            <CardGrid items={roleBreakdown.map((r) => ({ title: r.title, desc: r.text }))} columns={2} />
          </div>
        </CaseBlock>
      </CaseSection>

      <CaseSection label="The Solution">
        <CaseBlock title="Feature highlights">
          <Prose text="Short loops of the features I designed end to end, captured from the prototype rather than mocked up as static comps." />
          <div className="mt-8 grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureVideos.map((feature) => (
              <div key={feature.title}>
                <CaseStudyVideo src={feature.src} ariaLabel={feature.alt} className="rounded-2xl" />
                <h4 className="mb-2 mt-4 text-lg font-bold text-foreground">{feature.title}</h4>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </CaseBlock>
        <CaseBlock title="Try the prototype">
          <Prose text="The working Alpha prototype, live in the page. Click through the student dashboard, open a topic in the Study Guide, start a quiz and ask the AI Coach. It runs in your browser with sample data, so nothing is saved." />
          {!isMobile && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
              {prototypeLoaded ? (
                <iframe
                  src="/embeds/spark-student.html#screen=home"
                  title="MedEd Workspace student prototype (interactive)"
                  loading="lazy"
                  className="block aspect-[16/10] w-full border-0"
                />
              ) : (
                <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-4">
                  <Button onClick={() => setPrototypeLoaded(true)}>Load interactive prototype</Button>
                  <span className="font-mono-label text-xs text-muted-foreground">~2 MB · opens the student dashboard</span>
                </div>
              )}
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Button
              asChild
              variant={isMobile ? "outline" : "link"}
              className={`font-mono-label text-muted-foreground ${isMobile ? "w-full" : "h-auto p-0"}`}
            >
              <a href="/embeds/spark-student.html#screen=home" target="_blank" rel="noopener">
                Open full screen ↗
              </a>
            </Button>
          </div>
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Build, Test & Launch">
        <CaseBlock title="Process & ways of working">
          <CardGrid items={processSteps.map((p) => ({ eyebrow: p.num, title: p.title, desc: p.text }))} />
        </CaseBlock>
      </CaseSection>

      <CaseSection label="Outcome & Reflection">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center">
                <stat.figure
                  theme="auto"
                  aria-label={stat.figureAlt}
                  className="mx-auto mb-4 w-full max-w-[240px] [--hairline-plate:hsl(var(--background))] [--hairline-stroke:1]"
                />
                <span className="block min-h-[2.1em] text-3xl font-black leading-[1.05] tracking-tighter text-foreground md:text-4xl">
                  {stat.title}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {project?.reflection && <Reflection text={project.reflection} />}
      </CaseSection>

      <NextProject currentId="spark" />

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <HiringCTA />
    </main>
  );
};

export default SparkCaseStudy;
