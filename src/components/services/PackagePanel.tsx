import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import { aftercare, businessOption, carePlans, CONTACT_EMAIL, eur, monthlyLabel, priceLabel, tiers, VAT_REGISTERED, type DiscountCode } from "@/data/pricing";
import { BusinessPagesSelect } from "@/components/services/BusinessPagesSelect";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { selectionIsFrom, type discountBreakdown, type selectionItems, type selectionTotalsWithDiscount } from "@/data/serviceEstimates";

export const inputClass =
  "w-full min-h-12 rounded-md border border-input bg-card px-4 py-3 text-base text-foreground md:min-h-0 md:text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

export const Pill = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] ${
      selected
        ? "border-primary bg-primary/10 text-primary"
        : "border-input bg-card text-muted-foreground hover:border-primary/40"
    }`}
  >
    {label}
  </button>
);

export const Field = ({ id, label, required, children, error }: { id: string; label: string; required?: boolean; children: ReactNode; error?: string }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="font-mono-label text-muted-foreground">
      {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
    </label>
    {children}
    {error && <p id={`${id}-error`} role="alert" className="text-xs text-destructive">{error}</p>}
  </div>
);

export const Group = ({ id, label, required, children, error, action }: { id: string; label: string; required?: boolean; children: ReactNode; error?: string; action?: ReactNode }) => (
  <fieldset className="relative min-w-0 space-y-2" aria-describedby={error ? `${id}-error` : undefined} aria-invalid={error ? true : undefined}>
    <legend className="mb-2 font-mono-label text-muted-foreground">
      {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
    </legend>
    {action && <div className="absolute -right-1 -top-1.5 !mt-0">{action}</div>}
    {children}
    {error && <p id={`${id}-error`} role="alert" className="text-xs text-destructive">{error}</p>}
  </fieldset>
);

export interface PackageOption { id: string; label: string }
export interface WebsiteOption extends PackageOption { match: (id: string) => boolean }

/** Welcome-offer arrival: "typing" while the code is being typed in (status hidden), "sweep" while the one-loop gradient ring plays. */
export type DiscountReveal = "typing" | "sweep";

export interface PackagePanelProps {
  selectedIds: string[];
  selection: ReturnType<typeof selectionItems>;
  websiteId?: string;
  websiteOptions: WebsiteOption[];
  chooseWebsite: (id: string) => void;
  businessPages: number;
  changeBusinessPages: (pages: number) => void;
  aftercareOptions: PackageOption[];
  chooseAftercare: (id: string) => void;
  discountInput: string;
  setDiscountInput: (value: string) => void;
  discount?: DiscountCode;
  breakdown: ReturnType<typeof discountBreakdown>;
  totals: ReturnType<typeof selectionTotalsWithDiscount>;
  hasWebsite: boolean;
  discountReveal?: DiscountReveal;
  className?: string;
}

const discountStatus = (discount: DiscountCode, breakdown: ReturnType<typeof discountBreakdown>) =>
  discount.appliesTo === "all"
    ? `${discount.label} applied: ${discount.percent}% off your website and care plan for the duration of your contract.`
    : `${discount.label} applied: ${discount.percent}% off website packages.${breakdown.bonusPlan ? ` Your ${breakdown.bonusPlan} plan adds a further ${breakdown.bonusPercent}%: ${breakdown.percent}% off in total.` : " Select a care plan for a further discount."}`;

const savingsLine = (totals: ReturnType<typeof selectionTotalsWithDiscount>, discount?: DiscountCode) => {
  if (discount?.appliesTo === "all") {
    const parts = [...(totals.discount > 0 ? [`${eur(totals.discount)} on setup`] : []), ...(totals.monthlyDiscount ? [`${eur(totals.monthlyDiscount)}/mo`] : [])];
    return `You save ${parts.join(" and ")} (${totals.discountPercent}% off)`;
  }
  return `You save ${eur(totals.discount)} (${totals.discountPercent}% off the website)`;
};

/* ── Tier details: the small (i) button expands a swipeable card per option inside the panel ── */

/** Small round (i) button in a group header; becomes an X while the details are open. */
const DetailsToggle = ({ open, label, controls, onClick }: { open: boolean; label: string; controls: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-expanded={open}
    aria-controls={controls}
    aria-label={`${open ? "Hide" : "Show"} ${label}`}
    title={`${open ? "Hide" : "Show"} ${label}`}
    className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
      open ? "border-primary bg-primary/10 text-primary" : "border-input bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
    }`}
  >
    {open ? <X className="h-3.5 w-3.5" aria-hidden="true" /> : <Info className="h-3.5 w-3.5" aria-hidden="true" />}
  </button>
);

export type DetailSlide = {
  id: string;
  name: string;
  price: string;
  sub?: string;
  note?: string;
  badge?: string;
  bullets: readonly string[];
  selected: boolean;
  onSelect: () => void;
  extra?: ReactNode;
};

