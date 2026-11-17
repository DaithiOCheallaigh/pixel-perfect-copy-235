import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { ChevronDown, Play, RefreshCw, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";

/*
 * Interactive demos for "8 Principles for Crafting Fluid Interfaces".
 * Each one animates a real piece of this site (the blog audio bar, the shadcn accordion, the
 * /work and /blog cards) and keeps its controls in the footer strip beside the caption, built
 * from the site's own Button, Switch and ToggleGroup. Demo chrome uses div/span rather than
 * p/h3/ul because the post's .blog-content rules restyle those elements.
 * src/data/blogPosts.tsx imports this file, so the post list below is a small local copy.
 */

/* ─── Shared ─── */
const SHINE = ["#A07CFE", "#FE8FB5", "#FFBE7B"];
const spring = { type: "spring", stiffness: 320, damping: 28 } as const;
const bouncy = { type: "spring", stiffness: 260, damping: 18 } as const;

type Post = { id: string; title: string; date: string; readTime: string; image: string; excerpt?: string };
const POSTS: Post[] = [
  {
    id: "8-principles-fluid-interfaces",
    title: "8 Principles for Crafting Fluid Interfaces",
    date: "March 20, 2026",
    readTime: "13 min read",
    image: "/images/blog/fluid-interfaces.jpg",
    excerpt:
      "There's a quality that separates the interfaces we tolerate from the ones we love. It's not colour palettes or type scales. The quality is fluidity — the feeling that an interface has physical weight.",
  },
  { id: "2026-new-norm-designers", title: "2026: The New Norm For Designers", date: "March 3, 2026", readTime: "12 min read", image: "/images/blog/2026-new-norm-designers.webp" },
  { id: "navigating-design-2025", title: "Navigating Design in 2025: Challenges and Opportunities in a Transformed Industry", date: "October 22, 2025", readTime: "5 min read", image: "/images/blog/navigating-design-2025.webp" },
  { id: "strategic-ux", title: 'Why Strategic UX Design Matters More Than Making Things "Look Good"', date: "October 22, 2025", readTime: "7 min read", image: "/images/blog/strategic-ux.webp" },
  { id: "design-trends-2025", title: "Design Trends to Watch in 2025: Shaping the Future of Digital Aesthetics", date: "November 21, 2024", readTime: "8 min read", image: "/images/blog/design-trends-2025.webp" },
  { id: "partner-for-agencies", title: "Why Lacuna Digital is the Perfect Partner for Agencies", date: "November 21, 2024", readTime: "6 min read", image: "/images/blog/partner-for-agencies.webp" },
  { id: "benefits-digital-agency", title: "The Benefits of Using A Digital Agency", date: "November 19, 2024", readTime: "6 min read", image: "/images/blog/benefits-digital-agency.webp" },
];

const WORK = ["spark", "marsh-internal-tooling", "marsh-design-system", "digital-tipping"]
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

const Demo = ({ children, caption, controls, stage }: { children: ReactNode; caption: string; controls?: ReactNode; stage?: string }) => (
  <div className="my-12 overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
    <div className={cn("flex min-h-[240px] items-center justify-center p-5 sm:p-8", stage)}>{children}</div>
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-border bg-muted/30 px-5 py-4 sm:px-6">
      <div className="min-w-[14rem] flex-1 text-sm leading-relaxed text-muted-foreground">{caption}</div>
      {controls ? <div className="flex flex-wrap items-center gap-3">{controls}</div> : null}
    </div>
  </div>
);

const SwitchField = ({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) => {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label htmlFor={id} className="cursor-pointer select-none text-sm font-medium text-foreground">
        {label}
      </label>
    </div>
  );
};

const Label = ({ children }: { children: ReactNode }) => <div className="font-mono-label mb-2 text-muted-foreground">{children}</div>;

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

/** True once the element has been scrolled into view (immediately where IntersectionObserver is missing). */
const useInViewOnce = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
};

