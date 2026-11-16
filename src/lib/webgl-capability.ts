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
