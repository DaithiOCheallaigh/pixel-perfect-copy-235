import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";

const Letter = ({ char, i, n, progress, reduced }: { char: string; i: number; n: number; progress: MotionValue<number>; reduced: boolean }) => {
  const range = [0.45 + (i / n) * 0.35, 0.75 + (i / n) * 0.25];
  const y = useTransform(progress, range, ["100%", "0%"]);
  const opacity = useTransform(progress, range, [0, 1]);
  const text = char === " " ? "\u00A0" : char;
  if (reduced) return <span className="inline-block">{text}</span>;
  return (
    <motion.span className="inline-block" style={{ y, opacity, transformOrigin: "bottom center" }}>
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
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const letters = Array.from(wordmark);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;
    const fit = () => {
      // Measure at 100px, then scale to fill container width (with a small safety margin).
      text.style.fontSize = "100px";
      const w = text.scrollWidth;
      const avail = box.clientWidth * 0.94;
      if (w > 0) setFontSize((avail / w) * 100);
      text.style.fontSize = "";
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
          className="absolute inset-x-0 bottom-0 flex justify-center whitespace-nowrap"
          style={{
            fontFamily: "'Mona Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.8,
            fontSize: `${fontSize}px`,
            color: "hsl(var(--secondary))",
            transform: "translateY(8%)",
          }}
        >
          {letters.map((c, i) => (
            <Letter key={i} char={c} i={i} n={letters.length} progress={scrollYProgress} reduced={reduced} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterShell;
