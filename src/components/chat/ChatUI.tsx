import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "iconsax-react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import {
  type Message,
  type ChatState,
  callDaveAI,
  submitLead,
  generateId,
} from "@/lib/daveAI";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BUSINESS_CHIPS = [
  "🍕 Food & Hospitality",
  "💄 Beauty & Wellness",
  "🚀 Startup / New business",
  "🏪 Retail",
  "🔧 Trades & Services",
  "🏢 Something else",
];

const CHALLENGE_CHIPS = [
  "📍 People can't find me online",
  "📅 Bookings & admin taking too long",
  "📣 I need more leads",
  "⚙️ My workflows are a mess",
  "💳 I need to take payments online",
];

const REACTION_CHIPS = ["✅ That sounds good", "🤔 Tell me more"];
const FINAL_CHIPS = ["👍 Yes, get my script", "👋 No thanks, I'm good"];

const SESSION_KEY = "lacuna-chat-state";
const PACKAGE_KEY = "lacuna-package-selections";

const INTRO_MESSAGE: Message = {
  id: "intro",
  role: "bot",
  content:
    "Hi! 👋 I'm Dave's AI assistant. I help match businesses with the right digital setup. What type of business do you run?",
  chips: BUSINESS_CHIPS,
  timestamp: new Date(),
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function stageProgress(stage: ChatState["stage"]): number {
  const map: Record<string, number> = {
    intro: 0,
    "business-type": 15,
    challenge: 35,
    recommendation: 55,
    collecting: 75,
    done: 100,
  };
  return map[stage] ?? 0;
}

function loadSession(): ChatState | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    parsed.messages = parsed.messages.map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
    return parsed;
  } catch {
    return null;
  }
}

function saveSession(state: ChatState) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch {}
}

interface PackageSelection {
  id: string;
  title: string;
  price: string;
  priceValue: number;
}

