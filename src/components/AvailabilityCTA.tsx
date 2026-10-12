import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { availability, CALENDLY_URL } from "@/data/pricing";
import { Button } from "@/components/ui/button";

const AvailabilityCTA = () => {
  return (
  <section className="border-t border-border px-6 py-24 md:px-12 lg:px-24">
    <div className="mx-auto max-w-5xl text-center">
      <ScrollReveal delay={0.1}>
        <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          {`${availability.headline} — next start ${availability.nextStart}`}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/services/start-project">Get a fixed quote <span aria-hidden="true">→</span></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a free call ↗</a>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </section>
  );
};

export default AvailabilityCTA;
