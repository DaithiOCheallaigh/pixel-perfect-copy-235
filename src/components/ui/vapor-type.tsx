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

const ALPHA_LEVELS = [0.3, 0.55, 0.8, 1];
const CELL_CAP = 7000;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const hash = (x: number, y: number) => {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
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

    const K = Math.min(4, Math.max(1, Math.round(2 * density)));
    const wind = sweep === "right" ? -1 : 1;
    const baseAng = wind === 1 ? -0.5 : Math.PI + 0.5;

    let raf = 0;
    let disposed = false;
    let ready = false;
    let started = false;
    let visible = true;
    let pausedAt = 0;
    let dirty = true;

    let W = 0, H = 0, M = 0, dpr = 1, fs = 16, cw = 0, ch = 0, stepD = 2;
    let cells = 0;
    let wordIndex = 0;
    let phase: Phase = "condense";
    let phaseStart = 0;
    let blownCount = 0;

    let cellX = new Int32Array(0), cellY = new Int32Array(0);
    let cx = new Float32Array(0), cy = new Float32Array(0), off = new Float32Array(0);
    let inLayer = new Uint8Array(0);
    let blownAt = new Float32Array(0), kickX = new Float32Array(0), kickY = new Float32Array(0);
    let px = new Float32Array(0), py = new Float32Array(0), sp = new Float32Array(0);
    let rn = new Float32Array(0), ph = new Float32Array(0), lf = new Float32Array(0);

    let letterRGB: [number, number, number] = [0, 0, 0];
    let bucketStyles: string[] = [];
    let builtW = 0, builtH = 0;

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
      stepD = Math.max(2, Math.ceil(Math.sqrt(cnt / CELL_CAP)));
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
      const n = cells * K;
      cellX = new Int32Array(cells); cellY = new Int32Array(cells);
      cx = new Float32Array(cells); cy = new Float32Array(cells); off = new Float32Array(cells);
      inLayer = new Uint8Array(cells);
      blownAt = new Float32Array(cells).fill(-1);
      kickX = new Float32Array(cells); kickY = new Float32Array(cells);
      px = new Float32Array(n); py = new Float32Array(n); sp = new Float32Array(n);
      rn = new Float32Array(n); ph = new Float32Array(n); lf = new Float32Array(n);
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
      const patch = Math.max(2, fs * 0.09 * Math.max(grain, 0.25));

      for (let c = 0; c < cells; c++) {
        const x = list[2 * c], y = list[2 * c + 1];
        cellX[c] = x; cellY[c] = y;
        const ccx = (x + stepD / 2) / dpr, ccy = (y + stepD / 2) / dpr;
        cx[c] = ccx; cy[c] = ccy;
        let base: number;
        if (sweep === "right") base = 1 - (ccx - minX) / rx;
        else if (sweep === "top") base = (ccy - minY) / ry;
        else if (sweep === "center") base = Math.hypot(ccx - mx, ccy - my) / maxR;
        else if (sweep === "scatter") base = hash(Math.floor(ccx / (patch * 3)), Math.floor(ccy / (patch * 3)) + 97);
        else base = (ccx - minX) / rx;
        const noise = hash(Math.floor(ccx / patch), Math.floor(ccy / patch));
        off[c] = clamp01(base + (noise - 0.5) * 0.35 * grain) * stagger * 0.55;
        for (let k = 0; k < K; k++) {
          const i = c * K + k;
          px[i] = k === 0 ? ccx : (x + hash(i, 5) * stepD) / dpr;
          py[i] = k === 0 ? ccy : (y + hash(i, 9) * stepD) / dpr;
          rn[i] = hash(i, 13);
          sp[i] = hash(i, 29);
          ph[i] = hash(i, 47) * 6.2832;
          lf[i] = 0.45 + 0.1 * hash(i, 71);
        }
      }
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
      letterRGB = toRgb(cs.color);
      const vaporRGB = toRgb(resolveVars(vc));
      bucketStyles = [];
      for (let c = 0; c < 4; c++) {
        const m = c / 3;
        const r = Math.round(letterRGB[0] + (vaporRGB[0] - letterRGB[0]) * m);
        const g = Math.round(letterRGB[1] + (vaporRGB[1] - letterRGB[1]) * m);
        const b = Math.round(letterRGB[2] + (vaporRGB[2] - letterRGB[2]) * m);
        for (let a = 0; a < 4; a++) bucketStyles.push(`rgba(${r},${g},${b},${ALPHA_LEVELS[a]})`);
      }
      loadPhrase();
      return true;
    };

    const render = (now: number, t: number) => {
      const paths = Array.from({ length: 16 }, () => new Path2D());
      const used = new Uint8Array(16);
      const ps = particleSize;
      const blownDur = recovery * 1000;

      for (let c = 0; c < cells; c++) {
        let blown = false;
        if (phase === "dissolve") {
          if (t / dissolve - off[c] > 0 && inLayer[c]) {
            lctx.clearRect(cellX[c], cellY[c], stepD, stepD);
            inLayer[c] = 0;
          }
        } else if (phase === "condense") {
          if (!inLayer[c] && (t / condense - off[c]) / lf[c * K] >= 1) {
            lctx.drawImage(src, cellX[c], cellY[c], stepD, stepD, cellX[c], cellY[c], stepD, stepD);
            inLayer[c] = 1;
          }
        } else if (blownAt[c] >= 0) {
          if ((now - blownAt[c]) / blownDur >= 1) {
            lctx.drawImage(src, cellX[c], cellY[c], stepD, stepD, cellX[c], cellY[c], stepD, stepD);
            inLayer[c] = 1;
            blownAt[c] = -1;
            blownCount--;
          } else blown = true;
        }

        for (let k = 0; k < K; k++) {
          const i = c * K + k;
          let f = -1;
          if (phase === "dissolve") {
            const q = (t / dissolve - off[c]) / lf[i];
            if (q > 0 && q < 1) f = q;
          } else if (phase === "condense") {
            const q = (t / condense - off[c]) / lf[i];
            if (q > 0 && q < 1) f = 1 - q;
          } else if (blown) {
            f = 0.5 * Math.sin(Math.PI * ((now - blownAt[c]) / blownDur));
          }
          if (f < 0) continue;
          const al = Math.pow(1 - f, 1.15);
          if (al < 0.06) continue;
          const e = 1 - (1 - f) * (1 - f) * (1 - f);
          const d = spread * fs * e * (0.45 + 0.9 * sp[i]);
          const n = Math.sin(px[i] * 0.013 + ph[i] * 0.35) * Math.cos(py[i] * 0.017 - f * 2.2);
          const ang = baseAng + n * turbulence * 1.1 + (rn[i] - 0.5) * diffusion * 2.4;
          let x = px[i] + Math.cos(ang) * d;
          let y = py[i] + Math.sin(ang) * d - rise * fs * 0.5 * e * (0.4 + sp[i]);
          if (blown) { x += kickX[c] * e; y += kickY[c] * e; }
          const ai = Math.min(3, (al * 4) | 0);
          const ci = Math.min(3, (Math.min(1, f * 2.4) * 3.99) | 0);
          const b = ci * 4 + ai;
          paths[b].rect(x, y, ps, ps);
          used[b] = 1;
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let b = 0; b < 16; b++) {
        if (!used[b]) continue;
        ctx.fillStyle = bucketStyles[b];
        ctx.fill(paths[b]);
      }
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
      let any = false;
      for (let c = 0; c < cells; c++) {
        if (!inLayer[c] || blownAt[c] >= 0) continue;
        const dx = cx[c] - ptr.x, dy = cy[c] - ptr.y;
        if (dx * dx + dy * dy > R2) continue;
        blownAt[c] = now;
        kickX[c] = (ptr.vx / speed) * mag;
        kickY[c] = (ptr.vy / speed) * mag;
        lctx.clearRect(cellX[c], cellY[c], stepD, stepD);
        inLayer[c] = 0;
        blownCount++;
        any = true;
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
      if (phase !== "hold" || blownCount > 0 || released || dirty) {
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
    <Component ref={rootRef} className={cn("relative", className)} style={style}>
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
