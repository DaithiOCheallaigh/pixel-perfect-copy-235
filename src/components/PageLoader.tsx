import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  const wordmark = "LACUNA DIGITAL";

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Wordmark */}
          <div className="mb-12 flex overflow-hidden">
            {wordmark.split("").map((char, i) => (
              <motion.span
                key={i}
                className="text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative w-48 md:w-64">
            <div className="h-[2px] w-full bg-muted">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${count}%` }}
              />
            </div>
            {/* Counter */}
            <div className="mt-4 text-center font-mono text-xs tracking-widest text-muted-foreground">
              {String(count).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
