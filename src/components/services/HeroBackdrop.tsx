import { lazy, Suspense, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { canRunWebGLHero, shouldDegrade } from "@/lib/webgl-capability";

const VoxelArc = lazy(() => import("@/components/react-bits/voxel-arc").then((m) => ({ default: m.VoxelArc })));

const GOVERNOR_MS = 3000;

/** CSS-only arc glow approximating the VoxelArc horizon. Always rendered beneath the canvas. */
function ArcGlowFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 45% 20% at 50% 50%, hsl(var(--primary) / 0.35), hsl(var(--primary) / 0.12) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 opacity-60 dark:opacity-100"
        style={{
          background: "hsl(var(--primary) / 0.4)",
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

  // Runtime governor: watch frame gaps for 3 s after mount.
  useEffect(() => {
    if (!mounted || degraded || typeof requestAnimationFrame !== "function") return;
    const gaps: number[] = [];
    let count = 0;
    let last = 0;
    let start = 0;
    let raf = 0;
    const tick = (t: number) => {
      count += 1;
      if (count === 1) start = t;
      if (count > 2 && !document.hidden) gaps.push(t - last);
      last = t;
      if (shouldDegrade(gaps)) {
        setDegraded(true);
        return;
      }
      if (t - start < GOVERNOR_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, degraded]);

  return (
    <>
      <ArcGlowFallback />
      {mounted && !degraded && (
        <Suspense fallback={null}>
          <VoxelArc className="absolute inset-0 h-full min-h-0" color="#CE3BB6" accentColor="#FFD6F8" horizon={0.5} curvature={0.8} haze={0.25} brightness={0.9} glow={1} bloom={0.4} grain={0.15} speed={0.3} interactive={false} dpr={isMobile ? 1 : 1.5} />
        </Suspense>
      )}
    </>
  );
}