/* ─── Real site pieces, as they render on /work and /blog ─── */
const WorkCard = ({ project, compact = false }: { project: Project; compact?: boolean }) => (
  <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
    <ShineBorder shineColor={SHINE} />
    <div className={cn("overflow-hidden rounded-t-lg bg-card", compact ? "aspect-video" : "aspect-[4/3]")}>
      <img src={project.pillImage} alt="" draggable={false} className="no-lightbox h-full w-full object-cover scale-[1.06]" loading="lazy" decoding="async" />
    </div>
    <div className={cn("flex flex-1 flex-col", compact ? "p-3" : "p-5")}>
      <div className={cn("font-bold leading-[1.1] tracking-[-0.03em] text-foreground", compact ? "text-sm" : "text-lg")}>{project.title}</div>
      {compact ? null : <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.workDescription || project.subtitle}</div>}
      <div className={cn("flex flex-wrap gap-2", compact ? "mt-2" : "mt-4")}>
        {project.tags.slice(0, compact ? 1 : 2).map((tag) => (
          <span key={tag} className="font-mono-label text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const BlogCard = ({ post }: { post: Post }) => (
  <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card">
    <ShineBorder shineColor={SHINE} />
    <div className="overflow-hidden">
      <img src={post.image} alt="" draggable={false} className="no-lightbox aspect-video w-full object-cover" loading="lazy" decoding="async" />
    </div>
    <div className="flex flex-1 flex-col p-6">
      <span className="font-mono-label mb-2 text-muted-foreground">
        {post.date} · {post.readTime}
      </span>
      <div className="mb-2 text-lg font-bold leading-[1.1] tracking-[-0.03em] text-foreground">{post.title}</div>
      <div className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</div>
    </div>
  </div>
);

const PostRow = ({ post, onRemove }: { post: Post; onRemove?: () => void }) => (
  <div role="listitem" className="flex items-center gap-3 rounded-xl border border-border bg-card p-2">
    <img src={post.image} alt="" draggable={false} className="no-lightbox h-10 w-16 shrink-0 rounded-md object-cover" loading="lazy" decoding="async" />
    <div className="min-w-0 flex-1">
      <div className="truncate text-sm font-semibold text-foreground">{post.title}</div>
      <div className="font-mono-label truncate text-muted-foreground">
        {post.date} · {post.readTime}
      </div>
    </div>
    {onRemove ? (
      <button
        type="button"
        aria-label={`Remove ${post.title}`}
        onClick={onRemove}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    ) : null}
  </div>
);

/* ─── 1. Physics vs time: the blog's sticky audio bar entering ─── */
const BAR = "absolute inset-x-0 bottom-0 border-t border-border/50 bg-background/80 shadow-lg backdrop-blur-md";

const AudioBarInner = () => (
  <div className="flex items-center gap-3 px-4 py-2">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />
    </span>
    <div className="min-w-0 flex-1">
      <div className="truncate text-sm font-semibold text-foreground">8 Principles for Crafting Fluid Interfaces</div>
      <div className="truncate font-mono text-xs text-muted-foreground">AI narration · 13 min</div>
    </div>
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground">
      <X className="h-5 w-5" aria-hidden="true" />
    </span>
  </div>
);

const Viewport = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="relative h-44 overflow-hidden rounded-xl border border-border bg-background">
    <div className="space-y-3 p-4">
      <Label>{label}</Label>
      <div className="h-2 w-3/4 rounded-full bg-muted" />
      <div className="h-2 w-1/2 rounded-full bg-muted" />
      <div className="h-2 w-2/3 rounded-full bg-muted" />
    </div>
    {children}
  </div>
);

export const SpringVsEasing = () => {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  return (
    <Demo
      caption="The page's own audio bar entering: once on the 300 ms CSS ease it ships with, once on a spring. The spring version arrives with weight and settles; the eased one just stops."
      controls={
        <Button size="sm" onClick={() => setVisible((v) => !v)}>
          {visible ? "Hide bar" : "Show bar"}
        </Button>
      }
    >
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <Viewport label="CSS · 300 ms ease">
          <div aria-hidden="true" className={cn(BAR, "transition-transform duration-300", visible ? "translate-y-0" : "translate-y-full")}>
            <AudioBarInner />
          </div>
        </Viewport>
        <Viewport label="Spring">
          <motion.div aria-hidden="true" className={BAR} initial={false} animate={{ y: visible ? "0%" : "100%" }} transition={reduced ? { duration: 0.2 } : bouncy}>
            <AudioBarInner />
          </motion.div>
        </Viewport>
      </div>
    </Demo>
  );
};

/* ─── 2. Interruptible: the shipped accordion vs a spring one ─── */
const QUESTION = "What makes an interface feel fluid?";
const ANSWER = "Motion that answers input instantly, can be interrupted at any moment, and settles with weight instead of running out a fixed timer.";
const TRIGGER = "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline";

export const InterruptibleDemo = () => {
  const [shippedOpen, setShippedOpen] = useState(false);
  const [springOpen, setSpringOpen] = useState(false);
  const toggleBoth = () => {
    setShippedOpen((v) => !v);
    setSpringOpen((v) => !v);
  };
  return (
    <Demo
      caption="Press Toggle both twice, quickly. The shipped accordion plays a fixed 200 ms keyframe that cannot turn around, so it jumps to the end and starts over. The spring version reverses from wherever it is."
      controls={
        <Button size="sm" onClick={toggleBoth}>
          Toggle both
        </Button>
      }
      stage="items-start"
    >
      <div className="grid w-full gap-6 text-left sm:grid-cols-2">
        {/* The accordion header is an h3; the !important overrides stop .blog-content h3 restyling it */}
        <div className="[&_h3]:!m-0 [&_h3]:!text-sm">
          <Label>Shipped accordion · CSS keyframe</Label>
          <Accordion type="single" collapsible value={shippedOpen ? "q" : ""} onValueChange={(v) => setShippedOpen(v === "q")}>
            <AccordionItem value="q">
              <AccordionTrigger className="text-left text-sm">{QUESTION}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{ANSWER}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Label>Spring · interruptible</Label>
          <div className="border-b">
            <div className="flex">
              <button type="button" aria-expanded={springOpen} onClick={() => setSpringOpen((v) => !v)} className={cn(TRIGGER, "text-left text-sm")}>
                {QUESTION}
                <motion.span className="flex shrink-0" animate={{ rotate: springOpen ? 180 : 0 }} transition={spring}>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              </button>
            </div>
            <motion.div initial={false} animate={{ height: springOpen ? "auto" : 0, opacity: springOpen ? 1 : 0 }} transition={spring} className="overflow-hidden text-sm">
              <div className="pb-4 text-muted-foreground">{ANSWER}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </Demo>
  );
};

/* ─── 3. Direct manipulation: a /work card you can throw ─── */
export const DraggableCard = () => {
  const project = WORK.find((p) => p.id === "digital-tipping") ?? WORK[0] ?? projects[0];
  const [stageRef, stageWidth] = useWidth();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-10, 10]);
  const [gone, setGone] = useState(false);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const limit = Math.max(120, stageWidth * 0.3);
    const flick = Math.abs(info.velocity.x) > 500 || Math.abs(info.offset.x) > limit;
    if (!flick) {
      animate(x, 0, spring);
      animate(y, 0, spring);
      return;
    }
    const dir = Math.sign(info.velocity.x || info.offset.x) || 1;
    setGone(true);
    animate(x, dir * (stageWidth / 2 + 320), { type: "spring", stiffness: 180, damping: 30, velocity: info.velocity.x });
    animate(y, 0, spring);
  };

  // Starting a new animation on x also cancels a flick that is still in flight.
  const bringBack = () => {
    setGone(false);
    animate(x, 0, bouncy);
    animate(y, 0, spring);
  };

  return (
    <Demo
      caption="Drag the card: it tracks your finger one to one. Flick it and it leaves at your speed; let go gently and it springs home."
      controls={
        <Button size="sm" variant="outline" disabled={!gone} onClick={bringBack}>
          Bring it back
        </Button>
      }
    >
      <div ref={stageRef} className="flex w-full justify-center">
        <motion.div
          drag
          dragMomentum={false}
          onDragEnd={onDragEnd}
          whileDrag={{ scale: 1.03 }}
          style={{ x, y, rotate }}
          aria-hidden={gone}
          className={cn("w-56 cursor-grab touch-none select-none active:cursor-grabbing sm:w-64", gone && "pointer-events-none")}
        >
          <WorkCard project={project} />
        </motion.div>
      </div>
    </Demo>
  );
};