function loadPackageSelections(): PackageSelection[] | null {
  try {
    const raw = sessionStorage.getItem(PACKAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  ChatUI                                                             */
/* ------------------------------------------------------------------ */

const ChatUI = ({ compact = false }: { compact?: boolean }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<ChatState>(() => {
    const saved = loadSession();
    if (saved) return { ...saved, isTyping: false };
    return {
      messages: [INTRO_MESSAGE],
      stage: "intro",
      collectedData: {},
      isTyping: false,
      inputValue: "",
      inputMode: "chips",
      collectField: undefined,
    };
  });

  // Persist to session
  useEffect(() => {
    saveSession(state);
  }, [state]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }
  }, [state.messages, state.isTyping]);

  // Listen for package selection events
  useEffect(() => {
    const handlePackageEvent = () => {
      const selections = loadPackageSelections();
      if (!selections || selections.length === 0) return;

      // Clear any existing chat and start the package flow
      const totalEstimate = selections.reduce((sum, s) => sum + s.priceValue, 0);
      const serviceList = selections.map((s) => s.title).join(", ");
      const priceText = totalEstimate === 0 ? "free" : `from €${totalEstimate.toLocaleString()}`;

      const packageMessage: Message = {
        id: generateId(),
        role: "bot",
        content: `Great choices! 🎯 You're building a tailored package with:\n\n${selections
          .map((s) => `✅ ${s.title} — ${s.price}`)
          .join("\n")}\n\nEstimated ${priceText}. I'd love to set up a no-cost, no-commitment exploration call so Dave can scope this properly for you.\n\nWhat's your name?`,
        timestamp: new Date(),
      };

      setState({
        messages: [packageMessage],
        stage: "collecting",
        collectedData: {
          recommendation: `Custom package: ${serviceList} (${priceText})`,
        },
        isTyping: false,
        inputValue: "",
        inputMode: "text",
        collectField: "name",
      });

      // Clear the package selections so it doesn't re-trigger
      sessionStorage.removeItem(PACKAGE_KEY);
    };

    window.addEventListener("open-chat-with-package", handlePackageEvent);
    return () => window.removeEventListener("open-chat-with-package", handlePackageEvent);
  }, []);

  const addMessage = useCallback(
    (role: "bot" | "user", content: string, chips?: string[]) => {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { id: generateId(), role, content, chips, timestamp: new Date() },
        ],
      }));
    },
    []
  );

  const showTypingThenRespond = useCallback(
    async (
      userMsg: string,
      afterTyping: () => Promise<void> | void,
      typingDelay = 1200
    ) => {
      addMessage("user", userMsg);
      setState((prev) => ({ ...prev, isTyping: true }));
      await new Promise((r) => setTimeout(r, typingDelay));
      await afterTyping();
      setState((prev) => ({ ...prev, isTyping: false }));
    },
    [addMessage]
  );

  /* ── Handle chip selection ── */
  const handleChipSelect = async (chip: string) => {
    if (state.stage === "intro" || state.stage === "business-type") {
      const bizType = chip.replace(/^[^\s]+\s/, "");
      setState((prev) => ({
        ...prev,
        stage: "business-type",
        collectedData: { ...prev.collectedData, businessType: bizType },
      }));

      await showTypingThenRespond(chip, async () => {
        const aiReply = await callDaveAI([
          INTRO_MESSAGE,
          { id: "u1", role: "user", content: chip, timestamp: new Date() },
        ]);
        addMessage("bot", aiReply, CHALLENGE_CHIPS);
        setState((prev) => ({ ...prev, stage: "challenge" }));
      });
    } else if (state.stage === "challenge") {
      const challenge = chip.replace(/^[^\s]+\s/, "");
      setState((prev) => ({
        ...prev,
        collectedData: { ...prev.collectedData, challenge },
      }));

      await showTypingThenRespond(chip, async () => {
        const allMsgs = [
          ...state.messages,
          { id: "uc", role: "user" as const, content: chip, timestamp: new Date() },
        ];
        const aiReply = await callDaveAI(allMsgs);
        addMessage("bot", aiReply, REACTION_CHIPS);
        setState((prev) => ({
          ...prev,
          stage: "recommendation",
          collectedData: { ...prev.collectedData, recommendation: aiReply },
        }));
      });
    } else if (state.stage === "recommendation") {
      if (chip.includes("That sounds good")) {
        await showTypingThenRespond(chip, async () => {
          addMessage(
            "bot",
            "Great! Let's arrange a no-cost, no-commitment exploration call so Dave can scope this for you. What's your name?"
          );
          setState((prev) => ({
            ...prev,
            stage: "collecting",
            inputMode: "text",
            collectField: "name",
          }));
        });
      } else {
        await showTypingThenRespond(chip, async () => {
          const allMsgs = [
            ...state.messages,
            { id: "ur", role: "user" as const, content: chip, timestamp: new Date() },
          ];
          const aiReply = await callDaveAI(allMsgs);
          addMessage("bot", aiReply, REACTION_CHIPS);
        });
      }
    } else if (state.stage === "done") {
      if (chip.includes("Yes, get my script")) {
        navigate("/tools/whatsapp-script-generator");
      } else {
        addMessage("user", chip);
        setTimeout(() => {
          addMessage("bot", "Great chatting with you! Dave will be in touch soon. 👋");
        }, 800);
      }
    }
  };

  /* ── Handle text input submit ── */
  const handleSend = async () => {
    const val = state.inputValue.trim();
    if (!val) return;

    const field = state.collectField;

    if (field === "name") {
      addMessage("user", val);
      setState((prev) => ({
        ...prev,
        inputValue: "",
        collectedData: { ...prev.collectedData, name: val },
        isTyping: true,
      }));
      await new Promise((r) => setTimeout(r, 800));
      addMessage("bot", `Nice to meet you, ${val.split(" ")[0]}! What's the best email to reach you on?`);
      setState((prev) => ({
        ...prev,
        isTyping: false,
        collectField: "email",
      }));
    } else if (field === "email") {
      addMessage("user", val);
      setState((prev) => ({
        ...prev,
        inputValue: "",
        collectedData: { ...prev.collectedData, email: val },
        isTyping: true,
      }));
      await new Promise((r) => setTimeout(r, 800));
      addMessage(
        "bot",
        "And when's a good time for Dave to arrange your exploration call? E.g. 'Tuesday afternoon' or 'anytime this week'"
      );
      setState((prev) => ({
        ...prev,
        isTyping: false,
        collectField: "call-time",
      }));
    } else if (field === "call-time") {
      addMessage("user", val);
      setState((prev) => ({
        ...prev,
        inputValue: "",
        collectedData: { ...prev.collectedData, phone: val },
        isTyping: true,
      }));

      // Submit lead with call time in the notes
      const data = {
        ...state.collectedData,
        name: state.collectedData.name,
        email: state.collectedData.email,
        phone: val, // repurposed as preferred call time
      };
      submitLead(data, state.collectedData.recommendation || "Discovery Call");

      await new Promise((r) => setTimeout(r, 1000));
      const firstName = state.collectedData.name?.split(" ")[0] || "";
      addMessage(
        "bot",
        `Perfect, ${firstName}! ✅ I've passed your details to Dave. He'll reach out to arrange your exploration call — no cost, no commitment.\n\nIn the meantime, would you like a free WhatsApp Business script for your business? Takes 2 minutes.`,
        FINAL_CHIPS
      );
      setState((prev) => ({
        ...prev,
        isTyping: false,
        stage: "done",
        inputMode: "chips",
        collectField: undefined,
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(PACKAGE_KEY);
    setState({
      messages: [INTRO_MESSAGE],
      stage: "intro",
      collectedData: {},
      isTyping: false,
      inputValue: "",
      inputMode: "chips",
      collectField: undefined,
    });
  };

  // Find last message with chips that hasn't been "answered"
  const lastBotWithChips = (() => {
    for (let i = state.messages.length - 1; i >= 0; i--) {
      const m = state.messages[i];
      if (m.role === "bot" && m.chips?.length) {
        const hasUserAfter = state.messages.slice(i + 1).some((x) => x.role === "user");
        if (!hasUserAfter) return m;
      }
    }
    return null;
  })();

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
            LD
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Chat with Dave's AI</p>
            <div className="flex items-center gap-2">
              <p className="text-[11px] text-white/40">Usually replies instantly</p>
              <span className="text-[11px] text-white/20">·</span>
              <button
                onClick={handleReset}
                className="text-[11px] text-white/30 transition-colors hover:text-white/60"
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] w-full bg-white/10">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${stageProgress(state.stage)}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
        style={{ scrollbarWidth: "none" }}
      >
        {state.messages.map((msg, i) => (
          <MessageBubble key={msg.id} message={msg} index={i} />
        ))}

        {state.isTyping && <TypingIndicator />}

        {/* Show chips for latest unanswered bot message */}
        {!state.isTyping && lastBotWithChips && (
          <QuickReplies
            chips={lastBotWithChips.chips!}
            onSelect={handleChipSelect}
            disabled={state.isTyping}
          />
        )}
      </div>

      {/* Text input (collecting stage) */}
      {state.inputMode === "text" && state.stage === "collecting" && (
        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <input
              type={state.collectField === "email" ? "email" : "text"}
              value={state.inputValue}
              onChange={(e) =>
                setState((prev) => ({ ...prev, inputValue: e.target.value }))
              }
              onKeyDown={handleKeyDown}
              placeholder={
                state.collectField === "name"
                  ? "Type your name..."
                  : state.collectField === "email"
                    ? "your@email.com"
                    : "E.g. Tuesday afternoon, anytime this week..."
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-primary/50"
              autoFocus
            />
            <button
              onClick={handleSend}
              className="shrink-0 rounded-xl bg-primary p-2.5 text-primary-foreground transition-colors hover:bg-primary/80"
            >
              <Send variant="TwoTone" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatUI;
