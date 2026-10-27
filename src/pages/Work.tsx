import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { imgDims } from "@/data/imageDimensions";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import HiringCTA from "../components/HiringCTA";
import { projects } from "../data/projects";
import { caseStudyPath } from "../data/caseStudies";
import { ShineBorder } from "../components/ui/shine-border";
import { SEO } from "../components/SEO";
import { LockKeyhole } from "lucide-react";

const listedProjects = projects.filter((p) => p.listed !== false && !p.comingSoon);
const moreProjects = ["spotify", "website-tipdirect", "ticketing"]
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

const CARD = "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card";

const ComingSoonCard = ({ project }: { project: Project }) => (
  <div className={`${CARD} opacity-50`}>
    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
    <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-card">
      <img src={project.pillImage} alt={project.title} className="no-lightbox h-full w-full object-cover scale-[1.06]" {...imgDims(project.pillImage)} loading="lazy" decoding="async" />
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h3 className="text-lg font-bold text-foreground md:text-xl">{project.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{project.workDescription || project.subtitle}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono-label text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>
        <span className="font-mono-label text-muted-foreground">Coming Soon</span>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, i }: { project: Project; i: number }) => (
                <Link
                  to={caseStudyPath(project.id)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-card">
                    <img
                      src={project.pillImage}
                      alt={project.title}
                      className="no-lightbox h-full w-full object-cover scale-[1.06] transition-transform duration-500 md:group-hover:scale-[1.1]" {...imgDims(project.pillImage)} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">{project.workDescription || project.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono-label text-xs text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                      {project.id === "spark" ? (
                        <span className="inline-flex shrink-0 items-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-4 w-4" />Password protected · request access</span>
                      ) : (
                        <span className="text-lg text-muted-foreground transition-colors group-hover:text-primary">→</span>
                      )}
                    </div>
                  </div>
                </Link>
);

const Work = () => {
  const [showMore, setShowMore] = useState(false);
  return (
  <main className="pt-24">
    <SEO title="Work" description="Product design case studies by Dave Kelly: enterprise tools and design systems for Marsh, healthcare education for Elsevier, and TipDirect consumer apps." />
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
            My Work
          </h1>
          <p className="mb-16 max-w-xl text-lg text-muted-foreground">
            Enterprise tools and design systems for Marsh, healthcare education for Elsevier, and the TipDirect tipping platform from first sketch to 10,000 daily users.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 [&>*]:h-full">
          {listedProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} i={i} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            aria-controls="more-work"
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-primary transition-all hover:gap-3 hover:border-primary/40"
          >
            {showMore ? "Show fewer" : "See more work"} <span>{showMore ? "↑" : "→"}</span>
          </button>
        </div>

        {showMore && (
          <div id="more-work" className="mt-16 grid gap-8 sm:grid-cols-2 [&>*]:h-full">
            {moreProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.08}>
                {project.comingSoon ? <ComingSoonCard project={project} /> : <ProjectCard project={project} i={2} />}
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>

    <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
    <HiringCTA />
  </main>
  );
};

export default Work;
