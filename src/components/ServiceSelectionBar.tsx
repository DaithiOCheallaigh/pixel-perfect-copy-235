import { useState, useEffect, useRef } from "react";
import { submitLead } from "@/lib/submitLead";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface SelectedService {
  id: string;
  title: string;
  price: string;
  priceValue: number;
}

const ServiceSelectionBar = () => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const barButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleSelectionChange = (e: CustomEvent<SelectedService[] | null>) => {
      setSelectedServices(e.detail || []);
    };
    window.addEventListener("service-selection-change", handleSelectionChange as EventListener);
    return () => window.removeEventListener("service-selection-change", handleSelectionChange as EventListener);
  }, []);

  const handleStart = () => {
    setSent(false);
    setError("");
    setDialogOpen(true);
  };

  // Focus management: focus name on open, trap Tab, close on Escape
  useEffect(() => {
    if (!dialogOpen) return;
    const t = window.setTimeout(() => nameRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDialog();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const els = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([tabindex="-1"]), a[href]')
      ).filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen, sent]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || sending) return;
    setSending(true);
    setError("");
    let ok = false;
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-service-selection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          serviceIds: selectedServices.map((s) => s.id),
          company_website: honeypot,
        }),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    setSending(false);
    if (!ok) {
      setError("Something went wrong sending your request. Please try again, or email davekellydesign@gmail.com.");
      return;
    }
    if (!honeypot) {
      void submitLead({
        name: name.trim(),
        email: email.trim(),
        service: selectedServices.map((s) => s.title).join(", "),
        message: `Service selection: ${selectedServices.map((s) => `${s.title} (${s.price})`).join(", ")}`,
      }).catch(() => {});
    }
    setSent(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setError("");
    window.setTimeout(() => barButtonRef.current?.focus(), 0);
    if (sent) {
      setName("");
      setEmail("");
    }
  };

  const hasSelections = selectedServices.length > 0;

  return (
    <>
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            key="consultation-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={closeDialog}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={sent ? "consultation-sent-title" : "consultation-dialog-title"}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0b]/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-8"
            >
              {sent ? (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                    <Check className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 id="consultation-sent-title" className="text-xl font-bold text-foreground">Sent to Dave</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Your consultation request has been sent to Dave and he will be in touch shortly to continue the conversation.
                  </p>
                  <button
                    onClick={closeDialog}
                    className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 id="consultation-dialog-title" className="text-xl font-bold text-foreground">Start your free consultation</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"} selected — Dave will get back to you shortly.
                      </p>
                    </div>
                    <button
                      onClick={closeDialog}
                      className="rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <ul className="mt-4 space-y-1.5">
                    {selectedServices.map((s) => (
                      <li key={s.id} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{s.title}</span>
                        <span className="text-muted-foreground">{s.price}</span>
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={handleSend} className="relative mt-6 space-y-3">
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                    >
                      <label htmlFor="ssb-company-website">Company website</label>
                      <input
                        id="ssb-company-website"
                        name="company_website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="ssb-name" className="text-xs font-medium text-muted-foreground">Your name</label>
                      <input
                        id="ssb-name"
                        ref={nameRef}
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="ssb-email" className="text-xs font-medium text-muted-foreground">Your email</label>
                      <input
                        id="ssb-email"
                        type="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    {error && (
                      <p role="alert" className="text-sm text-destructive">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                    >
                      {sending ? "Sending…" : "Send to Dave"}
                      {!sending && <ArrowRight className="h-4 w-4" />}
                    </button>
                    <p className="text-center text-xs text-muted-foreground">
                      We'll only use your details to respond to your enquiry.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[200] flex items-center justify-end p-4 md:p-6">
        <AnimatePresence>
          {hasSelections && (
            <motion.button
              key="selection-bar"
              ref={barButtonRef}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={handleStart}
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-primary/30 bg-[#0a0a0b]/95 py-2.5 pl-4 pr-2.5 shadow-2xl shadow-primary/20 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-primary/30"
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {selectedServices.length}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"} selected
              </span>
              <span className="hidden text-sm text-muted-foreground sm:inline">→</span>
              <span className="hidden text-sm font-semibold text-primary sm:inline">Start my free consultation</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="h-5 w-5" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ServiceSelectionBar;
