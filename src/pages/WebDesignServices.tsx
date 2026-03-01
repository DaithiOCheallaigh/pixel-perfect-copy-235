import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TickCircle, InfoCircle, ExportSquare } from "iconsax-react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";

/* ------------------------------------------------------------------ */
/*  Currency                                                           */
/* ------------------------------------------------------------------ */

type Currency = "EUR" | "USD" | "GBP";

const currencySymbols: Record<Currency, string> = { EUR: "€", USD: "$", GBP: "£" };
const currencyRates: Record<Currency, number> = { EUR: 1, USD: 1.08, GBP: 0.86 };

const convertPrice = (eurAmount: number, currency: Currency): string => {
  const converted = Math.round(eurAmount * currencyRates[currency]);
  return `${currencySymbols[currency]}${converted.toLocaleString()}`;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface PricingTierData {
  name: string;
  eurPrice: number;
  prefix?: string;
  popular?: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
}

const tiers: PricingTierData[] = [
  {
    name: "Starter",
    eurPrice: 1999,
    features: [
      "Up to 5 pages (Home, About, Services, Blog, Contact)",
      "Custom design to brand guidelines",
      "Mobile responsive",
      "Contact form integration",
      "Basic on-page SEO setup",
      "2 rounds of revisions per design phase",
      "Fully deployed website",
      "Handover & walkthrough session",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
  },
  {
    name: "Business",
    eurPrice: 3999,
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Up to 10 pages",
      "Blog or news section",
      "Analytics setup (GA / Tag Manager)",
      "Performance & accessibility optimisation",
      "Social media integration",
      "3 rounds of revisions per design phase",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
  },
  {
    name: "Enterprise",
    eurPrice: 7500,
    prefix: "From ",
    features: [
      "Everything in Business, plus:",
      "Unlimited pages",
      "E-commerce or booking system integration",
      "Advanced animations and interactions",
      "Custom functionality & API integrations",
      "Design system documentation",
      "Priority support during and post-launch",
      "Dedicated project management",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
  },
];

interface AddOn {
  service: string;
  eurCost: number | null;
  suffix?: string;
  prefix?: string;
  label?: string;
}

const addOns: AddOn[] = [
  { service: "Professional email setup (Google Workspace / M365)", eurCost: 25, suffix: "/mo", prefix: "From " },
  { service: "Additional pages beyond tier limit", eurCost: 150, suffix: " per page" },
  { service: "Out-of-scope amendments", eurCost: 120, suffix: "/hr" },
  { service: "Monthly maintenance retainer", eurCost: 299, suffix: "/mo", prefix: "From " },
  { service: "Copywriting", eurCost: null, label: "POA" },
  { service: "Logo & brand identity", eurCost: 799, prefix: "From " },
];

const formatAddOnCost = (addOn: AddOn, currency: Currency): string => {
  if (addOn.label) return addOn.label;
  if (!addOn.eurCost) return "POA";
  return `${addOn.prefix || ""}${convertPrice(addOn.eurCost, currency)}${addOn.suffix || ""}`;
};

const notes = [
  "Hosting and domain registration are the client's responsibility and are not included in any tier.",
  "Professional email (e.g. name@yourbusiness.ie) requires a Google Workspace or Microsoft 365 subscription, billed directly to the client. Setup can be arranged as an add-on.",
  "A 50% deposit is required before work commences. The remaining balance is due on launch.",
  "All prices are exclusive of VAT (23%).",
];

interface RecentProject {
  name: string;
  descriptor: string;
  url: string;
  image: string;
}

const recentProjects: RecentProject[] = [
  { name: "Nicholas Moody Kitchens", descriptor: "Bespoke kitchen design studio based in Cork", url: "https://nicholasmoodykitchens.com", image: "/images/work/nicholas-moody-kitchens.png" },
  { name: "Savvy Kitchens", descriptor: "Contemporary kitchen design and project showcase", url: "https://savvykitchens.ie", image: "/images/work/savvy-kitchens.png" },
  { name: "Glimmers Mental Health Services", descriptor: "Mental health therapy practice led by Dr. Claire Mc Grotty, PhD, LCPC", url: "https://glimmersmhs.com", image: "/images/work/glimmers-mhs.png" },
  { name: "Ease Dental", descriptor: "State-of-the-art dental clinic in Dublin 12", url: "https://easedental.ie", image: "/images/work/ease-dental.png" },
  { name: "KBB Digital", descriptor: "Interior design photography & digital marketing studio", url: "https://www.kbbdigital.ie/", image: "/images/work/kbb-digital.png" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const WebDesignServices = () => {
  const [currency, setCurrency] = useState<Currency>("EUR");

  return (
    <main className="pt-24">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="px-6 pt-12 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-label text-primary">Services</span>
            <h1 className="mt-3 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
              Web Design &amp; Development
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              From concept to deployment — fully designed, built, and launched websites for businesses that mean business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="px-6 pb-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Every website we build starts with strategy and ends with a fully deployed, production-ready product. We handle design, development, and launch — hosting and domain registration remain with you. All projects are scoped upfront, with clear deliverables and transparent pricing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── RECENT WORK ──────────────────────────────────────── */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Recent Work</SectionLabel>
            <p className="mb-8 text-sm text-muted-foreground">
              A selection of recently designed and deployed websites.
            </p>
          </ScrollReveal>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {recentProjects.map((project) => (
                <CarouselItem key={project.name} className="pl-4 sm:basis-1/2">
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.name} website preview`}
                        className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
                          {project.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{project.descriptor}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                        <span className="truncate">{project.url.replace("https://", "")}</span>
                        <ExportSquare size={14} variant="TwoTone" className="flex-shrink-0" />
                      </div>
                    </div>
                  </motion.a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section id="pricing" className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Pricing</SectionLabel>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex h-full flex-col rounded-xl p-6 transition-colors ${
                    tier.popular
                      ? "border-2 border-primary bg-card"
                      : "border border-border bg-card"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                  <p className="mt-1 text-2xl font-black tracking-tight text-foreground">{tier.price}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <TickCircle size={16} variant="Bulk" className="mt-0.5 flex-shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={tier.ctaHref}
                    className={`mt-6 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:gap-2.5 ${
                      tier.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Ready to get started?</h2>
            <p className="mb-8 text-sm text-muted-foreground md:text-base">
              Let's talk about your project. We'll scope it, price it, and build it — properly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                View Pricing
              </a>
              <Link
                to="/start-project"
                className="group inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-2.5 hover:bg-primary/90"
              >
                Get Started <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>
  );
};

export default WebDesignServices;
