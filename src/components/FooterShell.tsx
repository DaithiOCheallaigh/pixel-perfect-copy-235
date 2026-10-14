import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 58, damping: 12.5, mass: 1 } as const;
const STAGGER = 0.08;

const Letter = ({ char, i, inView, reduced }: { char: string; i: number; inView: boolean; reduced: boolean }) => {
  const text = char === " " ? "\u00A0" : char;
  if (reduced) return <span className="inline-block">{text}</span>;
  return (
    <motion.span
      className="inline-block"
      style={{ transformOrigin: "bottom center" }}
      initial={{ y: "40%", opacity: 0 }}
      animate={inView ? { y: "0%", opacity: 1 } : { y: "40%", opacity: 0 }}
      transition={
        inView
          ? { y: { ...SPRING, delay: i * STAGGER }, opacity: { duration: 0, delay: i * STAGGER + 0.2 } }
          : { y: SPRING, opacity: { duration: 0, delay: 0.13 } }
      }
    >
      {text}
    </motion.span>
  );
};

const FooterShell = ({ wordmark, children }: { wordmark: string; children: ReactNode }) => {
  const footerRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(100);
  const reduced = !!useReducedMotion();
  const inView = useInView(boxRef, { amount: "some" });
  const letters = Array.from(wordmark);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;
    const fit = () => {
      // Measure at 100px, then scale to fill container width (with a small safety margin).
      const prev = text.style.fontSize;
      text.style.fontSize = "100px";
      const w = text.scrollWidth;
      const avail = box.clientWidth * 0.96;
      if (w > 0) {
        const next = (avail / w) * 100;
        text.style.fontSize = `${next}px`;
        setFontSize(next);
        return;
      }
      text.style.fontSize = prev;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [wordmark, letters.length]);

  return (
    <footer ref={footerRef} className="relative z-[1] bg-card pb-0 pt-24 text-foreground md:pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">{children}</div>
      <div
        ref={boxRef}
        aria-hidden="true"
        className="relative mx-auto mt-12 max-w-7xl overflow-hidden px-6 md:px-12"
        style={{ height: "clamp(120px, 24vw, 340px)" }}
      >
        <div
          ref={textRef}
          className="absolute bottom-0 left-1/2 flex w-max whitespace-nowrap"
          style={{
            fontFamily: "'Mona Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.8,
            fontSize: `${fontSize}px`,
            color: "hsl(var(--secondary))",
            transform: "translate(-50%, 8%)",
          }}
        >
          {letters.map((c, i) => (
            <Letter key={i} char={c} i={i} inView={inView} reduced={reduced} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterShell;
