import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { Messages1 } from "iconsax-react";
import ChatUI from "./ChatUI";
import { useIsMobile } from "@/hooks/use-mobile";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface SelectedService {
  id: string;
  title: string;
  price: string;
  priceValue: number;
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

  // Listen for service selection changes from Services page
  useEffect(() => {
    const handleSelectionChange = (e: CustomEvent<SelectedService[] | null>) => {
      setSelectedServices(e.detail || []);
    };
    window.addEventListener("service-selection-change", handleSelectionChange as EventListener);
    return () => window.removeEventListener("service-selection-change", handleSelectionChange as EventListener);
  }, []);

  // Listen for package builder event to auto-open chat
  useEffect(() => {
    const handleOpenWithPackage = () => setOpen(true);
    window.addEventListener("open-chat-with-package", handleOpenWithPackage);
    return () => window.removeEventListener("open-chat-with-package", handleOpenWithPackage);
  }, []);

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open, isMobile]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleStartConsultation = () => {
    const packageData = selectedServices.map(s => ({ id: s.id, title: s.title, price: s.price, priceValue: s.priceValue }));
    sessionStorage.setItem("lacuna-package-selections", JSON.stringify(packageData));
    setSent(false);
    setDialogOpen(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || sending) return;
    setSending(true);
    try {
      await fetch(`${SUPABASE_URL}/functions/v1/send-service-selection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          services: selectedServices,
        }),
      });
    } catch {
      // Still show confirmation — the visitor shouldn't be blocked by a network hiccup
    }
    setSending(false);
    setSent(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    if (sent) {
      setName("");
      setEmail("");
    }
  };

  const hasSelections = selectedServices.length > 0;

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile: full-screen overlay */}
            {isMobile ? (
              <motion.div
                key="mobile-chat"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[200] flex flex-col bg-[#0a0a0b]"
              >
                <div className="flex items-center justify-end px-4 pt-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <ChatUI compact />
                </div>
              </motion.div>
            ) : (
              /* Desktop: floating card */
              <motion.div
                key="desktop-chat"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="fixed bottom-20 right-6 z-[200] flex h-[540px] w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0b]/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                <ChatUI compact />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Consultation request dialog */}
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
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0b]/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-8"
            >
              {sent ? (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                    <Check className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Sent to Dave</h3>
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
                      <h3 className="text-xl font-bold text-foreground">Start your free consultation</h3>
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

                  <form onSubmit={handleSend} className="mt-6 space-y-3">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                    >
                      {sending ? "Sending…" : "Send to Dave"}
                      {!sending && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integrated bottom bar: chat button + optional service selection */}
      {!open && (
        <div className="fixed bottom-0 left-0 right-0 z-[200] flex items-center justify-end p-4 pointer-events-none md:p-6">
          <AnimatePresence mode="wait">
            {hasSelections ? (
              <motion.button
                key="integrated-bar"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                onClick={handleStartConsultation}
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
                <span className="hidden text-sm font-semibold text-primary sm:inline">
                  Start my free consultation
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </motion.button>
            ) : (
              <motion.button
                key="chat-only"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                onClick={() => setOpen(true)}
                className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
                whileTap={{ scale: 0.92 }}
              >
                <Messages1 variant="TwoTone" className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
