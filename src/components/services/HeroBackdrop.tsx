import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { canRunWebGLHero, governorResetLast, governorStep, initialGovernorState } from "@/lib/webgl-capability";

const VoxelArc = lazy(() => import("@/components/react-bits/voxel-arc").then((m) => ({ default: m.VoxelArc })));

/** CSS-only arc glow approximating the VoxelArc horizon. Always rendered beneath the canvas. */
function ArcGlowFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 35% 16% at 50% 50%, hsl(var(--primary) / 0.55), hsl(var(--primary) / 0.18) 45%, transparent 75%), radial-gradient(ellipse 55% 27.5% at 50% 50%, hsl(var(--primary) / 0.14), transparent 70%)",
        }}
      />
      <div
        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 opacity-60 dark:opacity-100"
        style={{
          background: "hsl(var(--primary) / 0.6)",
          maskImage: "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
        }}
      />
    </div>
  );
}

export default function HeroBackdrop() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [degraded, setDegraded] = useState(false);
  const arcRef = useRef<HTMLDivElement>(null);

  // Deferred mount: window load → one idle callback → capability gate.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const tryMount = () => {
      if (!cancelled && canRunWebGLHero()) setMounted(true);
    };
    const schedule = () => {
      if (cancelled) return;
      if (typeof w.requestIdleCallback === "function") idleId = w.requestIdleCallback(tryMount, { timeout: 2000 });
      else timeoutId = window.setTimeout(tryMount, 300);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  // Runtime governor: wait for the canvas, skip warm-up frames, then watch frame gaps for 3 s.
  useEffect(() => {
    if (!mounted || degraded || typeof requestAnimationFrame !== "function") return;
    let state = initialGovernorState();
    let raf = 0;
    const onVisibility = () => { state = governorResetLast(state); };
    document.addEventListener("visibilitychange", onVisibility);
    const tick = (t: number) => {
      state = governorStep(state, { t, hasCanvas: !!arcRef.current?.querySelector("canvas"), hidden: document.hidden });
      if (state.phase === "done") {
        if (state.degraded) setDegraded(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mounted, degraded]);

  return (
    <>
      <ArcGlowFallback />
      {mounted && !degraded && (
        <div ref={arcRef} className="absolute inset-0">
          <Suspense fallback={null}>
            <VoxelArc className="absolute inset-0 h-full min-h-0" color="#CE3BB6" accentColor="#FFD6F8" horizon={0.5} curvature={0.8} haze={0.25} brightness={0.9} glow={1} bloom={0.4} grain={0.15} speed={0.3} interactive={false} dpr={isMobile ? 1 : 1.5} />
          </Suspense>
        </div>
      )}
    </>
  );
}
