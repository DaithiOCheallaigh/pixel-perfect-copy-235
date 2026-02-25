import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { projects } from "../data/projects";

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const nextProject = project?.nextProject
    ? projects.find((p) => p.id === project.nextProject)
    : null;

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
          <Link to="/work" className="mt-4 inline-block text-primary">
            ← Back to Work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="px-6 pt-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/work" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">
              ← Back to Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono-label text-primary">{tag}</span>
              ))}
            </div>
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
              {project.title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-muted-foreground">{project.subtitle}</p>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={project.headerImage}
              alt={project.title}
              className="w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 border-b border-border pb-8">
          <div>
            <span className="font-mono-label text-muted-foreground">Timeline</span>
            <p className="text-sm font-semibold text-foreground">{project.timeline}</p>
          </div>
          {project.whatIWorkedOn && (
            <div>
              <span className="font-mono-label text-muted-foreground">What I Worked On</span>
              <p className="text-sm text-foreground">{project.whatIWorkedOn.join(", ")}</p>
            </div>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
            >
              View Live ↗
            </a>
          )}
        </div>
      </section>

      {/* Description */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl">
              <SectionLabel>Overview</SectionLabel>
              <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote */}
      {project.quote && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <blockquote className="border-l-2 border-primary pl-6">
                <p className="text-lg italic text-foreground">"{project.quote.text}"</p>
                <cite className="mt-4 block text-sm font-semibold not-italic text-muted-foreground">
                  — {project.quote.author}
                </cite>
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-2 md:grid-cols-3">
              {project.stats.map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="rounded-sm bg-card p-8 text-center">
                    <div className="text-4xl font-black text-primary md:text-5xl">{stat.value}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl space-y-2">
            {project.images.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-sm ${img.wide ? "" : "md:max-w-xl"}`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Next Project */}
      {nextProject && (
        <section className="px-6 py-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Next Project</SectionLabel>
              <Link
                to={`/case/${nextProject.id}`}
                className="group flex items-center gap-6"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                  <img
                    src={nextProject.pillImage}
                    alt={nextProject.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    {nextProject.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{nextProject.subtitle}</p>
                </div>
                <span className="ml-auto text-3xl text-muted-foreground transition-colors group-hover:text-primary">→</span>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>
  );
};

export default CaseStudy;
