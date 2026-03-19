import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Palette, Clock, DollarSign, Brain, Sparkles } from "lucide-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import SocialProof from "@/components/SocialProof";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";

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

const serviceCards = [
  {
    title: "AI Integration",
    description:
      "I audit your workflows and build custom AI solutions that eliminate repetitive tasks, reduce errors, and free your team to focus on what actually moves the needle.",
    link: "/ai-integration",
    icon: Brain,
  },
  {
    title: "Web Design & Development",
    description:
      "Professional, fast-loading websites designed for conversion — fully deployed, SEO-ready, and built to make your business look as good online as it is in person.",
    link: "/web-design",
    icon: Palette,
  },
];

const differentiators = [
  {
    icon: Zap,
    title: "Practical AI experience",
    body: "Not theory — I've built and deployed AI tools in real businesses, from automated review systems to internal knowledge bases.",
  },
  {
    icon: Sparkles,
    title: "Design-led thinking",
    body: "Every solution is built around how your team actually works. No bloated platforms or tools that gather dust.",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    body: "Most projects are scoped, built, and deployed within weeks — not months. You see results quickly.",
  },
  {
    icon: DollarSign,
    title: "Transparent pricing",
    body: "Fixed-price packages with no hidden fees. You know exactly what you're paying before we start.",
  },
];

/* AI Integration pricing */
const aiPricing = [
  {
    name: "Discovery Audit",
    eurPrice: 750,
    prefix: "From ",
    label: "One-off",
    features: [
      "Full workflow audit & mapping",
      "AI Opportunity Report",
      "Prioritised recommendations",
      "Estimated time & cost savings",
      "Can be credited against retainer",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: false,
  },
  {
    name: "Monthly Retainer",
    eurPrice: 500,
    suffix: " / month",
    label: "Ongoing",
    features: [
      "Ongoing build & integration",
      "Monthly strategy call",
      "Support & iteration",
      "New use cases as you grow",
      "Cancel with 30 days' notice",
    ],
    cta: "Book a Call",
    ctaHref: "/start-project",
    popular: true,
    badge: "Tax deductible",
  },
  {
    name: "Bespoke Integration",
    eurPrice: 0,
    customPrice: "Pre-agreed fixed fee",
    label: "Project-based",
    features: [
      "End-to-end AI strategy",
      "Complex tool integrations",
      "Custom APIs & connectors",
      "Fixed price agreed in writing",
      "Full scoping before any build",
    ],
    cta: "Discuss Your Project",
    ctaHref: "/start-project",
    popular: false,
  },
];

/* Web Design pricing */
const webPricing = [
  {
    name: "Starter",
    eurPrice: 1999,
    features: [
      "Up to 5 pages",
      "Custom design to brand guidelines",
      "Mobile responsive",
      "Contact form integration",
      "Basic on-page SEO setup",
      "2 rounds of revisions",
      "Fully deployed website",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: false,
  },
  {
    name: "Business",
    eurPrice: 3999,
    features: [
      "Everything in Starter, plus:",
      "Up to 10 pages",
      "Blog or news section",
      "Analytics setup (GA / Tag Manager)",
      "Performance & accessibility optimisation",
      "Social media integration",
      "3 rounds of revisions",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: true,
  },
  {
    name: "Enterprise",
    eurPrice: 7500,
    prefix: "From ",
    features: [
      "Everything in Business, plus:",
      "Unlimited pages",
      "E-commerce or booking integration",
      "Advanced animations & interactions",
      "Custom functionality & APIs",
      "Design system documentation",
      "Priority support",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: false,
  },
];

const pricingCategories = [
  { key: "ai", label: "AI Integration", data: aiPricing },
  { key: "web", label: "Web Design", data: webPricing },
] as const;

type PricingCategory = (typeof pricingCategories)[number]["key"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<PricingCategory>("ai");
  const [currency, setCurrency] = useState<Currency>("EUR");

  useEffect(() => {
    document.title = "Services — Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "AI integration and web design services for businesses. I help you work smarter, automate workflows, and build a professional online presence."
      );
    }
  }, []);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const activePricing = pricingCategories.find((c) => c.key === activeCategory)!.data;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServicesNavigation visible={true} />

      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden px-6 pt-16 md:px-12 lg:px-24">
        <DottedSurface className="pointer-events-none opacity-40" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-label text-muted-foreground">
              LACUNA DIGITAL — SERVICES
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              I help businesses
              <br />
              <span className="text-primary">work smarter</span> with AI
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              You know AI could save your business time and money — but you don't know where to start.
              I find the opportunities, build the tools, and get your team up to speed.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/start-project"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Book a Discovery Call <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={scrollToServices}
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Services</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What I do</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Two focused services designed to give your business a competitive edge — whether that's through smarter workflows or a stronger online presence.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {serviceCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <Link
                  to={card.link}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/50"
                >
                  <card.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Why Lacuna Digital</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why work with me
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="flex flex-col">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Pricing */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Clear, upfront pricing
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              No hidden fees, no hourly billing surprises. Pick a package that fits your needs, or get in touch for something custom.
            </p>
          </ScrollReveal>

          {/* Category slider + Currency switcher */}
          <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            {/* Tab slider */}
            <div className="relative inline-flex rounded-lg border border-border bg-card p-1">
              {pricingCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative z-10 rounded-md px-5 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === cat.key
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeCategory === cat.key && (
                    <motion.span
                      layoutId="pricing-tab"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Currency switcher */}
            <div className="inline-flex rounded-lg border border-border bg-card p-1">
              {(["EUR", "USD", "GBP"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    currency === c
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing cards */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {activePricing.map((tier) => {
              const priceDisplay =
                "customPrice" in tier && (tier as any).customPrice
                  ? (tier as any).customPrice
                  : `${tier.prefix || ""}${convertPrice(tier.eurPrice, currency)}${(tier as any).suffix || ""}`;

              return (
                <div
                  key={tier.name}
                  className={`relative flex h-full flex-col rounded-xl border p-8 ${
                    tier.popular ? "border-primary bg-card" : "border-border bg-card"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  )}
                  {"badge" in tier && (tier as any).badge && !tier.popular && (
                    <span className="absolute -top-3 left-6 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {(tier as any).badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold">{tier.name}</h3>
                  {"label" in tier && (
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{(tier as any).label}</p>
                  )}
                  <p className="mt-4 text-3xl font-bold">{priceDisplay}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-0.5 text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={tier.ctaHref}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-all ${
                      tier.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    {tier.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </motion.div>

          <ScrollReveal delay={0.3}>
            <p className="mt-6 text-xs text-muted-foreground">
              All prices are exclusive of VAT (23%).
            </p>
            <div className="mt-16 text-center">
              <p className="text-muted-foreground">
                Not sure which package is right for you?
              </p>
              <Link
                to="/start-project"
                className="group mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Book a Discovery Call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default Services;
