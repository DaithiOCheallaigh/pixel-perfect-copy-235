import { useState, useCallback, useEffect, useRef } from "react";
import { submitLead } from "@/lib/submitLead";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { aftercare, businessOption, BUSINESS_BASE_PAGES, carePlans, CONTACT_EMAIL, entry, tiers } from "@/data/pricing";
import { BusinessPagesSelect } from "@/components/services/BusinessPagesSelect";
import { BUDGET_OPTIONS, BUDGET_LABEL, INDUSTRIES } from "@/data/projectIntake";
import { discountBreakdown, DISCOUNT_STORAGE_KEY, SELECTION_STORAGE_KEY, selectionIsFrom, selectionItems, selectionSummary, selectionTotalsWithDiscount } from "@/data/serviceEstimates";
import { findDiscountCode } from "@/data/pricing";
import { eur, VAT_REGISTERED } from "@/data/pricing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://lgdjivhyveowybzhbqum.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZGppdmh5dmVvd3liemhicXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjMyNDMsImV4cCI6MjA4Nzg5OTI0M30.ThNz5RF9Pco9Up0nIn_gaMIUSV_yc2WINGBXpuvF-A0";

const invokeFunction = async (fnName: string, body: Record<string, unknown>) => {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${fnName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Function ${fnName} returned ${res.status}`);
  }
  return res.json();
};

// ─── Types ────────────────────────────────────────────────────
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  source: string;
  projectTypes: string[];
  projectDescription: string;
  existingBrand: string;
  urgency: string;
  competitorUrls: string[];
  budgetRange: string;
  launchDate: string;
  hasDeadline: boolean;
  deadlineDetails: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  websiteUrl: "",
  industry: "",
  source: "",
  projectTypes: [],
  projectDescription: "",
  existingBrand: "",
  urgency: "",
  competitorUrls: [""],
  budgetRange: "",
  launchDate: "",
  hasDeadline: false,
  deadlineDetails: "",
};

const TOTAL_STEPS = 3;

const STEP_LABELS = [
  "About You",
  "Your Project",
  "Budget & Timeline",
];

const SOURCES = ["Google", "Referral", "Social Media", "Portfolio", "Other"];
const PROJECT_TYPES = ["New Website", "Redesign", "Landing Page", "E-commerce", "Web App", "Brand + Website"];
const BRAND_OPTIONS = ["Yes", "No", "In progress"];
const URGENCY_OPTIONS = ["Exploring options", "Ready to start within a month", "ASAP"];

// ─── Pill / Toggle Components ──────────────────────────────────
const Pill = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
      selected
        ? "border-primary bg-primary/10 text-primary"
        : "border-[#2a2a2a] bg-[#1e1e1e] text-muted-foreground hover:border-primary/40"
    }`}
  >
    {label}
  </button>
);

const BudgetCard = ({ label, desc, selected, onClick }: { label: string; desc: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`w-full rounded-lg border p-4 text-left transition-all ${
      selected
        ? "border-primary bg-primary/5"
        : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-primary/40"
    }`}
  >
    <div className="text-sm font-semibold text-foreground">{label}</div>
    <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
  </button>
);

