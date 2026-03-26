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
              
            </div>
          </ScrollReveal>
        )}
      </div>
    );
  }

  return <div className="space-y-2">{elements}</div>;
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

  // For booking-app, images are placed inline with sections, not in gallery
  const bookingAppInlineAlts = [
  "User journey map", "App screens", "Design artboard", "Architecture wireframes",
  "iOS Style Guide", "Booking system", "High definition renders", "Shop integration"];

  // For whitelabel, all images are placed inline
  const whitelabelInlineAlts = [
  "Atomic design system", "Passenger journey map", "Displaying tours",
  "Tour option UI", "Design overview", "Ticketing system slider"];

  // For digital-tipping, all images are placed inline in specific sections
  const digitalTippingInlineAlts = [
  "Tech stack", "Survey example", "Mind map", "Research document",
  "User flow", "Stats overview", "Stats detail 1", "Stats detail 2", "Stats detail 3"];

  const galleryImages = project.images?.filter((img) =>
  img.alt !== "AI Review Steps" && img.alt !== "Mixpanel analytics report" &&
  !(project.id === "booking-app" && bookingAppInlineAlts.includes(img.alt)) &&
  !(project.id === "whitelabel" && whitelabelInlineAlts.includes(img.alt)) &&
  !(project.id === "digital-tipping" && digitalTippingInlineAlts.includes(img.alt))
  ) || [];

  // Helper to find booking-app images by alt
  const findImage = (alt: string) => project.images?.find((img) => img.alt === alt);

  // Get the small screenshots for the 3-step cards
  const stepImages = project.images?.filter((img) =>
  ["NFC tap", "Create review", "Review output"].includes(img.alt)
  ) || [];

  return (
    <main className="pt-24">
      {/* Whitelabel / Digital Tipping: Full-width hero image */}
      {(project.id === "whitelabel" || project.id === "digital-tipping") &&
      <section className="px-6 pb-8 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <Link to="/work" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">← Back to Work</Link>
            </motion.div>
            {project.id === "whitelabel" &&
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6 }}>
              <h1 className="mb-2 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">{project.title}</h1>
              <p className="mb-8 text-lg text-muted-foreground">{project.subtitle}</p>
            </motion.div>
          }
          </div>
          <motion.div className="mx-auto max-w-5xl overflow-hidden rounded-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            <img src={project.headerImage} alt={project.title} className="w-full object-cover" />
          </motion.div>
        </section>
      }

      {/* Hero — Title left, stacked mockups right (non-whitelabel) */}
      {project.id !== "whitelabel" && project.id !== "digital-tipping" &&
      <section className="px-6 pt-8 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/work" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">← Back to Work</Link>
          </motion.div>

          {/* Hero subtitle for pages like website-tipdirect, tipdirect-app, booking-app */}
          {project.heroSubtitle &&
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6 }}>
              <h1 className="mb-2 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">{project.title}</h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">{project.heroSubtitle}</p>
            </motion.div>
          }

          <motion.div
            className="grid gap-12 md:grid-cols-[1.2fr_1fr] items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

            {/* Left: title + description + tags */}
            <div className="flex flex-col">
              {/* Client logo */}
              {project.clientLogo ?
              <div className="mb-6">
                  <img src={project.clientLogo} alt={project.client || "Client"} className={`max-h-20 w-auto object-contain ${project.clientLogoDark ? 'dark:hidden' : project.clientLogo?.includes('tripadmit') ? 'dark:brightness-0 dark:invert' : ''}`} loading="lazy" />
                  {project.clientLogoDark && <img src={project.clientLogoDark} alt={project.client || "Client"} className="max-h-20 w-auto object-contain hidden dark:block" loading="lazy" />}
                </div> :
              project.client ?
              <span className="font-mono-label mb-4 text-muted-foreground">{project.client}</span> :
              null}
              
              {!project.heroSubtitle &&
              <h1 className="mb-6 text-4xl font-black tracking-tighter text-foreground md:text-5xl">{project.title}</h1>
              }
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
                  <img src={project.toolsImage} alt="Tools used" className="max-w-[200px]" loading="lazy" />
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
      }

      {/* Whitelabel / Digital Tipping: Intro section — left: logo + what I worked on + timeline; right: heading + description + tools */}
      {(project.id === "whitelabel" || project.id === "digital-tipping") &&
      <section className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
            className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              {/* Left: logo + what I worked on + timeline */}
              <div className="flex flex-col">
                {project.clientLogo &&
              <div className="mb-8">
                    <img src={project.clientLogo} alt={project.client || "Client"} className={`max-h-20 w-auto object-contain ${project.clientLogoDark ? 'dark:hidden' : project.clientLogo?.includes('tripadmit') ? 'dark:brightness-0 dark:invert' : ''}`} loading="lazy" />
                    {project.clientLogoDark && <img src={project.clientLogoDark} alt={project.client || "Client"} className="max-h-20 w-auto object-contain hidden dark:block" loading="lazy" />}
                  </div>
              }
                {project.whatIWorkedOn &&
              <div className="mb-8">
                    <h3 className="mb-3 text-sm font-bold text-foreground">What I Worked On</h3>
                    <ul className="space-y-1">
                      {project.whatIWorkedOn.map((item) =>
                  <li key={item} className="text-sm text-muted-foreground">{item}</li>
                  )}
                    </ul>
                  </div>
              }
                <div className="mb-6">
                  <span className="text-sm font-bold text-foreground">Timeline: </span>
                  <span className="text-sm text-foreground">{project.timeline}</span>
                </div>
                {project.liveLink &&
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90">
                    View Live ↗
                  </a>
              }
              </div>

              {/* Right: heading + description + tools */}
              <div className="flex flex-col">
                <h2 className="mb-6 text-3xl font-black tracking-tight text-foreground md:text-4xl">{project.id === "whitelabel" ? "An Untapped Revenue Stream" : project.title}</h2>
                <div className="space-y-4 mb-8">
                  {project.description.split("\n\n").map((p, i) =>
                <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                )}
                </div>
                {project.toolsImage &&
              <div>
                    <span className="text-sm font-bold text-foreground mb-3 block">Tools:</span>
                    <img src={project.toolsImage} alt="Tools used" className="max-w-md" loading="lazy" />
                  </div>
              }
              </div>
            </motion.div>
          </div>
        </section>
      }

      {/* Vimeo Video Embed */}
      {project.vimeoEmbed &&
      <section className="px-6 py-8 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="overflow-hidden rounded-xl shadow-md" style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                src={project.vimeoEmbed}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Video walkthrough" />

              </div>
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
            <div className="space-y-20">
              {/* The Challenge */}
              {project.challenge &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>The Challenge</SectionLabel>
                    {project.challengeImage ?
                <div className={`grid gap-12 md:grid-cols-2 items-start ${project.challengeImageRight ? 'md:[&>*:first-child]:order-2' : ''}`}>
                      <div className="overflow-hidden rounded-xl shadow-md">
                        <img src={project.challengeImage} alt="Challenge" className="w-full object-cover" loading="lazy" />
                      </div>
                      <div className="space-y-4">
                        {project.challenge.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                    </div> :

                <div className="space-y-4">
                      {project.challenge.split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                    </div>
                }
                  </div>
                </ScrollReveal>
            }

              {/* Full-width image before Initial Approach (booking-app: User journey map) */}
              {project.id === "booking-app" && findImage("User journey map") &&
            <ScrollReveal>
                  <div className="overflow-hidden rounded-xl shadow-md">
                    <img src={findImage("User journey map")!.src} alt="User journey map" className="w-full object-cover" loading="lazy" />
                  </div>
                </ScrollReveal>
            }

              {/* Image Gallery (non-booking-app) */}
              {project.id !== "booking-app" && galleryImages.length > 0 &&
            <ScrollReveal>
                  <ImageGallery images={galleryImages} />
                </ScrollReveal>
            }

              {/* Initial Approach (Booking App) — 2-column: text left, image right */}
              {project.initialApproach &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Initial Approach & User Journey Map</SectionLabel>
                    <div className="grid gap-8 md:grid-cols-2 items-start">
                      <div className="space-y-4">
                        {project.initialApproach.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                      {findImage("App screens") &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={findImage("App screens")!.src} alt="App screens" className="w-full object-cover" loading="lazy" />
                        </div>
                  }
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
                    {/* Exploration images (e.g. Spotify) */}
                    {project.id === "spotify" && project.images &&
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                        {project.images.filter((img) => ["Spotify integration concept", "Placement options"].includes(img.alt)).map((img, i) =>
                  <div key={i} className="overflow-hidden rounded-xl shadow-md">
                            <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                          </div>
                  )}
                      </div>
                }
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

              {/* Whitelabel: Passenger Journey Map (full-width) */}
              {project.id === "whitelabel" && findImage("Passenger journey map") &&
            <ScrollReveal>
                  <div className="overflow-hidden rounded-xl shadow-md">
                    <img src={findImage("Passenger journey map")!.src} alt="Passenger journey map" className="w-full object-cover" loading="lazy" />
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Understanding the Journey — 2-column */}
              {project.journeyUnderstanding &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Understanding the Journey</SectionLabel>
                    <div className="grid gap-12 md:grid-cols-2 items-start">
                      <div className="space-y-4">
                        {project.journeyUnderstanding.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                      {project.journeyStages &&
                  <div>
                          <p className="mb-4 text-[15px] font-semibold text-foreground">Key stages included:</p>
                          <ul className="space-y-4">
                            {project.journeyStages.map((stage, i) =>
                      <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                                <span className="font-bold text-foreground">{stage.phase}:</span> {stage.text}
                              </li>
                      )}
                          </ul>
                        </div>
                  }
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Atomic Design System — full-width image + 2-column text */}
              {project.atomicDesignSystem &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>An Atomic Design System</SectionLabel>
                    {findImage("Atomic design system") &&
                <div className="mb-10 overflow-hidden rounded-xl shadow-md">
                        <img src={findImage("Atomic design system")!.src} alt="Atomic design system" className="w-full object-cover" loading="lazy" />
                      </div>
                }
                    <div className="grid gap-12 md:grid-cols-2 items-start">
                      <div className="space-y-4 text-[15px] leading-[1.7] text-muted-foreground" dangerouslySetInnerHTML={{
                    __html: project.atomicDesignSystem.split("\n\n").map((p) => {
                      const formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
                      return `<p>${formatted}</p>`;
                    }).join('')
                  }} />
                      {project.atomicDesignSystemRight &&
                  <div className="space-y-4">
                          {project.atomicDesignSystemRight.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                        </div>
                  }
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Displaying Tours — 2-column: text left, image right */}
              {project.displayingTours &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Displaying Tours</SectionLabel>
                    <div className="grid gap-12 md:grid-cols-2 items-start">
                      <div className="space-y-4">
                        {project.displayingTours.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                      {findImage("Displaying tours") &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={findImage("Displaying tours")!.src} alt="Displaying tours" className="w-full object-cover" loading="lazy" />
                        </div>
                  }
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Activity Detail Page — 2-column: image left, text right */}
              {project.activityDetailPage &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Activity Detail Page Template</SectionLabel>
                    <div className="grid gap-12 md:grid-cols-2 items-start">
                      {findImage("Tour option UI") &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={findImage("Tour option UI")!.src} alt="Tour option UI" className="w-full object-cover" loading="lazy" />
                        </div>
                  }
                      <div className="space-y-4">
                        {project.activityDetailPage.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Full-width design overview (ANA screens) */}
              {project.id === "whitelabel" && findImage("Design overview") &&
            <ScrollReveal>
                  <div className="overflow-hidden rounded-xl shadow-md">
                    <img src={findImage("Design overview")!.src} alt="Design overview" className="w-full object-cover" loading="lazy" />
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Closing text — 2-column */}
              {project.closingTextLeft &&
            <ScrollReveal>
                  <div className="grid gap-12 md:grid-cols-2 items-start">
                    <div className="space-y-4">
                      {project.closingTextLeft.split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                    </div>
                    {project.closingTextRight &&
                <div className="space-y-4">
                        {project.closingTextRight.split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                      </div>
                }
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Scaling the White-Label Solution — 2-column: text left, video right */}
              {project.scalingPartnership &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Scaling the White-Label Solution: Global Airline Partnerships</SectionLabel>
                    <div className="grid gap-12 md:grid-cols-2 items-start">
                      <div className="space-y-4">
                        {project.scalingPartnership.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                      {project.scalingVideo &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                          <video
                      src={project.scalingVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full object-cover" />
                        </div>
                  }
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Whitelabel: Improving the Product — 2-column: PDF cover left, text right */}
              {project.improvingProduct &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Improving the Product</SectionLabel>
                    <div className="grid gap-12 md:grid-cols-2 items-start">
                      <div className="overflow-hidden rounded-xl shadow-md">
                        <img src="/images/work/app-pill6.webp" alt="White Label UX & Consumer Psychology Report" className="w-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="space-y-4 text-[15px] leading-[1.7] text-muted-foreground mb-6" dangerouslySetInnerHTML={{
                      __html: project.improvingProduct.split("\n\n").map((p) => {
                        const formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
                        return `<p>${formatted}</p>`;
                      }).join('')
                    }} />
                        {project.improvingProductReportLink &&
                    <a
                      href={project.improvingProductReportLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:opacity-90">

                          📄 View Report
                        </a>
                    }
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
            }

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
                    {galleryImages.filter((img) => ["Group overview"].includes(img.alt)).length > 0







                }
                  </div>
                </ScrollReveal>
            }

              {/* Digital Tipping: Research images 3-column grid with labels */}
              {project.id === "digital-tipping" &&
            <ScrollReveal>
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                { alt: "Survey example", label: "Tour Guide Tipping Survey", sublabel: "Personal Experience Questionnaire" },
                { alt: "Mind map", label: "Mindmap", sublabel: "Digital Tipping" },
                { alt: "Research document", label: "R&D", sublabel: "London Observations | 2024" }].
                map((item, i) => {
                  const img = findImage(item.alt);
                  if (!img) return null;
                  return (
                    <ScrollReveal key={i} delay={i * 0.1}>
                          <div className="overflow-hidden rounded-xl shadow-md">
                            <img src={img.src} alt={item.alt} className="w-full object-cover" loading="lazy" />
                          </div>
                        </ScrollReveal>);

                })}
                  </div>
                </ScrollReveal>
            }

              {/* Building the Feature */}
              {project.buildingTheFeature &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Building the Feature</SectionLabel>
                    <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.buildingTheFeature}</p>
                    {inlineImages.filter((img) => img.alt === "AI Review Steps").map((img, i) =>
                <div key={i} className="overflow-hidden rounded-xl shadow-md">
                        <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                      </div>
                )}
                  </div>
                </ScrollReveal>
            }

              {/* Digital Tipping: User flow diagram (full-width) before tipping flow */}
              {project.id === "digital-tipping" && findImage("User flow") &&
            <ScrollReveal>
                  <div className="overflow-hidden rounded-xl shadow-md bg-muted/30">
                    <img src={findImage("User flow")!.src} alt="User flow" className="w-full object-cover" loading="lazy" />
                  </div>
                </ScrollReveal>
            }

              {/* Tipping Flow */}
              {project.tippingFlow &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>{project.id === "spotify" ? "The Tipping Flow" : "Tipping Flow"}</SectionLabel>
                    {project.id === "spotify" ?
                <div className="space-y-6">
                        <div className="space-y-4">
                          {project.tippingFlow.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={project.images?.find(img => img.alt === "Tipping flow desktop")?.src || ""} alt="Spotify tipping flow" className="w-full object-contain" loading="lazy" />
                        </div>
                      </div> :

                <div className="grid gap-8 md:grid-cols-2 items-start">
                        <div className="space-y-4">
                          {project.tippingFlow.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                        </div>
                        {project.tippingFlowGif &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                            <img src={project.tippingFlowGif} alt="Tipping flow" className="w-full object-contain" loading="lazy" />
                          </div>
                  }
                      </div>
                }
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

              {/* Design System Description */}
              {project.designSystemDescription &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Design System</SectionLabel>
                    <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.designSystemDescription}</p>
                  </div>
                </ScrollReveal>
            }

              {/* Design System Links */}
              {project.designSystemLinks &&
            <ScrollReveal>
                  <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-center">Design System</h2>
                    <p className="mb-6 text-[15px] text-muted-foreground">To explore the look and feel of the whole product, please see below</p>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                      {project.designSystemLinks.map((link) =>
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:opacity-90">
                          {link.label === "Design System" ? "🖥 " : "🧩 "}{link.label}
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

              {/* Detailed Design Process Phases */}
              {project.designProcessDetails &&
            project.designProcessDetails.map((phase, i) =>
            <ScrollReveal key={`phase-${i}`}>
                    <div>
                      <SectionLabel>{`${phase.num}/ ${phase.title}`}</SectionLabel>
                      <div className="space-y-4 mb-6">
                        {phase.text.split("\n").filter(Boolean).map((line, j) => {
                    if (line.startsWith("- ")) {
                      return (
                        <li key={j} className="ml-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {line.replace("- ", "")}
                              </li>);

                    }
                    return <p key={j} className="text-[15px] leading-[1.7] text-muted-foreground">{line}</p>;
                  })}
                      </div>
                      {phase.outcomes &&
                <div className="rounded-xl bg-card p-6 mb-6">
                          <h4 className="mb-2 text-sm font-bold text-foreground">Outcomes</h4>
                          <p className="text-sm text-muted-foreground">{phase.outcomes}</p>
                        </div>
                }
                      {phase.image &&
                <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={phase.image} alt={phase.title} className="w-full object-cover" loading="lazy" />
                        </div>
                }
                    </div>
                  </ScrollReveal>
            )
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

              {/* New Skills (Website TipDirect) */}
              {project.newSkills &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>A Chance to Grow My Skills</SectionLabel>
                    <div className="space-y-4">
                      {project.newSkills.split("\n\n").map((p, i) =>
                  <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  )}
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Component Focused (Website TipDirect) */}
              {project.componentFocused &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Component Focused</SectionLabel>
                    <p className="text-[15px] leading-[1.7] text-muted-foreground">{project.componentFocused}</p>
                  </div>
                </ScrollReveal>
            }

              {/* Wireframes row (Booking App) */}
              {project.id === "booking-app" &&
            <ScrollReveal>
                  <div className="space-y-4">
                    {[findImage("Design artboard"), findImage("Architecture wireframes")].filter(Boolean).map((img, i) =>
                <div key={i} className="overflow-hidden rounded-xl shadow-md">
                        <img src={img!.src} alt={img!.alt} className="w-full object-cover" loading="lazy" />
                      </div>
                )}
                  </div>
                </ScrollReveal>
            }

              {/* Component Library (Booking App) — 2-column: image left, text right */}
              {project.componentLibrary &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Component Library</SectionLabel>
                    <div className="grid gap-8 md:grid-cols-2 items-start">
                      {findImage("iOS Style Guide") &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={findImage("iOS Style Guide")!.src} alt="iOS Style Guide" className="w-full object-contain" loading="lazy" />
                        </div>
                  }
                      <div className="space-y-4">
                        {project.componentLibrary.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* Full-width booking showcase */}
              {project.id === "booking-app" && findImage("Booking system") &&
            <ScrollReveal>
                  <div className="overflow-hidden rounded-xl shadow-md">
                    <img src={findImage("Booking system")!.src} alt="Booking system" className="w-full object-cover" loading="lazy" />
                  </div>
                </ScrollReveal>
            }

              {/* Launch & Traction (Booking App) — 2-column: text left, image right */}
              {project.launchTraction &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>Launch & Traction</SectionLabel>
                    <div className="grid gap-8 md:grid-cols-2 items-start">
                      <div className="space-y-4">
                        {project.launchTraction.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                      {findImage("High definition renders") &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={findImage("High definition renders")!.src} alt="High definition renders" className="w-full object-cover" loading="lazy" />
                        </div>
                  }
                    </div>
                  </div>
                </ScrollReveal>
            }

              {/* eCommerce (Booking App) — 2-column: image left, text right */}
              {project.ecommerce &&
            <ScrollReveal>
                  <div>
                    <SectionLabel>e-Commerce Functionality</SectionLabel>
                    <div className="grid gap-8 md:grid-cols-2 items-start">
                      {findImage("Shop integration") &&
                  <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={findImage("Shop integration")!.src} alt="Shop integration" className="w-full object-contain" loading="lazy" />
                        </div>
                  }
                      <div className="space-y-4">
                        {project.ecommerce.split("\n\n").map((p, i) =>
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
            }
            </div>
        </div>
      </div>

      {/* Full-width sections below */}

      {/* Big Stats Callout */}
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
              <div>
                <SectionLabel>The Solution</SectionLabel>
                <div className="space-y-4 mb-6">
                  {project.solutionDetail.split("\n\n").map((p, i) =>
                <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                )}
                </div>
                {/* Spotify UI placement image */}
                {project.id === "spotify" && project.images?.filter((img) => img.alt === "Spotify UI placement").map((img, i) =>
              <div key={i} className="overflow-hidden rounded-xl shadow-md">
                    <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                  </div>
              )}
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
              <div>
                <SectionLabel>Building the Prototype</SectionLabel>
                <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.prototyping}</p>
                {project.prototypingDetails &&
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                    {project.prototypingDetails.map((detail, i) =>
                <div key={i} className="rounded-xl bg-card p-6">
                        <h3 className="mb-2 text-sm font-bold text-foreground">{detail.title}</h3>
                        <p className="text-sm text-muted-foreground">{detail.desc}</p>
                      </div>
                )}
                  </div>
              }
                {project.prototypeLink &&
              <a href={project.prototypeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
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
              {project.prototypeLink &&
            <a href={project.prototypeLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                  View Prototype ↗
                </a>
            }
            </ScrollReveal>
          </div>
        </section>
      }

      {/* Features */}
      {project.features &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>{project.id === "tipdirect-app" ? "Other App Features" : "Key Features"}</SectionLabel>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature, i) => {
                // For tipdirect-app, pair features with pill images
                const featurePillImages = project.id === "tipdirect-app" ? project.images?.filter((img) => img.alt === feature.title) : [];
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                      <div className="rounded-xl bg-card overflow-hidden">
                        {featurePillImages && featurePillImages.length > 0 &&
                      <div className="overflow-hidden">
                            <img src={featurePillImages[0].src} alt={feature.title} className="w-full object-cover" loading="lazy" />
                          </div>
                      }
                        <div className="p-5">
                          <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>);

              })}
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
                    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-card">
                      <div className="overflow-hidden">
                        <img src={alt.image} alt={alt.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
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

      {/* Launch & Analytics */}
      {project.launchAnalytics &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <SectionLabel>Launch & Analytics</SectionLabel>
              <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.launchAnalytics.intro || "After launching our AI review feature, we implemented a comprehensive approach to ensure successful adoption and measure impact:"}</p>
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

      {/* Big stat callout for digital-tipping */}
      {project.id === "digital-tipping" && project.stats?.find((s) => s.label.includes("active")) &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="text-center text-2xl font-black tracking-tight text-foreground md:text-3xl lg:text-4xl">
                Percentage of overall users using the product at least once per week{" "}
                <span className="text-primary">{project.stats.find((s) => s.label.includes("active"))?.value}</span>
              </h2>
            </ScrollReveal>
          </div>
        </section>
      }

      {project.id === "digital-tipping" && project.images &&
      <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="grid gap-4 md:grid-cols-2">
                {project.images.filter((img) => ["Stats overview", "Stats detail 1", "Stats detail 2", "Stats detail 3"].includes(img.alt)).map((img, i) =>
              <div key={i} className="overflow-hidden rounded-xl shadow-md">
                    <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                  </div>
              )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      }

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

      {/* Feature Impact */}
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

      {/* Stats / Key Results */}
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


      {/* Next Project */}
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