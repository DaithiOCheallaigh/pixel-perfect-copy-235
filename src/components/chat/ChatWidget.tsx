import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Messages1 } from "iconsax-react";
import ChatUI from "./ChatUI";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  // Hide external WhatsApp widget on services routes where ChatWidget is shown
  useEffect(() => {
    const hideWhatsApp = () => {
      const waWidget = document.querySelector('[data-client="lacuna"]') as HTMLElement | null;
      const waIframe = document.getElementById('whatsapp-widget-iframe') as HTMLElement | null;
      const waElements = document.querySelectorAll('[id*="whatsapp"], [class*="whatsapp-widget"]');
      [waWidget, waIframe, ...Array.from(waElements)].forEach((el) => {
        if (el && el instanceof HTMLElement) el.style.display = "none";
      });
    };
    hideWhatsApp();
    const interval = setInterval(hideWhatsApp, 500);
    return () => {
      clearInterval(interval);
      const waElements = document.querySelectorAll('[id*="whatsapp"], [class*="whatsapp-widget"]');
      waElements.forEach((el) => {
        if (el instanceof HTMLElement) el.style.display = "";
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
                {/* Mobile close bar */}
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
                {/* Close button */}
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

      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[200] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Messages1 variant="TwoTone" className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ChatWidget;