/* ─── 4. Layout changes: the blog list reflowing ─── */
const INITIAL_ROWS = POSTS.slice(0, 4).map((p) => p.id);

export const LayoutAnimationDemo = () => {
  const [animated, setAnimated] = useState(true);
  const [shown, setShown] = useState<string[]>(INITIAL_ROWS);
  const reduced = useReducedMotion();
  const live = animated && !reduced;
  const removed = POSTS.filter((p) => !shown.includes(p.id));
  const rows = shown.map((id) => POSTS.find((p) => p.id === id)).filter((p): p is Post => Boolean(p));
  const transition = live ? spring : { duration: 0 };

  const add = () => {
    const next = removed[0];
    if (!next) return;
    setShown((s) => (s.length ? [s[0], next.id, ...s.slice(1)] : [next.id]));
  };

  return (
    <Demo
      caption="Remove a post and the rest slide to close the gap. Turn Animate layout off and they teleport, which is what layout changes do by default."
      controls={
        <>
          <SwitchField label="Animate layout" checked={animated} onCheckedChange={setAnimated} />
          <Button size="sm" variant="outline" disabled={!removed.length} onClick={add}>
            Add
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShown(INITIAL_ROWS)}>
            Reset
          </Button>
        </>
      }
      stage="items-start"
    >
      <div role="list" aria-label="Blog posts" className="flex w-full max-w-md flex-col gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {rows.map((post) => (
            <motion.div key={post.id} layout={live} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={transition}>
              <PostRow post={post} onRemove={() => setShown((s) => s.filter((id) => id !== post.id))} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Demo>
  );
};

