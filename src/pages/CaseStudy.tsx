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
                <div className="overflow-hidden rounded-xl shadow-md">
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
            {nonWideBuffer.map((nwImg, j) => (
              <ScrollReveal key={j} delay={j * 0.05}>
                <div className="overflow-hidden rounded-xl shadow-md">
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
            <div className="overflow-hidden rounded-xl shadow-md">
              <img src={nwImg.src} alt={nwImg.alt} className="w-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    );
  }

  return <div className="space-y-4">{elements}</div>;
};

/* ─── Reusable wrapper: 85 % centered container ─── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="mx-auto w-full max-w-[85%]">{children}</div>
  </section>
);

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const nextProject = project?.nextProject ? projects.find((p) => p.id === project.nextProject) : null;

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

  /* ─── Image helpers ─── */
  const getImage = (alt: string) => project.images?.find((img) => img.alt === alt);
  const getImages = (...alts: string[]) => project.images?.filter((img) => alts.includes(img.alt)) || [];
  const nonWideImages = project.images?.filter((img) => !img.wide) || [];
  const stepImages = getImages("NFC tap", "Create review", "Review output");

  // Challenge image: first non-wide image
  const challengeImage = nonWideImages[0];

  // Research images
  const researchImages = getImages("Survey example", "Mind map", "Research document");

  // Inline images
  const inlineStepsImage = getImage("AI Review Steps");
  const mixpanelImage = getImage("Mixpanel analytics report");

  // Admin dashboard feature images
  const featureImageAlts = ["Dashboard", "Get Tips", "Profile", "Payments", "Setup", "Reports", "Users", "Resources", "Settings"];

  return (
    <main className="pt-24">

      {/* ═══════════════════════════════════════════
          TITLE BLOCK (for heroSubtitle pages)
      ═══════════════════════════════════════════ */}
      {project.heroSubtitle && (
        <Section className="pt-8 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="mb-3 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">{project.title}</h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-4xl">{project.heroSubtitle}</p>
          </motion.div>
        </Section>
      )}

      {/* ═══════════════════════════════════════════
          HERO — Desktop only
      ═══════════════════════════════════════════ */}
      {project.headerImage && (
        <Section className="hidden md:block">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            <div className="overflow-hidden rounded-2xl">
              <img src={project.headerImage} alt={`${project.title} hero`} className="w-full object-cover" loading="eager" />
            </div>
          </motion.div>
        </Section>
      )}

      {/* ═══════════════════════════════════════════
          HERO — Mobile only
      ═══════════════════════════════════════════ */}
      {project.mobileImage && (
        <section className="md:hidden px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            <img src={project.mobileImage} alt={`${project.title} mobile`} className="w-full rounded-xl object-cover" loading="eager" />
          </motion.div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          INTRO — Desktop (two columns)
      ═══════════════════════════════════════════ */}
      <Section className="hidden md:block pt-12 pb-16">
        {!project.heroSubtitle && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/work" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">← Back to Work</Link>
          </motion.div>
        )}
        <motion.div
          className="grid gap-12 grid-cols-[280px_1fr] items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {/* LEFT: logo + tags + timeline + CTA */}
          <div className="flex flex-col">
            {project.whatIWorkedOn && (
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                {project.whatIWorkedOn.join(" · ")}
              </p>
            )}
            <p className="mb-4 text-sm font-bold text-foreground">Timeline: {project.timeline}</p>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90"
              >
                View Live
              </a>
            )}
          </div>

          {/* RIGHT: title + description + tools + design goals */}
          <div>
            {!project.heroSubtitle && (
              <h1 className="mb-6 text-3xl font-black tracking-tighter text-foreground md:text-4xl">{project.title}</h1>
            )}
            <div className="space-y-4 mb-6">
              {project.description.split("\n\n").map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
              ))}
            </div>
            {project.designGoals && (
              <div className="mb-6">
                <p className="text-sm font-bold text-foreground mb-2">Design Goals:</p>
                <ul className="space-y-1">
                  {project.designGoals.map((g, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {g.title}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.toolsImage && (
              <div>
                <p className="text-sm font-bold text-foreground mb-3">Tools:</p>
                <img src={project.toolsImage} alt="Tools used" className="max-w-[200px]" loading="lazy" />
              </div>
            )}
          </div>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════
          INTRO — Mobile (stacked)
      ═══════════════════════════════════════════ */}
      <section className="md:hidden px-6 pt-8 pb-12">
        {!project.heroSubtitle && (
          <Link to="/work" className="font-mono-label mb-6 inline-block text-muted-foreground">← Back to Work</Link>
        )}
        {!project.heroSubtitle && (
          <h1 className="mb-4 text-2xl font-black tracking-tighter text-foreground">{project.title}</h1>
        )}
        <div className="space-y-3 mb-4">
          {project.description.split("\n\n").map((p, i) => (
            <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
          ))}
        </div>
        {project.whatIWorkedOn && (
          <p className="mb-3 text-sm text-muted-foreground">{project.whatIWorkedOn.join(" · ")}</p>
        )}
        <p className="mb-3 text-sm font-bold text-foreground">Timeline: {project.timeline}</p>
        {project.toolsImage && (
          <div className="mb-4">
            <p className="text-sm font-bold text-foreground mb-2">Tools Used:</p>
            <img src={project.toolsImage} alt="Tools" className="max-w-[250px]" loading="lazy" />
          </div>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-2.5 text-sm font-semibold text-background">View Live</a>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          VIMEO VIDEO
      ═══════════════════════════════════════════ */}
      {project.vimeoEmbed && (
        <Section className="py-8">
          <ScrollReveal>
            <div className="overflow-hidden rounded-xl" style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={project.vimeoEmbed}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Video walkthrough"
              />
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* ═══════════════════════════════════════════
          MAIN CONTENT SECTIONS
      ═══════════════════════════════════════════ */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-[85%]">
          <div className="space-y-20">

            {/* ─── CHALLENGE — 2-column ─── */}
            {project.challenge && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  {project.challengeImageRight ? (
                    <>
                      <div>
                        <SectionLabel>The Challenge</SectionLabel>
                        <div className="space-y-4">
                          {project.challenge.split("\n\n").map((p, i) => (
                            <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                          ))}
                        </div>
                      </div>
                      {challengeImage && (
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={challengeImage.src} alt={challengeImage.alt} className="w-full object-cover" loading="lazy" />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {challengeImage && (
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={challengeImage.src} alt={challengeImage.alt} className="w-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div>
                        <SectionLabel>The Challenge</SectionLabel>
                        <div className="space-y-4">
                          {project.challenge.split("\n\n").map((p, i) => (
                            <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── INITIAL APPROACH — 2-column (Booking App) ─── */}
            {project.initialApproach && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div>
                    <SectionLabel>Initial Approach & User Journey Map</SectionLabel>
                    <div className="space-y-4">
                      {project.initialApproach.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                  </div>
                  {getImage("App screens") && (
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img src={getImage("App screens")!.src} alt="App screens" className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── DESIGN PROCESS OVERVIEW ─── */}
            {project.designProcess && (
              <ScrollReveal>
                <div>
                  <SectionLabel>Overview of the Design Process</SectionLabel>
                  <div className="grid gap-8 md:grid-cols-3 mt-8">
                    {/* Left: overview image */}
                    {getImage("Ticketing System") && (
                      <div className="overflow-hidden rounded-xl shadow-md">
                        <img src={getImage("Ticketing System")!.src} alt="Ticketing System" className="w-full object-cover" loading="lazy" />
                      </div>
                    )}
                    {/* Middle: steps 01-03 */}
                    <div className="space-y-6">
                      {project.designProcess.slice(0, 3).map((phase, i) => (
                        <div key={i}>
                          <span className="font-mono-label text-primary">{phase.num}/</span>
                          <h3 className="mt-1 text-base font-bold text-foreground">{phase.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{phase.desc}</p>
                        </div>
                      ))}
                    </div>
                    {/* Right: steps 04-06 */}
                    <div className="space-y-6">
                      {project.designProcess.slice(3, 6).map((phase, i) => (
                        <div key={i}>
                          <span className="font-mono-label text-primary">{phase.num}/</span>
                          <h3 className="mt-1 text-base font-bold text-foreground">{phase.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{phase.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── DETAILED DESIGN PROCESS PHASES ─── */}
            {project.designProcessDetails &&
              project.designProcessDetails.map((phase, i) => (
                <ScrollReveal key={`phase-${i}`}>
                  <div>
                    {/* Phase image — full width above */}
                    {phase.image && (
                      <div className="overflow-hidden rounded-xl shadow-md mb-8">
                        <img src={phase.image} alt={phase.title} className="w-full object-cover" loading="lazy" />
                      </div>
                    )}
                    {/* Phase content — 2-column: text left, outcomes right */}
                    <div className="grid gap-8 md:grid-cols-2 items-start">
                      <div>
                        <SectionLabel>{`${phase.num}/ ${phase.title}`}</SectionLabel>
                        <div className="space-y-4">
                          {phase.text.split("\n").filter(Boolean).map((line, j) => {
                            if (line.startsWith("- ")) {
                              return (
                                <li key={j} className="ml-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                  {line.replace("- ", "")}
                                </li>
                              );
                            }
                            return <p key={j} className="text-[15px] leading-[1.7] text-muted-foreground">{line}</p>;
                          })}
                        </div>
                      </div>
                      {phase.outcomes && (
                        <div className="rounded-xl bg-card p-6">
                          <h4 className="mb-2 text-sm font-bold text-foreground">Outcomes:</h4>
                          <p className="text-sm text-muted-foreground">{phase.outcomes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))
            }

            {/* ─── EXPLORATION (standalone or paired with research) ─── */}
            {(project.exploration || project.explorationDetail) && project.researchFindings ? (
              <ScrollReveal>
                <div>
                  {/* Exploration */}
                  <div className="mb-12">
                    <SectionLabel>Exploration</SectionLabel>
                    <div className="space-y-4 mb-6">
                      {(project.explorationDetail || project.exploration || "").split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                    {project.explorationVideo && (
                      <div className="overflow-hidden rounded-xl shadow-md">
                        <video src={project.explorationVideo} autoPlay loop muted playsInline className="w-full object-cover" />
                      </div>
                    )}
                    {/* Exploration images for Spotify — 2 column */}
                    {project.id === "spotify" && (
                      <div className="grid gap-6 md:grid-cols-2 mt-6">
                        {getImages("Spotify integration concept").map((img, i) => (
                          <div key={i} className="overflow-hidden rounded-xl shadow-md">
                            <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Research Findings */}
                  <div>
                    <SectionLabel>Research Findings</SectionLabel>
                    {project.researchIntro && (
                      <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.researchIntro}</p>
                    )}
                    {/* Two-column bullet lists on desktop */}
                    {project.researchFindings && (
                      <div className="grid gap-6 md:grid-cols-2">
                        {project.researchFindings.map((finding, i) => {
                          const [title, ...rest] = finding.split(": ");
                          return (
                            <div key={i} className="rounded-xl bg-card p-6">
                              <h4 className="mb-2 text-sm font-bold text-foreground">{title}</h4>
                              <p className="text-sm text-muted-foreground">{rest.join(": ")}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <>
                {/* Exploration standalone */}
                {(project.exploration || project.explorationDetail) && (
                  <ScrollReveal>
                    <div>
                      <SectionLabel>Exploration</SectionLabel>
                      <div className="space-y-4 mb-6">
                        {(project.explorationDetail || project.exploration || "").split("\n\n").map((p, i) => (
                          <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                        ))}
                      </div>
                      {/* Spotify exploration: 2-column with image */}
                      {project.id === "spotify" && (
                        <div className="grid gap-6 md:grid-cols-2 items-start">
                          <div />
                          {getImage("Spotify integration concept") && (
                            <div className="overflow-hidden rounded-xl shadow-md">
                              <img src={getImage("Spotify integration concept")!.src} alt="Exploration" className="w-full object-cover" loading="lazy" />
                            </div>
                          )}
                        </div>
                      )}
                      {project.explorationVideo && (
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <video src={project.explorationVideo} autoPlay loop muted playsInline className="w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                )}

                {/* Research Findings standalone */}
                {project.researchFindings && (
                  <ScrollReveal>
                    <div>
                      <SectionLabel>Research Findings</SectionLabel>
                      {project.researchIntro && (
                        <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.researchIntro}</p>
                      )}
                      <div className="grid gap-6 md:grid-cols-2">
                        {project.researchFindings.map((finding, i) => {
                          const [title, ...rest] = finding.split(": ");
                          return (
                            <div key={i} className="rounded-xl bg-card p-6">
                              <h4 className="mb-2 text-sm font-bold text-foreground">{title}</h4>
                              <p className="text-sm text-muted-foreground">{rest.join(": ")}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </>
            )}

            {/* Research images — 3-column grid */}
            {researchImages.length > 0 && (
              <ScrollReveal>
                <div className="grid gap-4 md:grid-cols-3">
                  {researchImages.map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-xl shadow-md">
                      <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* ─── BUILDING THE FEATURE ─── */}
            {project.buildingTheFeature && (
              <ScrollReveal>
                <div>
                  <SectionLabel>Building the Feature</SectionLabel>
                  <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.buildingTheFeature}</p>
                  {inlineStepsImage && (
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img src={inlineStepsImage.src} alt={inlineStepsImage.alt} className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                  {/* User flow image for digital tipping */}
                  {getImage("User flow") && (
                    <div className="overflow-hidden rounded-xl shadow-md mt-6">
                      <img src={getImage("User flow")!.src} alt="User flow" className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── TIPPING FLOW — 2-column text + gif/images ─── */}
            {project.tippingFlow && (
              <ScrollReveal>
                <div>
                  <SectionLabel>{project.id === "spotify" ? "The Tipping Flow" : "Tipping Flow"}</SectionLabel>
                  {project.id === "spotify" ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {project.tippingFlow.split("\n\n").map((p, i) => (
                          <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                        ))}
                      </div>
                      {getImages("Tipping flow desktop", "Tipping flow mobile").map((img, i) => (
                        <div key={i} className="overflow-hidden rounded-xl shadow-md">
                          <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-8 md:grid-cols-2 items-start">
                      <div className="space-y-4">
                        {project.tippingFlow.split("\n\n").map((p, i) => (
                          <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                        ))}
                      </div>
                      {project.tippingFlowGif && (
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={project.tippingFlowGif} alt="Tipping flow" className="w-full object-contain" loading="lazy" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── DESIGN SYSTEM LINKS (centered) ─── */}
            {project.designSystemLinks && (
              <ScrollReveal>
                <div className="text-center">
                  <SectionLabel>Design System</SectionLabel>
                  <p className="mb-6 text-[15px] text-muted-foreground">To explore the look and feel of the whole product, please see below</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {project.designSystemLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── DESIGN SYSTEM DESCRIPTION + images ─── */}
            {project.designSystemDescription && (
              <ScrollReveal>
                <div>
                  <SectionLabel>Design System</SectionLabel>
                  <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.designSystemDescription}</p>
                  {/* Colour + Typography side by side */}
                  {(getImage("Colour system") || getImage("Colour palette")) && (
                    <div className="grid gap-4 md:grid-cols-2 mb-6">
                      {(getImage("Colour system") || getImage("Colour palette")) && (
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={(getImage("Colour system") || getImage("Colour palette"))!.src} alt="Colour" className="w-full object-cover" loading="lazy" />
                        </div>
                      )}
                      {(getImage("Typography system") || getImage("Typography")) && (
                        <div className="overflow-hidden rounded-xl shadow-md">
                          <img src={(getImage("Typography system") || getImage("Typography"))!.src} alt="Typography" className="w-full object-cover" loading="lazy" />
                        </div>
                      )}
                    </div>
                  )}
                  {/* Full-width overview image */}
                  {getImage("App overview") && (
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img src={getImage("App overview")!.src} alt="App overview" className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── SOLUTION (How The Solution Works) ─── */}
            {project.solutionIntro && (
              <ScrollReveal>
                <div>
                  <SectionLabel>How The Solution Works</SectionLabel>
                  <div className="space-y-4">
                    {project.solutionIntro.split("\n\n").map((p, i) => (
                      <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── HOW IT WORKS — 3-column cards with images ─── */}
            {project.howItWorks && (
              <div>
                {!project.solutionIntro && (
                  <ScrollReveal>
                    <SectionLabel>How It Works</SectionLabel>
                  </ScrollReveal>
                )}
                {/* Desktop: 6-column (image row + text row) */}
                <div className="hidden md:grid gap-6 md:grid-cols-3">
                  {project.howItWorks.map((step, i) => (
                    <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                      <div className="flex h-full flex-col rounded-xl bg-card overflow-hidden">
                        {stepImages[i] && (
                          <div className="overflow-hidden bg-card">
                            <img src={stepImages[i].src} alt={stepImages[i].alt} className="w-full object-cover" loading="lazy" />
                          </div>
                        )}
                        <div className="p-6">
                          <span className="text-2xl font-black text-foreground">{step.step}.</span>
                          <h3 className="mt-1 text-xl font-bold text-foreground">{step.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
                {/* Mobile: stacked cards */}
                <div className="md:hidden space-y-6">
                  {project.howItWorks.map((step, i) => (
                    <ScrollReveal key={i}>
                      <div className="rounded-xl bg-card overflow-hidden">
                        {stepImages[i] && (
                          <img src={stepImages[i].src} alt={stepImages[i].alt} className="w-full object-cover" loading="lazy" />
                        )}
                        <div className="p-6">
                          <span className="text-2xl font-black text-foreground">{step.step}.</span>
                          <h3 className="mt-1 text-xl font-bold text-foreground">{step.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}

            {/* ─── NEW SKILLS — 2-column (Website TipDirect) ─── */}
            {project.newSkills && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div>
                    <SectionLabel>A Chance to Grow My Skills</SectionLabel>
                    <div className="space-y-4">
                      {project.newSkills.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                    {/* CTA image below */}
                    {getImage("CTA section") && (
                      <div className="overflow-hidden rounded-xl shadow-md mt-6">
                        <img src={getImage("CTA section")!.src} alt="CTA" className="w-full object-cover" loading="lazy" />
                      </div>
                    )}
                  </div>
                  <div>
                    {getImage("Component library") && (
                      <div className="overflow-hidden rounded-xl shadow-md mb-6">
                        <img src={getImage("Component library")!.src} alt="Components" className="w-full object-cover" loading="lazy" />
                      </div>
                    )}
                    {project.componentFocused && (
                      <>
                        <SectionLabel>Component Focused</SectionLabel>
                        <p className="text-[15px] leading-[1.7] text-muted-foreground">{project.componentFocused}</p>
                      </>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── COMPONENT LIBRARY — 2-column (Booking App) ─── */}
            {project.componentLibrary && !project.newSkills && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  {getImage("iOS Style Guide") && (
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img src={getImage("iOS Style Guide")!.src} alt="iOS Style Guide" className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div>
                    <SectionLabel>Component Library</SectionLabel>
                    <div className="space-y-4">
                      {project.componentLibrary.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── LAUNCH & TRACTION — 2-column (Booking App) ─── */}
            {project.launchTraction && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div>
                    <SectionLabel>Launch & Traction</SectionLabel>
                    <div className="space-y-4">
                      {project.launchTraction.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                  </div>
                  {getImage("High definition renders") && (
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img src={getImage("High definition renders")!.src} alt="Launch" className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── E-COMMERCE — 2-column (Booking App) ─── */}
            {project.ecommerce && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div>
                    {getImage("Shop integration") && (
                      <div className="overflow-hidden rounded-xl shadow-md">
                        <img src={getImage("Shop integration")!.src} alt="Shop" className="w-full object-cover" loading="lazy" />
                      </div>
                    )}
                  </div>
                  <div>
                    <SectionLabel>e-Commerce Functionality</SectionLabel>
                    <div className="space-y-4">
                      {project.ecommerce.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── TRIMMING DOWN — 2-column (TipDirect App) ─── */}
            {project.trimmingDown && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div>
                    <SectionLabel>Trimming Down The Platform</SectionLabel>
                    <div className="space-y-4">
                      {project.trimmingDown.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {project.trimmingDown.split("\n\n").slice(-1).map((p, i) => (
                      <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── ENGAGEMENT CONSIDERATIONS — 2-column with image ─── */}
            {project.engagementConsiderations && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div>
                    <SectionLabel>Considerations for Enhancing User Engagement</SectionLabel>
                    <div className="space-y-4">
                      {project.engagementConsiderations.map((item, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* TipDirect App image */}
                  {getImage("Tour guides") && (
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img src={getImage("Tour guides")!.src} alt="Tour guides" className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── DESIGN GOALS (cards) ─── */}
            {project.designGoals && !project.clientLogo && (
              <ScrollReveal>
                <div>
                  <SectionLabel>Design Goals</SectionLabel>
                  <div className="grid gap-4 md:grid-cols-3">
                    {project.designGoals.map((goal, i) => (
                      <div key={i} className="rounded-xl bg-card p-6">
                        <h3 className="mb-2 text-sm font-bold text-foreground">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── CORE DESIGN PRINCIPLES — 2-column ─── */}
            {project.coreDesignPrinciples && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div>
                    <SectionLabel>Core Design Principles</SectionLabel>
                    <div className="space-y-4">
                      {project.coreDesignPrinciples.map((p, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-foreground mb-1">{p.title}</h4>
                          <p className="text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {project.mobileAdaptations && (
                    <div>
                      <SectionLabel>Mobile-Specific Adaptations</SectionLabel>
                      <div className="space-y-4">
                        {project.mobileAdaptations.map((a, i) => (
                          <div key={i}>
                            <h4 className="text-sm font-bold text-foreground mb-1">{a.title}</h4>
                            <p className="text-sm text-muted-foreground">{a.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* ─── PROTOTYPING — 2-column with video placeholder ─── */}
            {project.prototyping && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  {/* Video placeholder */}
                  <div className="overflow-hidden rounded-xl bg-card aspect-video flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Video Prototype</span>
                  </div>
                  <div className="md:pt-[100px]">
                    <SectionLabel>Building the Prototype</SectionLabel>
                    <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{project.prototyping}</p>
                    {project.prototypeLink && (
                      <a
                        href={project.prototypeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
                      >
                        View Prototype ↗
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── CORE FUNCTIONALITY — 2-column with video ─── */}
            {project.coreFunctionality && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  <div className="md:pt-[100px]">
                    <SectionLabel>Core Functionality</SectionLabel>
                    <div className="space-y-4">
                      {project.coreFunctionality.map((f, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-bold text-foreground mb-1">{f.title}</h4>
                          <p className="text-sm text-muted-foreground">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                    {project.prototypeLink && (
                      <a
                        href={project.prototypeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
                      >
                        View Prototype ↗
                      </a>
                    )}
                  </div>
                  {/* Video placeholder */}
                  <div className="overflow-hidden rounded-xl bg-card aspect-video flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Video Demo</span>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ─── SOLUTION DETAIL — 2-column (Spotify) ─── */}
            {project.solutionDetail && (
              <ScrollReveal>
                <div className="grid gap-8 md:grid-cols-2 items-start">
                  {/* Spotify placement image left */}
                  {getImage("Placement options") && (
                    <div className="overflow-hidden rounded-xl shadow-md">
                      <img src={getImage("Placement options")!.src} alt="The Solution" className="w-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div>
                    <SectionLabel>The Solution</SectionLabel>
                    <div className="space-y-4">
                      {project.solutionDetail.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          FULL-WIDTH SECTIONS BELOW
      ═══════════════════════════════════════════ */}

      {/* Spotify UI placement full-width */}
      {project.id === "spotify" && getImage("Spotify UI placement") && (
        <Section className="py-12 hidden md:block">
          <ScrollReveal>
            <div className="overflow-hidden rounded-xl shadow-md">
              <img src={getImage("Spotify UI placement")!.src} alt="UI placement" className="w-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* ─── FEATURES GRID ─── */}
      {project.features && (
        <Section className="py-12">
          <ScrollReveal>
            <SectionLabel>{project.id === "tipdirect-app" ? "Other App Features" : "Features"}</SectionLabel>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
              {project.features.map((feature, i) => {
                const featureImg = project.images?.find((img) => img.alt === feature.title);
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="rounded-xl bg-card overflow-hidden">
                      {featureImg && (
                        <div className="overflow-hidden">
                          <img src={featureImg.src} alt={feature.title} className="w-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* ─── ALTERNATIVE INTEGRATIONS — 3-column (Spotify) ─── */}
      {project.alternativeIntegrations && (
        <Section className="py-12 hidden md:block">
          <ScrollReveal>
            <SectionLabel>Other Integration Options</SectionLabel>
            <div className="grid gap-6 md:grid-cols-3">
              {project.alternativeIntegrations.map((alt, i) => (
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
              ))}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* ─── LAUNCH & ANALYTICS — 2-column ─── */}
      {project.launchAnalytics && (
        <Section className="py-12">
          <ScrollReveal>
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div>
                <SectionLabel>Launch & Analytics</SectionLabel>
                <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">
                  After launching, we implemented a comprehensive approach to ensure successful adoption and measure impact:
                </p>
                <div className="space-y-6">
                  <div className="rounded-xl bg-card p-6">
                    <h3 className="mb-4 text-base font-bold text-foreground">Documentation & Support</h3>
                    <ul className="space-y-3">
                      {project.launchAnalytics.documentation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-card p-6">
                    <h3 className="mb-4 text-base font-bold text-foreground">Analytics Implementation</h3>
                    <ul className="space-y-3">
                      {project.launchAnalytics.analytics.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Mixpanel image on right */}
              {mixpanelImage && (
                <div className="overflow-hidden rounded-xl shadow-md">
                  <img src={mixpanelImage.src} alt={mixpanelImage.alt} className="w-full object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* ─── FEATURE IMPACT — 3-column metrics ─── */}
      {project.featureImpact && (
        <Section className="py-16">
          <ScrollReveal>
            <SectionLabel>Feature Impact</SectionLabel>
          </ScrollReveal>
          <div className="grid grid-rows-1 gap-6 md:grid-cols-3">
            {project.featureImpact.map((impact, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-xl bg-card p-8">
                  <span className="font-mono-label text-muted-foreground">{impact.period}</span>
                  <div className="mt-3 text-3xl font-black text-primary md:text-4xl">{impact.value}</div>
                  <p className="mt-3 text-sm font-semibold text-foreground">{impact.label}</p>
                  <p className="mt-auto pt-2 text-xs leading-relaxed text-muted-foreground">{impact.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Section>
      )}

      {/* ─── RELEASE & RECEPTION — 2-column with image ─── */}
      {project.releaseReception && (
        <Section className="py-12">
          <ScrollReveal>
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div className="md:pt-[100px]">
                <SectionLabel>Release & Reception</SectionLabel>
                <div className="space-y-4">
                  {project.releaseReception.split("\n\n").map((p, i) => (
                    <p key={i} className="text-[15px] leading-[1.7] text-muted-foreground">{p}</p>
                  ))}
                </div>
              </div>
              {getImage("Tour guides") && (
                <div className="overflow-hidden rounded-xl shadow-md">
                  <img src={getImage("Tour guides")!.src} alt="Tour guides" className="w-full object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* ─── QUOTE ─── */}
      {project.quote && (
        <Section className="py-12">
          <ScrollReveal>
            <blockquote className="border-l-2 border-primary pl-6">
              <p className="text-lg italic text-foreground">"{project.quote.text}"</p>
              <cite className="mt-4 block text-sm font-semibold not-italic text-muted-foreground">— {project.quote.author}</cite>
            </blockquote>
          </ScrollReveal>
        </Section>
      )}

      {/* ─── STATS / KEY RESULTS (only if no featureImpact) ─── */}
      {project.stats && project.stats.length > 0 && !project.featureImpact && (
        <Section className="py-12">
          <ScrollReveal>
            <SectionLabel>Project Impact</SectionLabel>
          </ScrollReveal>
          <div className={`grid gap-4 ${project.stats.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
            {project.stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center justify-center rounded-xl bg-card p-8 text-center">
                  <div className="text-4xl font-black text-primary md:text-5xl">{stat.value}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Section>
      )}

      {/* ─── IMAGE GALLERY (remaining images) ─── */}
      {project.images && project.images.length > 0 && (
        <Section className="py-12">
          <ImageGallery
            images={project.images.filter((img) => {
              // Exclude images already shown inline
              const inlineAlts = [
                "AI Review Steps", "Mixpanel analytics report",
                "NFC tap", "Create review", "Review output",
                "Spotify integration concept", "Placement options", "Spotify UI placement",
                "Tipping flow desktop", "Tipping flow mobile",
                "Tech stack", "Survey example", "Mind map", "Research document",
                "User flow", "App screens", "iOS Style Guide",
                "CTA section", "Component library",
                "High definition renders", "Shop integration",
                "Colour system", "Typography system", "Colour palette", "Typography",
                "App overview", "Tour guides", "Tour Guides",
                "Ticketing System",
                ...featureImageAlts,
                ...(project.features?.map((f) => f.title) || []),
              ];
              return !inlineAlts.includes(img.alt);
            })}
          />
        </Section>
      )}

      {/* ─── NEXT PROJECT ─── */}
      {nextProject && (
        <Section className="py-20">
          <ScrollReveal>
            <SectionLabel>Next Project</SectionLabel>
            <Link to={`/case/${nextProject.id}`} className="group relative block overflow-hidden rounded-2xl">
              <div className="relative h-64 md:h-80">
                <img
                  src={nextProject.headerImage}
                  alt={nextProject.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
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
        </Section>
      )}

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>
  );
};

export default CaseStudy;
