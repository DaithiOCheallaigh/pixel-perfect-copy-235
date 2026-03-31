import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

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

const INDUSTRIES = ["Hospitality", "Beauty & Wellness", "Travel", "E-commerce", "Professional Services", "Other"];
const SOURCES = ["Google", "Referral", "Social Media", "Portfolio", "Other"];
const PROJECT_TYPES = ["New Website", "Redesign", "Landing Page", "E-commerce", "Web App", "Brand + Website"];
const BRAND_OPTIONS = ["Yes", "No", "In progress"];
const URGENCY_OPTIONS = ["Exploring options", "Ready to start within a month", "ASAP"];
const BUDGET_OPTIONS = [
  { label: "Starter — €1,999", desc: "Perfect for small businesses & landing pages" },
  { label: "Business — €3,999", desc: "Multi-page sites with CMS & animations" },
  { label: "Enterprise — €7,500+", desc: "Complex builds, integrations & full brand" },
  { label: "Not sure yet", desc: "Let's discuss what works for you" },
];

// ─── Pill / Toggle Components ──────────────────────────────────
const Pill = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
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
const Field = ({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) => (
  <div className="space-y-2">
    <label className="font-mono-label text-muted-foreground">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

const inputClass =
  "w-full rounded-md border border-[#2a2a2a] bg-[#1e1e1e] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

const selectClass = inputClass + " appearance-none";

// ─── Main Page ─────────────────────────────────────────────────
const StartProject = () => {
  useEffect(() => {
    document.title = "Start a Project — Lacuna Digital";
    return () => { document.title = "Lacuna Digital"; };
  }, []);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [brief, setBrief] = useState("");
  const [briefLoading, setBriefLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

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
      if (!form.companyName.trim()) errs.companyName = "Required";
      if (!form.industry) errs.industry = "Required";
      if (!form.source) errs.source = "Required";
    }
    if (step === 1) {
      if (form.projectTypes.length === 0) errs.projectTypes = "Select at least one";
      if (!form.projectDescription.trim()) errs.projectDescription = "Required";
      if (!form.existingBrand) errs.existingBrand = "Required";
      if (!form.urgency) errs.urgency = "Required";
    }
    if (step === 2) {
      if (!form.budgetRange) errs.budgetRange = "Please select a budget range";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

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
      await invokeFunction("send-consultation", { formData: form, brief: form.projectDescription });
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
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground">We've received your brief</h2>
          <p className="mb-8 text-sm text-muted-foreground">Dave will be in touch within 1–2 business days.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" /> Back to lacunadigital.io
          </Link>
        </motion.div>
      </div>
    );
  }

  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <div className="min-h-screen">
      {/* Top accent border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#8b4513] via-[#a0522d] to-[#8b4513]" />

      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50">
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
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">About You</h1>
                <Field label="Full Name" required error={errors.fullName}>
                  <input className={inputClass} placeholder="Jane Doe" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
                </Field>
                <Field label="Company / Brand Name" required error={errors.companyName}>
                  <input className={inputClass} placeholder="Acme Co." value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
                </Field>
                <Field label="Website URL (if existing)">
                  <input className={inputClass} placeholder="https://example.com" value={form.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} />
                </Field>
                <Field label="Industry / Sector" required error={errors.industry}>
                  <select className={selectClass} value={form.industry} onChange={(e) => set("industry", e.target.value)}>
                    <option value="">Select…</option>
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </Field>
                <Field label="How did you find us?" required error={errors.source}>
                  <select className={selectClass} value={form.source} onChange={(e) => set("source", e.target.value)}>
                    <option value="">Select…</option>
                    {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
            )}

            {/* ── Step 1: Your Project ─────────────────── */}
            {step === 1 && (
              <div className="space-y-8">
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Your Project</h1>
                <Field label="What type of project is this?" required error={errors.projectTypes}>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <Pill key={t} label={t} selected={form.projectTypes.includes(t)} onClick={() => toggleArray("projectTypes", t)} />
                    ))}
                  </div>
                </Field>
                <Field label="Briefly describe what you need" required error={errors.projectDescription}>
                  <div className="relative">
                    <textarea
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
                <Field label="Do you have an existing brand?" required error={errors.existingBrand}>
                  <div className="flex gap-2">
                    {BRAND_OPTIONS.map((o) => (
                      <Pill key={o} label={o} selected={form.existingBrand === o} onClick={() => set("existingBrand", o)} />
                    ))}
                  </div>
                </Field>
                <Field label="Project Urgency" required error={errors.urgency}>
                  <div className="flex flex-wrap gap-2">
                    {URGENCY_OPTIONS.map((o) => (
                      <Pill key={o} label={o} selected={form.urgency === o} onClick={() => set("urgency", o)} />
                    ))}
                  </div>
                </Field>
                <Field label="Competitor or inspiration websites">
                  <div className="space-y-2">
                    {form.competitorUrls.map((url, i) => (
                      <div key={i} className="flex gap-2">
                        <input
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
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Budget & Timeline</h1>
                <Field label="Budget Range" required error={errors.budgetRange}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <BudgetCard key={b.label} label={b.label} desc={b.desc} selected={form.budgetRange === b.label} onClick={() => set("budgetRange", b.label)} />
                    ))}
                  </div>
                </Field>
                <Field label="Preferred launch date (optional)">
                  <input type="month" className={inputClass} value={form.launchDate} onChange={(e) => set("launchDate", e.target.value)} />
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
          {isLastStep ? (
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

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#2a2a2a] bg-[#0d0d0d]/80 px-6 py-4 text-center backdrop-blur-sm">
        <p className="text-xs text-muted-foreground">
          All enquiries are reviewed personally by Dave Kelly · info@lacunaconsulting.com
        </p>
      </div>
    </div>
  );
};

export default StartProject;
