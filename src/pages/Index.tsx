import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { projects } from "../data/projects";

const featured = projects.filter(p => !p.comingSoon).slice(0, 2);

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden px-6 pt-32 md:px-12 lg:px-24">
        <div className="pointer-events-none absolute inset-0 grid-background opacity-50" />

        <div className="relative mx-auto max-w-5xl pt-12 text-center md:pt-24">
          <motion.h1
            className="mb-6 text-5xl font-black tracking-tighter text-foreground md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Hi, I'm Dave!
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
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
              href="https://lacunadigital.io/wp-content/uploads/2025/08/David-Kelly-CV_Sep25.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-foreground px-8 py-3 text-sm font-semibold text-background transition-all hover:opacity-90"
            >
              ↓ Download my CV
            </a>
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
          <div className="space-y-2">
            {/* AI Reviews — image left, text right */}
            <ScrollReveal>
              <Link
                to="/case/ai-reviews"
                className="group grid gap-0 overflow-hidden rounded-sm bg-card md:grid-cols-2"
              >
                <div className="overflow-hidden">
                  <img
                    src="https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AIPill-2.webp?fit=800%2C741&ssl=1"
                    alt="AI Assisted Reviews"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <h3 className="mb-4 text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    Leveraging AI to increase 5-star reviews by 45% on average
                  </h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {["UI/UX", "Project Planning", "Interaction Design", "Analytics"].map((tag) => (
                      <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground">{tag}</span>
                    ))}
                  </div>
                  <blockquote className="mb-4 text-sm italic text-muted-foreground">
                    "Leveraging the power of AI & expanding our product to attract a new type of user could only have been possible with Dave on our team"
                  </blockquote>
                  <p className="text-sm font-semibold text-foreground">Andrew Kelly <span className="font-normal text-muted-foreground">- CTO, TipDirect</span></p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    View Project <span>→</span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Digital Tipping — text left, image right */}
            <ScrollReveal delay={0.1}>
              <Link
                to="/case/digital-tipping"
                className="group grid gap-0 overflow-hidden rounded-sm bg-card md:grid-cols-2"
              >
                <div className="flex flex-col justify-center p-8 md:order-1 md:p-12">
                  <h3 className="mb-4 text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    Enabling tour guides to receive an average tip of $25 through digital tipping
                  </h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {["UI/UX", "Project Planning", "Interaction Design", "Analytics"].map((tag) => (
                      <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Increasingly, people are not carrying cash with them in person. We worked with TripAdmit to pivot their entire business in a new direction by creating a brand centered around digital tipping, TipDirect.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    View Project <span>→</span>
                  </span>
                </div>
                <div className="overflow-hidden md:order-2">
                  <img
                    src="https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/09/Pill2.webp?fit=800%2C800&ssl=1"
                    alt="Digital Tipping"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
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
                image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/01/Dicovery.webp?fit=300%2C158&ssl=1",
                text: "Every project begins with understanding your vision. I take pride in exploring creative possibilities that not only bring ideas to life but also drive business growth.",
              },
              {
                num: "02",
                title: "Selection",
                image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/01/Selection.webp?fit=300%2C158&ssl=1",
                text: "I focus on developing solutions that stand out in today's competitive landscape. My approach combines strategic thinking with cutting-edge design practices.",
              },
              {
                num: "03",
                title: "Implementation",
                image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/01/Implmentation.webp?fit=300%2C158&ssl=1",
                text: "I believe in creating purpose-driven designs that resonate with target audiences. Each project is carefully crafted to ensure maximum impact and meaningful connections with users.",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15}>
                <div className="group">
                  <div className="mb-4 overflow-hidden rounded-sm">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-mono-label text-primary">{step.num}</span>
                  <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                to="/about"
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
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Social Proof</SectionLabel>
            <div className="mb-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl text-primary">★</span>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">5.0 of 5 — Google Reviews</span>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-2 md:grid-cols-3">
            {[
              {
                name: "Patrick Rooney",
                text: "I had found it frustrating to find an effective digital expert to assist with our online presence for some time so we have found it fantastic to work with Dave. His attention to detail is second to none, has made excellent cost effective recommendations and he is very pleasant to deal with. We have noticed a significant increase in traffic. Highly recommend.",
              },
              {
                name: "Robert Doyle",
                text: "Lacuna were brilliant to deal with and I can highly recommend them to anyone considering help with their digital platforms. Dave helped us with brand concept and design right the way through to delivery. Nothing was too much trouble and their collaborative approach made the whole experience enjoyable and pain free.",
              },
              {
                name: "Dan Dold",
                text: "Lacuna Digital was fantastic at helping me design and set up my landing page. They were easy to work with, and their communication was excellent, always putting my needs first. I appreciated their willingness to provide valuable feedback, even if it meant suggesting something different from what I initially wanted. Their expertise has significantly boosted my business. Highly recommend!",
              },
            ].map((testimonial, i) => (
              <ScrollReveal key={testimonial.name} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-sm bg-card p-6">
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    "{testimonial.text}"
                  </p>
                  <p className="mt-6 text-sm font-semibold text-foreground">— {testimonial.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />

      {/* Availability */}
      <AvailabilityCTA />
    </main>
  );
};

export default Index;
