import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";

/*
 * Spark — Elsevier case study
 * Editorial, text/diagram-led. Drop sanitized images into the ImageSlot
 * placeholders below. Swap the accent colour by editing --spark-accent.
 */

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "who", label: "Who it's for" },
  { id: "role", label: "My Role" },
  { id: "process", label: "Process" },
  { id: "outcomes", label: "Outcomes" },
];

const ImageSlot = ({ label, ratio = "aspect-[16/10]" }: { label: string; ratio?: string }) => (
  <figure
    className={`${ratio} flex w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-foreground/20 bg-muted/40`}
  >
    <span className="font-mono-label text-muted-foreground">{label}</span>
    <span className="text-xs text-muted-foreground/60">Image placeholder</span>
  </figure>
);

const SectionHeading = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div className="mb-10 space-y-3 md:mb-14">
    <span className="font-mono-label text-[hsl(var(--spark-accent))]">{eyebrow}</span>
    <h2 className="text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
      {children}
    </h2>
  </div>
);

const SparkCaseStudy = () => {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ ["--spark-accent" as string]: "336 72% 45%" }}
    >
      <SEO
        title="Spark — Elsevier Case Study | Dave Kelly"
        description="Contract UI/UX case study: designing Spark, a self-guided learning and teaching companion for nursing and health-sciences education at Elsevier."
        path="/case/spark"
      />

      {/* Sticky in-page nav */}
      <nav className="sticky top-16 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-1 overflow-x-auto px-6 py-3 scrollbar-hide md:justify-center md:gap-2">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors md:text-sm ${
                active === id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
          <span className="font-mono-label text-[hsl(var(--spark-accent))]">Contract UI/UX Designer</span>
          <h1 className="mt-4 text-6xl font-extrabold leading-[0.95] tracking-[-0.05em] md:text-8xl">
            Spark
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Designing a self-guided learning and teaching companion for nursing and health-sciences
            education — built on and extending Elsevier's Leyden design system.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border/60 pt-8 md:grid-cols-4">
            {[
              ["Company", "Elsevier"],
              ["Role", "Contract UI/UX Designer"],
              ["Platform", "Web — student & faculty"],
              ["Tools", "Claude · Figma · Confluence · Jira"],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="font-mono-label text-muted-foreground">{term}</dt>
                <dd className="mt-2 text-sm font-semibold leading-snug text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Overview */}
      <section id="overview" className="scroll-mt-32 border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <SectionHeading eyebrow="01 — Overview">What is Spark?</SectionHeading>
          <div className="space-y-6 text-base leading-[1.8] text-muted-foreground md:text-lg">
            <p>
              Spark is a learning product with two sides: a self-guided study tool for students and an
              LMS companion for faculty. Rather than a green-field build, it sits on top of Elsevier's
              existing content library and the Leyden design system — which shaped every design
              decision from day one.
            </p>
            <p>
              For students, Spark is a companion for exam preparation and course study. It's built
              around <strong className="font-semibold text-foreground">spiral learning</strong> —
              repeated, spaced exposure to concepts rather than one-and-done review — with
              AI-supported study assistance and mock exams designed to build exam readiness and
              confidence over time.
            </p>
            <p>
              For faculty, Spark complements the LMS rather than replacing it. Instructors build and
              assign study content, and get insight into class performance — so they can spot
              struggling students early and intervene before an exam, not after.
            </p>
            <p>
              Elsevier runs comparable products across other health-science markets, so Spark was
              designed with an eye toward shared patterns and reusable design system components — not
              as a one-off.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <ImageSlot label="Student self-study screen — placeholder" />
            <ImageSlot label="Faculty class-insights view — placeholder" />
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section id="who" className="scroll-mt-32 border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <SectionHeading eyebrow="02 — Audience">Who it's for</SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-sm border border-border/60 bg-card p-8 md:p-10">
              <span className="font-mono-label text-[hsl(var(--spark-accent))]">Students</span>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-foreground">
                Preparing for high-stakes exams
              </h3>
              <p className="mt-4 text-base leading-[1.8] text-muted-foreground">
                Nursing and health-sciences students who need structured, repeatable study support —
                spaced review, practice under exam conditions, and a clear read on readiness — rather
                than a static content library.
              </p>
            </div>
            <div className="rounded-sm border border-border/60 bg-card p-8 md:p-10">
              <span className="font-mono-label text-[hsl(var(--spark-accent))]">Faculty / Instructors</span>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-foreground">
                Teaching inside an existing LMS
              </h3>
              <p className="mt-4 text-base leading-[1.8] text-muted-foreground">
                Educators who need lightweight tools to assign study work inside their existing LMS
                workflow — and early visibility into who's falling behind, while there's still time
                to act on it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Role */}
      <section id="role" className="scroll-mt-32 border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <SectionHeading eyebrow="03 — My Role">What I did</SectionHeading>
          <p className="text-base leading-[1.8] text-muted-foreground md:text-lg">
            As a contract UI/UX designer on Spark, I worked across both the student and faculty
            experiences, embedded in cross-functional squads alongside product, engineering, and
            content teams.
          </p>
          <ul className="mt-10 space-y-8">
            {[
              "Balanced reuse and net-new design — combining and adapting existing Leyden design system components with new patterns where the system had gaps, and feeding those gaps back as candidates for the shared system rather than one-off fixes.",
              "Designed with awareness of Elsevier's broader portfolio — similar learning products exist in adjacent health-science markets, so component and pattern decisions were made to stay reusable across products, not just for Spark.",
              "Shaped the student self-guided experience around spiral learning — spaced, repeated review — with AI-supported study assistance, mock exams, and exam-readiness signals.",
              "Shaped the faculty experience as an LMS companion — building and assigning study content, and surfacing insights that help instructors identify struggling students early.",
            ].map((item, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-mono-label mt-2 shrink-0 text-[hsl(var(--spark-accent))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.8] text-muted-foreground md:text-lg">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-32 border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <SectionHeading eyebrow="04 — Process">Process & ways of working</SectionHeading>
          <p className="text-base leading-[1.8] text-muted-foreground md:text-lg">
            Spark's design process was fast, collaborative, and deliberately close to engineering.
          </p>
          <ul className="mt-10 space-y-8">
            {[
              "Used Claude for rapid prototyping — going from concept to testable interaction quickly, rather than producing static comps first.",
              "Used Figma's MCP (Model Context Protocol) integration to produce robust, dev-ready files that translate more directly into implementation, reducing handoff ambiguity.",
              "Worked within a large, cross-team design collaboration model — regular design critiques (\"design pits\"), peer feedback, and quick iterative cycles rather than long solo design passes.",
              "Supported multiple development squads concurrently, continuously supplying ready-to-build design files rather than working to a single team's cadence.",
              "Took on process and documentation ownership — writing up both workflow and feature documentation in Confluence and Jira so decisions and specs were traceable across teams.",
              "Helped pioneer a spec-driven design (SDD) process that narrows the gap between design and development — working directly with front-end (.js) component libraries to hand off components engineers could effectively copy-paste into the front end, blurring the traditional design/dev handoff line.",
              "Built a \"workbench\" tool to speed up rapid design-and-development cycles by leveraging AI — reducing the loop time between idea, prototype, and dev-ready output.",
            ].map((item, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-mono-label mt-2 shrink-0 text-[hsl(var(--spark-accent))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.8] text-muted-foreground md:text-lg">{item}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <ImageSlot label="Workbench / SDD workflow diagram — placeholder" />
            <ImageSlot label="Design pit / critique artefact — placeholder" />
          </div>

          {/* Tools */}
          <div className="mt-16 border-t border-border/60 pt-10">
            <span className="font-mono-label text-muted-foreground">Tools</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Claude", "Figma (incl. MCP)", "Confluence", "Jira"].map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="outcomes" className="scroll-mt-32 border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <SectionHeading eyebrow="05 — Outcomes">Outcomes & takeaways</SectionHeading>
          <p className="font-mono-label text-muted-foreground">
            Placeholder copy — edit with real results
          </p>
          <div className="mt-8 space-y-10">
            {[
              {
                title: "Tighter design-dev feedback loops",
                body: "Spec-driven design and dev-ready Figma MCP files cut the round-trip between design intent and shipped UI. Components handed off as near copy-paste front-end code meant fewer interpretation gaps and less rework.",
              },
              {
                title: "Reusable contributions to the shared system",
                body: "Patterns designed for Spark — spiral-learning study flows, readiness signals, class-insight surfaces — were documented and fed back into Leyden as candidates for reuse across Elsevier's health-science portfolio.",
              },
              {
                title: "Faster iteration across multiple squads",
                body: "AI-assisted prototyping and the workbench tooling kept design ahead of several development squads at once, shortening the loop from idea to testable, dev-ready output.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[hsl(var(--spark-accent))] pl-6">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">{title}</h3>
                <p className="mt-3 text-base leading-[1.8] text-muted-foreground md:text-lg">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <Link
            to="/start-project"
            className="group inline-flex items-center gap-2 text-base font-bold text-foreground md:text-lg"
          >
            Interested in working together? Get in touch
            <ArrowUpRight className="h-5 w-5 text-[hsl(var(--spark-accent))] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default SparkCaseStudy;
