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

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              {project.comingSoon ? (
                <div className="group overflow-hidden rounded-xl border border-border bg-card opacity-50">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.pillImage}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground md:text-xl">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.workDescription || project.subtitle}</p>
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
              ) : (
                <Link
                  to={`/case/${project.id}`}
                  className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.pillImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.workDescription || project.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono-label text-xs text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                      <span className="text-lg text-muted-foreground transition-colors group-hover:text-primary">→</span>
                    </div>
                  </div>
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
