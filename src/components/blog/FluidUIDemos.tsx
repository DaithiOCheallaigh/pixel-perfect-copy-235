import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";

/* ─── Shared chrome ─── */
const pill =
  "inline-flex min-h-9 items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const pillPrimary = `${pill} bg-primary text-primary-foreground hover:bg-primary/85`;
const pillGhost = `${pill} border border-border text-muted-foreground hover:text-foreground`;
const springSnappy = { type: "spring", stiffness: 300, damping: 24 } as const;

const DemoContainer = ({
  children,
  caption,
  readout,
}: {
  children: React.ReactNode;
  caption: string;
  readout?: React.ReactNode;
}) => (
  <div className="my-12 overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
    <div className="flex min-h-[260px] items-center justify-center p-5 sm:p-8">{children}</div>
    <div className="border-t border-border bg-muted/30 px-6 py-3">
      <p className="text-center font-mono text-xs text-muted-foreground">{caption}</p>
      {readout ? (
        <p className="mt-1 text-center font-mono text-[11px] text-primary">
          {readout}
        </p>
      ) : null}
    </div>
  </div>
);

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex max-w-full flex-wrap justify-center gap-0.5 rounded-full border border-border p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`min-h-8 rounded-full px-3 font-mono text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            value === o.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const Slider = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = String,
  disabled = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  disabled?: boolean;
}) => (
  <label className={`flex w-full items-center gap-3 font-mono text-[11px] text-muted-foreground ${disabled ? "opacity-40" : ""}`}>
    <span className="w-16 shrink-0 text-right">{label}</span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-6 w-full cursor-pointer accent-primary disabled:cursor-not-allowed"
    />
    <span className="w-12 shrink-0 tabular-nums text-foreground">{format(value)}</span>
  </label>
);

/** Width of a measured element, kept current with ResizeObserver when available. */
const useWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.getBoundingClientRect().width);
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
};

/* ─── 1. Spring vs CSS easing: two distances, live physics ─── */
const BLOCK = 40;
const PAD = 4;

type SpringConfig = { type: "spring"; stiffness: number; damping: number; mass: number };

const CssTrack = ({ on, travel, trackRef }: { on: boolean; travel: number; trackRef?: React.Ref<HTMLDivElement> }) => (
  <div ref={trackRef} className="relative h-12 w-full rounded-lg bg-muted/40">
    <div
      className="absolute top-1 h-10 w-10 rounded-md bg-muted-foreground/40"
      style={{ left: PAD, transform: `translateX(${on ? travel : 0}px)`, transition: "transform 400ms ease-in-out" }}
    />
  </div>
);

const SpringTrack = ({ x }: { x: MotionValue<number> }) => (
  <div className="relative h-12 w-full rounded-lg bg-muted/40">
    <motion.div className="absolute top-1 h-10 w-10 rounded-md bg-primary" style={{ left: PAD, x }} />
  </div>
);

/** Starts a spring on a motion value and reports when it is visibly at rest (within half a pixel). */
const runSpring = (mv: MotionValue<number>, target: number, spring: SpringConfig, onSettled: (ms: number) => void) => {
  const start = performance.now();
  let lastMove = start;
  const unsubscribe = mv.on("change", (v) => {
    if (Math.abs(v - target) > 0.5) lastMove = performance.now();
  });
  animate(mv, target, spring).then(() => {
    unsubscribe();
    onSettled(Math.round(lastMove - start));
  });
};

const TrackLabel = ({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) => (
  <span className={`text-right font-mono text-[11px] ${muted ? "text-muted-foreground" : "text-primary"}`}>{children}</span>
);

export const SpringVsEasing = () => {
  const [on, setOn] = useState(false);
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(24);
  const [mass, setMass] = useState(1);
  const [trackRef, trackWidth] = useWidth();
  const xShort = useMotionValue(0);
  const xLong = useMotionValue(0);
  const [settled, setSettled] = useState<{ short?: number; long?: number }>({});

  const longTravel = Math.max(0, Math.round(trackWidth - BLOCK - PAD * 2));
  const shortTravel = Math.min(64, longTravel);
  const spring: SpringConfig = { type: "spring", stiffness, damping, mass };

  const toggle = () => {
    const next = !on;
    setOn(next);
    setSettled({});
    runSpring(xShort, next ? shortTravel : 0, spring, (ms) => setSettled((s) => ({ ...s, short: ms })));
    runSpring(xLong, next ? longTravel : 0, spring, (ms) => setSettled((s) => ({ ...s, long: ms })));
  };

  const readout =
    settled.long !== undefined
      ? `CSS finished at 400 ms because we said so · the spring settled in ${settled.long} ms (long) and ${settled.short ?? "…"} ms (short) — change the physics and the timing follows`
      : "CSS runs for exactly 400 ms whatever the distance · a spring's timing falls out of stiffness, damping and mass";

  return (
    <DemoContainer caption="Toggle, then play with the physics — same code, two distances" readout={readout}>
      <div className="flex w-full max-w-md flex-col gap-5">
        <button type="button" onClick={toggle} className={`${pillPrimary} self-center px-5`}>
          Toggle
        </button>
        <div className="grid grid-cols-[5.5rem_1fr] items-center gap-x-3 gap-y-2 sm:grid-cols-[7rem_1fr]">
          <TrackLabel muted>CSS · short</TrackLabel>
          <CssTrack on={on} travel={shortTravel} trackRef={trackRef} />
          <TrackLabel muted>CSS · long</TrackLabel>
          <CssTrack on={on} travel={longTravel} />
          <TrackLabel>Spring · short</TrackLabel>
          <SpringTrack x={xShort} />
          <TrackLabel>Spring · long</TrackLabel>
          <SpringTrack x={xLong} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Slider label="stiffness" value={stiffness} min={50} max={600} step={10} onChange={setStiffness} />
          <Slider label="damping" value={damping} min={4} max={60} onChange={setDamping} />
          <Slider label="mass" value={mass} min={0.5} max={3} step={0.1} onChange={setMass} format={(v) => v.toFixed(1)} />
        </div>
      </div>
    </DemoContainer>
  );
};

/* ─── 2. Interruptible: a locked CSS panel beside a spring that always listens ─── */
const LOCK_MS = 600;

export const InterruptibleDemo = () => {
  const [lockedOpen, setLockedOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ignored, setIgnored] = useState(0);
  const [springOpen, setSpringOpen] = useState(false);
  const [reversals, setReversals] = useState(0);
  const lastToggle = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const clickLocked = () => {
    if (busy) {
      setIgnored((n) => n + 1);
      return;
    }
    setBusy(true);
    setLockedOpen((v) => !v);
    timer.current = window.setTimeout(() => setBusy(false), LOCK_MS);
  };
  const clickSpring = () => {
    const now = performance.now();
    if (now - lastToggle.current < 600) setReversals((n) => n + 1);
    lastToggle.current = now;
    setSpringOpen((v) => !v);
  };

  const panel =
    "flex items-start justify-center overflow-hidden rounded-2xl px-4 py-4 text-sm font-semibold select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <DemoContainer
      caption="Click both panels rapidly — the locked one must finish before it listens again"
      readout={`Locked panel ignored ${ignored} click${ignored === 1 ? "" : "s"} · spring reversed mid-flight ${reversals} time${reversals === 1 ? "" : "s"}`}
    >
      <div className="grid w-full max-w-md grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[11px] text-muted-foreground">Locked · CSS 600 ms</span>
          <div className="flex h-40 w-full items-start justify-center">
            <button
              type="button"
              onClick={clickLocked}
              aria-busy={busy}
              className={`${panel} bg-muted-foreground/40 text-foreground ${busy ? "cursor-wait" : "cursor-pointer"}`}
              style={{
                width: lockedOpen ? "100%" : "55%",
                height: lockedOpen ? 160 : 56,
                borderRadius: lockedOpen ? 24 : 16,
                transition: `width ${LOCK_MS}ms ease-in-out, height ${LOCK_MS}ms ease-in-out, border-radius ${LOCK_MS}ms ease-in-out`,
              }}
            >
              {busy ? "Busy…" : lockedOpen ? "Close" : "Expand"}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[11px] text-primary">Interruptible · spring</span>
          <div className="flex h-40 w-full items-start justify-center">
            <motion.button
              type="button"
              onClick={clickSpring}
              className={`${panel} cursor-pointer bg-primary/90 text-primary-foreground`}
              initial={{ width: "55%", height: 56, borderRadius: 16 }}
              animate={{ width: springOpen ? "100%" : "55%", height: springOpen ? 160 : 56, borderRadius: springOpen ? 24 : 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              whileTap={{ scale: 0.97 }}
            >
              {springOpen ? "Close" : "Expand"}
            </motion.button>
          </div>
        </div>
      </div>
    </DemoContainer>
  );
};

/* ─── 3. Direct manipulation: 1:1 tracking, velocity decides the release ─── */
export const DraggableCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [8, -8]);
  const rotateY = useTransform(x, [-120, 120], [-8, 8]);
  const [live, setLive] = useState({ dx: 0, dy: 0, v: 0 });
  const [dragging, setDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [result, setResult] = useState("Drag the card — it tracks your pointer 1:1");

  const onDrag = (_: unknown, info: PanInfo) =>
    setLive({ dx: Math.round(info.offset.x), dy: Math.round(info.offset.y), v: Math.round(Math.hypot(info.velocity.x, info.velocity.y)) });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    const speed = Math.hypot(info.velocity.x, info.velocity.y);
    const distance = Math.hypot(info.offset.x, info.offset.y);
    if (speed > 600 || distance > 180) {
      const angle = Math.atan2(info.velocity.y || info.offset.y, info.velocity.x || info.offset.x);
      setDismissed(true);
      setResult(`Released at ${Math.round(speed)} px/s → dismissed, carrying the gesture's velocity`);
      animate(x, Math.cos(angle) * 900, { type: "spring", stiffness: 120, damping: 30, velocity: info.velocity.x });
      animate(y, Math.sin(angle) * 900, { type: "spring", stiffness: 120, damping: 30, velocity: info.velocity.y });
    } else {
      setResult(`Released at ${Math.round(speed)} px/s, ${Math.round(distance)} px out → snapped back`);
      animate(x, 0, { type: "spring", stiffness: 400, damping: 28, velocity: info.velocity.x });
      animate(y, 0, { type: "spring", stiffness: 400, damping: 28, velocity: info.velocity.y });
    }
  };

  const bringBack = () => {
    setDismissed(false);
    setResult("Back in place — try a slow drag, then a flick");
    animate(x, 0, springSnappy);
    animate(y, 0, springSnappy);
  };

  return (
    <DemoContainer caption="Drag freely — a fast flick dismisses, a slow release snaps back" readout={result}>
      <div className="flex w-full flex-col items-center gap-4">
        <div className="relative flex h-44 w-full items-center justify-center" style={{ perspective: 800 }}>
          <div
            aria-hidden
            className={`absolute flex h-36 w-52 items-center justify-center rounded-2xl border border-dashed border-border font-mono text-[11px] text-muted-foreground transition-opacity duration-300 ${
              dismissed ? "opacity-100" : "opacity-0"
            }`}
          >
            dismissed
          </div>
          <motion.div
            className={`flex h-36 w-52 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-primary/80 to-accent/60 shadow-xl ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            drag
            dragMomentum={false}
            dragElastic={1}
            style={{ x, y, rotateX, rotateY, touchAction: "none" }}
            whileDrag={{ scale: 1.04 }}
            onDragStart={() => {
              setDragging(true);
              setDismissed(false);
            }}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            aria-hidden={dismissed}
          >
            <span className="text-sm font-semibold text-primary-foreground">Drag me</span>
            <span className="font-mono text-[11px] text-primary-foreground/80">
              {dragging ? `${live.dx}, ${live.dy} px · ${live.v} px/s` : "1:1 tracking"}
            </span>
          </motion.div>
        </div>
        <button type="button" onClick={bringBack} className={pillGhost} style={{ visibility: dismissed ? "visible" : "hidden" }}>
          Bring it back
        </button>
      </div>
    </DemoContainer>
  );
};

/* ─── 4. Layout animation vs teleport ─── */
const DEFAULT_ITEMS = ["Design", "Prototype", "Build", "Ship"];
const EXTRA_WORDS = ["Measure", "Learn", "Iterate", "Refine", "Launch", "Review"];

export const LayoutAnimationDemo = () => {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"animate" | "teleport">("animate");
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [pool, setPool] = useState(EXTRA_WORDS);
  const anim = mode === "animate" && !reduced;

  const insert = () => {
    const [next, ...rest] = pool;
    if (!next) return;
    const at = Math.floor(Math.random() * (items.length + 1));
    setItems([...items.slice(0, at), next, ...items.slice(at)]);
    setPool(rest);
  };
  const remove = (word: string) => {
    setItems(items.filter((i) => i !== word));
    if (EXTRA_WORDS.includes(word)) setPool([word, ...pool]);
  };
  const shuffle = () => setItems([...items].sort(() => Math.random() - 0.5));
  const reset = () => {
    setItems(DEFAULT_ITEMS);
    setPool(EXTRA_WORDS);
  };

  const readout = anim
    ? "Siblings slide into place (FLIP under the hood)"
    : reduced
      ? "Reduced motion is on, so changes are instant by design"
      : "Siblings jump to their new positions in a single frame";

  return (
    <DemoContainer caption="Insert, remove or shuffle — then switch off layout animation and watch the siblings teleport" readout={readout}>
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <Segmented
          label="Layout animation"
          value={mode}
          onChange={(v) => setMode(v)}
          options={[
            { value: "animate", label: "Animate layout" },
            { value: "teleport", label: "Teleport" },
          ]}
        />
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={insert} disabled={pool.length === 0} className={`${pillPrimary} disabled:opacity-40`}>
            + Insert
          </button>
          <button type="button" onClick={shuffle} className={pillGhost}>
            Shuffle
          </button>
          <button type="button" onClick={reset} className={pillGhost}>
            Reset
          </button>
        </div>
        <div className="flex w-full flex-col gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <motion.div
                key={item}
                layout={anim}
                initial={anim ? { opacity: 0, scale: 0.9 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={anim ? { opacity: 0, scale: 0.9, transition: { duration: 0.15 } } : { opacity: 0, transition: { duration: 0 } }}
                transition={anim ? springSnappy : { duration: 0 }}
                className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground">{item}</span>
                <button
                  type="button"
                  onClick={() => remove(item)}
                  className="min-h-8 rounded-full px-2 text-xs text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

/* ─── 5. Progressive resistance: hard stop vs linear vs rubber band ─── */
type Boundary = "hard" | "linear" | "rubber";
const MAX_PULL = 120;
const HARD_LIMIT = 48;
const THRESHOLD = 44;
const HOLD = 52;

/** iOS-style rubber band: the further you pull, the less each pixel moves the content. */
const rubberBand = (d: number, c = MAX_PULL, k = 0.55) => c * (1 - 1 / ((d * k) / c + 1));
const applyBoundary = (mode: Boundary, d: number) => (mode === "hard" ? Math.min(d, HARD_LIMIT) : mode === "linear" ? d * 0.35 : rubberBand(d));

export const ProgressiveResistance = () => {
  const [mode, setMode] = useState<Boundary>("rubber");
  const [pointer, setPointer] = useState(0);
  const [rendered, setRendered] = useState(0);
  const [phase, setPhase] = useState<"idle" | "pulling" | "loading">("idle");
  const y = useMotionValue(0);
  const hintOpacity = useTransform(y, [0, THRESHOLD], [0, 1]);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onPanStart = () => {
    if (phase !== "loading") setPhase("pulling");
  };
  const onPan = (_: unknown, info: PanInfo) => {
    if (phase === "loading") return;
    const d = Math.max(0, info.offset.y);
    const r = applyBoundary(mode, d);
    y.set(r);
    setPointer(Math.round(d));
    setRendered(Math.round(r));
  };
  const onPanEnd = () => {
    if (phase === "loading") return;
    if (y.get() >= THRESHOLD) {
      setPhase("loading");
      animate(y, HOLD, springSnappy);
      timer.current = window.setTimeout(() => {
        animate(y, 0, springSnappy);
        setPhase("idle");
        setPointer(0);
        setRendered(0);
      }, 1400);
    } else {
      setPhase("idle");
      animate(y, 0, { type: "spring", stiffness: 400, damping: 30 });
      setPointer(0);
      setRendered(0);
    }
  };

  const hint = phase === "loading" ? "Refreshing…" : rendered >= THRESHOLD ? "Release to refresh" : "Pull to refresh";
  const readout =
    phase === "pulling"
      ? `finger ${pointer} px → card ${rendered} px`
      : mode === "rubber"
        ? "Rubber band: every extra pixel of pull moves the card a little less"
        : mode === "linear"
          ? "Linear: a flat 35% whatever you do — feels numb"
          : "Hard stop: 1:1, then a wall at 48 px — feels like hitting glass";

  return (
    <DemoContainer caption="Pull the card down and let go — compare how each boundary feels" readout={readout}>
      <div className="flex w-full max-w-xs flex-col items-center gap-5">
        <Segmented
          label="Boundary behaviour"
          value={mode}
          onChange={(v) => setMode(v)}
          options={[
            { value: "hard", label: "Hard stop" },
            { value: "linear", label: "Linear" },
            { value: "rubber", label: "Rubber band" },
          ]}
        />
        <div className="relative flex w-full select-none flex-col items-center pb-16 pt-7">
          <motion.div style={{ opacity: hintOpacity }} className="absolute top-0 font-mono text-[11px] text-primary" aria-hidden>
            {hint}
          </motion.div>
          <motion.div
            className={`flex h-28 w-full select-none items-center justify-center rounded-2xl border border-border bg-card shadow-lg ${
              phase === "pulling" ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ y, touchAction: "pan-x" }}
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
          >
            <span className="font-mono text-xs text-muted-foreground">{phase === "loading" ? "Holding while loading…" : "Drag down ↓"}</span>
          </motion.div>
        </div>
      </div>
    </DemoContainer>
  );
};

