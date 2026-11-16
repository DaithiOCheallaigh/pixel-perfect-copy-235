/** Pure helpers deciding whether the WebGL hero may run. No window access at module scope. */

const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|mesa offscreen|basic render driver|microsoft basic/i;

export function isSoftwareRenderer(name: string): boolean {
  return SOFTWARE_RENDERER.test(name);
}

/** Frame-gap governor: three gaps over 150 ms means the device can't keep up. */
export const SLOW_FRAME_MS = 150;
export const SLOW_FRAME_LIMIT = 3;

export function shouldDegrade(gapsMs: number[]): boolean {
  return gapsMs.filter((g) => g > SLOW_FRAME_MS).length >= SLOW_FRAME_LIMIT;
}

export function canRunWebGLHero(): boolean {
  try {
    if (typeof window === "undefined" || typeof document === "undefined") return false;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return false;

    const canvas = document.createElement("canvas");
    const opts = { failIfMajorPerformanceCaveat: true } as WebGLContextAttributes;
    const gl = (canvas.getContext("webgl2", opts) ||
      canvas.getContext("webgl", opts)) as WebGLRenderingContext | WebGL2RenderingContext | null;
    if (!gl) return false;

    let ok = true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    if (info) {
      const name = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) ?? "");
      if (isSoftwareRenderer(name)) ok = false;
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return ok;
  } catch {
    return false;
  }
}

/* Frame-gap governor phases: wait for the canvas, skip warm-up frames, then measure. */
export const GOVERNOR_WAIT_MS = 15000;
export const GOVERNOR_WARMUP_FRAMES = 3;
export const GOVERNOR_MEASURE_MS = 3000;

export type GovernorState = {
  phase: "waiting" | "warmup" | "measure" | "done";
  degraded: boolean;
  startedAt: number | null;
  warmupLeft: number;
  measureStart: number | null;
  last: number | null;
  gaps: number[];
};

export const initialGovernorState = (): GovernorState => ({
  phase: "waiting", degraded: false, startedAt: null, warmupLeft: GOVERNOR_WARMUP_FRAMES,
  measureStart: null, last: null, gaps: [],
});

export function governorStep(
  s: GovernorState,
  e: { t: number; hasCanvas: boolean; hidden: boolean },
): GovernorState {
  if (s.phase === "done") return s;
  if (s.phase === "waiting") {
    const startedAt = s.startedAt ?? e.t;
    if (e.hasCanvas) return { ...s, startedAt, phase: "warmup" };
    if (e.t - startedAt >= GOVERNOR_WAIT_MS) return { ...s, startedAt, phase: "done" };
    return { ...s, startedAt };
  }
  if (s.phase === "warmup") {
    const warmupLeft = s.warmupLeft - 1;
    return warmupLeft > 0 ? { ...s, warmupLeft } : { ...s, warmupLeft: 0, phase: "measure", measureStart: null, last: null };
  }
  // measure
  const measureStart = s.measureStart ?? e.t;
  const gaps = s.last !== null && !e.hidden ? [...s.gaps, e.t - s.last] : s.gaps;
  const last = e.hidden ? null : e.t;
  if (shouldDegrade(gaps)) return { ...s, measureStart, gaps, last, phase: "done", degraded: true };
  if (e.t - measureStart >= GOVERNOR_MEASURE_MS) return { ...s, measureStart, gaps, last, phase: "done" };
  return { ...s, measureStart, gaps, last };
}

/** Call on visibilitychange so the first frame after returning is not counted as a gap. */
export const governorResetLast = (s: GovernorState): GovernorState => ({ ...s, last: null });
