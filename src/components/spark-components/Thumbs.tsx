import { useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import ToolRail from "./ToolRail";
import { Recorder } from "./RecordFlow";
import type { SparkComponentId } from "../../data/sparkComponents";
import "./spark-components.css";

/** Scales its natural-size child so it fits inside the preview box (fractions of width/height). */
function Fit({ children, w = 0.9, h = 0.9, align = "center" }: { children: ReactNode; w?: number; h?: number; align?: "center" | "top" }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const b = box.current, i = inner.current;
    if (!b || !i) return;
    const update = () => {
      const s = Math.min((b.clientWidth * w) / i.offsetWidth, (b.clientHeight * h) / i.offsetHeight, 1);
      setScale(s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(b);
    return () => ro.disconnect();
  }, [w, h]);
  return (
    <div ref={box} className={`absolute inset-0 flex justify-center overflow-hidden ${align === "top" ? "items-start pt-[6%]" : "items-center"}`}>
      <div ref={inner} className="shrink-0" style={{ transform: `scale(${scale})`, transformOrigin: align === "top" ? "top center" : "center", visibility: scale ? "visible" : "hidden" }}>
        {children}
      </div>
    </div>
  );
}

const RailThumb = () => (
  <Fit w={0.9} h={0.7}>
    <div style={{ paddingLeft: 90 }}>
      <ToolRail interactive={false} forceLabel="See it" />
    </div>
  </Fit>
);

const RecorderThumb = () => (
  <Fit w={0.9} h={0.94} align="top">
    <div style={{ width: 720 }}>
      <Recorder tab="transcript" secs={7} paused={false} shown={3} notes="" />
    </div>
  </Fit>
);

export const thumbs: Record<SparkComponentId, ComponentType> = {
  "tool-rail": RailThumb,
  "record-flow": RecorderThumb,
};

/** Static, non-interactive light-theme preview area for a card. */
export function Thumb({ id }: { id: SparkComponentId }) {
  const T = thumbs[id];
  return (
    <div data-stage-theme="light" className="sc-static pointer-events-none absolute inset-0" style={{ background: "var(--sc-stage)", color: "var(--sc-text)", fontSize: 15 }} aria-hidden="true" {...{ inert: "" }}>
      <T />
    </div>
  );
}
