import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { projects } from "../data/projects";

const featured = projects.slice(0, 5);

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden px-6 pt-32 md:px-12 lg:px-24">
        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 grid-background opacity-50" />

        <div className="relative mx-auto max-w-5xl pt-12 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-label mb-6 block text-muted-foreground">
              Digital Designer & UX Strategist
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-black tracking-tighter text-foreground md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Hi, I'm <span className="text-primary">Dave!</span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            I am a versatile AI driven creative professional combining strategic
            thinking with hands-on design expertise to deliver impactful results.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
            >
              Explore Work <span>→</span>
            </Link>
            <a
              href="https://lacunadigital.io/wp-content/uploads/2025/08/David-Kelly-CV_Sep25.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary"
            >
              Download CV ↓
            </a>
          </motion.div>
        </div>

        {/* Hero logo image */}
        <motion.div
          className="relative mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/01/Me.webp?fit=1880%2C256&ssl=1"
            alt="Lacuna Digital wordmark"
            className="w-full opacity-60"
          />
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="mb-12 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Selected Projects
            </h2>
          </ScrollReveal>

          {/* First 2 hero cards */}
          <div className="mb-2 grid gap-2 md:grid-cols-2">
            {featured.slice(0, 2).map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <Link
                  to={`/case/${project.id}`}
                  className="group relative block overflow-hidden rounded-sm bg-card"
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.headerImage}
                      alt={project.title}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono-label text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Next 3 in grid */}
          <div className="grid gap-2 md:grid-cols-3">
            {featured.slice(2, 5).map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <Link
                  to={`/case/${project.id}`}
                  className="group block overflow-hidden rounded-sm bg-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.pillImage}
                      alt={project.title}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{project.subtitle}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
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
