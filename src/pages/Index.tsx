import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import SocialProof from "../components/SocialProof";
import { projects } from "../data/projects";
import { ShineBorder } from "../components/ui/shine-border";
import { ShaderAnimation } from "../components/ui/shader-animation";

const featured = projects.filter(p => !p.comingSoon).slice(0, 2);

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden bg-[hsl(40,10%,97%)] dark:bg-background px-6 pt-32 md:px-12 lg:px-24">
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-100">
          <ShaderAnimation />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-background opacity-50" />

        <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center text-center">
          <motion.h1
            className="mb-8 text-5xl font-black tracking-[-0.04em] leading-[0.9] text-foreground md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Hi, I'm Dave!
          </motion.h1>

          <motion.p
            className="mx-auto mb-12 max-w-2xl text-lg leading-[1.75] tracking-[-0.01em] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            I am a versatile AI driven creative professional combining strategic
            thinking with hands-on design expertise to deliver impactful results.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="/docs/DavidKelly_CV_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-8 py-3 text-sm font-semibold text-background transition-all hover:opacity-90"
            >
              ↓ Download my CV
            </a>
            <Link
              to="/ai-design-process"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground transition-all hover:gap-3"
            >
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              AI Design Process <span className="transition-all">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Explore My Work — Featured Projects */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="mb-16 text-center text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Explore my work
            </h2>
          </ScrollReveal>

          {/* Featured project cards — side by side image + text like old site */}
          <div className="space-y-8">
            {/* Marsh Design System — image left, text right */}
            <ScrollReveal>
              <Link
                to="/work/marsh-design-system"
                className="group relative grid gap-0 overflow-hidden rounded-xl bg-card md:grid-cols-2"
              >
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="overflow-hidden rounded-l-xl md:rounded-l-xl md:rounded-r-none rounded-t-xl md:rounded-t-none">
                  <img
                    src="/images/work/marsh-design-system.webp"
                    alt="Marsh Design System Rebrand"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <h3 className="mb-4 text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    Rebranding an enterprise component library with an AI-first workflow
                  </h3>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {["Design Systems", "Brand Implementation", "AI Workflow"].map((tag) => (
                      <span key={tag} className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A full rebrand of the CORE design system — 60+ components updated, documented in Storybook, and shipped to GitHub before the official launch.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    View Project <span>→</span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Marsh Internal Tooling — text left, image right */}
            <ScrollReveal delay={0.1}>
              <Link
                to="/work/marsh-internal-tooling"
                className="group relative grid gap-0 overflow-hidden rounded-xl bg-card md:grid-cols-2"
              >
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="flex flex-col justify-center p-8 md:order-1 md:p-12">
                  <h3 className="mb-4 text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    Three enterprise internal tools designed and shipped simultaneously
                  </h3>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {["Product Design", "Design Systems", "AI Workflow"].map((tag) => (
                      <span key={tag} className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Three enterprise tools designed and shipped in parallel — built on a shared component library and an AI-accelerated design process.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    View Project <span>→</span>
                  </span>
                </div>
                <div className="order-first overflow-hidden rounded-t-xl md:rounded-t-none md:rounded-r-xl md:rounded-l-none md:order-2">
                  <video
                    src="/images/work/marsh-core.webp"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
              >
                View All Work <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />

      {/* Design Philosophy */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Process</SectionLabel>
            <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              My Design Philosophy
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Discovery",
                image: "/images/work/admin-ux-initial.webp",
                text: "Every project begins with understanding your vision. I take pride in exploring creative possibilities that not only bring ideas to life but also drive business growth.",
              },
              {
                num: "02",
                title: "Selection",
                image: "/images/work/admin-gantt.webp",
                text: "I focus on developing solutions that stand out in today's competitive landscape. My approach combines strategic thinking with cutting-edge design practices.",
              },
              {
                num: "03",
                title: "Implementation",
                image: "/images/work/admin-devhandoff.webp",
                text: "I believe in creating purpose-driven designs that resonate with target audiences. Each project is carefully crafted to ensure maximum impact and meaningful connections with users.",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15} className="h-full">
                <div className="group flex h-full flex-col rounded-xl bg-white dark:bg-card p-4">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full object-contain dark:invert"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-mono-label text-primary">{step.num}</span>
                  <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                to="/about#philosophy"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
              >
                Explore My Philosophy <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />

      {/* Testimonials */}
      <SocialProof />

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />

      {/* Availability */}
      <AvailabilityCTA />
    </main>
  );
};

export default Index;