/* ─── 6. Staggered cascade vs all at once ─── */
const CARD_COUNT = 9;

export const StaggeredGrid = () => {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"stagger" | "once">("stagger");
  const [gap, setGap] = useState(60);
  const [run, setRun] = useState(0);
  const staggered = mode === "stagger";

  const readout = staggered
    ? `${CARD_COUNT} cards × ${gap} ms → the last one starts after ${(CARD_COUNT - 1) * gap} ms`
    : `${CARD_COUNT} cards start on the same frame — a wall, not a sequence`;

  return (
    <DemoContainer caption="Replay the cascade, then compare it with everything arriving at once" readout={readout}>
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => setRun((k) => k + 1)} className={pillPrimary}>
            Replay
          </button>
          <Segmented
            label="Timing"
            value={mode}
            onChange={(v) => setMode(v)}
            options={[
              { value: "stagger", label: "Staggered" },
              { value: "once", label: "All at once" },
            ]}
          />
        </div>
        <motion.div
          key={run}
          className="grid grid-cols-3 gap-3"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: staggered ? gap / 1000 : 0 } } }}
        >
          {Array.from({ length: CARD_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 font-mono text-sm font-bold text-primary md:h-20 md:w-20"
              variants={{
                hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.85 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: reduced ? { duration: 0.15 } : { type: "spring", stiffness: 340, damping: 22 },
                },
              }}
            >
              {i + 1}
            </motion.div>
          ))}
        </motion.div>
        <div className="w-full max-w-xs">
          <Slider label="stagger" value={gap} min={0} max={150} step={10} onChange={setGap} disabled={!staggered} format={(v) => `${v} ms`} />
        </div>
      </div>
    </DemoContainer>
  );
};