// ─── Input Wrapper ─────────────────────────────────────────────
const Field = ({ id, label, required, children, error }: { id: string; label: string; required?: boolean; children: React.ReactNode; error?: string }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="font-mono-label text-muted-foreground">
      {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
    </label>
    {children}
    {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
  </div>
);

const Group = ({ id, label, required, children, error }: { id: string; label: string; required?: boolean; children: React.ReactNode; error?: string }) => (
  <fieldset className="space-y-2" aria-describedby={error ? `${id}-error` : undefined} aria-invalid={error ? true : undefined}>
    <legend className="mb-2 font-mono-label text-muted-foreground">
      {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
    </legend>
    {children}
    {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
  </fieldset>
);

/** aria props linking a control to its Field error */
const errProps = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "w-full rounded-md border border-[#2a2a2a] bg-[#1e1e1e] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

const selectTriggerClass =
  "h-auto w-full justify-between gap-3 rounded-md border border-[#2a2a2a] bg-[#1e1e1e] py-3 pl-4 pr-4 text-left text-sm text-foreground ring-offset-0 focus:border-primary focus:ring-1 focus:ring-primary focus:ring-offset-0 data-[placeholder]:text-muted-foreground [&>svg]:mr-0";
const selectContentClass = "rounded-md border border-[#2a2a2a] bg-[#1e1e1e] shadow-xl";
const selectItemClass = "px-3 py-2.5 text-sm focus:bg-primary/10 focus:text-primary data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary";

// ─── Main Page ─────────────────────────────────────────────────
const StartProject = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [brief, setBrief] = useState("");
  const [briefLoading, setBriefLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepChanged = useRef(false);

  useEffect(() => {
    if (!stepChanged.current) return;
    const t = window.setTimeout(() => headingRef.current?.focus(), 400);
    return () => window.clearTimeout(t);
  }, [step]);
  const { toast } = useToast();
  // Package chosen on /services: IDs only, re-priced from the catalogue here.
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    try {
      const raw = JSON.parse(sessionStorage.getItem(SELECTION_STORAGE_KEY) ?? "[]");
      return Array.isArray(raw) ? raw.filter((id): id is string => typeof id === "string") : [];
    } catch { return []; }
  });
  useEffect(() => {
    sessionStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);
  const selection = selectionItems(selectedIds.map((id) => ({ id })));
  const [discountInput, setDiscountInput] = useState<string>(() => {
    try { return sessionStorage.getItem(DISCOUNT_STORAGE_KEY) ?? ""; } catch { return ""; }
  });
  useEffect(() => {
    if (discountInput) sessionStorage.setItem(DISCOUNT_STORAGE_KEY, discountInput);
    else sessionStorage.removeItem(DISCOUNT_STORAGE_KEY);
  }, [discountInput]);
  const discount = findDiscountCode(discountInput);
  const totals = selectionTotalsWithDiscount(selection, discountInput);
  const aftercareOptions = [
    { id: aftercare.selfManaged.id, label: `${aftercare.selfManaged.name} · ${aftercare.selfManaged.priceLine}` },
    ...carePlans.map((plan) => ({ id: plan.id, label: `${plan.name} · ${eur(plan.monthly)}/mo` })),
  ];
  const chooseAftercare = (id: string) => {
    setSelectedIds((current) => {
      const kept = current.filter((selectedId) => !aftercareOptions.some((option) => option.id === selectedId));
      return current.includes(id) ? kept : [...kept, id];
    });
  };
  const isWebsiteId = (id: string) => tiers.some((t) => t.id === id) || /^business-\d+$/.test(id);
  const [businessPages, setBusinessPages] = useState<number>(() => {
    const m = selectedIds.map((id) => /^business-(\d+)$/.exec(id)).find(Boolean);
    return m ? Number(m[1]) : BUSINESS_BASE_PAGES;
  });
  const websiteId = selectedIds.find(isWebsiteId);
  const websiteOptions = tiers.map((t) => {
    if (t.id === "business") {
      const o = businessOption(businessPages);
      return { id: "business", match: (id: string) => id === "business" || /^business-\d+$/.test(id), label: `${t.name} · ${eur(o.price)}${o.pages !== BUSINESS_BASE_PAGES ? ` (${o.pages} pages)` : ""}` };
    }
    return { id: t.id, match: (id: string) => id === t.id, label: `${t.name} · ${t.price ? eur(t.price) : `from ${eur(t.priceFrom ?? 0)}`}` };
  });
  const chooseWebsite = (id: string) => {
    setSelectedIds((current) => {
      const kept = current.filter((x) => !isWebsiteId(x));
      const active = current.find(isWebsiteId);
      const option = websiteOptions.find((o) => o.id === id)!;
      if (active && option.match(active)) return kept;
      return [...kept, id === "business" ? businessOption(businessPages).id : id];
    });
  };
  const changeBusinessPages = (pages: number) => {
    setBusinessPages(pages);
    setSelectedIds((current) => [...current.filter((x) => !isWebsiteId(x)), businessOption(pages).id]);
  };
  const breakdown = discountBreakdown(selection, discountInput);
  const hasWebsite = selection.some((item) => item.kind === "tier");
  const selectionText = selectionSummary(selection, discountInput);
  const withSelection = (text: string) => (selectionText ? `${selectionText}\n\n${text}` : text).slice(0, 5000);

  const set = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const toggleArray = (key: "projectTypes", value: string) => {
    set(key, form[key].includes(value) ? form[key].filter((v) => v !== value) : [...form[key], value]);
  };

  // Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!form.fullName.trim()) errs.fullName = "Required";
      if (!form.email.trim()) errs.email = "Required";
      else if (!EMAIL_RE.test(form.email.trim())) errs.email = "Enter a valid email address";
      if (!form.companyName.trim()) errs.companyName = "Required";
      if (!form.industry) errs.industry = "Required";
      if (!form.source) errs.source = "Required";
    }
    // Steps 2 and 3 are optional.
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate()) {
      stepChanged.current = true;
      setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    }
  };
  const back = () => {
    stepChanged.current = true;
    setStep((s) => Math.max(s - 1, 0));
  };

  const enhanceWithAI = async () => {
    if (!form.projectDescription.trim()) {
      setErrors((prev) => ({ ...prev, projectDescription: "Write a brief description first" }));
      return;
    }
    setBriefLoading(true);
    try {
      const data = await invokeFunction("generate-brief", { formData: form });
      setBrief(data.brief);
      set("projectDescription", data.brief);
    } catch (e: any) {
      console.error(e);
      toast({ variant: "destructive", title: "Error", description: "Failed to enhance description. Please try again." });
    } finally {
      setBriefLoading(false);
    }
  };

  const submitEnquiry = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await invokeFunction("send-consultation", { formData: { ...form, projectDescription: withSelection(form.projectDescription.trim()), company_website: honeypot } });
      if (!honeypot) {
        void submitLead({
          name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          company: form.companyName.trim(),
          website: form.websiteUrl.trim() || undefined,
          service: form.projectTypes.join(", "),
          budget: form.budgetRange,
          message: withSelection(form.projectDescription.trim()),
        }).catch(() => {});
      }
      sessionStorage.removeItem(SELECTION_STORAGE_KEY);
      sessionStorage.removeItem(DISCOUNT_STORAGE_KEY);
      setSubmitted(true);
    } catch (e: any) {
      console.error(e);
      toast({ variant: "destructive", title: "Error", description: "Failed to send enquiry. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const stepVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  };

  // ─── Submitted State ──────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md rounded-xl border border-[#2a2a2a] bg-[#161616] p-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground">I've received your brief</h2>
          <p className="mb-8 text-sm text-muted-foreground">I reply within 1 business day, with a fixed quote within {entry.introCall.quoteWithin}.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Lacuna Digital
          </Link>
        </motion.div>
      </div>
    );
  }

  const canSubmit = step >= 1;

  return (
    <div className="min-h-screen">
      <SEO title="Start a Project" description="Tell Lacuna Digital about your project. Only your contact details are required; the rest is optional. Fixed quote within two working days." />
      {/* Top accent border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#8b4513] via-[#a0522d] to-[#8b4513]" />

      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-16 z-50">
        <div className="h-[3px] w-full bg-[#1e1e1e]">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 pb-32 pt-32">
          <section aria-label="Your selected package" className="mb-10 rounded-lg border border-primary/40 bg-primary/5 p-5">
            <p className="font-mono-label text-muted-foreground">Your package</p>
            <div className="mt-4">
              <Group id="sp-website" label="Website">
                <div className="flex flex-wrap gap-2">
                  {websiteOptions.map((option) => (
                    <Pill key={option.id} label={option.label} selected={Boolean(websiteId && option.match(websiteId))} onClick={() => chooseWebsite(option.id)} />
                  ))}
                </div>
                {websiteId && websiteOptions[2].match(websiteId) && (
                  <div className="mt-3 max-w-xs"><BusinessPagesSelect pages={businessPages} onChange={changeBusinessPages} /></div>
                )}
              </Group>
            </div>
            <div className="mt-5">
              <Group id="sp-aftercare" label="Once it's live, who looks after it?">
                <div className="flex flex-wrap gap-2">
                  {aftercareOptions.map((option) => (
                    <Pill key={option.id} label={option.label} selected={selectedIds.includes(option.id)} onClick={() => chooseAftercare(option.id)} />
                  ))}
                </div>
              </Group>
            </div>
            <div className="mt-5">
              <Field id="sp-discount" label="Discount code (optional)">
                <input id="sp-discount" className={inputClass + " uppercase"} maxLength={32} autoComplete="off" spellCheck={false} value={discountInput} onChange={(e) => setDiscountInput(e.target.value)} aria-describedby={discountInput.trim() ? "sp-discount-status" : undefined} />
              </Field>
              {discountInput.trim() && (
                <p id="sp-discount-status" aria-live="polite" className={`mt-2 text-xs ${discount ? "text-primary" : "text-muted-foreground"}`}>
                  {discount
                    ? `${discount.label} applied: ${discount.percent}% off website packages.${breakdown.bonusPlan ? ` Your ${breakdown.bonusPlan} plan adds a further ${breakdown.bonusPercent}%: ${breakdown.percent}% off in total.` : ""} Care plans are not discounted.`
                    : "Code not recognised."}
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
        {/* Step label */}
        <div className="mb-12">
          <p className="font-mono-label text-muted-foreground">
            Step {step + 1} of {TOTAL_STEPS} — {STEP_LABELS[step]}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Step 0: About You ─────────────────────── */}
            {step === 0 && (
              <div className="space-y-8">
                <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-extrabold tracking-tight outline-none md:text-4xl">About You</h1>
                <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                  <label htmlFor="sp-company-website">Company website</label>
                  <input id="sp-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>
                <Field id="sp-fullName" label="Full Name" required error={errors.fullName}>
                  <input {...errProps("sp-fullName", errors.fullName)} className={inputClass} autoComplete="name" maxLength={100} placeholder="Jane Doe" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
                </Field>
                <Field id="sp-email" label="Email" required error={errors.email}>
                  <input {...errProps("sp-email", errors.email)} type="email" className={inputClass} autoComplete="email" maxLength={254} placeholder="jane@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </Field>
                <Field id="sp-phone" label="Phone (optional)">
                  <input id="sp-phone" type="tel" className={inputClass} autoComplete="tel" maxLength={40} placeholder="+353 …" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </Field>
                <Field id="sp-companyName" label="Company / Brand Name" required error={errors.companyName}>
                  <input {...errProps("sp-companyName", errors.companyName)} className={inputClass} autoComplete="organization" maxLength={300} placeholder="Acme Co." value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
                </Field>
                <Field id="sp-websiteUrl" label="Website URL (if existing)">
                  <input id="sp-websiteUrl" type="url" className={inputClass} autoComplete="url" maxLength={300} placeholder="https://example.com" value={form.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} />
                </Field>
                <Field id="sp-industry" label="Industry / Sector" required error={errors.industry}>
                  <Select value={form.industry || undefined} onValueChange={(v) => set("industry", v)}>
                    <SelectTrigger {...errProps("sp-industry", errors.industry)} className={selectTriggerClass}><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {INDUSTRIES.map((i) => <SelectItem key={i} value={i} className={selectItemClass}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field id="sp-source" label="How did you find us?" required error={errors.source}>
                  <Select value={form.source || undefined} onValueChange={(v) => set("source", v)}>
                    <SelectTrigger {...errProps("sp-source", errors.source)} className={selectTriggerClass}><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {SOURCES.map((src) => <SelectItem key={src} value={src} className={selectItemClass}>{src}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            )}

            {/* ── Step 1: Your Project ─────────────────── */}
            {step === 1 && (
              <div className="space-y-8">
                <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-extrabold tracking-tight outline-none md:text-4xl">Your Project</h1>
                <Group id="sp-projectTypes" label="What type of project is this?" error={errors.projectTypes}>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <Pill key={t} label={t} selected={form.projectTypes.includes(t)} onClick={() => toggleArray("projectTypes", t)} />
                    ))}
                  </div>
                </Group>
                <Field id="sp-projectDescription" label="Briefly describe what you need" error={errors.projectDescription}>
                  <div className="relative">
                    <textarea
                      {...errProps("sp-projectDescription", errors.projectDescription)}
                      maxLength={5000}
                      className={inputClass + " min-h-[120px] resize-y pr-4"}
                      placeholder="Tell us about your project…"
                      value={form.projectDescription}
                      onChange={(e) => set("projectDescription", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={enhanceWithAI}
                      disabled={briefLoading}
                      className="mt-2 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50 disabled:opacity-50"
                    >
                      {briefLoading ? (
                        <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Enhancing…</>
                      ) : (
                        <><Sparkles className="h-3.5 w-3.5" /> Enhance with AI</>
                      )}
                    </button>
                  </div>
                </Field>
                <Group id="sp-existingBrand" label="Do you have an existing brand?" error={errors.existingBrand}>
                  <div className="flex gap-2">
                    {BRAND_OPTIONS.map((o) => (
                      <Pill key={o} label={o} selected={form.existingBrand === o} onClick={() => set("existingBrand", o)} />
                    ))}
                  </div>
                </Group>
                <Group id="sp-urgency" label="Project Urgency" error={errors.urgency}>
                  <div className="flex flex-wrap gap-2">
                    {URGENCY_OPTIONS.map((o) => (
                      <Pill key={o} label={o} selected={form.urgency === o} onClick={() => set("urgency", o)} />
                    ))}
                  </div>
                </Group>
                <Field id="sp-competitor-0" label="Competitor or inspiration websites">
                  <div className="space-y-2">
                    {form.competitorUrls.map((url, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          id={`sp-competitor-${i}`}
                          type="url"
                          aria-label={i === 0 ? undefined : `Competitor or inspiration website ${i + 1}`}
                          maxLength={300}
                          className={inputClass}
                          placeholder="https://example.com"
                          value={url}
                          onChange={(e) => {
                            const urls = [...form.competitorUrls];
                            urls[i] = e.target.value;
                            set("competitorUrls", urls);
                          }}
                        />
                        {form.competitorUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => set("competitorUrls", form.competitorUrls.filter((_, j) => j !== i))}
                            aria-label={`Remove website ${i + 1}`}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {form.competitorUrls.length < 3 && (
                      <button
                        type="button"
                        onClick={() => set("competitorUrls", [...form.competitorUrls, ""])}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        <Plus className="h-3 w-3" /> Add another
                      </button>
                    )}
                  </div>
                </Field>
              </div>
            )}

            {/* ── Step 2: Budget & Timeline ────────────── */}
            {step === 2 && (
              <div className="space-y-8">
                <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-extrabold tracking-tight outline-none md:text-4xl">Budget & Timeline</h1>
                <Group id="sp-budgetRange" label={BUDGET_LABEL} error={errors.budgetRange}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <BudgetCard key={b.value} label={b.label} desc={b.desc} selected={form.budgetRange === b.value} onClick={() => set("budgetRange", b.value)} />
                    ))}
                  </div>
                </Group>
                <Field id="sp-launchDate" label="Preferred launch date (optional)">
                  <input id="sp-launchDate" type="month" className={inputClass} value={form.launchDate} onChange={(e) => set("launchDate", e.target.value)} />
                </Field>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={form.hasDeadline}
                      onChange={(e) => set("hasDeadline", e.target.checked as any)}
                      className="h-4 w-4 rounded border-[#2a2a2a] bg-[#1e1e1e] text-primary focus:ring-primary"
                    />
                    I have a hard deadline
                  </label>
                  {form.hasDeadline && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <input
                        className={inputClass}
                        aria-label="Deadline details"
                        maxLength={300}
                        placeholder="e.g. Event on March 15th"
                        value={form.deadlineDetails}
                        onChange={(e) => set("deadlineDetails", e.target.value)}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ─────────────────────────────── */}
        <div className="mt-16 flex items-center justify-between">
          {step > 0 ? (
            <button type="button" onClick={back} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              ← Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex flex-wrap items-center justify-end gap-3">
            {step === 1 && (
              <button
                type="button"
                onClick={next}
                className="rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:text-foreground hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.25)]"
              >
                Next: Budget &amp; Timeline →
              </button>
            )}
            {canSubmit ? (
              <button
                type="button"
                onClick={submitEnquiry}
                disabled={submitting}
                className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Submit Enquiry →"}
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Next →
              </button>
            )}
          </div>
        </div>
        {canSubmit && (
          <p className="mt-4 text-right text-xs text-muted-foreground">
            I'll only use your details to respond to your enquiry. 'Enhance with AI' sends your description to an AI service to draft a brief.
          </p>
        )}
      </div>

    </div>
  );
};

export default StartProject;
