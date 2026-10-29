import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ElementType } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Sweep = "left" | "right" | "center" | "top" | "scatter";
type Phase = "condense" | "hold" | "dissolve";

export type VaporTypeProps = {
  /** Words or short phrases; each condenses in place of the last. */
  words: string[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Colour particles fade to. Accepts var() e.g. "hsl(var(--primary))", or a light/dark pair. */
  vaporColor?: string | { light: string; dark: string };
  density?: number;
  particleSize?: number;
  spread?: number;
  rise?: number;
  turbulence?: number;
  diffusion?: number;
  grain?: number;
  sweep?: Sweep;
  stagger?: number;
  /** seconds */
  condense?: number;
  hold?: number;
  dissolve?: number;
  loop?: boolean;
  interactive?: boolean;
  breath?: number;
  breathRadius?: number;
  /** seconds blown letters take to settle */
  recovery?: number;
};

const MAX_CELLS = 90000;
const BASE_PARTICLES = 14000;
const BURST_CAP = 16000;
const LAND = 0.5;
const SPRITES = 8;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const hash = (x: number, y: number) => {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const smooth = (t: number) => t * t * (3 - 2 * t);
const vnoise = (x: number, y: number) => {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = smooth(x - xi), fy = smooth(y - yi);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
};

const VaporType = ({
  words,
  as: Tag = "span",
  className,
  style,
  vaporColor = "hsl(var(--primary))",
  density = 1,
  particleSize = 1.2,
  spread = 1.2,
  rise = 1,
  turbulence = 0.8,
  diffusion = 0.35,
  grain = 1,
  sweep = "left",
  stagger = 0.8,
  condense = 1.8,
  hold = 2.4,
  dissolve = 2,
  loop = true,
  interactive = true,
  breath = 1,
  breathRadius = 0.8,
  recovery = 1.2,
}: VaporTypeProps) => {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wordsKey = words.join("\u0000");
  const colorKey = typeof vaporColor === "string" ? vaporColor : `${vaporColor.light}|${vaporColor.dark}`;

  // Hide the DOM text (it stays in the DOM for SEO, selection and screen readers) before first paint.
  useLayoutEffect(() => {
    if (reduce) return;
    const spans = phraseRefs.current.filter(Boolean) as HTMLSpanElement[];
    spans.forEach((s) => {
      s.style.color = "transparent";
    });
    return () => spans.forEach((s) => {
      s.style.color = "";
    });
  }, [reduce, wordsKey]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (reduce || !root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d")!;
    const src = document.createElement("canvas");
    const sctx = src.getContext("2d", { willReadFrequently: true })!;
    const probe = document.createElement("canvas");
    probe.width = probe.height = 1;
    const pctx = probe.getContext("2d", { willReadFrequently: true })!;

    const wind = sweep === "right" ? -1 : 1;
    const baseAng = wind === 1 ? -0.5 : Math.PI + 0.5;
    const recoverMs = recovery * 1000;

    let raf = 0;
    let disposed = false;
    let ready = false;
    let started = false;
    let visible = true;
    let pausedAt = 0;
    let dirty = true;

    let W = 0, H = 0, M = 0, dpr = 1, fs = 16, cw = 0, ch = 0, stepD = 2;
    let cells = 0;
    let np = 0;
    let wordIndex = 0;
    let phase: Phase = "condense";
    let phaseStart = 0;
    let blownCount = 0;
    let burstAlive = false;
    let builtW = 0, builtH = 0;
    let sprites: HTMLCanvasElement[] = [];

    // per cell (the erasable grains of the lettering)
    let cellX = new Int32Array(0), cellY = new Int32Array(0);
    let cx = new Float32Array(0), cy = new Float32Array(0), off = new Float32Array(0);
    let inLayer = new Uint8Array(0);
    let blownAt = new Float32Array(0), blownDur = new Float32Array(0);
    // per base particle (a subset of cells emit vapour)
    let pc = new Int32Array(0);
    let ppx = new Float32Array(0), ppy = new Float32Array(0), psp = new Float32Array(0);
    let prn = new Float32Array(0), pph = new Float32Array(0), plf = new Float32Array(0), psz = new Float32Array(0);
    // pointer burst pool
    const bx = new Float32Array(BURST_CAP), by = new Float32Array(BURST_CAP);
    const bt0 = new Float32Array(BURST_CAP), blife = new Float32Array(BURST_CAP);
    const bkx = new Float32Array(BURST_CAP), bky = new Float32Array(BURST_CAP);
    const bsp = new Float32Array(BURST_CAP), bph = new Float32Array(BURST_CAP);
    const brn = new Float32Array(BURST_CAP), bsz = new Float32Array(BURST_CAP);
    let bHead = 0, bCount = 0;

    const toRgb = (css: string): [number, number, number] => {
      pctx.clearRect(0, 0, 1, 1);
      pctx.fillStyle = "#000";
      pctx.fillStyle = css;
      pctx.fillRect(0, 0, 1, 1);
      const d = pctx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    };
    const resolveVars = (v: string) =>
      v.replace(/var\((--[\w-]+)\)/g, (_, n: string) => getComputedStyle(root).getPropertyValue(n).trim());

    const drawPhrase = (cs: CSSStyleDeclaration) => {
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      sctx.clearRect(0, 0, cw, ch);
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const node = phraseRefs.current[wordIndex]?.firstChild;
      if (!node || node.nodeType !== 3) return;
      sctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      (sctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
      sctx.fillStyle = cs.color;
      sctx.textBaseline = "alphabetic";
      const asc = sctx.measureText("Hg").fontBoundingBoxAscent ?? fs * 0.9;
      const text = node.textContent ?? "";
      const rr = root.getBoundingClientRect();
      const range = document.createRange();
      const re = /\S+/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text))) {
        range.setStart(node, m.index);
        range.setEnd(node, m.index + m[0].length);
        const b = range.getBoundingClientRect();
        sctx.fillText(m[0], b.left - rr.left + M, b.top - rr.top + M + asc);
      }
    };

    const sample = () => {
      const data = sctx.getImageData(0, 0, cw, ch).data;
      let cnt = 0;
      for (let p = 3; p < data.length; p += 4) if (data[p] > 40) cnt++;
      stepD = Math.max(dpr >= 2 ? 2 : 1, Math.ceil(Math.sqrt(cnt / MAX_CELLS)));
      const list: number[] = [];
      for (let y = 0; y < ch; y += stepD) {
        const ye = Math.min(ch, y + stepD);
        for (let x = 0; x < cw; x += stepD) {
          const xe = Math.min(cw, x + stepD);
          let sum = 0;
          for (let yy = y; yy < ye; yy++) {
            let idx = (yy * cw + x) * 4 + 3;
            for (let xx = x; xx < xe; xx++, idx += 4) sum += data[idx];
          }
          if (sum > 0) list.push(x, y);
        }
      }
      cells = list.length / 2;
      cellX = new Int32Array(cells); cellY = new Int32Array(cells);
      cx = new Float32Array(cells); cy = new Float32Array(cells); off = new Float32Array(cells);
      inLayer = new Uint8Array(cells);
      blownAt = new Float32Array(cells).fill(-1);
      blownDur = new Float32Array(cells);
      np = 0;
      if (!cells) return;

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let c = 0; c < cells; c++) {
        const x = (list[2 * c] + stepD / 2) / dpr;
        const y = (list[2 * c + 1] + stepD / 2) / dpr;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
      const rx = Math.max(1, maxX - minX), ry = Math.max(1, maxY - minY);
      const mx = (minX + maxX) / 2, my = (minY + maxY) / 2;
      const maxR = Math.max(1, Math.hypot(rx / 2, ry / 2));
      const patch = Math.max(3, fs * 0.18 * Math.max(grain, 0.25));

      const prob = Math.min(1, (BASE_PARTICLES * density) / cells);
      const pcList: number[] = [];
      for (let c = 0; c < cells; c++) {
        const x = list[2 * c], y = list[2 * c + 1];
        cellX[c] = x; cellY[c] = y;
        const ccx = (x + stepD / 2) / dpr, ccy = (y + stepD / 2) / dpr;
        cx[c] = ccx; cy[c] = ccy;
        let base: number;
        if (sweep === "right") base = 1 - (ccx - minX) / rx;
        else if (sweep === "top") base = (ccy - minY) / ry;
        else if (sweep === "center") base = Math.hypot(ccx - mx, ccy - my) / maxR;
        else if (sweep === "scatter") base = vnoise(ccx / (patch * 2), ccy / (patch * 2) + 97);
        else base = (ccx - minX) / rx;
        const noise = 0.65 * vnoise(ccx / patch, ccy / patch) + 0.35 * vnoise(ccx / (patch * 0.35) + 31, ccy / (patch * 0.35) + 17);
        off[c] = clamp01(base + (noise - 0.5) * 0.5 * grain) * stagger * 0.5;
        if (hash(c, 3) < prob) pcList.push(c);
      }

      np = pcList.length;
      pc = Int32Array.from(pcList);
      ppx = new Float32Array(np); ppy = new Float32Array(np); psp = new Float32Array(np);
      prn = new Float32Array(np); pph = new Float32Array(np); plf = new Float32Array(np); psz = new Float32Array(np);
      const cellCss = stepD / dpr;
      for (let i = 0; i < np; i++) {
        const c = pc[i];
        ppx[i] = cx[c] + (hash(i, 5) - 0.5) * cellCss * 1.5;
        ppy[i] = cy[c] + (hash(i, 9) - 0.5) * cellCss * 1.5;
        prn[i] = hash(i, 13);
        psp[i] = hash(i, 29);
        pph[i] = hash(i, 47) * 6.2832;
        plf[i] = 0.4 + 0.2 * hash(i, 71);
        const r = hash(i, 83);
        psz[i] = 0.6 + 2.0 * r * r * r;
      }
    };

    const paintCell = (c: number) => {
      lctx.drawImage(src, cellX[c], cellY[c], stepD, stepD, cellX[c], cellY[c], stepD, stepD);
      inLayer[c] = 1;
    };

    const paintAll = () => {
      lctx.setTransform(1, 0, 0, 1, 0, 0);
      lctx.clearRect(0, 0, cw, ch);
      lctx.drawImage(src, 0, 0);
      inLayer.fill(1);
      blownAt.fill(-1);
      blownCount = 0;
    };

    const enter = (p: Phase, now: number) => {
      phase = p;
      phaseStart = now;
      dirty = true;
      if (p === "condense") {
        lctx.setTransform(1, 0, 0, 1, 0, 0);
        lctx.clearRect(0, 0, cw, ch);
        inLayer.fill(0);
        blownAt.fill(-1);
        blownCount = 0;
        bCount = 0;
        bHead = 0;
      } else {
        paintAll();
      }
    };

    const loadPhrase = () => {
      drawPhrase(getComputedStyle(root));
      sample();
    };

    const build = () => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      W = rect.width; H = rect.height;
      builtW = W; builtH = H;
      const cs = getComputedStyle(root);
      fs = parseFloat(cs.fontSize) || 16;
      M = Math.ceil(fs * spread * 1.1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = Math.ceil((W + 2 * M) * dpr);
      ch = Math.ceil((H + 2 * M) * dpr);
      for (const c of [canvas, layer, src]) { c.width = cw; c.height = ch; }
      canvas.style.cssText = `position:absolute;left:${-M}px;top:${-M}px;width:${cw / dpr}px;height:${ch / dpr}px;pointer-events:none;`;

      const dark = document.documentElement.classList.contains("dark");
      const vc = typeof vaporColor === "string" ? vaporColor : dark ? vaporColor.dark : vaporColor.light;
      const letterRGB = toRgb(cs.color);
      const vaporRGB = toRgb(resolveVars(vc));
      sprites = [];
      for (let s = 0; s < SPRITES; s++) {
        const m = s / (SPRITES - 1);
        const r = Math.round(letterRGB[0] + (vaporRGB[0] - letterRGB[0]) * m);
        const g = Math.round(letterRGB[1] + (vaporRGB[1] - letterRGB[1]) * m);
        const b = Math.round(letterRGB[2] + (vaporRGB[2] - letterRGB[2]) * m);
        const sc = document.createElement("canvas");
        sc.width = sc.height = 32;
        const sg = sc.getContext("2d")!;
        const grad = sg.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},0.7)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        sg.fillStyle = grad;
        sg.fillRect(0, 0, 32, 32);
        sprites.push(sc);
      }
      loadPhrase();
      return true;
    };

    // One soft vapour particle at flight progress f (0 = at home, 1 = fully drifted away and faded).
    const drawParticle = (x0: number, y0: number, f: number, spv: number, phv: number, rnv: number, szv: number, kx: number, ky: number) => {
      const al = Math.pow(1 - f, 1.15) * 0.92;
      if (al < 0.04) return;
      const e = 1 - (1 - f) * (1 - f) * (1 - f);
      const d = spread * fs * e * (0.45 + 0.9 * spv);
      const n = Math.sin(x0 * 0.013 + phv * 0.35) * Math.cos(y0 * 0.017 - f * 2.2);
      const ang = baseAng + n * turbulence * 1.1 + (rnv - 0.5) * diffusion * 2.4;
      const x = x0 + Math.cos(ang) * d + kx * e;
      const y = y0 + Math.sin(ang) * d - rise * fs * 0.5 * e * (0.4 + spv) + ky * e;
      const s = particleSize * 2.2 * szv * (0.55 + 0.45 * Math.min(1, f * 3));
      const ci = Math.min(SPRITES - 1, (Math.min(1, f * 2.4) * SPRITES) | 0);
      ctx.globalAlpha = al;
      ctx.drawImage(sprites[ci], x - s / 2, y - s / 2, s, s);
    };

    const render = (now: number, t: number) => {
      // Update the crisp-letter layer.
      if (phase === "dissolve") {
        const base = t / dissolve;
        for (let c = 0; c < cells; c++) {
          if (inLayer[c] && base - off[c] > 0) {
            lctx.clearRect(cellX[c], cellY[c], stepD, stepD);
            inLayer[c] = 0;
          }
        }
      } else if (phase === "condense") {
        const base = t / condense;
        for (let c = 0; c < cells; c++) {
          if (!inLayer[c] && base - off[c] >= LAND) paintCell(c);
        }
      } else if (blownCount > 0) {
        for (let c = 0; c < cells; c++) {
          if (blownAt[c] >= 0 && now - blownAt[c] >= blownDur[c]) {
            paintCell(c);
            blownAt[c] = -1;
            blownCount--;
          }
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (phase === "dissolve") {
        const base = t / dissolve;
        for (let i = 0; i < np; i++) {
          const q = (base - off[pc[i]]) / plf[i];
          if (q > 0 && q < 1) drawParticle(ppx[i], ppy[i], q, psp[i], pph[i], prn[i], psz[i], 0, 0);
        }
      } else if (phase === "condense") {
        const base = t / condense;
        for (let i = 0; i < np; i++) {
          const q = (base - off[pc[i]]) / plf[i];
          if (q > 0 && q < 1) drawParticle(ppx[i], ppy[i], 1 - q, psp[i], pph[i], prn[i], psz[i], 0, 0);
        }
      }

      burstAlive = false;
      const live = Math.min(bCount, BURST_CAP);
      for (let j = 0; j < live; j++) {
        const age = now - bt0[j];
        if (age < 0 || age >= blife[j]) continue;
        burstAlive = true;
        drawParticle(bx[j], by[j], age / blife[j], bsp[j], bph[j], brn[j], bsz[j], bkx[j], bky[j]);
      }
      ctx.globalAlpha = 1;
    };

    // Pointer "breath": blows nearby letters into vapour, faster movement blows harder.
    const ptr = { x: 0, y: 0, vx: 0, vy: 0, has: false, moved: false };
    const area = root.parentElement ?? root;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      if (ptr.has) { ptr.vx = nx - ptr.x; ptr.vy = ny - ptr.y; } else { ptr.vx = 0; ptr.vy = 0; }
      ptr.x = nx; ptr.y = ny; ptr.has = true; ptr.moved = true;
    };
    const onLeave = () => { ptr.has = false; ptr.moved = false; };
    if (interactive) {
      area.addEventListener("pointermove", onMove);
      area.addEventListener("pointerleave", onLeave);
    }
    const breathe = (now: number) => {
      if (!ptr.moved) return false;
      ptr.moved = false;
      if (phase !== "hold") return false;
      const speed = Math.hypot(ptr.vx, ptr.vy);
      if (speed < 0.5) return false;
      const R = breathRadius * fs * Math.min(1.5, Math.max(0.4, 0.4 + speed * 0.03 * breath));
      const R2 = R * R;
      const mag = Math.min(fs * 0.8, speed * 0.35 * breath);
      const dirX = ptr.vx / speed, dirY = ptr.vy / speed;
      const cellCss = stepD / dpr;
      let any = false;
      for (let c = 0; c < cells; c++) {
        if (!inLayer[c]) continue;
        const dx = cx[c] - ptr.x, dy = cy[c] - ptr.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > R2) continue;
        blownAt[c] = now;
        blownDur[c] = recoverMs * (0.75 + 0.25 * Math.random());
        lctx.clearRect(cellX[c], cellY[c], stepD, stepD);
        inLayer[c] = 0;
        blownCount++;
        any = true;
        if (Math.random() < 0.45) {
          const j = bHead % BURST_CAP;
          bHead++;
          if (bCount < BURST_CAP) bCount++;
          const dist = Math.sqrt(d2) || 1;
          const out = fs * (0.15 + 0.35 * Math.random());
          bx[j] = cx[c] + (Math.random() - 0.5) * cellCss;
          by[j] = cy[c] + (Math.random() - 0.5) * cellCss;
          bt0[j] = now;
          blife[j] = recoverMs * (0.6 + 0.4 * Math.random());
          bkx[j] = dirX * mag * (0.4 + 0.6 * Math.random()) + (dx / dist) * out;
          bky[j] = dirY * mag * (0.4 + 0.6 * Math.random()) + (dy / dist) * out;
          bsp[j] = Math.random();
          bph[j] = Math.random() * 6.2832;
          brn[j] = Math.random();
          const r = Math.random();
          bsz[j] = 0.6 + 2.0 * r * r * r;
        }
      }
      return any;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const active = visible && !document.hidden && ready;
      if (!active) {
        if (!pausedAt) pausedAt = now;
        return;
      }
      if (pausedAt) { phaseStart += now - pausedAt; pausedAt = 0; }
      if (!started) { started = true; enter("condense", now); }
      let t = (now - phaseStart) / 1000;
      if (phase === "condense" && t >= condense) { enter("hold", now); t = 0; }
      else if (phase === "hold" && t >= hold && (loop || wordIndex < words.length - 1)) { enter("dissolve", now); t = 0; }
      else if (phase === "dissolve" && t >= dissolve) {
        if (words.length > 1) { wordIndex = (wordIndex + 1) % words.length; loadPhrase(); }
        enter("condense", now);
        t = 0;
      }
      const released = breathe(now);
      if (phase !== "hold" || blownCount > 0 || burstAlive || released || dirty) {
        render(now, t);
        dirty = false;
      }
    };

    const rebuild = () => {
      if (disposed || !ready) return;
      if (!build()) return;
      if (started) enter("hold", performance.now());
    };

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect();
      if (Math.abs(r.width - builtW) < 1 && Math.abs(r.height - builtH) < 1) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 150);
    });
    ro.observe(root);

    const mo = new MutationObserver(rebuild);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(root);

    const spans = phraseRefs.current.filter(Boolean) as HTMLSpanElement[];
    document.fonts.ready.then(() => {
      if (disposed) return;
      try {
        if (build()) ready = true;
        else spans.forEach((s) => { s.style.color = ""; });
      } catch {
        spans.forEach((s) => { s.style.color = ""; });
      }
    });
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      ro.disconnect(); mo.disconnect(); io.disconnect();
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, wordsKey, colorKey, density, particleSize, spread, rise, turbulence, diffusion, grain, sweep, stagger, condense, hold, dissolve, loop, interactive, breath, breathRadius, recovery]);

  const Component = Tag as ElementType;
  return (
    <Component ref={rootRef} className={cn("relative", className)} style={{ cursor: "default", ...style }}>
      <span className="grid">
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            ref={(el) => { phraseRefs.current[i] = el; }}
            aria-hidden={i > 0 ? true : undefined}
            style={{ gridArea: "1 / 1" }}
          >
            {w}
          </span>
        ))}
      </span>
      {!reduce && <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute" />}
    </Component>
  );
};

export default VaporType;
