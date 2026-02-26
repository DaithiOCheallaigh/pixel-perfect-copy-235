"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <Illustration mouseEnter={mouseEnter} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface TraceLine {
  id: number;
  type: "h" | "v";
  row: number;
  col: number;
  length: number;
}

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const columns = 18;
  const rows = 6;
  const stars = columns * rows;

  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const [traceLines, setTraceLines] = useState<TraceLine[]>([]);
  const highlightedStars = useRef<number[]>([]);
  const traceId = useRef(0);

  useEffect(() => {
    const starInterval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    const traceInterval = setInterval(() => {
      const isHorizontal = Math.random() > 0.5;
      const line: TraceLine = {
        id: traceId.current++,
        type: isHorizontal ? "h" : "v",
        row: Math.floor(Math.random() * rows),
        col: Math.floor(Math.random() * columns),
        length: isHorizontal
          ? Math.min(3 + Math.floor(Math.random() * 6), columns)
          : Math.min(2 + Math.floor(Math.random() * 4), rows),
      };
      setTraceLines((prev) => [...prev.slice(-6), line]);
    }, 1500);

    return () => {
      clearInterval(starInterval);
      clearInterval(traceInterval);
    };
  }, []);

  const cellW = 100 / columns;
  const cellH = 100 / rows;

  return (
    <div className="absolute inset-0 z-0">
      {/* Star grid */}
      <div
        className="absolute inset-0 grid gap-px"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {[...Array(stars)].map((_, starIdx) => {
          const isGlowing = glowingStars.includes(starIdx);
          const delay = (starIdx % 10) * 0.1;
          const staticDelay = starIdx * 0.01;
          return (
            <div
              key={`star-${starIdx}`}
              className="relative flex items-center justify-center p-2"
            >
              <Star isGlowing={isGlowing} delay={delay} />
              {mouseEnter && <Glow delay={staticDelay} />}
              <AnimatePresence mode="wait">
                {isGlowing && <Glow delay={delay} />}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Trace lines */}
      <svg className="absolute inset-0 z-[1] h-full w-full pointer-events-none">
        <AnimatePresence>
          {traceLines.map((line) => {
            const startX = (line.col + 0.5) * cellW;
            const startY = (line.row + 0.5) * cellH;

            if (line.type === "h") {
              const endX = Math.min(
                (line.col + line.length + 0.5) * cellW,
                100
              );
              return (
                <motion.line
                  key={line.id}
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${startY}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.6, 0.6, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              );
            } else {
              const endY = Math.min(
                (line.row + line.length + 0.5) * cellH,
                100
              );
              return (
                <motion.line
                  key={line.id}
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${startX}%`}
                  y2={`${endY}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.6, 0.6, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              );
            }
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{ scale: 1 }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing
          ? "hsl(var(--primary))"
          : "hsl(var(--foreground) / 0.15)",
      }}
      transition={{ duration: 2, ease: "easeInOut", delay }}
      className="relative z-20 h-[1px] w-[1px] rounded-full"
    />
  );
};

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay }}
      exit={{ opacity: 0 }}
      className="absolute left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-primary shadow-2xl shadow-primary blur-[1px]"
    />
  );
};