/* ─── 5. Progressive resistance: pull-to-refresh on the blog list ─── */
type Boundary = "hard" | "rubber";
const MAX_PULL = 120;
const HARD_LIMIT = 48;
const THRESHOLD = 44;
const HOLD = 52;
const rubberBand = (d: number, c = MAX_PULL, k = 0.55) => c * (1 - 1 / ((d * k) / c + 1));

export const ProgressiveResistance = () => {
  const [mode, setMode] = useState<Boundary>("rubber");
  const [phase, setPhase] = useState<"idle" | "armed" | "loading">("idle");
  const y = useMotionValue(0);
  const hintOpacity = useTransform(y, [0, THRESHOLD], [0, 1]);
  const hintRotate = useTransform(y, [0, THRESHOLD], [0, 180]);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const onPan = (_: unknown, info: PanInfo) => {
    if (phase === "loading") return;
    const d = Math.max(0, info.offset.y);
    const pulled = mode === "hard" ? Math.min(d, HARD_LIMIT) : rubberBand(d);
    y.set(pulled);
    setPhase(pulled >= THRESHOLD ? "armed" : "idle");
  };
  const onPanEnd = () => {
    if (phase === "loading") return;
    if (y.get() >= THRESHOLD) {
      setPhase("loading");
      animate(y, HOLD, spring);
      timer.current = setTimeout(() => {
        setPhase("idle");
        animate(y, 0, spring);
      }, 1000);
      return;
    }
    setPhase("idle");
    animate(y, 0, spring);
  };
  const hint = phase === "loading" ? "Refreshing…" : phase === "armed" ? "Release to refresh" : "Pull to refresh";

  return (
    <Demo
      caption="Pull the list down. A hard stop ends dead at the edge; a rubber band gives less for every extra pixel, so you feel the limit before you reach it."
      controls={
        <ToggleGroup type="single" size="sm" variant="outline" aria-label="Boundary behaviour" value={mode} onValueChange={(v) => v && setMode(v as Boundary)}>
          <ToggleGroupItem value="hard">Hard stop</ToggleGroupItem>
          <ToggleGroupItem value="rubber">Rubber band</ToggleGroupItem>
        </ToggleGroup>
      }
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-background">
        <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 top-0 flex h-12 items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
          {phase === "loading" ? (
            <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <motion.span style={{ rotate: hintRotate }} className="flex">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          )}
          {hint}
        </motion.div>
        <motion.div
          role="list"
          aria-label="Blog posts"
          style={{ y }}
          onPan={onPan}
          onPanEnd={onPanEnd}
          className="relative flex cursor-grab touch-none select-none flex-col gap-2 bg-background p-2 active:cursor-grabbing"
        >
          {POSTS.slice(0, 3).map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </Demo>
  );
};

/* ─── 6. Choreography: /work cards arriving in order ─── */
export const StaggeredGrid = () => {
  const [stagger, setStagger] = useState(true);
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  const [gridRef, seen] = useInViewOnce();
  return (
    <Demo
      caption="Four work cards entering together. With Stagger on, each follows the last by 80 ms, so the eye reads an order instead of a flash."
      controls={
        <>
          <SwitchField label="Stagger" checked={stagger} onCheckedChange={setStagger} />
          <Button size="sm" onClick={() => setRun((r) => r + 1)}>
            Replay
          </Button>
        </>
      }
    >
      <div key={run} ref={gridRef} className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {WORK.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }}
            transition={{ ...spring, delay: stagger ? i * 0.08 : 0 }}
          >
            <WorkCard project={project} compact />
          </motion.div>
        ))}
      </div>
    </Demo>
  );
};

/* ─── 7. Motion preferences: a /blog card entering, slide vs fade ─── */
export const ReducedMotionDemo = () => {
  const system = useReducedMotion();
  const [reduced, setReduced] = useState(Boolean(system));
  const [run, setRun] = useState(0);
  useEffect(() => setReduced(Boolean(system)), [system]);
  const [cardRef, seen] = useInViewOnce();
  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.96 };
  return (
    <Demo
      caption="The card's entrance. With Reduced motion on, the slide and scale become a plain fade: the content still arrives, without the travel. The switch starts on your system setting."
      controls={
        <>
          <SwitchField label="Reduced motion" checked={reduced} onCheckedChange={setReduced} />
          <Button size="sm" onClick={() => setRun((r) => r + 1)}>
            Replay
          </Button>
        </>
      }
    >
      <div ref={cardRef} className="w-full max-w-xs">
        <motion.div
          key={`${run}-${reduced}`}
          initial={hidden}
          animate={seen ? { opacity: 1, y: 0, scale: 1 } : hidden}
          transition={reduced ? { duration: 0.3, ease: "easeOut" } : bouncy}
        >
          <BlogCard post={POSTS[0]} />
        </motion.div>
      </div>
    </Demo>
  );
};
