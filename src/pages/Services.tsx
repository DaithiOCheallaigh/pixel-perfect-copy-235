import { SEO } from "@/components/SEO";
import { useEffect, useState, useRef, lazy, Suspense, useSyncExternalStore } from "react";

const ElasticLettering = lazy(() => import("@/components/react-bits/elastic-lettering"));

const HERO_H1_CLASS = "mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl";

const STATIC_HERO_H1 = (
  <h1 className={HERO_H1_CLASS}>
    A proper website,{" "}
    <br />
    <span className="text-primary">built to win you work.</span>
  </h1>
);

const useIsDark = () =>
  useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => mo.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
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
  Brush2,
  ShieldTick,
} from "iconsax-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Button } from "@/components/ui/button";
import { addOns, aftercare, businessOption, emailSetup, bespokeLine, monthlyLabel, carePlans, careTerms, entry, eur, priceLabel, refreshNotes, segments, terms, tiers, vatFootnote, VAT_REGISTERED } from "@/data/pricing";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import SocialProof from "@/components/SocialProof";
import { BusinessPagesSelect } from "@/components/services/BusinessPagesSelect";

/* ------------------------------------------------------------------ */
/*  Differentiators                                                    */
/* ------------------------------------------------------------------ */

const differentiators = [
  {
    icon: Setting2,
    title: "Senior design, not a template",
    body: "Over 10 years designing products for Elsevier, Marsh and TipDirect. Your site gets the same care.",
  },
  {
    icon: Star1,
    title: "Design-led thinking",
    body: "Every page is built around what your customers actually do: call, book or ask for a quote. Nothing you don't need.",
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

const howItWorks = [
  { icon: Brush2, title: "Designed", body: "A senior product designer, not a template. Every page is built around what your customers actually do: call, book or ask for a quote." },
  { icon: Global, title: "Built and launched", body: "Fixed scope, fixed price and a launch date in writing. Your year-1 domain is included and you own the content and the code." },
  { icon: ShieldTick, title: "Looked after", body: "Hosting, domain, email and updates handled for you on a care plan, or handed over to you at launch. Your choice, below." },
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
  footer,
  children,
}: {
  selected: boolean;
  onToggle: () => void;
  label: string;
  index: number;
  featured?: boolean;
  /** Controls rendered under the card's button (never inside it: nested interactive elements are invalid). */
  footer?: React.ReactNode;
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
      {footer ? (
        <div className={`${cardClass(selected, featured)} !p-0`}>
          <Button variant="ghost" type="button" onClick={onToggle} aria-pressed={selected} data-label={label} className="relative flex h-auto w-full flex-1 flex-col items-start whitespace-normal rounded-none rounded-t-xl border-0 p-6 text-left hover:bg-transparent dark:hover:bg-transparent">
            <SelectIndicator selected={selected} />
            {children}
          </Button>
          <div className="w-full border-t border-border p-4" onClick={(e) => e.stopPropagation()}>{footer}</div>
        </div>
      ) : (
        <Button variant="ghost" type="button" onClick={onToggle} aria-pressed={selected} data-label={label} className={cardClass(selected, featured)}>
          <SelectIndicator selected={selected} />
          {children}
        </Button>
      )}
    </motion.div>
  );
};

const StepHeading = ({ title, body }: { title: string; body: string }) => (
  <div className="mb-6 mt-16 first:mt-0">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{body}</p>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Services = () => {
  const isDark = useIsDark();
  const elasticProps = {
    align: "left" as const,
    fontSize: "inherit",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    lineHeight: 1.1,
    hint: true,
    tensionColor: isDark ? "hsl(310 100% 92%)" : "hsl(310 60% 50%)",
  };
  const [tierId, setTierId] = useState<string | null>(null);
  const [aftercareChoice, setAftercareChoice] = useState<"self-managed" | "managed" | null>(null);
  const [careId, setCareId] = useState<string | null>(null);
  const [emailSelected, setEmailSelected] = useState(false);
  const [businessPages, setBusinessPages] = useState(5);
  const step2Ref = useRef<HTMLDivElement>(null);
  const scrolledToStep2 = useRef(false);
  const reduceMotion = useReducedMotion();
  const selectedTier = tiers.find((t) => t.id === tierId);

  const chooseTier = (id: string) => {
    const next = tierId === id ? null : id;
    setTierId(next);
    if (!next) {
      // Deselecting the website resets everything that depends on it.
      setAftercareChoice(null);
      setCareId(null);
      setEmailSelected(false);
    }
  };

  // Scroll to Step 2 the first time a website is chosen, never again on switching.
  useEffect(() => {
    if (!tierId || scrolledToStep2.current) return;
    scrolledToStep2.current = true;
    const t = window.setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 120);
    return () => window.clearTimeout(t);
  }, [tierId, reduceMotion]);

  const chooseAftercare = (choice: "self-managed" | "managed") => {
    setAftercareChoice((cur) => (cur === choice ? null : choice));
    // Switching to (or toggling off) aftercare choices other than "managed" clears any plan.
    if (choice === "self-managed" || aftercareChoice === "managed") setCareId(null);
  };

  // Broadcast IDs only; the selection bar prices them from the catalogue. "managed" alone is UI state.
  useEffect(() => {
    const ids = tierId
      ? [
          tierId === "business" ? businessOption(businessPages).id : tierId,
          ...(aftercareChoice === "self-managed" ? [aftercare.selfManaged.id] : aftercareChoice === "managed" && careId ? [careId] : []),
          ...(emailSelected ? [emailSetup.id] : []),
        ]
      : [];
    window.dispatchEvent(new CustomEvent("service-selection-change", { detail: ids.length ? ids.map((id) => ({ id })) : null }));
  }, [tierId, businessPages, aftercareChoice, careId, emailSelected]);

  // Clear the floating selection bar when leaving the page
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent("service-selection-change", { detail: null }));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Web Design for Irish Businesses" description="Lacuna Digital designs and builds fixed-quote websites for Irish small businesses, with hosting, domain and email looked after for you if you want. Designed and built by Dave Kelly in Dublin." />

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
              LACUNA DIGITAL — WEB DESIGN
            </span>
            <Suspense fallback={STATIC_HERO_H1}>
              <h1 className={HERO_H1_CLASS}>
                <ElasticLettering
                  as="span"
                  text="A proper website,"
                  className="block"
                  {...elasticProps}
                />{" "}
                <ElasticLettering
                  as="span"
                  text="built to win you work."
                  className="block text-primary"
                  {...elasticProps}
                />
              </h1>
            </Suspense>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Designed and built by a senior product designer in Dublin. Fixed price, launch date in writing, and looked after once it's live if you want it to be.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Build your package <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/services/web-design"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Live examples
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
          </ScrollReveal>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-3">
          {howItWorks.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className={`flex flex-col ${i < howItWorks.length - 1 ? "border-b border-border pb-12 md:border-b-0 md:border-r md:pb-0 md:pr-12" : ""} ${i > 0 ? "pt-12 md:pl-12 md:pt-0" : ""}`}>
                <item.icon variant="TwoTone" className="h-10 w-10 text-primary" />
                <h2 className="mt-6 text-2xl font-bold md:text-3xl">{item.title}</h2>
                <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Choose your package ── */}
      <section id="packages" className="px-6 pt-4 pb-24 md:px-12 lg:px-24">
        <span id="services" className="block scroll-mt-24" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Build Your Package</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Choose your package</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Pick a website, decide who looks after it once it's live, add email if you need it. Every price is fixed and published.
            </p>
          </ScrollReveal>

          <div className="mt-12">
            <div className="grid gap-4 md:grid-cols-3">
              {tiers.map((baseTier, i) => {
                const isBusiness = baseTier.id === "business";
                const tier = isBusiness ? { ...baseTier, ...businessOption(businessPages), id: baseTier.id } : baseTier;
                return (
                <SelectableCard key={tier.id} index={i} selected={tierId === tier.id} label={`${tier.name}, ${priceLabel(tier)}`} onToggle={() => chooseTier(tier.id)}
                  footer={isBusiness ? <BusinessPagesSelect pages={businessPages} onChange={(n) => { setBusinessPages(n); if (tierId !== "business") chooseTier("business"); }} /> : undefined}>
                  <h4 className={`text-xl font-bold ${HOVER_TEXT}`}>{tier.name}</h4>
                  <p className={`mt-3 text-2xl font-bold ${HOVER_TEXT}`}>{priceLabel(tier)}</p>
                  <p className={`mt-2 min-h-5 text-sm ${accentText(tierId === tier.id)}`}>{tier.monthly ? monthlyLabel(tier) : ""}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.scope?.map((item) => (
                      <li key={item} className={`flex gap-2 text-sm text-muted-foreground ${HOVER_TEXT}`}>
                        <Check className={`mt-1 h-4 w-4 shrink-0 ${accentText(tierId === tier.id)}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-5 text-xs text-muted-foreground ${HOVER_TEXT}`}>Live in {tier.live}{tier.id === "refresh" ? "" : " from a complete intake"}</p>
                  <span className={`mt-5 text-sm font-semibold ${accentText(tierId === tier.id)}`}>{tierId === tier.id ? "Selected" : "Select"}</span>
                </SelectableCard>
                );
              })}
            </div>
            {selectedTier && !aftercareChoice && (
              <p className="mt-6 text-sm font-semibold text-primary" role="status">
                {selectedTier.name} selected. Next: choose who looks after it once it's live ↓
              </p>
            )}
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p><Link to="/services/start-project" className="text-primary hover:underline">{bespokeLine()} →</Link></p>
              <p className="text-xs">Website Refresh: {refreshNotes()}</p>
            </div>

            <AnimatePresence initial={false}>
            {tierId && (
            <motion.div
              key="steps-2-3"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
            <div ref={step2Ref} className="scroll-mt-24 pt-16">
            <StepHeading title="Once it's live, who looks after it?" body="Hosting, domain renewal, security updates and small edits all need an owner. Pick one of the two; you can change later." />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {([
                { key: "self-managed" as const, option: aftercare.selfManaged, featured: false },
                { key: "managed" as const, option: aftercare.managed, featured: true },
              ]).map(({ key, option, featured }, i) => {
                const selected = aftercareChoice === key;
                return (
                  <SelectableCard key={key} index={i} featured={featured} selected={selected} label={`${option.name}, ${option.priceLine}`} onToggle={() => chooseAftercare(key)}>
                    {featured && <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Recommended</span>}
                    <h4 className={`text-xl font-bold ${featured ? "mt-6" : ""} ${HOVER_TEXT}`}>{option.name}</h4>
                    <p className={`mt-3 text-2xl font-bold ${HOVER_TEXT}`}>{option.priceLine}</p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {option.includes.map((item) => (
                        <li key={item} className={`flex items-start gap-2 text-sm text-muted-foreground ${HOVER_TEXT}`}>
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentText(selected)}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <span className={`mt-5 text-sm font-semibold ${accentText(selected)}`}>{selected ? "Selected" : "Select"}</span>
                  </SelectableCard>
                );
              })}
            </div>
            {aftercareChoice === "managed" && (
              <div className="mt-10">
                <p className="mb-4 font-mono-label text-muted-foreground">Choose a plan</p>
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
              </div>
            )}

            <StepHeading title="Email on your domain" body="Optional. Professional email at you@yourbusiness.ie, set up and tested on your devices." />
            <div className="max-w-md">
              <SelectableCard index={0} selected={emailSelected} label={`${emailSetup.name}, ${eur(emailSetup.setup)} one-off`} onToggle={() => setEmailSelected((v) => !v)}>
                <h4 className={`text-xl font-bold ${HOVER_TEXT}`}>{emailSetup.name}</h4>
                <p className={`mt-3 text-2xl font-bold ${HOVER_TEXT}`}>{eur(emailSetup.setup)}{VAT_REGISTERED ? " + VAT" : ""} one-off</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {emailSetup.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm text-muted-foreground ${HOVER_TEXT}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentText(emailSelected)}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className={`mt-5 text-sm font-semibold ${accentText(emailSelected)}`}>{emailSelected ? "Selected" : "Select"}</span>
              </SelectableCard>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Also available: extra pages {eur(addOns.extraPage)} each, copywriting {eur(addOns.copyPerPage)} a page, Google Business Profile setup {eur(addOns.gbp)}. Ask in the quote form.
            </p>
            </motion.div>
            )}
            </AnimatePresence>
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

      {/* ── Social Proof ── */}
      <SocialProof />

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
