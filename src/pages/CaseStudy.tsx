import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { projects } from "../data/projects";

const ImageGallery = ({ images }: { images: { src: string; alt: string; wide?: boolean }[] }) => {
  const elements: JSX.Element[] = [];
  let nonWideBuffer: typeof images = [];

  images.forEach((img, i) => {
    if (img.wide) {
      if (nonWideBuffer.length > 0) {
        const cols = nonWideBuffer.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
        elements.push(
          <div key={`grid-${i}`} className={`grid gap-2 ${cols}`}>
            {nonWideBuffer.map((nwImg, j) => (
              <ScrollReveal key={j} delay={j * 0.05}>
                <div className="overflow-hidden rounded-sm">
                  <img src={nwImg.src} alt={nwImg.alt} className="w-full object-cover" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        );
        nonWideBuffer = [];
      }
      elements.push(
        <ScrollReveal key={`wide-${i}`}>
          <div className="overflow-hidden rounded-sm">
            <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
          </div>
        </ScrollReveal>
      );
    } else {
      nonWideBuffer.push(img);
      if (nonWideBuffer.length === 3) {
        elements.push(
          <div key={`grid-${i}`} className="grid gap-2 md:grid-cols-3">
            {nonWideBuffer.map((nwImg, j) => (
              <ScrollReveal key={j} delay={j * 0.05}>
                <div className="overflow-hidden rounded-sm">
                  <img src={nwImg.src} alt={nwImg.alt} className="w-full object-cover" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        );
        nonWideBuffer = [];
      }
    }
  });

  if (nonWideBuffer.length > 0) {
    const cols = nonWideBuffer.length >= 3 ? "md:grid-cols-3" : nonWideBuffer.length === 2 ? "md:grid-cols-2" : "";
    elements.push(
      <div key="grid-final" className={`grid gap-2 ${cols}`}>
        {nonWideBuffer.map((nwImg, j) => (
          <ScrollReveal key={j} delay={j * 0.05}>
            <div className="overflow-hidden rounded-sm">
              <img src={nwImg.src} alt={nwImg.alt} className="w-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    );
  }

  return <div className="space-y-2">{elements}</div>;
};

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
          <Link to="/work" className="mt-4 inline-block text-primary">← Back to Work</Link>
        </div>
      </main>
    );
  }

  // Separate images for inline placement vs gallery
  const inlineImages = project.images?.filter(img => 
    img.alt === "AI Review Steps" || img.alt === "Mixpanel analytics report"
  ) || [];
  const galleryImages = project.images?.filter(img => 
    img.alt !== "AI Review Steps" && img.alt !== "Mixpanel analytics report"
  ) || [];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="px-6 pt-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/work" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">← Back to Work</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="mb-4 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono-label text-primary">{tag}</span>
              ))}
            </div>
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">{project.title}</h1>
            <p className="mb-8 max-w-2xl text-lg text-muted-foreground">{project.subtitle}</p>
          </motion.div>

          <motion.div className="overflow-hidden rounded-sm" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <img src={project.headerImage} alt={project.title} className="w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Intro: Mobile image + description */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className={`grid gap-12 ${project.mobileImage ? "md:grid-cols-2" : ""}`}>
              {project.mobileImage && (
                <div className="flex items-start justify-center">
                  <img src={project.mobileImage} alt={`${project.title} mobile`} className="max-h-[500px] w-auto rounded-sm object-contain" loading="lazy" />
                </div>
              )}
              <div className="flex flex-col justify-center">
                {project.whatIWorkedOn && (
                  <div className="mb-6">
                    <span className="font-mono-label mb-2 block text-muted-foreground">What I Worked On</span>
                    <div className="flex flex-wrap gap-2">
                      {project.whatIWorkedOn.map((item) => (
                        <span key={item} className="rounded-sm bg-card px-3 py-1.5 text-xs font-semibold text-foreground">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  <span className="font-mono-label mb-1 block text-muted-foreground">Timeline</span>
                  <p className="text-sm font-semibold text-foreground">{project.timeline}</p>
                </div>
                <SectionLabel>Overview</SectionLabel>
                <div className="space-y-4">
                  {project.description.split("\n\n").map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
                {project.toolsImage && (
                  <div className="mt-8">
                    <span className="font-mono-label mb-3 block text-muted-foreground">Tools</span>
                    <img src={project.toolsImage} alt="Tools used" className="max-w-xs" loading="lazy" />
                  </div>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-sm border border-border px-5 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                    View Live ↗
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Challenge */}
      {project.challenge && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>The Challenge</SectionLabel>
                <div className="space-y-4">
                  {project.challenge.split("\n\n").map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Exploration */}
      {(project.exploration || project.explorationDetail) && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>Exploration</SectionLabel>
                <div className="space-y-4">
                  {(project.explorationDetail || project.exploration || "").split("\n\n").map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            {project.explorationVideo && (
              <ScrollReveal>
                <div className="mt-8 overflow-hidden rounded-sm">
                  <video
                    src={project.explorationVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover"
                  />
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* Design Goals */}
      {project.designGoals && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Design Goals</SectionLabel>
              <div className="grid gap-4 md:grid-cols-3">
                {project.designGoals.map((goal, i) => (
                  <div key={i} className="rounded-sm bg-card p-6">
                    <h3 className="mb-2 text-sm font-bold text-foreground">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Trimming Down */}
      {project.trimmingDown && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>Trimming Down The Platform</SectionLabel>
                <div className="space-y-4">
                  {project.trimmingDown.split("\n\n").map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Engagement Considerations */}
      {project.engagementConsiderations && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Considerations for Enhancing User Engagement</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                {project.engagementConsiderations.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className="rounded-sm bg-card p-6">
                      <h3 className="mb-2 text-sm font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Research Findings */}
      {project.researchFindings && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Research Findings</SectionLabel>
              {project.researchIntro && (
                <p className="mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground">{project.researchIntro}</p>
              )}
              <div className="grid gap-4 md:grid-cols-3">
                {project.researchFindings.map((finding, i) => (
                  <div key={i} className="rounded-sm bg-card p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">{finding}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Building the Feature */}
      {project.buildingTheFeature && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>Building the Feature</SectionLabel>
                <p className="text-base leading-relaxed text-muted-foreground">{project.buildingTheFeature}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Inline image: AI Review Steps (after Building the Feature) */}
      {inlineImages.filter(img => img.alt === "AI Review Steps").map((img, i) => (
        <section key={`inline-steps-${i}`} className="px-6 py-4 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="overflow-hidden rounded-sm">
                <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Design Process */}
      {project.designProcess && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Design Process</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.designProcess.map((phase, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className="rounded-sm bg-card p-6">
                      <span className="font-mono-label text-primary">{phase.num}</span>
                      <h3 className="mt-2 text-base font-bold text-foreground">{phase.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{phase.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Design System Links */}
      {project.designSystemLinks && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Design System</SectionLabel>
              <p className="mb-4 text-sm text-muted-foreground">To explore the look and feel of the whole product, please see below</p>
              <div className="flex flex-wrap gap-3">
                {project.designSystemLinks.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Solution Intro + How It Works */}
      {project.solutionIntro && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>How The Solution Works</SectionLabel>
                <div className="space-y-4">
                  {project.solutionIntro.split("\n\n").map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* How It Works Steps */}
      {project.howItWorks && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            {!project.solutionIntro && (
              <ScrollReveal>
                <SectionLabel>How It Works</SectionLabel>
              </ScrollReveal>
            )}
            <div className="grid gap-6 md:grid-cols-3">
              {project.howItWorks.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="rounded-sm bg-card p-6">
                    <span className="font-mono-label text-primary">{step.step}</span>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Big Stats Callout */}
      {project.stats && project.stats.length > 0 && project.featureImpact && (
        <section className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="text-center">
                <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Avg Increase in 5 star reviews per company:{" "}
                  <span className="text-primary">
                    {project.stats.find(s => s.label.toLowerCase().includes("avg"))?.value || project.stats[0].value}
                  </span>
                </h2>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Sharing Methods */}
      {project.sharingMethods && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Sharing Methods</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {project.sharingMethods.map((method) => (
                  <span key={method} className="rounded-sm bg-card px-4 py-2 text-sm font-semibold text-foreground">{method}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Solution Detail (Spotify) */}
      {project.solutionDetail && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>The Solution</SectionLabel>
                <div className="space-y-4">
                  {project.solutionDetail.split("\n\n").map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Core Design Principles */}
      {project.coreDesignPrinciples && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Core Design Principles</SectionLabel>
              <div className="grid gap-4 md:grid-cols-3">
                {project.coreDesignPrinciples.map((p, i) => (
                  <div key={i} className="rounded-sm bg-card p-6">
                    <h3 className="mb-2 text-sm font-bold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Mobile Adaptations */}
      {project.mobileAdaptations && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Mobile-Specific Adaptations</SectionLabel>
              <div className="grid gap-4 md:grid-cols-3">
                {project.mobileAdaptations.map((a, i) => (
                  <div key={i} className="rounded-sm bg-card p-6">
                    <h3 className="mb-2 text-sm font-bold text-foreground">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Prototyping */}
      {project.prototyping && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>Building the Prototype</SectionLabel>
                <p className="text-base leading-relaxed text-muted-foreground">{project.prototyping}</p>
                {project.prototypeLink && (
                  <a href={project.prototypeLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                    View Prototype ↗
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Core Functionality */}
      {project.coreFunctionality && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Core Functionality</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                {project.coreFunctionality.map((f, i) => (
                  <div key={i} className="rounded-sm bg-card p-6">
                    <h3 className="mb-2 text-base font-bold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Features */}
      {project.features && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Key Features</SectionLabel>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature, i) => (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="rounded-sm bg-card p-5">
                      <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Alternative Integrations */}
      {project.alternativeIntegrations && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Other Integration Options</SectionLabel>
              <div className="grid gap-6 md:grid-cols-3">
                {project.alternativeIntegrations.map((alt, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="group rounded-sm bg-card overflow-hidden">
                      <div className="overflow-hidden">
                        <img src={alt.image} alt={alt.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-foreground">{alt.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{alt.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Launch & Analytics */}
      {project.launchAnalytics && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Launch & Analytics</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-sm bg-card p-6">
                  <h3 className="mb-3 text-base font-bold text-foreground">Documentation & Support</h3>
                  <ul className="space-y-2">
                    {project.launchAnalytics.documentation.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-sm bg-card p-6">
                  <h3 className="mb-3 text-base font-bold text-foreground">Analytics Implementation</h3>
                  <ul className="space-y-2">
                    {project.launchAnalytics.analytics.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Inline image: Mixpanel (after Launch & Analytics) */}
      {inlineImages.filter(img => img.alt === "Mixpanel analytics report").map((img, i) => (
        <section key={`inline-mixpanel-${i}`} className="px-6 py-4 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="overflow-hidden rounded-sm">
                <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Feature Impact */}
      {project.featureImpact && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Feature Impact</SectionLabel>
            </ScrollReveal>
            <div className="grid gap-4 md:grid-cols-3">
              {project.featureImpact.map((impact, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="rounded-sm bg-card p-8 text-center">
                    <span className="font-mono-label text-muted-foreground">{impact.period}</span>
                    <div className="mt-3 text-4xl font-black text-primary md:text-5xl">{impact.value}</div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{impact.label}</p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{impact.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Release & Reception */}
      {project.releaseReception && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>Release & Reception</SectionLabel>
                <div className="space-y-4">
                  {project.releaseReception.split("\n\n").map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Quote */}
      {project.quote && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <blockquote className="border-l-2 border-primary pl-6">
                <p className="text-lg italic text-foreground">"{project.quote.text}"</p>
                <cite className="mt-4 block text-sm font-semibold not-italic text-muted-foreground">— {project.quote.author}</cite>
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Stats / Key Results */}
      {project.stats && project.stats.length > 0 && !project.featureImpact && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Key Results</SectionLabel>
            </ScrollReveal>
            <div className={`grid gap-2 ${project.stats.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
              {project.stats.map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                   <div className="flex h-full flex-col items-center justify-center rounded-sm bg-card p-8 text-center">
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
      {galleryImages.length > 0 && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Gallery</SectionLabel>
            </ScrollReveal>
            <ImageGallery images={galleryImages} />
          </div>
        </section>
      )}

      {/* Next Project */}
      {nextProject && (
        <section className="px-6 py-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionLabel>Next Project</SectionLabel>
              <Link to={`/case/${nextProject.id}`} className="group flex items-center gap-6">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                  <img src={nextProject.pillImage} alt={nextProject.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary md:text-3xl">{nextProject.title}</h3>
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
