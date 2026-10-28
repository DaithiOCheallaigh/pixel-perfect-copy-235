import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { imgDims } from "@/data/imageDimensions";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import HiringCTA from "../components/HiringCTA";
import { projects } from "../data/projects";
import { caseStudyPath } from "../data/caseStudies";
import { SEO } from "../components/SEO";
import { LockKeyhole } from "lucide-react";

const listedProjects = projects.filter((p) => p.listed !== false && !p.comingSoon);
const moreProjects = ["booking-app", "spotify", "website-tipdirect", "ticketing"]
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

const Thumb = ({ project, eager, dim }: { project: Project; eager?: boolean; dim?: boolean }) => (
  <div className={`aspect-[4/3] w-full overflow-hidden rounded-lg bg-card md:w-40 ${dim ? "opacity-50" : ""}`}>
    <img
      src={project.pillImage}
      alt=""
      className="no-lightbox h-full w-full scale-[1.06] object-cover transition-transform duration-500 md:group-hover:scale-[1.1]"
      {...imgDims(project.pillImage)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  </div>
);

const ROW = "group grid grid-cols-1 gap-4 border-t border-border py-6 md:grid-cols-[3rem_1fr_1fr_10rem] md:items-center md:gap-6";

const ProjectRow = ({ project, n, last }: { project: Project; n: number; last: boolean }) => {
  const index = String(n).padStart(2, "0");
  const body = (
    <>
      <div className="flex items-baseline gap-4 md:block">
        <span className="font-mono-label text-muted-foreground">{index}</span>
        <span className="text-sm font-semibold text-primary md:hidden">{project.client}</span>
      </div>
      <div>
        <p className="text-base font-semibold text-foreground md:text-sm">{project.title}</p>
        <p className={`mt-1 text-sm text-muted-foreground md:text-xs ${project.comingSoon ? "" : "transition-colors group-hover:text-primary"}`}>{project.role}</p>
      </div>
      <div className="hidden md:block">
        <p className="text-sm font-semibold text-primary">{project.client}</p>
        <p className="font-mono-label mt-1 text-muted-foreground">{project.category}</p>
        {project.id === "spark" && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole className="h-3 w-3" aria-hidden="true" />Password protected</p>
        )}
      </div>
      {project.comingSoon ? (
        <div className="relative">
          <Thumb project={project} dim />
          <span className="font-mono-label absolute inset-0 flex items-center justify-center text-foreground">Coming soon</span>
        </div>
      ) : (
        <Thumb project={project} eager={n <= 2} />
      )}
    </>
  );
  const cls = `${ROW} ${last ? "border-b" : ""}`;
  return project.comingSoon ? (
    <div className={cls} aria-label={`${project.title} (coming soon)`}>{body}</div>
  ) : (
    <Link to={caseStudyPath(project.id)} aria-label={project.title} className={cls}>{body}</Link>
  );
};

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
          <p className="max-w-xl text-lg text-muted-foreground">
            Enterprise tools and design systems for Marsh, healthcare education for Elsevier, and the TipDirect tipping platform from first sketch to 10,000 daily users.
          </p>
        </ScrollReveal>

        <div className="mt-16">
          {listedProjects.map((project, i) => (
            <ProjectRow key={project.id} project={project} n={i + 1} last={!showMore && i === listedProjects.length - 1} />
          ))}
          {showMore && (
            <div id="more-work">
              {moreProjects.map((project, i) => (
                <ProjectRow key={project.id} project={project} n={listedProjects.length + i + 1} last={i === moreProjects.length - 1} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            aria-controls="more-work"
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-primary transition-colors hover:text-primary"
          >
            {showMore ? "Show fewer" : "See more work"} <span>{showMore ? "↑" : "→"}</span>
          </button>
        </div>

      </div>
    </section>

    <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
    <HiringCTA />
  </main>
  );
};

export default Work;
