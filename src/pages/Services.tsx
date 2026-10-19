import { SEO } from "@/components/SEO";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Global,
  Setting2,
  Star1,
  Clock,
  Receipt1,
  TickCircle,
} from "iconsax-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Button } from "@/components/ui/button";
import { bespokeLine, monthlyLabel, carePlans, careTerms, entry, eur, priceLabel, segments, terms, tiers, vatFootnote } from "@/data/pricing";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import SocialProof from "@/components/SocialProof";

/* ------------------------------------------------------------------ */
/*  Differentiators                                                    */
/* ------------------------------------------------------------------ */

const differentiators = [
  {
    icon: Setting2,
    title: "Practical AI experience",
    body: "Not theory — I've built and deployed AI tools in real businesses, from automated review systems to internal knowledge bases.",
  },
  {
    icon: Star1,
    title: "Design-led thinking",
    body: "Every solution is built around how your team actually works. No bloated platforms or tools that gather dust.",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    body: "Fixed scope, fixed price, a launch date in writing.",
  },
  {
    icon: Receipt1,
    title: "Transparent pricing",
    body: "One price per item, published. Software licences (email, booking or ordering systems) are billed to you directly.",
  },
];

/* ------------------------------------------------------------------ */
/*  Selectable cards                                                   */
/* ------------------------------------------------------------------ */

const HOVER_TEXT = "group-hover:text-foreground dark:group-hover:text-accent-foreground";
const cardClass = (selected: boolean, featured?: boolean) =>
  `group relative flex h-full w-full items-start whitespace-normal flex-col rounded-xl border p-6 text-left transition-all hover:bg-primary/15 dark:hover:bg-accent ${
    selected
      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
      : featured
        ? "border-primary/40 bg-card hover:border-primary/60 hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.2)]"
        : "border-border bg-card hover:border-primary/30 hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.15)]"
  }`;
const accentText = (selected: boolean) => `${selected ? "text-foreground dark:text-primary" : "text-primary"} ${HOVER_TEXT}`;

const SelectIndicator = ({ selected }: { selected: boolean }) => (
  <div className="absolute right-3 top-3">
    <TickCircle
      variant={selected ? "Bulk" : "TwoTone"}
      className={`h-6 w-6 transition-all ${selected ? "text-foreground dark:text-primary" : "text-border"} ${HOVER_TEXT}`}
    />
  </div>
);

const SelectableCard = ({
  selected,
  onToggle,
  label,
  index,
  featured,
  children,
}: {
  selected: boolean;
  onToggle: () => void;
  label: string;
  index: number;
  featured?: boolean;
  children: React.ReactNode;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Button variant="ghost" type="button" onClick={onToggle} aria-pressed={selected} data-label={label} className={cardClass(selected, featured)}>
        <SelectIndicator selected={selected} />
        {children}
      </Button>
    </motion.div>
  );
};

