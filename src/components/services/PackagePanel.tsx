import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { aftercare, businessOption, carePlans, CONTACT_EMAIL, eur, monthlyLabel, priceLabel, tiers, VAT_REGISTERED, type DiscountCode } from "@/data/pricing";
import { BusinessPagesSelect } from "@/components/services/BusinessPagesSelect";
import { MosaicBackdrop, PANEL_GRADIENT } from "@/components/services/MosaicBackdrop";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { selectionIsFrom, type discountBreakdown, type selectionItems, type selectionTotalsWithDiscount } from "@/data/serviceEstimates";

export const inputClass =
  "w-full min-h-12 rounded-md border border-input bg-card px-4 py-3 text-base text-foreground md:min-h-0 md:text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

export const Field = ({ id, label, required, children, error }: { id: string; label: string; required?: boolean; children: ReactNode; error?: string }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="font-mono-label text-muted-foreground">
      {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
    </label>
    {children}
    {error && <p id={`${id}-error`} role="alert" className="text-xs text-destructive">{error}</p>}
  </div>
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

/* ── Option cards: every website tier and care plan is on show on one dark Mosaic surface (no pills),
      one card at a time per group with a slider; the group heading carries the "n of N" counter and the
      card's button is the selector. ── */

export type OptionCardData = {
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

/** Glass card over the shared Mosaic surface; selected cards get the pink ring. */
const cardSurface = { background: "linear-gradient(180deg, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.55) 30%, rgba(10,10,10,0.88) 48%, rgba(10,10,10,0.94) 100%)" } as const;
/** Header copy sits straight on the mosaic tiles, so it carries a soft shadow for the bright bands. */
const headerShadow = { textShadow: "0 1px 2px rgba(0,0,0,0.6), 0 2px 18px rgba(0,0,0,0.55)" } as const;
const navButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:opacity-30 disabled:hover:bg-white/10";

/** One option. Stacked on phones; on md+ the card is wide, so the details sit in a second column beside the price and button. */
const OptionCard = ({ card: s }: { card: OptionCardData }) => (
  <article
    className={`flex h-full flex-col rounded-md border p-4 transition-[border-color,box-shadow] duration-300 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-rows-[1fr_auto] md:gap-x-8 md:p-6 ${
      s.selected ? "border-[#FFB3E6]/70 shadow-[0_0_0_1px_rgba(255,179,230,0.35),0_18px_50px_-24px_rgba(255,179,230,0.6)]" : "border-white/10"
    }`}
    style={cardSurface}
  >
    <div className="md:col-start-1 md:row-start-1">
      <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-bold text-white md:text-xl" style={headerShadow}>
        {s.name}
        {s.badge && <span className="rounded-full bg-[#FFB3E6] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-950">{s.badge}</span>}
      </h3>
      <p className="mt-1 text-2xl font-extrabold tracking-tight text-white md:text-3xl" style={headerShadow}>{s.price}</p>
      {s.sub && <p className="mt-0.5 text-xs text-pink-200/80" style={headerShadow}>{s.sub}</p>}
      {s.extra}
    </div>
    <div className="mt-4 border-t border-white/10 pt-4 md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:border-l md:border-t-0 md:pl-8 md:pt-0">
      <ul className="space-y-2">
        {s.bullets.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB3E6]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {s.note && <p className="mt-3 text-xs text-white/55">{s.note}</p>}
    </div>
    <div className="flex-1 md:hidden" aria-hidden="true" />
    <button
      type="button"
      onClick={s.onSelect}
      aria-pressed={s.selected}
      aria-label={`${s.selected ? "Selected" : "Select"}: ${s.name}`}
      className={`mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border bg-black px-4 text-sm font-semibold transition-all hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.99] md:col-start-1 md:row-start-2 md:mt-6 md:self-end ${
        s.selected ? "border-[#FFB3E6]/70 text-[#FFB3E6] hover:border-[#FFB3E6]" : "border-white/15 text-white hover:border-white/30"
      }`}
    >
      {s.selected ? <><Check className="h-4 w-4" aria-hidden="true" /> Selected</> : "Select"}
    </button>
  </article>
);

const startAt = (cards: OptionCardData[]) => Math.max(0, cards.findIndex((c) => c.selected));

/**
 * One numbered group ("1. Website · 2 of 3", "2. Care plans · 3 of 4") on the shared surface: a one-card embla
 * slider (swipe / drag, arrows, dots, arrow keys) that starts on the selected option; the heading counts along.
 */
const OptionGroup = ({ id, label, ariaLabel, cards }: { id: string; label: string; ariaLabel: string; cards: OptionCardData[] }) => {
  const startIndex = startAt(cards);
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
    <fieldset id={id} className="min-w-0" data-testid={id}>
      <legend className="mb-3 font-mono-label text-white/60" aria-live="polite">
        {label} · <span className="text-pink-200">{index + 1} of {cards.length}</span>
      </legend>
      <Carousel setApi={setApi} opts={{ startIndex, align: "start", containScroll: "trimSnaps" }} aria-label={ariaLabel}>
        <CarouselContent className="-ml-3 items-stretch">
          {cards.map((card) => (
            <CarouselItem key={card.id} className="pl-3">
              <OptionCard card={card} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button type="button" onClick={() => api?.scrollPrev()} disabled={index === 0} aria-label="Previous option" className={navButtonClass}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-1.5">
          {cards.map((card, i) => (
            <button key={card.id} type="button" onClick={() => api?.scrollTo(i)} aria-label={`Go to ${card.name}`} aria-current={i === index ? "true" : undefined} className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-[#FFB3E6]" : "w-1.5 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>
        <button type="button" onClick={() => api?.scrollNext()} disabled={index >= cards.length - 1} aria-label="Next option" className={navButtonClass}>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </fieldset>
  );
};

/** The "Your package" editor, shared by the inline desktop panel and the bottom-bar drawer. */
export const PackagePanel = ({
  selectedIds, selection, websiteId, websiteOptions, chooseWebsite, businessPages, changeBusinessPages,
  aftercareOptions: _aftercareOptions, chooseAftercare, discountInput, setDiscountInput, discount, breakdown, totals, hasWebsite, discountReveal,
  className = "rounded-lg border border-primary/40 bg-primary/5 p-5",
}: PackagePanelProps) => {
  const showStatus = Boolean(discountInput.trim()) && discountReveal !== "typing";
  const saves = totals.discount > 0 || Boolean(totals.monthlyDiscount);

  const websiteCards: OptionCardData[] = tiers.map((t) => {
    const option = websiteOptions.find((o) => o.id === t.id);
    const selected = Boolean(websiteId && (option ? option.match(websiteId) : websiteId === t.id));
    const onSelect = () => chooseWebsite(option?.id ?? t.id);
    if (t.id === "business") {
      const o = businessOption(businessPages);
      return {
        id: t.id, name: t.name, price: `${eur(o.price)}${VAT_REGISTERED ? " + VAT" : ""}`, note: `Live in ${o.live} from a complete intake`, bullets: o.scope, selected, onSelect,
        extra: <div className="mt-4 max-w-xs"><BusinessPagesSelect pages={businessPages} onChange={changeBusinessPages} tone="dark" labelId="business-pages-label-panel" /></div>,
      };
    }
    return { id: t.id, name: t.name, price: priceLabel(t), sub: monthlyLabel(t), note: `Live in ${t.live}${t.id === "refresh" ? "" : " from a complete intake"}`, bullets: t.scope ?? [], selected, onSelect };
  });
  const careCards: OptionCardData[] = [
    { id: aftercare.selfManaged.id, name: aftercare.selfManaged.name, price: aftercare.selfManaged.priceLine, bullets: aftercare.selfManaged.includes, selected: selectedIds.includes(aftercare.selfManaged.id), onSelect: () => chooseAftercare(aftercare.selfManaged.id) },
    ...carePlans.map((plan) => ({
      id: plan.id, name: plan.name, price: `${eur(plan.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`, badge: plan.popular ? "Most popular" : undefined, bullets: plan.includes,
      selected: selectedIds.includes(plan.id), onSelect: () => chooseAftercare(plan.id),
    })),
  ];

  return (
  <section aria-label="Your selected package" className={className}>
    <h2 className="text-xl font-bold tracking-tight text-foreground">Your package</h2>
    {/* One Mosaic surface behind both groups (the same backdrop as the welcome popup); each group is a one-card slider. */}
    <div className="relative isolate mt-4 min-w-0 overflow-hidden rounded-lg border border-white/10 bg-neutral-950 p-3 text-white shadow-xl shadow-black/30 md:p-5" data-testid="sp-options">
      <MosaicBackdrop gradient={PANEL_GRADIENT} pixelSize={12} waveIntensity={1.15} testId="sp-mosaic" />
      <div className="relative z-10 space-y-7">
        <OptionGroup id="sp-website" label="1. Website" ariaLabel="Website packages" cards={websiteCards} />
        <OptionGroup id="sp-aftercare" label="2. Care plans" ariaLabel="Care plans" cards={careCards} />
      </div>
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
