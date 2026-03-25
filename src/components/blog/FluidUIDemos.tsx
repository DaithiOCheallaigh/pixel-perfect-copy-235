import { useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

/* ─── Shared wrapper for every interactive demo ─── */
const DemoContainer = ({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption: string;
}) => (
  <div className="my-12 rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
    <div className="flex min-h-[260px] items-center justify-center p-8">
      {children}
    </div>
    <div className="border-t border-border bg-muted/30 px-6 py-3">
      <p className="text-center font-mono text-xs text-muted-foreground">{caption}</p>
    </div>
  </div>
);

/* ─── 1. Spring vs CSS Easing ─── */
export const SpringVsEasing = () => {
  const [active, setActive] = useState(false);
  return (
    <DemoContainer caption="Click to compare spring physics vs CSS easing">
      <div className="flex w-full max-w-md flex-col gap-6">
        <button
          onClick={() => setActive(!active)}
          className="self-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Toggle
        </button>
        {/* CSS ease-in-out */}
        <div className="flex items-center gap-4">
          <span className="w-28 text-right font-mono text-xs text-muted-foreground">
            CSS ease-in-out
          </span>
          <div className="relative flex-1 h-12 rounded-lg bg-muted/40">
            <div
              className="absolute top-1 bottom-1 w-10 rounded-md bg-muted-foreground/40"
              style={{
                left: active ? "calc(100% - 2.75rem)" : "0.25rem",
                transition: "left 0.4s ease-in-out",
              }}
            />
          </div>
        </div>
        {/* Spring physics */}
        <div className="flex items-center gap-4">
          <span className="w-28 text-right font-mono text-xs text-primary">
            Spring physics
          </span>
          <div className="relative flex-1 h-12 rounded-lg bg-muted/40">
            <motion.div
              className="absolute top-1 bottom-1 w-10 rounded-md bg-primary"
              animate={{ left: active ? "calc(100% - 2.75rem)" : "0.25rem" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            />
          </div>
        </div>
      </div>
    </DemoContainer>
  );
};

/* ─── 2. Interruptible Animation ─── */
export const InterruptibleDemo = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <DemoContainer caption="Click mid-flight to reverse — the spring adapts instantly">
      <motion.div
        className="cursor-pointer rounded-2xl bg-primary/90 px-8 py-6 text-primary-foreground font-semibold select-none"
        animate={{
          width: expanded ? 320 : 140,
          height: expanded ? 180 : 60,
          borderRadius: expanded ? 24 : 16,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.span
          className="block text-sm"
          animate={{ opacity: 1 }}
          key={expanded ? "close" : "open"}
          initial={{ opacity: 0 }}
        >
          {expanded ? "Click to close" : "Expand"}
        </motion.span>
      </motion.div>
    </DemoContainer>
  );
};

/* ─── 3. Draggable Card ─── */
export const DraggableCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  return (
    <DemoContainer caption="Drag the card freely — it springs back on release">
      <motion.div
        className="h-40 w-56 cursor-grab rounded-2xl bg-gradient-to-br from-primary/80 to-accent/60 shadow-xl active:cursor-grabbing"
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.6}
        style={{ x, y, rotateX, rotateY }}
        whileDrag={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 text-primary-foreground">
          <span className="text-2xl">↕ ↔</span>
          <span className="text-sm font-medium">Drag me</span>
        </div>
      </motion.div>
    </DemoContainer>
  );
};

/* ─── 4. Staggered Cascade ─── */
export const StaggeredGrid = () => {
  const [key, setKey] = useState(0);
  return (
    <DemoContainer caption="Cards cascade in with staggered delays">
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Replay
        </button>
        <motion.div
          key={key}
          className="grid grid-cols-3 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 font-mono text-sm font-bold text-primary md:h-20 md:w-20"
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.85 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 340, damping: 22 },
                },
              }}
            >
              {i + 1}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DemoContainer>
  );
};

/* ─── 5. Progressive Resistance ─── */
export const ProgressiveResistance = () => {
  const [loading, setLoading] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 80], [0, 1]);

  return (
    <DemoContainer caption="Pull down past the threshold — the card holds while loading">
      <div className="relative flex flex-col items-center gap-4">
        <motion.div style={{ opacity }} className="absolute -top-8 text-xs font-mono text-primary">
          {loading ? "Loading…" : "Pull to refresh"}
        </motion.div>
        <motion.div
          className="h-32 w-64 cursor-grab rounded-2xl border border-border bg-card shadow-lg active:cursor-grabbing"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.25}
          style={{ y }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 60) {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }
          }}
        >
          <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
            Drag down ↓
          </div>
        </motion.div>
      </div>
    </DemoContainer>
  );
};

/* ─── 6. Layout Animation (list reorder) ─── */
export const LayoutAnimationDemo = () => {
  const [items, setItems] = useState(["Design", "Prototype", "Build", "Ship"]);
  const defaultItems = ["Design", "Prototype", "Build", "Ship"];

  const insertItem = () => {
    const newItem = "Measure";
    if (!items.includes(newItem)) {
      setItems([newItem, ...items]);
    }
  };

  return (
    <DemoContainer caption="Remove or insert items — siblings animate smoothly into place">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={insertItem}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            + Insert "Measure"
          </button>
          <button
            onClick={() => setItems(defaultItems)}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col gap-2 w-64">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground">{item}</span>
                <button
                  onClick={() => setItems(items.filter((i) => i !== item))}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </DemoContainer>
  );
};

/* ─── 7. Reduced Motion Toggle ─── */
export const ReducedMotionDemo = () => {
  const [reduced, setReduced] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <DemoContainer caption="Compare full animation vs reduced motion — toggle to see the difference">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Replay
          </button>
          <button
            onClick={() => setReduced(!reduced)}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Reduced motion {reduced ? "ON" : "OFF"}
          </button>
        </div>
        <motion.div
          key={key}
          className="flex gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
          }}
        >
          {["Full", "animation"].map((word, i) => (
            <motion.div
              key={i}
              className="rounded-xl bg-primary/20 px-5 py-3 text-sm font-semibold text-primary"
              variants={{
                hidden: reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 30, scale: 0.85 },
                visible: reduced
                  ? { opacity: 1, transition: { duration: 0.15 } }
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 300, damping: 22 },
                    },
              }}
            >
              {reduced ? "Same as full" : word}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DemoContainer>
  );
};
