import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import CaseStudyVideo from "../components/CaseStudyVideo";
import introVideo from "../assets/spark-intro.mp4.asset.json";
import claudeLogo from "@/assets/logos/claude.png";
import figmaLogo from "@/assets/logos/figma.svg";
import confluenceLogo from "@/assets/logos/confluence.svg";
import jiraLogo from "@/assets/logos/jira.svg";
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
    text: "Made component and pattern decisions with Elsevier's adjacent health-science products (e.g. nursing) in mind, so Spark's design stayed reusable rather than bespoke.",
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
    alt: "Spark USMLE Study Guide drilling from system to topic",
  },
  {
    title: "AI Coach — diagnose, don't tutor",
    text: "After a wrong answer, students ask the Coach what they missed. It explains why their choice doesn't fit and which findings in the question point to the right answer — building clinical reasoning rather than handing out answers.",
    src: "/videos/spark-ai-coach.mp4",
    alt: "Spark AI Coach explaining why a chosen answer doesn't fit",
  },
  {
    title: "Exam Readiness",
    text: "Diagnostic and full-length mock exams, a score predictor, strengths and weaknesses by topic, and a history of past tests, so students know where they stand before exam day.",
    src: "/videos/spark-readiness.mp4",
    alt: "Spark exam readiness view with score predictor and topic strengths",
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

const tools = [
  { name: "Claude", icon: claudeLogo },
  { name: "Figma (incl. MCP)", icon: figmaLogo },
  { name: "Confluence", icon: confluenceLogo },
  { name: "Jira", icon: jiraLogo },
];

const SparkCaseStudy = () => {
  const [prototypeLoaded, setPrototypeLoaded] = useState(false);
  const isMobile = useIsMobile();
  const project = projects.find((p) => p.id === "spark");
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
              <span>Elsevier</span>
              <span className="text-border">|</span>
              <span>Healthcare Education · Design Systems · AI Workflow</span>
            </div>
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              Spark
            </h1>
            <p className="mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
              A self-guided study companion for nursing and health-sciences students, and an
              LMS-companion for the faculty who teach them — designed on and extended into Elsevier's
              Leyden design system.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono-label text-xs text-muted-foreground">
              <span>
                <span className="uppercase tracking-wider">Role:</span>{" "}
                <span className="text-foreground">Contract UI/UX Designer</span>
              </span>
              <span>
                <span className="uppercase tracking-wider">Deliverable:</span>{" "}
                <span className="text-foreground">
                  Student + Faculty Experience, Design System Contributions, Dev-Ready Figma Files
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="px-6 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Tools</SectionLabel>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {tools.map((tool) => (
                <li key={tool.name} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                    <img
                      src={tool.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-4 w-4 object-contain"
                    />
                  </span>
                  <span className="font-mono-label text-muted-foreground">{tool.name}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* INTRO VIDEO */}
      <section className="px-6 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <CaseStudyVideo src={introVideo.url} ariaLabel="Spark product overview walkthrough" />
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE BRIEF */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>The Brief</SectionLabel>
            <div className="max-w-3xl space-y-4">
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                Spark is a two-sided learning product built on Elsevier's existing content and design
                system rather than as a green-field build. For students, it's a self-guided exam-prep
                companion built around spiral learning — spaced, repeated exposure to concepts rather
                than one-and-done review — combined with AI-supported study assistance and mock exams
                designed to build genuine exam readiness. For faculty, Spark complements the LMS rather
                than replacing it: instructors build and assign study content and get visibility into
                class performance, so struggling students can be identified before an exam rather than
                after.
              </p>
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                Elsevier runs comparable learning products across other health-science markets —
                nursing among them — so every design decision on Spark had to hold up as a reusable
                pattern across that wider portfolio, not just as a one-off solution for a single
                product.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3b. FEATURE HIGHLIGHTS */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Feature Highlights</SectionLabel>
            <p className="mb-8 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground">
              Short loops of the features I designed end to end, captured from the prototype rather
              than mocked up as static comps.
            </p>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureVideos.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <div>
                  <CaseStudyVideo src={feature.src} ariaLabel={feature.alt} />
                  <h3 className="mt-4 mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="text-[15px] leading-[1.7] text-muted-foreground">{feature.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE STUDENT PROTOTYPE */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Try the Prototype</SectionLabel>
            <p className="mb-8 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground">
              The working Alpha prototype, live in the page. Click through the student dashboard,
              open a topic in the Study Guide, start a quiz and ask the AI Coach. It runs in your
              browser with sample data, so nothing is saved.
            </p>
          </ScrollReveal>
          {!isMobile && (
            <ScrollReveal delay={0.1}>
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                {prototypeLoaded ? (
                  <iframe
                    src="/embeds/spark-student.html#screen=home"
                    title="Spark student prototype (interactive)"
                    loading="lazy"
                    className="block aspect-[16/10] w-full border-0"
                  />
                ) : (
                  <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-4">
                    <Button onClick={() => setPrototypeLoaded(true)}>
                      Load interactive prototype
                    </Button>
                    <span className="font-mono-label text-xs text-muted-foreground">
                      ~2 MB · opens the student dashboard
                    </span>
                  </div>
                )}
              </div>
            </ScrollReveal>
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
        </div>
      </section>

      {/* 4. MY ROLE */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>My Role</SectionLabel>
            <p className="mb-8 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground">
              As contract UI/UX designer on Spark, I worked across both the student and faculty
              experiences, embedded in cross-functional squads alongside product, engineering, and
              content teams.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {roleBreakdown.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="max-w-2xl text-[15px] leading-[1.7] text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS & WAYS OF WORKING */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Process & Ways of Working</SectionLabel>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((col, i) => (
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

      {/* 6. PROCESS IMAGE PLACEHOLDER */}
      <section className="px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Process Artefacts</SectionLabel>
            <p className="mb-8 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground">
              Placeholder for workflow diagrams, design-pit artefacts, or the internal workbench tool
              interface.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="flex aspect-[16/10] w-full items-center justify-center bg-muted/50">
                <span className="font-mono-label text-center px-6 text-muted-foreground">
                  [Placeholder — Faculty insights dashboard screenshot]
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* 8. OUTCOMES */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Outcomes</SectionLabel>
          </ScrollReveal>
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
        </div>
      </section>

      {/* 9. NEXT PROJECT */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <Link
              to={nextProject ? `/case/${nextProject.id}` : "/work"}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                <span className="font-mono-label mb-1 block text-xs text-muted-foreground">
                  Next Project
                </span>
                <span className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {nextProject ? nextProject.title : "Back to Work"}
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

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>
  );
};

export default SparkCaseStudy;