/* ─── 7. Reduced motion: the same state change, two treatments ─── */
export const ReducedMotionDemo = () => {
  const system = useReducedMotion();
  const [mode, setMode] = useState<"full" | "reduced">(system ? "reduced" : "full");
  const [run, setRun] = useState(0);
  const reduced = mode === "reduced";

  useEffect(() => {
    setMode(system ? "reduced" : "full");
  }, [system]);

  return (
    <DemoContainer
      caption="One state change, two treatments — reduced motion swaps movement for a fade"
      readout={`Your system: prefers-reduced-motion ${system ? "reduce" : "no-preference"} · showing ${reduced ? "reduced" : "full"} motion`}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => setRun((k) => k + 1)} className={pillPrimary}>
            Replay
          </button>
          <Segmented
            label="Motion treatment"
            value={mode}
            onChange={(v) => setMode(v)}
            options={[
              { value: "full", label: "Full motion" },
              { value: "reduced", label: "Reduced" },
            ]}
          />
        </div>
        <div className="flex h-24 w-full items-center justify-center overflow-hidden">
          <motion.div
            key={`${run}-${mode}`}
            role="status"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 96, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={reduced ? { duration: 0.18 } : { type: "spring", stiffness: 300, damping: 26 }}
            className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Changes saved</p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">
                {reduced ? "Fades in place — same meaning, no travel" : "Slides in from the right with a spring"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </DemoContainer>
  );
};
