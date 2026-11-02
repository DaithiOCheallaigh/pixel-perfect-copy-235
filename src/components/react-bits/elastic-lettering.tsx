"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type RefObject,
} from "react";
import { cn } from "@/lib/utils";

export type ElasticLetteringTag = "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface ElasticLetteringHandle {
  pluck: (index?: number, strength?: number) => void;
}

export interface ElasticLetteringProps {
  text?: string;
  as?: ElasticLetteringTag;
  fontSize?: number | string;
  fontWeight?: number;
  letterSpacing?: string;
  lineHeight?: number;
  align?: "left" | "center" | "right";
  color?: string;
  tensionColor?: string;
  tensionTint?: number;
  tension?: number;
  stiffness?: number;
  bounce?: number;
  reach?: number;
  squash?: number;
  tilt?: number;
  lift?: number;
  throwable?: boolean;
  pluckOnClick?: boolean;
  pluckStrength?: number;
  hint?: boolean;
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface Settings {
  tensionColor: string;
  tensionTint: number;
  tension: number;
  stiffness: number;
  bounce: number;
  reach: number;
  squash: number;
  tilt: number;
  lift: number;
  throwable: boolean;
  pluckOnClick: boolean;
  pluckStrength: number;
  hint: boolean;
  interactive: boolean;
  reduced: boolean;
}

interface Body {
  el: HTMLElement;
  hx: number;
  hy: number;
  w: number;
  line: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  prev: number;
  next: number;
  prev2: number;
  next2: number;
  held: boolean;
  lift: number;
  stretch: number;
  heading: number;
  tint: number;
}

interface Grab {
  index: number;
  dx: number;
  dy: number;
  tx: number;
  ty: number;
  startX: number;
  startY: number;
  startTime: number;
  travelled: number;
  history: { t: number; x: number; y: number }[];
}

interface Controller {
  measure: () => void;
  sync: () => void;
  destroy: () => void;
  pluck: (index: number | undefined, strength: number) => void;
}

const STEP = 1 / 240;
const HINT = -1;

const subscribeToMotion = (notify: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

const readMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const segment = (value: string) =>
  typeof Intl === "undefined" || typeof Intl.Segmenter === "undefined"
    ? Array.from(value)
    : Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value), (part) => part.segment);

const group = (value: string) => {
  let offset = 0;
  return value
    .split(/(\s+)/)
    .filter(Boolean)
    .map((word) => {
      const glyphs = /^\s+$/.test(word) ? [] : segment(word);
      const item = { word, glyphs, offset, space: glyphs.length === 0 };
      offset += glyphs.length;
      return item;
    });
};

let colorContext: CanvasRenderingContext2D | null = null;

const parseColor = (value: string): [number, number, number] | null => {
  const direct = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (direct) return [Number(direct[1]) / 255, Number(direct[2]) / 255, Number(direct[3]) / 255];
  if (!colorContext) colorContext = document.createElement("canvas").getContext("2d");
  if (!colorContext) return null;
  colorContext.fillStyle = "#010203";
  colorContext.fillStyle = value;
  const read = String(colorContext.fillStyle);
  if (read === "#010203" && value.trim().toLowerCase() !== "#010203") return null;
  if (read.startsWith("#")) {
    const hex = read.slice(1);
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  const parts = read.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;
  return [Number(parts[0]) / 255, Number(parts[1]) / 255, Number(parts[2]) / 255];
};

const toLinear = (value: number) => (value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4));
const toGamma = (value: number) => (value <= 0.0031308 ? value * 12.92 : 1.055 * Math.pow(value, 1 / 2.4) - 0.055);

