import { useEffect, useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import ToolRail, { tools } from "./ToolRail";
import { Recorder, AUTO_TITLE, type Note } from "./RecordFlow";
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

function useTick(live: boolean, ms: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!live) return setN(0);
    const id = window.setInterval(() => setN((v) => v + 1), ms);
    return () => window.clearInterval(id);
  }, [live, ms]);
  return n;
}

const RailThumb = ({ live }: { live: boolean }) => {
  const n = useTick(live, 700);
  return (
    <Fit w={0.9} h={0.7}>
      <div style={{ paddingLeft: 120 }}>
        <ToolRail interactive={false} forceLabel={live ? tools[n % tools.length].label : "See it"} />
      </div>
    </Fit>
  );
};

const thumbNotes: Note[] = [
  { t: 4, text: "MEN1 = 3 Ps" },
  { t: 9, text: "RET → MTC + pheo" },
];

const RecorderThumb = ({ live }: { live: boolean }) => {
  const n = useTick(live, 600);
  const t = live ? n % 16 : 0;
  const secs = live ? 2 + t : 12;
  const notes = live ? thumbNotes.filter((x) => secs >= x.t) : thumbNotes;
  return (
    <Fit w={0.9} h={0.86}>
      <div className="sc-dialog" style={{ width: 720 }}>
        <Recorder title={AUTO_TITLE} secs={secs} paused={!live} notes={notes} draft="" />
      </div>
    </Fit>
  );
};

export const thumbs: Record<SparkComponentId, ComponentType<{ live: boolean }>> = {
  "tool-rail": RailThumb,
  "record-flow": RecorderThumb,
};

/** Light-theme preview for a card; static unless `live` (hover/focus, never under reduced motion). */
export function Thumb({ id, live = false }: { id: SparkComponentId; live?: boolean }) {
  const reduce = useReducedMotion();
  const on = live && !reduce;
  const T = thumbs[id];
  return (
    <div data-stage-theme="light" className={`${on ? "" : "sc-static "}pointer-events-none absolute inset-0`} style={{ background: "var(--sc-stage)", color: "var(--sc-text)", fontSize: 15 }} aria-hidden="true" {...{ inert: "" }}>
      <T live={on} />
    </div>
  );
}
