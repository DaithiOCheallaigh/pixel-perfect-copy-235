import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";
import "./spark-components.css";

const tools: { icon: IconName; label: string }[] = [
  { icon: "exam", label: "Test me" },
  { icon: "clock", label: "Review" },
  { icon: "openBook", label: "Brief" },
  { icon: "flowchart", label: "See it" },
  { icon: "threeD", label: "Explore in 3D" },
  { icon: "comment", label: "Explain it back" },
  { icon: "layers", label: "Compare" },
  { icon: "stethoscope", label: "Work a case" },
];

export default function ToolRail({ interactive = true, forceLabel }: { interactive?: boolean; forceLabel?: string } = {}) {
  const [active, setActive] = useState<string | null>(null);
  const timer = useRef<number>();
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;
    const onDown = (e: PointerEvent) => {
      if (railRef.current && !railRef.current.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.clearTimeout(timer.current);
    };
  }, [interactive]);

  const show = (label: string) => {
    setActive(label);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(null), 1800);
  };

  return (
    <div className={interactive ? "flex w-full justify-center px-16 py-4 md:px-[220px]" : "flex justify-center"}>
      <div>
        <div ref={railRef} className="sc-rail" role="toolbar" aria-label="Study tools" aria-orientation="vertical">
          {tools.map((t) => (
            <div key={t.label} className="sc-rail-item">
              <button type="button" className="sc-btn sc-rail-btn" aria-label={t.label} {...(interactive ? { onClick: () => show(t.label), onBlur: () => setActive((a) => (a === t.label ? null : a)) } : { tabIndex: -1 })}>
                <Icon name={t.icon} />
              </button>
              <span className="sc-tip" data-show={(forceLabel ?? active) === t.label} aria-hidden="true">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
