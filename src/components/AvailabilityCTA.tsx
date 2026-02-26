import ScrollReveal from "./ScrollReveal";

const AvailabilityCTA = () => (
  <section className="border-t border-border px-6 py-24 md:px-12 lg:px-24">
    <div className="mx-auto max-w-5xl text-center">
      <ScrollReveal>
        <div className="mb-6 inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary animate-pulse-dot" />
          <span className="font-mono-label text-primary">Available for work</span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          Ready for new collaborations in Q2, 2026.
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://calendly.com/lacunaconsulting-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
          >
            Book a Call <span className="transition-all">→</span>
          </a>
          <a
            href="https://www.linkedin.com/in/davidkelly89/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-sm border border-border px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:gap-3"
          >
            LinkedIn <span className="transition-all">↗</span>
          </a>
          <a
            href="https://lacunadigital.io/wp-content/uploads/2025/08/David-Kelly-CV_Sep25.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Download CV ↓
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default AvailabilityCTA;
