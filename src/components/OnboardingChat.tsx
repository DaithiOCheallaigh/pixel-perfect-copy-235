import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Loader2, Check } from "lucide-react";
import { MessageText } from "iconsax-react";
import { useToast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------ */
/*  Types & data                                                       */
/* ------------------------------------------------------------------ */

type Step = "business" | "challenge" | "recommendation" | "details" | "done";

const businessTypes = [
  { emoji: "🍕", label: "Food & Hospitality" },
  { emoji: "💄", label: "Beauty & Wellness" },
  { emoji: "🚀", label: "Startup" },
  { emoji: "🏪", label: "Retail" },
  { emoji: "🔧", label: "Trade / Services" },
  { emoji: "🏢", label: "Other" },
];

const challenges = [
  { emoji: "📍", label: "People can't find me online" },
  { emoji: "📅", label: "Admin & bookings taking too long" },
  { emoji: "📣", label: "I need more leads" },
  { emoji: "⚙️", label: "My workflows are a mess" },
  { emoji: "💳", label: "I need to take payments online" },
];

interface Message {
  from: "bot" | "user";
  text: string;
  component?: React.ReactNode;
}

interface Recommendation {
  packageName: string;
  bullets: string[];
  price: string;
  reason: string;
}

/* ------------------------------------------------------------------ */
/*  Chat Core                                                          */
/* ------------------------------------------------------------------ */

const OnboardingChatCore = ({ onClose }: { onClose?: () => void }) => {
  const [step, setStep] = useState<Step>("business");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! I'm Dave's AI assistant. I help match businesses with the right digital setup. What type of business do you run?",
    },
  ]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasWebsite, setHasWebsite] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, step]);

  const addBotMessage = (text: string, delay = 1200) => {
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text }]);
      setLoading(false);
    }, delay);
  };

  const handleBusinessSelect = (label: string) => {
    setSelectedBusiness(label);
    setMessages((prev) => [...prev, { from: "user", text: label }]);
    setStep("challenge");
    addBotMessage("Great! What's the biggest challenge right now?");
  };

  const handleChallengeSelect = async (label: string) => {
    setSelectedChallenge(label);
    setMessages((prev) => [...prev, { from: "user", text: label }]);
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/onboarding-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            businessType: selectedBusiness,
            challenge: label,
          }),
        }
      );

      const data = await res.json();
      setRecommendation(data);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Based on what you've told me, here's what I'd recommend:",
        },
      ]);
      setStep("recommendation");
    } catch {
      setRecommendation({
        packageName: "Free Discovery Call",
        bullets: ["30-minute video call", "Understand your needs", "Get a personalised plan"],
        price: "Free",
        reason: "Let's chat about what would work best for your business.",
      });
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Here's what I'd suggest:" },
      ]);
      setStep("recommendation");
    } finally {
      setLoading(false);
    }
  };

  const handleShowForm = () => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: "Yes, let's do it!" },
      { from: "bot", text: "Leave your details and Dave will be in touch within 24 hours." },
    ]);
    setStep("details");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      toast({ title: "Please enter your name and email", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { submitLead } = await import("@/lib/submitLead");
      submitLead({
        name: name.trim(),
        contactFirstName: name.trim().split(" ")[0],
        contactLastName: name.trim().split(" ").slice(1).join(" "),
        contactEmail: email.trim(),
        contactPhone: phone.trim() || "",
        website: hasWebsite ? websiteUrl.trim() : "",
        source: "website_chatbot",
        status: "new",
        priority: "medium",
        currency: "EUR",
        notes: `Services of interest: ${recommendation?.packageName || "Not specified"}. Preferred call time: Not specified. Business: ${selectedBusiness}. Challenge: ${selectedChallenge}. Price: ${recommendation?.price || "TBC"}. Captured via onboarding chat widget.`,
      });
    } catch {
      // Silently continue — lead capture is best-effort
    }

    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: `Perfect, ${name}! Dave will review your details and be in touch within 24 hours. Thanks for reaching out! 🙌`,
      },
    ]);
    setStep("done");
    setSubmitting(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm font-bold text-foreground">Lacuna Digital</p>
          <p className="text-[11px] text-muted-foreground">
            {step === "done" ? "Complete" : `Step ${["business", "challenge", "recommendation", "details"].indexOf(step) + 1} of 4`}
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <motion.div
          className="h-full bg-primary"
          animate={{
            width: `${(["business", "challenge", "recommendation", "details", "done"].indexOf(step) + 1) * 20}%`,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-foreground"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-1 rounded-2xl bg-white/5 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-muted-foreground"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Business type buttons */}
        {step === "business" && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {businessTypes.map((bt) => (
              <button
                key={bt.label}
                onClick={() => handleBusinessSelect(bt.label)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10"
              >
                {bt.emoji} {bt.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Challenge buttons */}
        {step === "challenge" && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {challenges.map((ch) => (
              <button
                key={ch.label}
                onClick={() => handleChallengeSelect(ch.label)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10"
              >
                {ch.emoji} {ch.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Recommendation card */}
        {step === "recommendation" && recommendation && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2"
          >
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Recommended
              </p>
              <h3 className="mt-2 text-base font-bold text-foreground">{recommendation.packageName}</h3>
              <ul className="mt-3 space-y-1.5">
                {recommendation.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-lg font-bold text-foreground">{recommendation.price}</p>
              <p className="mt-1 text-xs text-muted-foreground">{recommendation.reason}</p>
              <button
                onClick={handleShowForm}
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Want Dave to walk you through this? →
              </button>
            </div>
          </motion.div>
        )}

        {/* Contact form */}
        {step === "details" && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 pt-2"
          >
            <input
              type="text"
              placeholder="Your name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasWebsite(!hasWebsite)}
                className={`h-5 w-9 rounded-full transition-colors ${hasWebsite ? "bg-primary" : "bg-white/10"}`}
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-foreground"
                  animate={{ x: hasWebsite ? 18 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className="text-xs text-muted-foreground">Do you have a website already?</span>
            </div>
            {hasWebsite && (
              <input
                type="url"
                placeholder="What's the URL?"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Send my details →"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Floating Widget                                                    */
/* ------------------------------------------------------------------ */

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 z-[200] h-[520px] w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl"
          >
            <OnboardingChatCore onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-[200] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageText variant="Bold" className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Full-page version                                                  */
/* ------------------------------------------------------------------ */

export const OnboardingChatPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6 py-24">
    <div className="h-[600px] w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl">
      <OnboardingChatCore />
    </div>
  </div>
);

export default OnboardingChatCore;
