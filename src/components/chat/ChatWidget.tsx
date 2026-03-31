import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Messages1 } from "iconsax-react";
import ChatUI from "./ChatUI";
import { useIsMobile } from "@/hooks/use-mobile";

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

  // Hide external WhatsApp widget on services routes where ChatWidget is shown
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "hide-wa-widget";
    style.textContent = `
      #whatsapp-widget-iframe,
      .wa-chat-box,
      .lcw-btn,
      iframe[src*="whatsapp"],
      iframe[src*="lacuna-lead-manager"],
      [id*="whatsapp"],
      [class*="whatsapp"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    const isWhatsAppWidgetElement = (el: HTMLElement) => {
      const id = el.id?.toLowerCase() ?? "";
      const className = typeof el.className === "string" ? el.className.toLowerCase() : "";
      const src = (el.getAttribute("src") ?? "").toLowerCase();

      return (
        id.includes("whatsapp") ||
        className.includes("whatsapp") ||
        className.includes("wa-chat-box") ||
        className.includes("lcw-btn") ||
        src.includes("whatsapp") ||
        src.includes("lacuna-lead-manager")
      );
    };

    const hideWhatsApp = () => {
      document.querySelectorAll("body > *").forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.id === "root") return;
        if (isWhatsAppWidgetElement(htmlEl)) {
          htmlEl.style.display = "none";
        }
      });
    };
    hideWhatsApp();
    const interval = setInterval(hideWhatsApp, 500);

    return () => {
      clearInterval(interval);
      document.getElementById("hide-wa-widget")?.remove();
      document.querySelectorAll("body > *").forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (isWhatsAppWidgetElement(htmlEl)) {
          htmlEl.style.display = "";
        }
      });
    };
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

  const handleStartConsultation = () => {
    const packageData = selectedServices.map(s => ({ id: s.id, title: s.title, price: s.price, priceValue: s.priceValue }));
    sessionStorage.setItem("lacuna-package-selections", JSON.stringify(packageData));
    window.dispatchEvent(new CustomEvent("open-chat-with-package"));
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
