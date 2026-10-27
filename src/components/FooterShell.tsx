import { ReactNode, useRef } from "react";
import FitText from "./FitText";
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
  const boxRef = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const inView = useInView(boxRef, { amount: "some" });
  const letters = Array.from(wordmark);

  return (
    <footer className="relative z-[1] bg-card pb-0 pt-24 text-foreground md:pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">{children}</div>
      <div
        ref={boxRef}
        aria-hidden="true"
        className="relative mx-auto mt-12 max-w-7xl overflow-hidden px-6 md:px-12"
        style={{ height: "clamp(120px, 24vw, 340px)" }}
      >
        <FitText
          text={wordmark}
          fill={0.96}
          className="absolute inset-x-0 bottom-0 flex justify-center"
          innerClassName="flex"
          innerStyle={{
            fontFamily: "'Mona Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.8,
            color: "hsl(var(--secondary))",
            transform: "translateY(8%)",
          }}
        >
          {letters.map((c, i) => (
            <Letter key={i} char={c} i={i} inView={inView} reduced={reduced} />
          ))}
        </FitText>
      </div>
    </footer>
  );
};

export default FooterShell;
