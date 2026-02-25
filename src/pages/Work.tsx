import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { projects } from "../data/projects";

const Work = () => (
  <main className="pt-24">
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
            My Work
          </h1>
          <p className="mb-16 max-w-xl text-lg text-muted-foreground">
            A selection of projects spanning UI/UX design, product strategy, and digital transformation.
          </p>
        </ScrollReveal>

        <div className="space-y-1">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.05}>
              {project.comingSoon ? (
                <div className="group flex items-center gap-6 border-b border-border py-6 opacity-50">
                  <img
                    src={project.pillImage}
                    alt={project.title}
                    className="h-16 w-16 rounded-sm object-cover md:h-20 md:w-20"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground md:text-xl">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.workDescription || project.subtitle}</p>
                  </div>
                  <span className="font-mono-label text-muted-foreground">Coming Soon</span>
                </div>
              ) : (
                <Link
                  to={`/case/${project.id}`}
                  className="group flex items-center gap-6 border-b border-border py-6 transition-all hover:pl-2"
                >
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm md:h-20 md:w-20">
                    <img
                      src={project.pillImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.workDescription || project.subtitle}</p>
                  </div>
                  <div className="hidden flex-wrap gap-2 md:flex">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono-label text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <span className="text-xl text-muted-foreground transition-colors group-hover:text-primary">→</span>
                </Link>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
    <AvailabilityCTA />
  </main>
);

export default Work;
