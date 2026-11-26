import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { canRunWebGLHero } from "@/lib/webgl-capability";

const Mosaic = lazy(() => import("@/components/react-bits/mosaic"));

/** Brand pinks for the Mosaic waves (the hero VoxelArc uses the same magenta). */
export const MOSAIC_COLORS = { color1: "#CE3BB6", color2: "#7A2E9E", color3: "#FFB3E6" } as const;

/** Dark gradient over the mosaic: the popup copy sits straight on it. */
export const POPUP_GRADIENT = "linear-gradient(180deg, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.6) 40%, rgba(5,5,5,0.9) 100%)";
/** Lighter veil for the tier-details surface, whose glass cards add their own darkening. */
export const PANEL_GRADIENT = "linear-gradient(180deg, rgba(5,5,5,0.12) 0%, rgba(5,5,5,0.3) 45%, rgba(5,5,5,0.75) 100%)";

const GLOW = "radial-gradient(ellipse 80% 55% at 15% 0%, rgba(206,59,182,0.5), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 100%, rgba(122,46,158,0.55), transparent 65%), #0a0a0a";

export type MosaicBackdropProps = {
  /** CSS gradient painted over the mosaic so white copy stays legible. */
  gradient?: string;
  /** Mosaic tile size in device pixels. */
  pixelSize?: number;
  /** Wave brightness (0-2); the popup uses 1. */
  waveIntensity?: number;
  testId?: string;
};

/**
 * Always-dark card backdrop shared by the welcome popup and the package tier details: the React Bits
 * Mosaic shader when WebGL is usable and motion is allowed, a static pink glow with a faint tile grid
 * otherwise, and a dark gradient over both. Fills its positioned parent.
 */
export const MosaicBackdrop = ({ gradient = POPUP_GRADIENT, pixelSize = 14, waveIntensity = 1, testId = "mosaic-backdrop" }: MosaicBackdropProps) => {
  const [shader, setShader] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && canRunWebGLHero()) setShader(true);
  }, []);
  // Mosaic sizes its canvas once and again on window resize; nudge it when the host grows (a taller slide, the drawer).
  useEffect(() => {
    const el = ref.current;
    if (!shader || !el || typeof ResizeObserver === "undefined") return;
    let frame = 0;
    let last = `${el.offsetWidth}x${el.offsetHeight}`;
    const ro = new ResizeObserver(() => {
      const next = `${el.offsetWidth}x${el.offsetHeight}`;
      if (next === last) return;
      last = next;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    });
    ro.observe(el);
    return () => { ro.disconnect(); cancelAnimationFrame(frame); };
  }, [shader]);
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" data-testid={testId} data-shader={shader ? "on" : "off"}>
      <div className="absolute inset-0" style={{ background: GLOW }} />
      {shader ? (
        <Suspense fallback={null}>
          <Mosaic className="absolute inset-0" {...MOSAIC_COLORS} pixelSize={pixelSize} borderIntensity={0.7} waveIntensity={waveIntensity} waveWidth={1.4} speed={0.45} quality="medium" />
        </Suspense>
      ) : (
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: `${pixelSize}px ${pixelSize}px`,
          }}
        />
      )}
      <div className="absolute inset-0" style={{ background: gradient }} />
    </div>
  );
};

export default MosaicBackdrop;