const toOklab = ([r, g, b]: [number, number, number]): [number, number, number] => {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const fromOklab = ([L, a, b]: [number, number, number]) => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((value) => Math.round(clamp(toGamma(clamp(value, 0, 1)), 0, 1) * 255));
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

const createElastic = (root: HTMLElement, settingsRef: { current: Settings }): Controller => {
  let bodies: Body[] = [];
  let fontPx = 16;
  let base: [number, number, number] | null = null;
  let accent: [number, number, number] | null = null;
  let raf = 0;
  let last = 0;
  let carry = 0;
  let destroyed = false;
  let hinted = false;
  let hintTime = -1;
  let hintTimer = 0;
  const grabs = new Map<number, Grab>();

  const colors = () => {
    const settings = settingsRef.current;
    const own = parseColor(getComputedStyle(root).color);
    base = own ? toOklab(own) : null;
    const tint = parseColor(settings.tensionColor);
    accent = tint ? toOklab(tint) : null;
  };

  const measure = () => {
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-elastic-index]"));
    elements.sort((a, b) => Number(a.dataset.elasticIndex) - Number(b.dataset.elasticIndex));
    fontPx = parseFloat(getComputedStyle(root).fontSize) || 16;
    const rebuilt = elements.length !== bodies.length || elements.some((el, i) => bodies[i]?.el !== el);
    const next: Body[] = elements.map((el, i) => {
      const previous = rebuilt ? undefined : bodies[i];
      return {
        el,
        hx: el.offsetLeft + el.offsetWidth / 2,
        hy: el.offsetTop + el.offsetHeight / 2,
        w: el.offsetWidth,
        line: 0,
        x: previous?.x ?? 0,
        y: previous?.y ?? 0,
        vx: previous?.vx ?? 0,
        vy: previous?.vy ?? 0,
        ax: 0,
        ay: 0,
        prev: -1,
        next: -1,
        prev2: -1,
        next2: -1,
        held: previous?.held ?? false,
        lift: previous?.lift ?? 0,
        stretch: previous?.stretch ?? 1,
        heading: previous?.heading ?? 0,
        tint: previous?.tint ?? 0,
      };
    });
    const sameLine = (a: Body, b: Body) => Math.abs(a.el.offsetTop - b.el.offsetTop) < Math.max(4, a.el.offsetHeight * 0.5);
    for (let i = 0; i < next.length; i++) {
      if (i > 0 && sameLine(next[i], next[i - 1])) {
        next[i].prev = i - 1;
        next[i - 1].next = i;
        next[i].line = next[i - 1].line;
      } else if (i > 0) {
        next[i].line = next[i - 1].line + 1;
      }
    }
    for (let i = 0; i < next.length; i++) {
      const p = next[i].prev;
      const n = next[i].next;
      next[i].prev2 = p >= 0 ? next[p].prev : -1;
      next[i].next2 = n >= 0 ? next[n].next : -1;
    }
    if (rebuilt) {
      grabs.clear();
      bodies.forEach((body) => {
        body.el.style.transform = "";
        body.el.style.color = "";
      });
    }
    bodies = next;
    colors();
  };

  const constants = () => {
    const settings = settingsRef.current;
    const K = 55 * clamp(settings.stiffness, 0.2, 4);
    const follow = 0.12 + 0.76 * clamp(settings.tension, 0, 1);
    const T = K / Math.max(follow + 1 / follow - 2, 0.004);
    const zeta = settings.reduced ? 1 : 1 - 0.92 * clamp(settings.bounce, 0, 1);
    return {
      K,
      T: T * 0.8,
      T2: T * 0.05,
      C: 2 * zeta * Math.sqrt(K),
      Cl: zeta * Math.sqrt(T) * 0.5,
    };
  };

  const band = (x: number, y: number) => {
    const reach = clamp(settingsRef.current.reach, 0.2, 20) * fontPx;
    const distance = Math.hypot(x, y);
    if (distance <= reach) return [x, y] as const;
    const scale = (reach + reach * 0.6 * Math.log1p((distance - reach) / (reach * 0.6))) / distance;
    return [x * scale, y * scale] as const;
  };

  const substep = (h: number) => {
    const { K, T, T2, C, Cl } = constants();
    for (const body of bodies) {
      let ax = -K * body.x - C * body.vx;
      let ay = -K * body.y - C * body.vy;
      for (const j of [body.prev, body.next, body.prev2, body.next2]) {
        if (j < 0) continue;
        const other = bodies[j];
        const near = j === body.prev || j === body.next;
        const strength = near ? T : T2;
        const restX = other.hx - body.hx;
        const restY = other.hy - body.hy;
        const rest = Math.hypot(restX, restY) || 1;
        const ux = restX / rest;
        const uy = restY / rest;
        const dx = other.x - body.x;
        const dy = other.y - body.y;
        const along = dx * ux + dy * uy;
        const pull = along > 0 ? along : along * 0.06;
        const sideX = dx - along * ux;
        const sideY = dy - along * uy;
        ax += strength * (sideX + pull * ux);
        ay += strength * (sideY + pull * uy);
        if (near) {
          ax += Cl * (other.vx - body.vx);
          ay += Cl * (other.vy - body.vy);
        }
      }
      body.ax = ax;
      body.ay = ay;
    }
    const follow = 1 - Math.exp(-h / 0.016);
    for (const body of bodies) {
      if (body.held) continue;
      body.vx += body.ax * h;
      body.vy += body.ay * h;
      body.x += body.vx * h;
      body.y += body.vy * h;
    }
    grabs.forEach((grab) => {
      const body = bodies[grab.index];
      if (!body) return;
      const ox = body.x;
      const oy = body.y;
      body.x += (grab.tx - body.x) * follow;
      body.y += (grab.ty - body.y) * follow;
      body.vx = (body.x - ox) / h;
      body.vy = (body.y - oy) / h;
    });
    separate();
  };

  const separate = () => {
    const capHeight = fontPx * 0.7;
    for (let pass = 0; pass < 4; pass++) {
      let moved = false;
      for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i];
        for (let j = i + 1; j < bodies.length; j++) {
          const b = bodies[j];
          if (b.line !== a.line) break;
          const dy = b.hy + b.y - (a.hy + a.y);
          const overlap = 1 - (dy * dy) / (capHeight * capHeight);
          if (overlap <= 0) continue;
          const order = Math.sign(b.hx - a.hx) || 1;
          const gap = (b.hx + b.x - (a.hx + a.x)) * order;
          const need = Math.max((a.w + b.w) * 0.44, fontPx * 0.2) * Math.sqrt(overlap);
          const depth = need - gap;
          if (depth <= 0.01) continue;
          const wa = a.held ? 0 : 1;
          const wb = b.held ? 0 : 1;
          if (wa + wb === 0) continue;
          a.x -= (order * depth * wa) / (wa + wb);
          b.x += (order * depth * wb) / (wa + wb);
          const closing = (b.vx - a.vx) * order;
          if (closing < 0) {
            if (a.held) b.vx = a.vx;
            else if (b.held) a.vx = b.vx;
            else {
              const mean = (a.vx + b.vx) / 2;
              a.vx = mean;
              b.vx = mean;
            }
          }
          moved = true;
        }
      }
      if (!moved) break;
    }
  };

  const release = (id: number, now: number) => {
    const grab = grabs.get(id);
    if (!grab) return;
    grabs.delete(id);
    const body = bodies[grab.index];
    if (!body) return;
    body.held = false;
    const settings = settingsRef.current;
    if (id !== HINT && grab.travelled < 5 && now - grab.startTime < 350) {
      body.vx = 0;
      body.vy = 0;
      if (settings.pluckOnClick && !settings.reduced) pluckAt(grab.index, settings.pluckStrength);
      return;
    }
    const recent = grab.history.filter((item) => now - item.t < 90);
    if (settings.throwable && !settings.reduced && recent.length >= 2) {
      const first = recent[0];
      const end = recent[recent.length - 1];
      const span = Math.max((end.t - first.t) / 1000, 1 / 120);
      const limit = 18 * fontPx;
      body.vx = clamp((end.x - first.x) / span, -limit, limit);
      body.vy = clamp((end.y - first.y) / span, -limit, limit);
    } else {
      body.vx = 0;
      body.vy = 0;
    }
  };

  const pluckAt = (index: number, strength: number) => {
    const body = bodies[index];
    if (!body) return;
    const kick = 9 * fontPx * clamp(strength, 0, 3);
    body.vy -= kick;
    body.vx += (Math.random() - 0.5) * kick * 0.12;
    wake();
  };

  const render = () => {
    const settings = settingsRef.current;
    const squash = settings.reduced ? 0 : clamp(settings.squash, 0, 1);
    const tilt = settings.reduced ? 0 : clamp(settings.tilt, 0, 1);
    const liftScale = clamp(settings.lift, 0, 1) * 0.12;
    const tintAmount = clamp(settings.tensionTint, 0, 1);
    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      const speed = Math.hypot(body.vx, body.vy) / fontPx;
      const target = 1 + squash * 0.32 * (1 - Math.exp(-speed / 9));
      body.stretch += (target - body.stretch) * 0.3;
      if (speed > 0.6) body.heading = Math.atan2(body.vy, body.vx);
      body.lift += ((body.held ? 1 : 0) - body.lift) * 0.22;
      const p = body.prev >= 0 ? bodies[body.prev] : body;
      const n = body.next >= 0 ? bodies[body.next] : body;
      const restX = n.hx - p.hx;
      const restY = n.hy - p.hy;
      const nowX = n.hx + n.x - (p.hx + p.x);
      const nowY = n.hy + n.y - (p.hy + p.y);
      let angle = 0;
      if (p !== n) {
        const restLength = restX * restX + restY * restY;
        const forward = clamp((restX * nowX + restY * nowY) / Math.max(restLength, 1e-6), 0, 1);
        angle = clamp(Math.atan2(restX * nowY - restY * nowX, restX * nowX + restY * nowY) * tilt * forward, -0.6, 0.6);
      }
      const strain =
        ((body.prev >= 0 ? Math.hypot(p.x - body.x, p.y - body.y) : 0) +
          (body.next >= 0 ? Math.hypot(n.x - body.x, n.y - body.y) : 0)) /
        (2 * fontPx);
      const goal = clamp((strain - 0.04) / 0.7, 0, 1) * tintAmount;
      body.tint += (goal - body.tint) * 0.25;
      const resting =
        Math.abs(body.x) < 0.05 &&
        Math.abs(body.y) < 0.05 &&
        Math.abs(body.stretch - 1) < 0.002 &&
        body.lift < 0.002 &&
        Math.abs(angle) < 0.001;
      if (resting) {
        if (body.el.style.transform) body.el.style.transform = "";
        body.el.style.zIndex = "";
      } else {
        const s = body.stretch;
        const lift = 1 + liftScale * body.lift;
        body.el.style.transform = `translate3d(${body.x.toFixed(2)}px, ${body.y.toFixed(2)}px, 0) rotate(${body.heading.toFixed(4)}rad) scale(${s.toFixed(4)}, ${(1 / s).toFixed(4)}) rotate(${(-body.heading).toFixed(4)}rad) rotate(${angle.toFixed(4)}rad) scale(${lift.toFixed(4)})`;
        body.el.style.zIndex = body.held ? "2" : "1";
      }
      if (base && accent && body.tint > 0.004) {
        const t = body.tint;
        body.el.style.color = fromOklab([
          base[0] + (accent[0] - base[0]) * t,
          base[1] + (accent[1] - base[1]) * t,
          base[2] + (accent[2] - base[2]) * t,
        ]);
      } else if (body.el.style.color) {
        body.el.style.color = "";
      }
    }
  };

  const settled = () =>
    grabs.size === 0 &&
    hintTime < 0 &&
    bodies.every(
      (body) =>
        Math.abs(body.x) < 0.05 &&
        Math.abs(body.y) < 0.05 &&
        Math.abs(body.vx) < 0.5 &&
        Math.abs(body.vy) < 0.5 &&
        body.lift < 0.002 &&
        body.tint < 0.004 &&
        Math.abs(body.stretch - 1) < 0.002,
    );

  const hintStep = (dt: number) => {
    if (hintTime < 0) return;
    hintTime += dt;
    const grab = grabs.get(HINT);
    if (!grab) {
      hintTime = -1;
      return;
    }
    const progress = clamp(hintTime / 0.5, 0, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const [tx, ty] = band(0.25 * fontPx * ease, -1.15 * fontPx * ease);
    grab.tx = tx;
    grab.ty = ty;
    if (hintTime > 0.66) {
      release(HINT, performance.now());
      hintTime = -1;
    }
  };

  const tick = (now: number) => {
    raf = 0;
    if (destroyed) return;
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    hintStep(dt);
    carry += dt;
    let steps = 0;
    while (carry >= STEP && steps < 24) {
      substep(STEP);
      carry -= STEP;
      steps++;
    }
    if (steps === 24) carry = 0;
    render();
    if (!settled()) raf = requestAnimationFrame(tick);
    else {
      bodies.forEach((body) => {
        body.x = 0;
        body.y = 0;
        body.vx = 0;
        body.vy = 0;
        body.el.style.transform = "";
        body.el.style.color = "";
        body.el.style.zIndex = "";
      });
      root.style.cursor = "";
    }
  };

  function wake() {
    if (destroyed || raf) return;
    last = performance.now();
    carry = 0;
    raf = requestAnimationFrame(tick);
  }

  const locate = (event: PointerEvent) => {
    const rect = root.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top] as const;
  };

  const onDown = (event: PointerEvent) => {
    const settings = settingsRef.current;
    if (!settings.interactive || (event.pointerType === "mouse" && event.button !== 0)) return;
    const target = (event.target as Element | null)?.closest?.("[data-elastic-index]") as HTMLElement | null;
    if (!target || !root.contains(target)) return;
    const index = Number(target.dataset.elasticIndex);
    const body = bodies[index];
    if (!body) return;
    event.preventDefault();
    try {
      root.setPointerCapture(event.pointerId);
    } catch {}
    const [px, py] = locate(event);
    grabs.forEach((grab, id) => {
      if (grab.index === index) {
        grabs.delete(id);
        if (id === HINT) hintTime = -1;
      }
    });
    body.held = true;
    const now = performance.now();
    grabs.set(event.pointerId, {
      index,
      dx: px - (body.hx + body.x),
      dy: py - (body.hy + body.y),
      tx: body.x,
      ty: body.y,
      startX: px,
      startY: py,
      startTime: now,
      travelled: 0,
      history: [{ t: now, x: body.x, y: body.y }],
    });
    root.style.cursor = "grabbing";
    wake();
  };

  const onMove = (event: PointerEvent) => {
    const grab = grabs.get(event.pointerId);
    if (!grab) return;
    const body = bodies[grab.index];
    if (!body) return;
    const [px, py] = locate(event);
    const [tx, ty] = band(px - grab.dx - body.hx, py - grab.dy - body.hy);
    grab.tx = tx;
    grab.ty = ty;
    grab.travelled = Math.max(grab.travelled, Math.hypot(px - grab.startX, py - grab.startY));
    const now = performance.now();
    grab.history.push({ t: now, x: tx, y: ty });
    if (grab.history.length > 12) grab.history.shift();
    wake();
  };

  const onUp = (event: PointerEvent) => {
    if (!grabs.has(event.pointerId)) return;
    release(event.pointerId, performance.now());
    try {
      root.releasePointerCapture(event.pointerId);
    } catch {}
    if (grabs.size === 0) root.style.cursor = "";
    wake();
  };

  const startHint = () => {
    const settings = settingsRef.current;
    if (hinted || !settings.hint || settings.reduced || !settings.interactive || bodies.length < 2) return;
    hinted = true;
    const first = bodies.filter((item) => item.line === 0).length;
    const index = Math.min(bodies.length - 1, Math.floor(first * 0.58));
    const body = bodies[index];
    body.held = true;
    const now = performance.now();
    grabs.set(HINT, {
      index,
      dx: 0,
      dy: 0,
      tx: body.x,
      ty: body.y,
      startX: 0,
      startY: 0,
      startTime: now,
      travelled: 99,
      history: [],
    });
    hintTime = 0;
    wake();
  };

  root.addEventListener("pointerdown", onDown);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerup", onUp);
  root.addEventListener("pointercancel", onUp);
  root.addEventListener("lostpointercapture", onUp);
  const resizeObserver = new ResizeObserver(() => measure());
  resizeObserver.observe(root);
  const intersection = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.6)) {
        window.clearTimeout(hintTimer);
        hintTimer = window.setTimeout(startHint, 380);
      }
    },
    { threshold: [0, 0.6, 1] },
  );
  intersection.observe(root);
  if (document.fonts?.ready) document.fonts.ready.then(() => !destroyed && measure()).catch(() => {});
  measure();

  return {
    measure,
    sync: () => {
      colors();
      if (settingsRef.current.hint) {
        const rect = root.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (visible && !hinted) {
          window.clearTimeout(hintTimer);
          hintTimer = window.setTimeout(startHint, 380);
        }
      } else {
        hinted = false;
      }
      if (raf) render();
    },
    destroy: () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(hintTimer);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("lostpointercapture", onUp);
      resizeObserver.disconnect();
      intersection.disconnect();
      root.style.cursor = "";
      bodies.forEach((body) => {
        body.el.style.transform = "";
        body.el.style.color = "";
        body.el.style.zIndex = "";
      });
    },
    pluck: (index: number | undefined, strength: number) => {
      const settings = settingsRef.current;
      if (settings.reduced || bodies.length === 0) return;
      pluckAt(clamp(Math.round(index ?? Math.floor(bodies.length / 2)), 0, bodies.length - 1), strength);
    },
  };
};

const hidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
};

const ElasticLettering = forwardRef<ElasticLetteringHandle, ElasticLetteringProps>(function ElasticLettering(
  {
    text = "Built to bounce back",
    as = "span",
    fontSize = "clamp(2.75rem, 8vw, 6.5rem)",
    fontWeight = 700,
    letterSpacing = "-0.035em",
    lineHeight = 1.05,
    align = "center",
    color,
    tensionColor = "#B15CFF",
    tensionTint = 0.8,
    tension = 0.6,
    stiffness = 1,
    bounce = 0.62,
    reach = 4,
    squash = 0.5,
    tilt = 0.5,
    lift = 0.5,
    throwable = true,
    pluckOnClick = true,
    pluckStrength = 1,
    hint = false,
    interactive = true,
    className,
    style,
  },
  ref,
) {
  const Tag = as as "span";
  const rootRef = useRef<HTMLElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const reduced = useSyncExternalStore(subscribeToMotion, readMotion, () => false);
  const groups = useMemo(() => group(text), [text]);
  const settingsRef = useRef<Settings>({
    tensionColor,
    tensionTint,
    tension,
    stiffness,
    bounce,
    reach,
    squash,
    tilt,
    lift,
    throwable,
    pluckOnClick,
    pluckStrength,
    hint,
    interactive,
    reduced,
  });

  useEffect(() => {
    settingsRef.current = {
      tensionColor,
      tensionTint,
      tension,
      stiffness,
      bounce,
      reach,
      squash,
      tilt,
      lift,
      throwable,
      pluckOnClick,
      pluckStrength,
      hint,
      interactive,
      reduced,
    };
    controllerRef.current?.sync();
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const controller = createElastic(root, settingsRef);
    controllerRef.current = controller;
    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    controllerRef.current?.measure();
  }, [groups, fontSize, fontWeight, letterSpacing, lineHeight, align]);

  useImperativeHandle(
    ref,
    () => ({
      pluck: (index?: number, strength = 1) => controllerRef.current?.pluck(index, strength),
    }),
    [],
  );

  return (
    <Tag
      ref={rootRef as RefObject<HTMLSpanElement>}
      className={cn("relative inline-block max-w-full", className)}
      style={{
        fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        textAlign: align,
        color,
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        userSelect: "none",
        WebkitUserSelect: "none",
        ...style,
      }}
    >
      <span style={hidden}>{text}</span>
      <span aria-hidden="true">
        {groups.map((item, groupIndex) =>
          item.space ? (
            <span key={groupIndex}>{item.word}</span>
          ) : (
            <span key={groupIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {item.glyphs.map((glyph, i) => (
                <span
                  key={i}
                  data-elastic-index={item.offset + i}
                  style={{
                    display: "inline-block",
                    position: "relative",
                    whiteSpace: "pre",
                    touchAction: interactive ? "none" : undefined,
                    cursor: interactive ? "grab" : undefined,
                  }}
                >
                  {glyph}
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </Tag>
  );
});

ElasticLettering.displayName = "ElasticLettering";

export { ElasticLettering };
export default ElasticLettering;
