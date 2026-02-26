import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { projects } from "../data/projects";

const ImageGallery = ({ images }: {images: {src: string;alt: string;wide?: boolean;}[];}) => {
  const elements: JSX.Element[] = [];
  let nonWideBuffer: typeof images = [];

  images.forEach((img, i) => {
    if (img.wide) {
      if (nonWideBuffer.length > 0) {
        const cols = nonWideBuffer.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
        elements.push(
          <div key={`grid-${i}`} className={`grid gap-2 ${cols}`}>
            {nonWideBuffer.map((nwImg, j) =>
            <ScrollReveal key={j} delay={j * 0.05}>
                <div className="overflow-hidden rounded-xl shadow-md">
                  <img src={nwImg.src} alt={nwImg.alt} className="w-full object-cover" loading="lazy" />
                </div>
              </ScrollReveal>
            )}
          </div>
        );
        nonWideBuffer = [];
      }
      elements.push(
        <ScrollReveal key={`wide-${i}`}>
          <div className="overflow-hidden rounded-xl shadow-md">
            <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
          </div>
        </ScrollReveal>
      );
    } else {
      nonWideBuffer.push(img);
      if (nonWideBuffer.length === 3) {
        elements.push(
          <div key={`grid-${i}`} className="grid gap-2 md:grid-cols-3">
            {nonWideBuffer.map((nwImg, j) =>
            <ScrollReveal key={j} delay={j * 0.05}>
                <div className="overflow-hidden rounded-xl shadow-md">
                  <img src={nwImg.src} alt={nwImg.alt} className="w-full object-cover" loading="lazy" />
                </div>
              </ScrollReveal>
            )}
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
        {nonWideBuffer.map((nwImg, j) =>
        <ScrollReveal key={j} delay={j * 0.05}>
            <div className="overflow-hidden rounded-xl shadow-md">
              <img src={nwImg.src} alt={nwImg.alt} className="w-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        )}
      </div>
    );
  }

  return <div className="space-y-4">{elements}</div>;
};

const CaseStudy = () => {
  const { id } = useParams<{id: string;}>();
  const project = projects.find((p) => p.id === id);
  const nextProject = project?.nextProject ?
  projects.find((p) => p.id === project.nextProject) :
  null;

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
          <Link to="/work" className="mt-4 inline-block text-primary">← Back to Work</Link>
        </div>
      </main>);

  }

  // Separate images for inline placement vs gallery
  const inlineImages = project.images?.filter((img) =>
  img.alt === "AI Review Steps" || img.alt === "Mixpanel analytics report"
  ) || [];
  const galleryImages = project.images?.filter((img) =>
  img.alt !== "AI Review Steps" && img.alt !== "Mixpanel analytics report"
  ) || [];

  // Get the small screenshots for the 3-step cards
  const stepImages = project.images?.filter((img) =>
  ["NFC tap", "Create review", "Review output"].includes(img.alt)
  ) || [];

  return (
    <main className="pt-24">
      {/* Hero — Title left, stacked mockups right */}
      <section className="px-6 pt-8 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/work" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">← Back to Work</Link>
          </motion.div>

          <motion.div
            className="grid gap-12 md:grid-cols-[1.2fr_1fr] items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

            {/* Left: title + description + tags */}
            <div className="flex flex-col">
              {project.client &&
              <span className="font-mono-label mb-4 text-muted-foreground">{project.client}</span>
              }
              <h1 className="mb-6 text-4xl font-black tracking-tighter text-foreground md:text-5xl">{project.title}</h1>
              <div className="space-y-4 mb-6">
                {project.description.split("\n\n").map((p, i) =>
                <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                )}
              </div>
              
              {/* Tags/tools row */}
              {project.whatIWorkedOn &&
              <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.whatIWorkedOn.map((item) =>
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item}</span>
                  )}
                  </div>
                </div>
              }

              <div className="mb-4">
                <span className="font-mono-label text-muted-foreground">Timeline: </span>
                <span className="text-sm font-semibold text-foreground">{project.timeline}</span>
              </div>

              {project.toolsImage &&
              <div className="mb-6">
                  <span className="font-mono-label mb-2 block text-muted-foreground">Tools</span>
                  <img src={project.toolsImage} alt="Tools used" className="max-w-xs" loading="lazy" />
                </div>
              }

              {project.liveLink &&
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
                  View Live ↗
                </a>
              }
            </div>

            {/* Right: stacked mobile mockups */}
            {project.mobileImage &&
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                  src={project.mobileImage}
                  alt={`${project.title} mobile mockup`}
                  className="max-h-[520px] w-auto rounded-xl object-contain shadow-lg"
                  loading="lazy" />

                </div>
              </div>
            }
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
            <div className="space-y-20">
              {/* The Challenge */}
              {project.challenge &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>The Challenge</SectionLabel>
                    <div className="space-y-4">
                      {project.challenge.split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Exploration */}
              {(project.exploration || project.explorationDetail) &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Exploration</SectionLabel>
                    <div className="space-y-4 mb-6">
                      {(project.explorationDetail || project.exploration || "").split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                    </div>
                    {project.explorationVideo &&
                <div className="overflow-hidden rounded-xl shadow-md">
                        <video
                    src={project.explorationVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover" />

                      </div>
                }
                  </div>
                </ScrollReveal>
            }

              {/* Research Findings */}
              {project.researchFindings &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Research Findings</SectionLabel>
                    {project.researchIntro &&
                <p className="mb-8 text-[15px] leading-[1.7] text-muted-foreground">{project.researchIntro}</p>
                }
                    <div className="grid gap-8 md:grid-cols-2 mb-8">
                      {project.researchFindings.map((finding, i) => {
                    const [title, ...rest] = finding.split(": ");
                    const content = rest.join(": ");
                    return (
                      <div key={i}>
                            <h3 className="mb-3 text-base font-bold text-foreground">{title}</h3>
                            <ul className="space-y-2">
                              {content.split(". ").filter(Boolean).map((point, j) =>
                          <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                  {point.endsWith(".") ? point : `${point}.`}
                                </li>
                          )}
                            </ul>
                          </div>);

                  })}
                    </div>
                    {/* Research images side by side */}
                    {galleryImages.filter((img) => ["Group overview"].includes(img.alt)).length > 0 &&
                <div className="grid gap-4 md:grid-cols-2">
                        {galleryImages.filter((img) => !img.wide).slice(0, 2).map((img, i) =>
                  <div key={i} className="overflow-hidden rounded-xl shadow-md">
                            <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                          </div>
                  )}
                      </div>
                }
                  </div>
                </ScrollReveal>
            }

              {/* Building the Feature */}
              {project.buildingTheFeature &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Building the Feature</SectionLabel>
                    <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.buildingTheFeature}</p>
                    {/* Inline image: AI Review Steps */}
                    {inlineImages.filter((img) => img.alt === "AI Review Steps").map((img, i) =>
                <div key={i} className="overflow-hidden rounded-xl shadow-md">
                        <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                      </div>
                )}
                  </div>
                </ScrollReveal>
            }

              {/* Design Goals */}
              {project.designGoals &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Design Goals</SectionLabel>
                    <div className="grid gap-4 md:grid-cols-3">
                      {project.designGoals.map((goal, i) =>
                  <div key={i} className="rounded-xl bg-card p-6">
                          <h3 className="mb-2 text-sm font-bold text-foreground">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.desc}</p>
                        </div>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Trimming Down */}
              {project.trimmingDown &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Trimming Down The Platform</SectionLabel>
                    <div className="space-y-4">
                      {project.trimmingDown.split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Engagement Considerations */}
              {project.engagementConsiderations &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Considerations for Enhancing User Engagement</SectionLabel>
                    <div className="grid gap-4 md:grid-cols-2">
                      {project.engagementConsiderations.map((item, i) =>
                  <div key={i} className="rounded-xl bg-card p-6">
                          <h3 className="mb-2 text-sm font-bold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Design System Links */}
              {project.designSystemLinks &&
            <ScrollReveal>
                  <div className="text-center">
                    <SectionLabel>Design System</SectionLabel>
                    <p className="mb-6 text-[15px] text-muted-foreground">To explore the look and feel of the whole product, please see below</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {project.designSystemLinks.map((link) =>
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                          {link.label} ↗
                        </a>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Solution Intro + How It Works */}
              {project.solutionIntro &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>How The Solution Works</SectionLabel>
                    <div className="space-y-4">
                      {project.solutionIntro.split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Design Process */}
              {project.designProcess &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Design Process</SectionLabel>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {project.designProcess.map((phase, i) =>
                  <ScrollReveal key={i} delay={i * 0.08}>
                          <div className="rounded-xl bg-card p-6">
                            <span className="font-mono-label text-primary">{phase.num}</span>
                            <h3 className="mt-2 text-base font-bold text-foreground">{phase.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{phase.desc}</p>
                          </div>
                        </ScrollReveal>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Numbered Feature Steps (3-column cards with screenshots) */}
              {project.howItWorks &&
            <div>
                  {!project.solutionIntro &&
              <ScrollReveal>
                      <SectionLabel>How It Works</SectionLabel>
                    </ScrollReveal>
              }
                  <div className="grid gap-6 md:grid-cols-3">
                    {project.howItWorks.map((step, i) =>
                <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                        <div className="flex h-full flex-col rounded-xl bg-card overflow-hidden">
                          {/* Screenshot on top */}
                          {stepImages[i] &&
                    <div className="overflow-hidden bg-card">
                              <img src={stepImages[i].src} alt={stepImages[i].alt} className="w-full object-cover" loading="lazy" />
                            </div>
                    }
                          <div className="p-6">
                            <span className="text-2xl font-black text-foreground">{step.step}.</span>
                            <h3 className="mt-1 text-xl font-bold text-foreground">{step.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                )}
                  </div>
                </div>
            }
            </div>
        </div>
      </div>

      {/* Full-width sections below the sidebar layout */}

      {/* Big Stats Callout — centered large text */}
      {project.stats && project.stats.length > 0 && project.featureImpact &&
      <section className="px-6 py-20 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center">
                <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Avg Increase in 5 star reviews per company:{" "}
                  <span className="text-primary">
                    {project.stats.find((s) => s.label.toLowerCase().includes("avg"))?.value || project.stats[0].value}
                  </span>
                </h2>
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Sharing Methods */}
      {project.sharingMethods &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Sharing Methods</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {project.sharingMethods.map((method) =>
              <span key={method} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{method}</span>
              )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Solution Detail */}
      {project.solutionDetail &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>The Solution</SectionLabel>
                <div className="space-y-4">
                  {project.solutionDetail.split("\n\n").map((p, i) =>
                <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Core Design Principles */}
      {project.coreDesignPrinciples &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Core Design Principles</SectionLabel>
              <div className="grid gap-4 md:grid-cols-3">
                {project.coreDesignPrinciples.map((p, i) =>
              <div key={i} className="rounded-xl bg-card p-6">
                    <h3 className="mb-2 text-sm font-bold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
              )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Mobile Adaptations */}
      {project.mobileAdaptations &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Mobile-Specific Adaptations</SectionLabel>
              <div className="grid gap-4 md:grid-cols-3">
                {project.mobileAdaptations.map((a, i) =>
              <div key={i} className="rounded-xl bg-card p-6">
                    <h3 className="mb-2 text-sm font-bold text-foreground">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                  </div>
              )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Prototyping */}
      {project.prototyping &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>Building the Prototype</SectionLabel>
                <p className="text-[15px] leading-[1.7] text-muted-foreground">{project.prototyping}</p>
                {project.prototypeLink &&
              <a href={project.prototypeLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                    View Prototype ↗
                  </a>
              }
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Core Functionality */}
      {project.coreFunctionality &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Core Functionality</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                {project.coreFunctionality.map((f, i) =>
              <div key={i} className="rounded-xl bg-card p-6">
                    <h3 className="mb-2 text-base font-bold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
              )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Features */}
      {project.features &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Key Features</SectionLabel>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature, i) =>
              <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="rounded-xl bg-card p-5">
                      <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </ScrollReveal>
              )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Alternative Integrations */}
      {project.alternativeIntegrations &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Other Integration Options</SectionLabel>
              <div className="grid gap-6 md:grid-cols-3">
                {project.alternativeIntegrations.map((alt, i) =>
              <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="group overflow-hidden rounded-xl bg-card">
                      <div className="overflow-hidden">
                        <img src={alt.image} alt={alt.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-foreground">{alt.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{alt.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
              )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Launch & Analytics — two-column */}
      {project.launchAnalytics &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Launch & Analytics</SectionLabel>
              <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">After launching our AI review feature, we implemented a comprehensive approach to ensure successful adoption and measure impact:</p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-card p-6">
                  <h3 className="mb-4 text-base font-bold text-foreground">Documentation & Support</h3>
                  <ul className="space-y-3">
                    {project.launchAnalytics.documentation.map((item, i) =>
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                  )}
                  </ul>
                </div>
                <div className="rounded-xl bg-card p-6">
                  <h3 className="mb-4 text-base font-bold text-foreground">Analytics Implementation</h3>
                  <ul className="space-y-3">
                    {project.launchAnalytics.analytics.map((item, i) =>
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Inline image: Mixpanel (after Launch & Analytics) */}
      {inlineImages.filter((img) => img.alt === "Mixpanel analytics report").map((img, i) =>
      <section key={`inline-mixpanel-${i}`} className="px-6 py-4 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="overflow-hidden rounded-xl shadow-md">
                <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Feature Impact — 3 stat columns with accent color */}
      {project.featureImpact &&
      <section className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Feature Impact</SectionLabel>
            </ScrollReveal>
            <div className="grid grid-rows-1 gap-6 md:grid-cols-3">
              {project.featureImpact.map((impact, i) =>
            <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                  <div className="flex h-full flex-col rounded-xl bg-card p-8">
                    <span className="font-mono-label text-muted-foreground">{impact.period}</span>
                    <div className="mt-3 text-3xl font-black text-primary md:text-4xl">{impact.value}</div>
                    <p className="mt-3 text-sm font-semibold text-foreground">{impact.label}</p>
                    <p className="mt-auto pt-2 text-xs leading-relaxed text-muted-foreground">{impact.description}</p>
                  </div>
                </ScrollReveal>
            )}
            </div>
          </div>
        </section>
      }

      {/* Release & Reception */}
      {project.releaseReception &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionLabel>Release & Reception</SectionLabel>
                <div className="space-y-4">
                  {project.releaseReception.split("\n\n").map((p, i) =>
                <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Quote */}
      {project.quote &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <blockquote className="border-l-2 border-primary pl-6">
                <p className="text-lg italic text-foreground">"{project.quote.text}"</p>
                <cite className="mt-4 block text-sm font-semibold not-italic text-muted-foreground">— {project.quote.author}</cite>
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Stats / Key Results (for projects without featureImpact) */}
      {project.stats && project.stats.length > 0 && !project.featureImpact &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Key Results</SectionLabel>
            </ScrollReveal>
            <div className={`grid gap-4 ${project.stats.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
              {project.stats.map((stat, i) =>
            <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex h-full flex-col items-center justify-center rounded-xl bg-card p-8 text-center">
                    <div className="text-4xl font-black text-primary md:text-5xl">{stat.value}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </ScrollReveal>
            )}
            </div>
          </div>
        </section>
      }

      {/* Image Gallery */}
      {galleryImages.length > 0 &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          





        </section>
      }

      {/* Next Project — full-width card with background */}
      {nextProject &&
      <section className="px-6 py-20 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Next Project</SectionLabel>
              <Link
              to={`/case/${nextProject.id}`}
              className="group relative block overflow-hidden rounded-2xl">

                <div className="relative h-64 md:h-80">
                  <img
                  src={nextProject.headerImage}
                  alt={nextProject.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="font-mono-label mb-2 block text-white/70">Up Next</span>
                    <h3 className="text-2xl font-black text-white md:text-4xl">{nextProject.title}</h3>
                    <p className="mt-1 text-sm text-white/70">{nextProject.subtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-all group-hover:gap-3">
                      View Project →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      }

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>);

};

export default CaseStudy;