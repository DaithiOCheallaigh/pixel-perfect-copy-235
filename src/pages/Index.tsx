import { Link } from "react-router-dom";
import { imgDims } from "@/data/imageDimensions";
import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import HiringCTA from "../components/HiringCTA";
import { caseStudyPath } from "../data/caseStudies";
import FitText from "../components/FitText";
import { CV_URL } from "../data/profile";
import { SEO } from "../components/SEO";

type FeaturedCard = {
  to: string;
  image: string;
  alt: string;
  title: string;
  tags: string[];
  body?: string;
  quote?: { text: string; author: string; role: string };
  locked?: boolean;
};

const featured: FeaturedCard[] = [
  {
    to: caseStudyPath("spark"),
    image: "/images/work/spark-pill.webp",
    alt: "MedEd Workspace for Elsevier",
    title: "A two-sided learning product for nursing and health-science students and their faculty",
    tags: ["Healthcare Education", "Design Systems", "AI Workflow"],
    body: "Contract UI/UX design on Elsevier's Leyden design system: student self-study with AI coaching and exam readiness, plus an LMS companion for faculty.",
    locked: true,
  },
  {
    to: "/work/marsh-internal-tooling",
    image: "/images/work/marsh-core.webp",
    alt: "Marsh Internal Tooling",
    title: "Three enterprise tools and one design system, shipped in parallel",
    tags: ["Product Design", "Design Systems", "AI Workflow"],
    body: "Colleague Profile, Client Milestones and a Notifications Hub for Marsh, built on CORE, a token-based component library documented in Storybook, with a Claude + Figma MCP workflow.",
  },
  {
    to: "/case/ai-reviews",
    image: "/images/work/ai-pill.webp",
    alt: "AI Assisted Reviews for TipDirect",
    title: "Turning a tip into a 5-star review with AI-assisted prompts",
    tags: ["UI/UX", "Interaction Design", "Analytics"],
    quote: {
      text: "Leveraging the power of AI & expanding our product to attract a new type of user could only have been possible with Dave on our team",
      author: "Andrew Kelly",
      role: "CTO, TipDirect",
    },
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const Index = () => {
  return (
    <main>
      <SEO title="Home" description="Dave Kelly is a senior product designer in Dublin with over 10 years designing SaaS platforms, mobile apps and design systems for Marsh, Elsevier and TipDirect." />
      {/* Hero */}
      <section className="flex min-h-[85vh] flex-col justify-end px-6 pb-16 pt-24 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <FitText
              as="h1"
              text="Dave Kelly"
              className="w-full font-black leading-[0.8] tracking-[-0.05em] text-foreground"
            />
          </motion.div>

          <motion.div
            className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[1fr_2fr]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            <p className="font-mono-label text-muted-foreground">Senior product designer · Dublin · Open to full-time roles</p>
            <div>
              <p className="max-w-2xl text-lg leading-[1.75] tracking-[-0.01em] text-muted-foreground md:text-xl">
                Over 10 years designing SaaS platforms, mobile apps and design systems. Most recently MedEd Workspace for Elsevier, three internal tools and the CORE design system for Marsh, and TipDirect's tipping platform.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
                <Link to="/work" className="text-foreground underline underline-offset-4 transition-colors hover:text-primary">See my work →</Link>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 transition-colors hover:text-primary">Download CV ↓</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected work */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="mb-16 text-center text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Selected work
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {featured.map((card, i) => {
              const flipped = i % 2 === 1;
              return (
                <ScrollReveal key={card.to} delay={i * 0.1}>
                  <Link
                    to={card.to}
                    className="group relative grid gap-0 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2"
                  >
                    <div
                      className={`overflow-hidden bg-card rounded-t-xl md:rounded-t-none ${
                        flipped ? "md:order-2 md:rounded-r-xl" : "md:rounded-l-xl"
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="h-full w-full object-cover scale-[1.06] transition-transform duration-500 md:group-hover:scale-[1.1]"
                        {...imgDims(card.image)}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className={`flex flex-col justify-center p-8 md:p-12 ${flipped ? "md:order-1" : ""}`}>
                      <h3 className="mb-4 text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                        {card.title}
                      </h3>
                      <p className="font-mono-label mb-8 text-muted-foreground">{card.tags.join(" · ")}</p>
                      {card.body && <p className="text-sm text-muted-foreground">{card.body}</p>}
                      {card.quote && (
                        <>
                          <blockquote className="mb-4 text-sm italic text-muted-foreground">"{card.quote.text}"</blockquote>
                          <p className="text-sm font-semibold text-foreground">
                            {card.quote.author} <span className="font-normal text-muted-foreground">- {card.quote.role}</span>
                          </p>
                        </>
                      )}
                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                          View project <span>→</span>
                        </span>
                        {card.locked && (
                          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                            Password protected · request access
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary"
              >
                View All Work <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />

      <HiringCTA />
    </main>
  );
};

export default Index;
