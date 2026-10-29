import { useEffect, useMemo, useState, type ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type VaporTypeProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** seconds between each word starting */
  stagger?: number;
  /** seconds the finished text stays readable before it drifts away */
  hold?: number;
  /** set false to condense once and stay put */
  loop?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const IN_DURATION = 1.4;
const OUT_DURATION = 1.2;
const GAP = 0.5;

const wordVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    filter: "blur(16px)",
    y: 18,
    scale: 1.08,
    x: ((i * 37) % 11 - 5) * 2,
  }),
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    x: 0,
    scale: 1,
    transition: { duration: IN_DURATION, ease: EASE, delay: i * 0.09 },
  }),
  gone: (i: number) => ({
    opacity: 0,
    filter: "blur(18px)",
    y: -(26 + (i % 3) * 12),
    x: ((i * 37) % 11 - 5) * 7,
    scale: 0.96,
    transition: { duration: OUT_DURATION, ease: "easeIn", delay: i * 0.06 },
  }),
};

const VaporType = ({
  text,
  as: Tag = "h1",
  className,
  stagger = 0.09,
  hold = 8,
  loop = true,
}: VaporTypeProps) => {
  const reduce = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (reduce || !loop) return;
    const n = words.length - 1;
    const ms =
      phase === "in"
        ? (n * stagger + IN_DURATION + hold) * 1000
        : (n * 0.06 + OUT_DURATION + GAP) * 1000;
    const t = window.setTimeout(() => setPhase((p) => (p === "in" ? "out" : "in")), ms);
    return () => window.clearTimeout(t);
  }, [phase, reduce, loop, hold, stagger, words.length]);

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <motion.span
            className="inline-block will-change-[filter,transform,opacity]"
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={phase === "in" ? "visible" : "gone"}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
};

export default VaporType;