/** One card per option; swipe (or arrows / dots / arrow keys) to compare, Select picks it like the pill does. */
const TierDetails = ({ id, label, slides, startIndex }: { id: string; label: string; slides: DetailSlide[]; startIndex: number }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(startIndex);
  const initial = useRef(startIndex);
  useEffect(() => {
    if (!api) return;
    let settled = false;
    const settle = () => {
      if (settled || api.scrollSnapList().length <= initial.current) return;
      api.scrollTo(initial.current, true);
      settled = true;
    };
    const onSelect = () => setIndex(api.selectedScrollSnap());
    const onReInit = () => { settle(); onSelect(); };
    settle();
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onReInit);
    return () => { api.off("select", onSelect); api.off("reInit", onReInit); };
  }, [api]);
  return (
    <div className="mt-3 min-w-0 rounded-lg border border-border/70 bg-background/60 p-3" data-testid={`${id}-details`}>
      <Carousel setApi={setApi} opts={{ startIndex, align: "start", containScroll: "trimSnaps" }} aria-label={label}>
        <CarouselContent className="-ml-3 items-start">
          {slides.map((s) => (
            <CarouselItem key={s.id} className="pl-3">
              <article className={`flex flex-col rounded-md border p-4 transition-colors ${s.selected ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{s.name}</h3>
                    <p className="mt-1 text-lg font-bold text-foreground">{s.price}</p>
                    {s.sub && <p className="text-xs text-primary">{s.sub}</p>}
                  </div>
                  {s.badge && <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{s.badge}</span>}
                </div>
                {s.extra}
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {s.note && <p className="mt-3 text-xs text-muted-foreground">{s.note}</p>}
                <button
                  type="button"
                  onClick={s.onSelect}
                  aria-pressed={s.selected}
                  aria-label={`${s.selected ? "Selected" : "Select"}: ${s.name}`}
                  className={`mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] ${
                    s.selected ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-card text-foreground hover:border-primary/60 hover:text-foreground hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.25)]"
                  }`}
                >
                  {s.selected ? <><Check className="h-4 w-4" aria-hidden="true" /> Selected</> : "Select"}
                </button>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button type="button" onClick={() => api?.scrollPrev()} disabled={index === 0} aria-label="Previous option" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-input bg-card text-foreground transition-colors hover:border-primary/60 disabled:opacity-30 disabled:hover:border-input">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button key={s.id} type="button" onClick={() => api?.scrollTo(i)} aria-label={`Go to ${s.name}`} aria-current={i === index ? "true" : undefined} className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`} />
          ))}
        </div>
        <button type="button" onClick={() => api?.scrollNext()} disabled={index >= slides.length - 1} aria-label="Next option" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-input bg-card text-foreground transition-colors hover:border-primary/60 disabled:opacity-30 disabled:hover:border-input">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const detailsMotion = (reduce: boolean | null) => ({
  initial: reduce ? { opacity: 0 } : { height: 0, opacity: 0 },
  animate: reduce ? { opacity: 1 } : { height: "auto", opacity: 1 },
  exit: reduce ? { opacity: 0 } : { height: 0, opacity: 0 },
  transition: { duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] as const },
});

