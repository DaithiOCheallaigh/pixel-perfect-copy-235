import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, Check, Loader2 } from "lucide-react";
import { Whatsapp } from "iconsax-react";
import ScrollReveal from "@/components/ScrollReveal";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";
import { useToast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Scripts {
  welcome: string;
  away: string;
  faqs: { question: string; answer: string }[];
}

const businessTypes = [
  "Restaurant",
  "Café",
  "Beauty Salon",
  "Barbershop",
  "Retail Shop",
  "Trades",
  "Other",
];

/* ------------------------------------------------------------------ */
/*  Copy button                                                        */
/* ------------------------------------------------------------------ */

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
    >
      {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const WhatsAppScriptGenerator = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [generating, setGenerating] = useState(false);
  const [scripts, setScripts] = useState<Scripts | null>(null);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const { toast } = useToast();

  // Form state
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [hours, setHours] = useState("");
  const [offering, setOffering] = useState("");
  const [takesBookings, setTakesBookings] = useState(false);
  const [bookingContact, setBookingContact] = useState("");
  const [faq1, setFaq1] = useState("");
  const [faq2, setFaq2] = useState("");
  const [faq3, setFaq3] = useState("");

  // Lead form
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");

  useEffect(() => {
    document.title = "WhatsApp Script Generator — Lacuna Digital";
  }, []);

  const handleGenerate = async () => {
    if (!businessName.trim() || !ownerName.trim()) {
      toast({ title: "Please fill in your business name and your name", variant: "destructive" });
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-whatsapp-scripts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            businessName,
            businessType,
            ownerName,
            hours,
            offering,
            takesBookings,
            bookingContact,
            faq1,
            faq2,
            faq3,
          }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setScripts(data);
      setStep(2);
    } catch (e: any) {
      toast({ title: "Generation failed", description: e.message || "Please try again.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadName.trim() || !leadEmail.trim()) {
      toast({ title: "Please enter your name and email", variant: "destructive" });
      return;
    }

    setLeadSubmitting(true);
    try {
      const { submitLead } = await import("@/lib/submitLead");
      submitLead({
        name: leadName.trim(),
        email: leadEmail.trim(),
        phone: leadPhone.trim() || undefined,
        company: businessName,
        service: "WhatsApp Business Setup",
        message: `Business type: ${businessType}. Captured via WhatsApp script generator.`,
      });
    } catch {
      // Best-effort
    }
    setLeadDone(true);
    setLeadSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServicesNavigation visible={true} />

      <section className="px-6 pb-12 pt-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/tools"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Tools
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Whatsapp variant="Bold" className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold md:text-4xl">
                Generate your WhatsApp Business script — free
              </h1>
            </div>
            <p className="mt-4 text-muted-foreground">
              Fill in a few details about your business and get a ready-to-use WhatsApp auto-reply script in seconds.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Form */}
            {step === 1 && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Business name *</label>
                    <input
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      placeholder="e.g. The Corner Café"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Business type</label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="">Select...</option>
                      {businessTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Your name / owner name *</label>
                    <input
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Opening hours</label>
                    <input
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      placeholder="e.g. Mon–Fri 9am–6pm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">What you offer in one sentence</label>
                  <input
                    value={offering}
                    onChange={(e) => setOffering(e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    placeholder="e.g. Fresh Italian food made daily"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTakesBookings(!takesBookings)}
                    className={`h-5 w-9 rounded-full transition-colors ${takesBookings ? "bg-primary" : "bg-border"}`}
                  >
                    <motion.div
                      className="h-4 w-4 rounded-full bg-foreground"
                      animate={{ x: takesBookings ? 18 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                  <span className="text-sm text-muted-foreground">Do you take bookings?</span>
                </div>

                {takesBookings && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">Booking link or phone number</label>
                    <input
                      value={bookingContact}
                      onChange={(e) => setBookingContact(e.target.value)}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium">Top 3 FAQs your customers ask</label>
                  <div className="space-y-3">
                    <input value={faq1} onChange={(e) => setFaq1(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="FAQ 1" />
                    <input value={faq2} onChange={(e) => setFaq2(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="FAQ 2" />
                    <input value={faq3} onChange={(e) => setFaq3(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="FAQ 3" />
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="group inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3 disabled:opacity-50"
                >
                  {generating ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
                  ) : (
                    <>Generate my script <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </motion.div>
            )}

            {/* Step 2: Generated scripts */}
            {step === 2 && scripts && (
              <motion.div
                key="scripts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {/* Welcome */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Welcome Message</h3>
                    <CopyButton text={scripts.welcome} />
                  </div>
                  <pre className="mt-4 whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
                    {scripts.welcome}
                  </pre>
                </div>

                {/* Away */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Away Message</h3>
                    <CopyButton text={scripts.away} />
                  </div>
                  <pre className="mt-4 whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
                    {scripts.away}
                  </pre>
                </div>

                {/* FAQs */}
                {scripts.faqs.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">FAQ Auto-Replies</h3>
                    <div className="mt-4 space-y-4">
                      {scripts.faqs.map((faq, i) => (
                        <div key={i} className="border-t border-border pt-4 first:border-0 first:pt-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">{faq.question}</p>
                              <p className="mt-1 font-mono text-sm text-muted-foreground">→ {faq.answer}</p>
                            </div>
                            <CopyButton text={`${faq.question}\n→ ${faq.answer}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lead capture */}
                <ScrollReveal>
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                    {!leadDone ? (
                      <>
                        <h3 className="text-base font-bold">Want me to set this up for you?</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          I'll configure your WhatsApp Business account, upload these messages, and test the whole flow. Takes 30 minutes. Totally free.
                        </p>
                        <div className="mt-4 space-y-3">
                          <input value={leadName} onChange={(e) => setLeadName(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="Your name" />
                          <input value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="Email" />
                          <input value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="Phone number" />
                          <button
                            onClick={handleLeadSubmit}
                            disabled={leadSubmitting}
                            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                          >
                            {leadSubmitting ? "Sending..." : "Yes, set it up for me →"}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Check className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-3 font-bold">Done! Dave will be in touch within 24 hours to get your WhatsApp set up.</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>

                <button
                  onClick={() => { setStep(1); setScripts(null); }}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-3 w-3" /> Generate another script
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default WhatsAppScriptGenerator;
