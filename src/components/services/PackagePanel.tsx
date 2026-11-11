import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { CONTACT_EMAIL, eur, VAT_REGISTERED, type DiscountCode } from "@/data/pricing";
import { BusinessPagesSelect } from "@/components/services/BusinessPagesSelect";
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

export const Group = ({ id, label, required, children, error }: { id: string; label: string; required?: boolean; children: ReactNode; error?: string }) => (
  <fieldset className="space-y-2" aria-describedby={error ? `${id}-error` : undefined} aria-invalid={error ? true : undefined}>
    <legend className="mb-2 font-mono-label text-muted-foreground">
      {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
    </legend>
    {children}
    {error && <p id={`${id}-error`} role="alert" className="text-xs text-destructive">{error}</p>}
  </fieldset>
);

export interface PackageOption { id: string; label: string }
export interface WebsiteOption extends PackageOption { match: (id: string) => boolean }

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
  className?: string;
}

/** The "Your package" editor, shared by the inline desktop panel and the bottom-bar drawer. */
export const PackagePanel = ({
  selectedIds, selection, websiteId, websiteOptions, chooseWebsite, businessPages, changeBusinessPages,
  aftercareOptions, chooseAftercare, discountInput, setDiscountInput, discount, breakdown, totals, hasWebsite,
  className = "rounded-lg border border-primary/40 bg-primary/5 p-5",
}: PackagePanelProps) => (
  <section aria-label="Your selected package" className={className}>
    <h2 className="text-xl font-bold tracking-tight text-foreground">Your package</h2>
    <div className="mt-4">
      <Group id="sp-website" label="1. Website">
        <div className="flex flex-wrap gap-2">
          {websiteOptions.map((option) => (
            <Pill key={option.id} label={option.label} selected={Boolean(websiteId && option.match(websiteId))} onClick={() => chooseWebsite(option.id)} />
          ))}
        </div>
        {websiteId && websiteOptions[2]?.match(websiteId) && (
          <div className="mt-3 max-w-xs"><BusinessPagesSelect pages={businessPages} onChange={changeBusinessPages} /></div>
        )}
      </Group>
    </div>
    <div className="mt-5">
      <Group id="sp-aftercare" label="2. Care plans">
        <div className="flex flex-wrap gap-2">
          {aftercareOptions.map((option) => (
            <Pill key={option.id} label={option.label} selected={selectedIds.includes(option.id)} onClick={() => chooseAftercare(option.id)} />
          ))}
        </div>
      </Group>
    </div>
    <div className="mt-5">
      <Field id="sp-discount" label="Discount code (optional)">
        <div className="relative">
          <input id="sp-discount" className={inputClass + " uppercase" + (discount ? " pr-10 border-primary/60" : "")} maxLength={32} autoComplete="off" spellCheck={false} value={discountInput} onChange={(e) => setDiscountInput(e.target.value)} aria-describedby={discountInput.trim() ? "sp-discount-status" : undefined} />
          {discount && <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />}
        </div>
      </Field>
      {discountInput.trim() && (
        <p id="sp-discount-status" aria-live="polite" className={`mt-2 text-xs ${discount ? "text-primary" : "text-muted-foreground"}`}>
          {discount
            ? `${discount.label} applied: ${discount.percent}% off website packages.${breakdown.bonusPlan ? ` Your ${breakdown.bonusPlan} plan adds a further ${breakdown.bonusPercent}%: ${breakdown.percent}% off in total.` : " Select a care plan for a further discount."}`
            : "Code not recognised."}
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
            {totals.monthly > 0 && <p className="text-xs text-muted-foreground">{`Monthly ${eur(totals.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`}</p>}
            {totals.discount > 0 && <p className="text-xs text-primary">{`You save ${eur(totals.discount)} (${totals.discountPercent}% off the website)`}</p>}
          </>
        )}
      </div>
    </div>
  </section>
);