/** The "Your package" editor, shared by the inline desktop panel and the bottom-bar drawer. */
export const PackagePanel = ({
  selectedIds, selection, websiteId, websiteOptions, chooseWebsite, businessPages, changeBusinessPages,
  aftercareOptions, chooseAftercare, discountInput, setDiscountInput, discount, breakdown, totals, hasWebsite, discountReveal,
  className = "rounded-lg border border-primary/40 bg-primary/5 p-5",
}: PackagePanelProps) => {
  const showStatus = Boolean(discountInput.trim()) && discountReveal !== "typing";
  const saves = totals.discount > 0 || Boolean(totals.monthlyDiscount);
  const reduce = useReducedMotion();
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);

  const websiteSlides: DetailSlide[] = tiers.map((t) => {
    const option = websiteOptions.find((o) => o.id === t.id);
    const selected = Boolean(websiteId && (option ? option.match(websiteId) : websiteId === t.id));
    const onSelect = () => chooseWebsite(option?.id ?? t.id);
    if (t.id === "business") {
      const o = businessOption(businessPages);
      return {
        id: t.id, name: t.name, price: `${eur(o.price)}${VAT_REGISTERED ? " + VAT" : ""}`, note: `Live in ${o.live} from a complete intake`, bullets: o.scope, selected, onSelect,
        extra: <div className="mt-3 max-w-xs"><BusinessPagesSelect pages={businessPages} onChange={changeBusinessPages} /></div>,
      };
    }
    return { id: t.id, name: t.name, price: priceLabel(t), sub: monthlyLabel(t), note: `Live in ${t.live}${t.id === "refresh" ? "" : " from a complete intake"}`, bullets: t.scope ?? [], selected, onSelect };
  });
  const careSlides: DetailSlide[] = [
    { id: aftercare.selfManaged.id, name: aftercare.selfManaged.name, price: aftercare.selfManaged.priceLine, bullets: aftercare.selfManaged.includes, selected: selectedIds.includes(aftercare.selfManaged.id), onSelect: () => chooseAftercare(aftercare.selfManaged.id) },
    ...carePlans.map((plan) => ({
      id: plan.id, name: plan.name, price: `${eur(plan.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`, badge: plan.popular ? "Most popular" : undefined, bullets: plan.includes,
      selected: selectedIds.includes(plan.id), onSelect: () => chooseAftercare(plan.id),
    })),
  ];
  const startAt = (slides: DetailSlide[]) => Math.max(0, slides.findIndex((s) => s.selected));

  return (
  <section aria-label="Your selected package" className={className}>
    <h2 className="text-xl font-bold tracking-tight text-foreground">Your package</h2>
    <div className="mt-4">
      <Group id="sp-website" label="1. Website" action={<DetailsToggle open={websiteOpen} label="website package details" controls="sp-website-details" onClick={() => setWebsiteOpen((v) => !v)} />}>
        <div className="flex flex-wrap gap-2 pr-10">
          {websiteOptions.map((option) => (
            <Pill key={option.id} label={option.label} selected={Boolean(websiteId && option.match(websiteId))} onClick={() => chooseWebsite(option.id)} />
          ))}
        </div>
        {websiteId && websiteOptions[2]?.match(websiteId) && (
          <div className="mt-3 max-w-xs"><BusinessPagesSelect pages={businessPages} onChange={changeBusinessPages} /></div>
        )}
        <AnimatePresence initial={false}>
          {websiteOpen && (
            <motion.div key="website-details" id="sp-website-details" className="overflow-hidden" {...detailsMotion(reduce)}>
              <TierDetails id="sp-website" label="Website package details" slides={websiteSlides} startIndex={startAt(websiteSlides)} />
            </motion.div>
          )}
        </AnimatePresence>
      </Group>
    </div>
    <div className="mt-5">
      <Group id="sp-aftercare" label="2. Care plans" action={<DetailsToggle open={careOpen} label="care plan details" controls="sp-aftercare-details" onClick={() => setCareOpen((v) => !v)} />}>
        <div className="flex flex-wrap gap-2 pr-10">
          {aftercareOptions.map((option) => (
            <Pill key={option.id} label={option.label} selected={selectedIds.includes(option.id)} onClick={() => chooseAftercare(option.id)} />
          ))}
        </div>
        <AnimatePresence initial={false}>
          {careOpen && (
            <motion.div key="care-details" id="sp-aftercare-details" className="overflow-hidden" {...detailsMotion(reduce)}>
              <TierDetails id="sp-aftercare" label="Care plan details" slides={careSlides} startIndex={startAt(careSlides)} />
            </motion.div>
          )}
        </AnimatePresence>
      </Group>
    </div>
    <div className="mt-5">
      <Field id="sp-discount" label="Discount code (optional)">
        <div className="relative">
          <input id="sp-discount" className={inputClass + " uppercase" + (discount ? " pr-10 border-primary/60" : "")} maxLength={32} autoComplete="off" spellCheck={false} value={discountInput} onChange={(e) => setDiscountInput(e.target.value)} aria-describedby={showStatus ? "sp-discount-status" : undefined} />
          {discount && <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />}
          {discountReveal === "sweep" && <span className="discount-sweep" data-testid="discount-sweep" aria-hidden="true" />}
        </div>
      </Field>
      {showStatus && (
        <p id="sp-discount-status" aria-live="polite" className={`mt-2 text-xs ${discount ? "text-primary" : "text-muted-foreground"}`}>
          {discount ? discountStatus(discount, breakdown) : "Code not recognised."}
          {discount && <span className="sr-only"> Code accepted.</span>}
        </p>
      )}
    </div>
    <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-border/60 pt-4">
      <p className="text-xs text-muted-foreground">
        All enquiries are reviewed personally by Dave Kelly · <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground hover:underline">{CONTACT_EMAIL}</a>
      </p>
      <div className="ml-auto text-right">
        {selection.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing selected yet</p>
        ) : (
          <>
            {hasWebsite && (
              <p className="text-sm font-semibold text-foreground">
                {`Setup ${selectionIsFrom(selection) ? "from " : ""}${eur(totals.oneOff)}${VAT_REGISTERED ? " + VAT" : ""}`}
                {totals.discount > 0 && <> <s className="font-normal text-muted-foreground">{eur(totals.oneOff + totals.discount)}</s></>}
              </p>
            )}
            {totals.monthly > 0 && (
              <p className="text-xs text-muted-foreground">
                {`Monthly ${eur(totals.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`}
                {totals.monthlyDiscount ? <> <s>{`${eur(totals.monthly + totals.monthlyDiscount)}/mo`}</s></> : null}
              </p>
            )}
            {saves && <p className="text-xs text-primary">{savingsLine(totals, discount)}</p>}
          </>
        )}
      </div>
    </div>
  </section>
  );
};