const StepHeading = ({ n, title, body }: { n: number; title: string; body: string }) => (
  <div className="mb-6 mt-16 first:mt-0">
    <p className="font-mono-label text-muted-foreground">Step {n}</p>
    <h3 className="mt-2 text-2xl font-bold">{title}</h3>
    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{body}</p>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Services = () => {
  const [tierId, setTierId] = useState<string | null>(null);
  const [careId, setCareId] = useState<string | null>(null);

  // Broadcast IDs only; the selection bar prices them from the catalogue.
  useEffect(() => {
    const ids = tierId ? [tierId, ...(careId ? [careId] : [])] : [];
    window.dispatchEvent(new CustomEvent("service-selection-change", { detail: ids.length ? ids.map((id) => ({ id })) : null }));
  }, [tierId, careId]);

  // Clear the floating selection bar when leaving the page
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent("service-selection-change", { detail: null }));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Websites, AI & Automation for Irish SMEs" description="Lacuna Digital builds fixed-quote websites, booking systems, AI tools and automations for Irish small businesses, designed and built by Dave Kelly in Dublin." />

      {/* ── Hero ── */}
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
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              Get found, get booked,{" "}
              <br />
              <span className="text-primary">get paid.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Designed by a senior product designer, built in days with AI.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Build your package <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/services/start-project"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Get a fixed quote
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="text-primary">★★★★★</span>
                5.0 on Google Reviews
              </span>
              <span className="inline-flex items-center gap-2">
                <TickCircle variant="Bold" className="h-4 w-4 text-primary" />
                Fixed price · launch date in writing
              </span>
            </div>

          </motion.div>
        </div>
      </section>

      <section className="border-b border-border px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="text-lg leading-relaxed">
              Not sure what you need? A free intro call and a fixed written quote within {entry.introCall.quoteWithin}.
            </p>
            <Button asChild className="mt-4 rounded-sm">
              <Link to="/services/start-project">Get a fixed quote <ArrowRight /></Link>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Custom AI or multi-site project? {entry.healthCheck.name} {eur(entry.healthCheck.price)}, half credited against your project.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Two Pillars ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          <ScrollReveal>
            <div className="flex flex-col border-b border-border pb-12 md:border-b-0 md:border-r md:pb-0 md:pr-12">
              <Global variant="TwoTone" className="h-10 w-10 text-primary" />
              <h2 className="mt-6 text-2xl font-bold md:text-3xl">Online Visibility</h2>
              <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                Getting your business in front of the right people, on the right platforms.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col pt-12 md:pl-12 md:pt-0">
              <Setting2 variant="TwoTone" className="h-10 w-10 text-primary" />
              <h2 className="mt-6 text-2xl font-bold md:text-3xl">Business Efficiency</h2>
              <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                Automating the workflows that drain your time and cost you money.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <SocialProof />

      {/* ── Connected Services ── */}
      <section className="relative px-6 py-16 md:px-12 lg:px-24 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-8">
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Every service connects
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
                Most businesses patch tools together and hope for the best. I use AI to build you a system where everything works together — from your first online presence to a fully automated operation.
              </p>
            </div>
          </ScrollReveal>

          <iframe
            src="/embeds/hairline-services.html"
            title="Connected services: Local SEO, AI Assistant, CRM & Leads, Website and Reservations"
            loading="lazy"
            scrolling="no"
            className="mx-auto block aspect-[5/4] w-full max-w-[800px] border-0 bg-transparent"
          />

        </div>
      </section>

      {/* ── Choose your package ── */}
      <section id="packages" className="px-6 py-24 md:px-12 lg:px-24">
        <span id="services" className="block scroll-mt-24" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Build Your Package</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Choose your package</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Pick a website tier, then choose how it's looked after. Every price is fixed and published.
            </p>
          </ScrollReveal>

          <div className="mt-12">
            <StepHeading n={1} title="Pick a tier" body="One website ladder for every business. Each tier has a fixed scope and a launch date in writing." />
            <div className="grid gap-4 md:grid-cols-3">
              {tiers.map((tier, i) => (
                <SelectableCard key={tier.id} index={i} selected={tierId === tier.id} label={`${tier.name}, ${priceLabel(tier)}`} onToggle={() => setTierId((cur) => (cur === tier.id ? null : tier.id))}>
                  <h4 className={`text-xl font-bold ${HOVER_TEXT}`}>{tier.name}</h4>
                  <p className={`mt-3 text-2xl font-bold ${HOVER_TEXT}`}>{priceLabel(tier)}</p>
                  {tier.monthly && <p className={`mt-2 text-sm ${accentText(tierId === tier.id)}`}>{monthlyLabel(tier)}</p>}
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.scope?.map((item) => (
                      <li key={item} className={`flex gap-2 text-sm text-muted-foreground ${HOVER_TEXT}`}>
                        <Check className={`mt-1 h-4 w-4 shrink-0 ${accentText(tierId === tier.id)}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-5 text-xs text-muted-foreground ${HOVER_TEXT}`}>Live in {tier.live} from a complete intake</p>
                  <span className={`mt-5 text-sm font-semibold ${accentText(tierId === tier.id)}`}>{tierId === tier.id ? "Selected" : "Select"}</span>
                </SelectableCard>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              <Link to="/services/start-project" className="text-primary hover:underline">{bespokeLine()} →</Link>
            </p>

            <StepHeading n={2} title="Keep it running" body="Optional care after launch. Choose one plan, or none." />
            <div className="grid gap-6 md:grid-cols-3">
              {carePlans.map((plan, i) => {
                const selected = careId === plan.id;
                return (
                  <SelectableCard key={plan.id} index={i} featured={plan.popular} selected={selected} label={`${plan.name} care plan, ${eur(plan.monthly)} a month`} onToggle={() => setCareId((cur) => (cur === plan.id ? null : plan.id))}>
                    {plan.popular && <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Most Popular</span>}
                    <h4 className={`text-lg font-bold ${plan.popular ? "mt-6" : ""} ${HOVER_TEXT}`}>{plan.name}</h4>
                    <p className={`mt-4 text-3xl font-bold ${HOVER_TEXT}`}>{eur(plan.monthly)}<span className={`text-sm font-normal text-muted-foreground ${HOVER_TEXT}`}>/mo</span></p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.includes.map((feature) => (
                        <li key={feature} className={`flex items-start gap-2 text-sm text-muted-foreground ${HOVER_TEXT}`}>
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentText(selected)}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </SelectableCard>
                );
              })}
            </div>
            <div className="mt-6 space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>{careTerms.minimums}. {careTerms.annualPrepay}.</p>
              <p>{careTerms.exit}</p>
              <p>{vatFootnote()} {terms.payMonthlyNote}.</p>
            </div>
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Built for your industry:{" "}
            {Object.values(segments).map((segment, i) => (
              <span key={segment.slug}>
                {i > 0 && " · "}
                <Link to={`/services/${segment.slug}`} className="text-foreground hover:text-primary">{segment.title}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Why Work With Me ── */}
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
                  <item.icon variant="TwoTone" className="h-6 w-6 text-primary" />
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

      {/* ── Payment terms ── */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>
                Payment: under {eur(terms.upfrontBelow)} paid upfront; 50/50 up to {eur(terms.splitThrough)} with the balance before go-live; {terms.over3000.split(" ")[0]} above. {terms.oneDiscountPerOrder && "One discount per order."}
              </p>
              <p>Need an accountant or company formation? I'll introduce you — free.</p>
            </div>
            <div className="mt-16 text-center">
              <p className="text-muted-foreground">Not sure which package is right for you?</p>
              <Button asChild className="mt-4 rounded-sm">
                <Link to="/services/start-project">Book a Discovery Call <ArrowRight /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

          </div>
  );
};

export default Services;
