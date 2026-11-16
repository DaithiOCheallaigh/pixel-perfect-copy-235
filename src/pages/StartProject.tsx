import { hubMeta } from "@/data/routeMeta";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { submitLead } from "@/lib/submitLead";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowLeft, Loader2, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { aftercare, businessOption, BUSINESS_BASE_PAGES, carePlans, entry, tiers } from "@/data/pricing";
import { Field, inputClass, PackagePanel, type PackagePanelProps } from "@/components/services/PackagePanel";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useVisualViewport } from "@/hooks/use-visual-viewport";
import { discountBreakdown, DISCOUNT_STORAGE_KEY, SELECTION_STORAGE_KEY, selectionIsFrom, selectionItems, selectionSummary, selectionTotalsWithDiscount } from "@/data/serviceEstimates";
import { findDiscountCode } from "@/data/pricing";
import { eur, VAT_REGISTERED } from "@/data/pricing";

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
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  websiteUrl: "",
};

/** aria props linking a control to its Field error */
const errProps = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIELD_ORDER = ["fullName", "email", "companyName"] as const;


// ─── Main Page ─────────────────────────────────────────────────
const StartProject = () => {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const reducedMotion = useReducedMotion();
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
    if (id !== "business") setBusinessPages(BUSINESS_BASE_PAGES);
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
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { bottomOffset, keyboardOpen: viewportKeyboardOpen } = useVisualViewport();
  const keyboardOpen = isMobile && viewportKeyboardOpen;
  const pageRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [dockHeight, setDockHeight] = useState(0);
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) { setDockHeight(0); return; }
    const measure = () => setDockHeight(Math.round(dock.getBoundingClientRect().height));
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(dock);
    return () => ro.disconnect();
  }, [isMobile]);
  // Phones: keep a focused field clear of the dock / keyboard.
  const onFieldFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const el = e.target as HTMLElement;
    if (!el.matches("input:not([type=hidden]), textarea")) return;
    window.setTimeout(() => {
      if (document.activeElement !== el) return;
      try { el.scrollIntoView({ block: "center", behavior: "auto" }); } catch { /* jsdom */ }
    }, 150);
  };
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

  // Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = "Enter a valid email address";
    if (!form.companyName.trim()) errs.companyName = "Required";
    setErrors(errs);
    const first = FIELD_ORDER.find((key) => errs[key]);
    if (first) {
      window.setTimeout(() => {
        const el = document.getElementById(`sp-${first}`);
        if (!el) return;
        try { el.scrollIntoView({ block: "center", behavior: reducedMotion ? "auto" : "smooth" }); } catch { /* jsdom */ }
        el.focus({ preventScroll: true });
      }, 0);
    }
    return Object.keys(errs).length === 0;
  };
  const step1Ready = Boolean(form.fullName.trim() && EMAIL_RE.test(form.email.trim()) && form.companyName.trim());
  const ctaReady = step1Ready;
  const projectTypes: string[] = !websiteId ? [] : websiteId === "launch" ? ["Landing Page"] : websiteId === "refresh" ? ["Redesign"] : /^business(-\d+)?$/.test(websiteId) ? ["New Website"] : [];

  const submitEnquiry = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const summary = withSelection("");
      await invokeFunction("send-consultation", {
        formData: {
          fullName: form.fullName, email: form.email, phone: form.phone, companyName: form.companyName, websiteUrl: form.websiteUrl,
          company_website: honeypot, projectDescription: summary, projectTypes,
        },
      });
      if (!honeypot) {
        void submitLead({
          name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          company: form.companyName.trim(),
          website: form.websiteUrl.trim() || undefined,
          service: projectTypes.join(", "),
          message: summary,
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

  // ─── Submitted State ──────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md rounded-xl border border-border bg-card p-12 text-center"
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

  const panelProps: PackagePanelProps = {
    selectedIds, selection, websiteId, websiteOptions, chooseWebsite, businessPages, changeBusinessPages,
    aftercareOptions, chooseAftercare, discountInput, setDiscountInput, discount, breakdown, totals, hasWebsite,
  };
  const showInlinePanel = !isMobile;
  const websiteTier = tiers.find((t) => websiteId && (t.id === websiteId || (t.id === "business" && /^business(-\d+)?$/.test(websiteId))));
  const websiteName = websiteTier ? (websiteTier.id === "business" ? `${websiteTier.name} · ${businessOption(businessPages).pages} pages` : websiteTier.name) : "";
  const aftercareId = selectedIds.find((id) => aftercareOptions.some((o) => o.id === id));
  const aftercareName = aftercareId === aftercare.selfManaged.id ? "Self-managed" : carePlans.find((p) => p.id === aftercareId)?.name ?? "";
  const barLabel = [websiteName, aftercareName].filter(Boolean).join(" · ") || "No package chosen";
  const barSummary = (
    <>
      <p className="min-w-0 flex-1 truncate text-sm text-foreground">{barLabel}</p>
      <div className="shrink-0 text-right">
        {hasWebsite && (
          <p className="text-sm font-semibold text-foreground">
            {`Setup ${selectionIsFrom(selection) ? "from " : ""}${eur(totals.oneOff)}${VAT_REGISTERED ? " + VAT" : ""}`}
            {totals.discount > 0 && <span className="ml-1 text-xs font-normal text-primary">{`−${eur(totals.discount)}`}</span>}
          </p>
        )}
        {totals.monthly > 0 && <p className="text-xs text-muted-foreground">{`Monthly ${eur(totals.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`}</p>}
      </div>
    </>
  );
  const onCta = () => { if (!ctaReady) { validate(); return; } void submitEnquiry(); };
  const renderCta = (size: string) => (
    <button
      type="button"
      onClick={onCta}
      disabled={submitting}
      aria-disabled={ctaReady ? undefined : "true"}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] disabled:opacity-60 ${ctaReady ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-muted text-muted-foreground"} ${size}`}
    >
      {submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : "Submit Enquiry →"}
    </button>
  );

  return (
    <div className="min-h-screen">
      <SEO {...hubMeta.startProject} />
      {/* Top accent border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#8b4513] via-[#a0522d] to-[#8b4513]" />

      <div ref={pageRef} onFocus={onFieldFocus} className="mx-auto max-w-2xl px-6 pb-[calc(var(--dock-h,0px)+16px)] pt-32 md:pb-32" style={{ ["--dock-h" as string]: `${dockHeight}px` }}>
        {showInlinePanel && <PackagePanel {...panelProps} className="mb-10 rounded-lg border border-primary/40 bg-primary/5 p-5" />}
              <div className="space-y-7 md:space-y-8">
                <h1 className="scroll-mt-24 text-3xl font-extrabold tracking-tight outline-none md:text-4xl">Start your project</h1>
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
              </div>
        {/* ── Navigation (desktop; phones use the dock) ── */}
        {!isMobile && (
          <div className="mt-16 flex items-center justify-between">
            <div />
            <div className="flex flex-wrap items-center justify-end gap-3">{renderCta("rounded-md px-8 py-3 text-sm")}</div>
          </div>
        )}
        <p className="mt-4 text-right text-xs text-muted-foreground">
          I'll only use your details to respond to your enquiry.
        </p>
      </div>

      {isMobile ? (
        <div
          ref={dockRef}
          data-testid="mobile-dock"
          className="fixed left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur"
          style={{ bottom: bottomOffset }}
        >
          <div className="mx-auto max-w-2xl px-4 pt-2" style={{ paddingBottom: keyboardOpen ? "0.75rem" : "calc(0.75rem + env(safe-area-inset-bottom))" }}>
            {!keyboardOpen && (
              <button type="button" onClick={() => setDrawerOpen(true)} aria-expanded={drawerOpen} aria-label={`Adjust package: ${barLabel}`} className="mb-2 flex min-h-11 w-full items-center gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {barSummary}
                <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              </button>
            )}
            {renderCta("h-12 w-full rounded-md text-base")}
            {!ctaReady && <p className="mt-1.5 text-center text-xs text-muted-foreground">Fill in the required fields to send</p>}
          </div>
        </div>
      ) : null}
      <Drawer open={drawerOpen && !showInlinePanel} onOpenChange={setDrawerOpen} shouldScaleBackground={false}>
        <DrawerContent className="max-h-[85dvh]">
          <DrawerTitle className="sr-only">Adjust your package</DrawerTitle>
          <DrawerDescription className="sr-only">Change your website, care plan or discount code.</DrawerDescription>
          <div className="mx-auto w-full max-w-2xl overflow-y-auto overscroll-contain px-4 pt-2" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}>
            <PackagePanel {...panelProps} className="p-1" />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default StartProject;
