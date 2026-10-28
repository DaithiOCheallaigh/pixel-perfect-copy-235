import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { CHAT_URL, CV_URL, LINKEDIN_URL, LOCATION_LINE, PORTFOLIO_EMAIL } from "@/data/profile";

const HiringCTA = () => (
  <section id="contact" className="scroll-mt-16 border-t border-border px-6 py-24 md:px-12 lg:px-24">
    <div className="mx-auto max-w-5xl text-center">
      <ScrollReveal>
        <div className="mb-6 inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary animate-pulse-dot" />
          <span className="font-mono-label text-primary">Get in touch</span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          Open to full-time senior product design roles
        </h2>
        <p className="mb-8 text-muted-foreground">{LOCATION_LINE}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg"><a href={CV_URL} target="_blank" rel="noopener noreferrer">Download CV ↓</a></Button>
          <Button asChild size="lg" variant="outline"><a href={`mailto:${PORTFOLIO_EMAIL}`}>Email me →</a></Button>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors md:hover:text-primary">LinkedIn ↗</a>
          {CHAT_URL && <a href={CHAT_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors md:hover:text-primary">Book a 30-min chat with Dave ↗</a>}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HiringCTA;