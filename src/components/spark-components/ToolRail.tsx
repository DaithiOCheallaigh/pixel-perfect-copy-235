import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as RPointerEvent } from "react";
import { Icon, type IconName } from "./icons";
import "./spark-components.css";

export const tools: { icon: IconName; label: string; desc: string }[] = [
  { icon: "exam", label: "Test me", desc: "Quick questions on this topic" },
  { icon: "clock", label: "Review", desc: "Spaced review of what is due today" },
  { icon: "openBook", label: "Brief", desc: "A one-page summary of the key facts" },
  { icon: "flowchart", label: "See it", desc: "Map the topic as a diagram" },
  { icon: "threeD", label: "Explore in 3D", desc: "Open the structure in 3D anatomy" },
  { icon: "comment", label: "Explain it back", desc: "Teach it back and get feedback" },
  { icon: "layers", label: "Compare", desc: "Side by side with similar conditions" },
  { icon: "stethoscope", label: "Work a case", desc: "Apply it to a patient case" },
];

function Rail({ interactive, forceLabel, tip, selected, focusIdx, onSelect, onFocusIdx, onTouchTip }: {
  interactive: boolean;
  forceLabel?: string;
  tip?: string | null;
  selected?: string | null;
  focusIdx?: number;
  onSelect?: (label: string) => void;
  onFocusIdx?: (i: number) => void;
  onTouchTip?: (label: string) => void;
}) {
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (i: number) => {
    const n = (i + tools.length) % tools.length;
    onFocusIdx?.(n);
    btns.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: tools.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      move(map[e.key]);
    }
  };
  return (
    <div className="sc-rail" role="toolbar" aria-label="Study tools" aria-orientation="vertical">
      {tools.map((t, i) => {
        const on = selected === t.label;
        return (
          <div key={t.label} className="sc-rail-item">
            <button
              ref={(el) => (btns.current[i] = el)}
              type="button"
              className="sc-btn sc-rail-btn"
              aria-label={t.label}
              {...(interactive
                ? {
                    "aria-pressed": on,
                    tabIndex: focusIdx === i ? 0 : -1,
                    onClick: () => onSelect?.(t.label),
                    onFocus: () => onFocusIdx?.(i),
                    onKeyDown: (e: KeyboardEvent) => onKey(e, i),
                    onPointerDown: (e: RPointerEvent) => e.pointerType === "touch" && onTouchTip?.(t.label),
                  }
                : { tabIndex: -1 })}
            >
              <Icon name={t.icon} />
            </button>
            <span className="sc-tip" data-show={(forceLabel ?? tip) === t.label} aria-hidden="true">{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ToolRail({ interactive = true, forceLabel }: { interactive?: boolean; forceLabel?: string } = {}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const railWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;
    const onDown = (e: PointerEvent) => {
      if (railWrap.current && !railWrap.current.contains(e.target as Node)) setTip(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [interactive]);

  if (!interactive) return <Rail interactive={false} forceLabel={forceLabel} />;

  const tool = tools.find((t) => t.label === selected);

  return (
    <div className="sc-page">
      <div className="sc-page-body" aria-hidden="true">
        <span className="font-mono-label text-xs" style={{ color: "var(--sc-text-2)" }}>Endocrinology · Topic</span>
        <h4 style={{ fontSize: 22, fontWeight: 600, margin: "8px 0 16px", lineHeight: 1.2 }}>Multiple endocrine neoplasia</h4>
        {[96, 100, 88, 94, 60, 0, 100, 92, 97, 70].map((w, i) =>
          w ? <div key={i} className="sc-skel" style={{ width: `${w}%` }} /> : <div key={i} style={{ height: 12 }} />,
        )}
      </div>
      <div className="sc-page-side">
        <div className="sc-result" data-open={!!tool} role="region" aria-label="Active study tool" aria-live="polite">
          {tool && (
            <>
              <div className="flex items-center gap-2" style={{ fontWeight: 600 }}>
                <Icon name={tool.icon} size={16} /> {tool.label}
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--sc-text-2)", lineHeight: 1.45 }}>{tool.desc}</p>
            </>
          )}
        </div>
        <div ref={railWrap}>
          <Rail
            interactive
            tip={tip}
            selected={selected}
            focusIdx={focusIdx}
            onFocusIdx={setFocusIdx}
            onTouchTip={setTip}
            onSelect={(l) => setSelected((s) => (s === l ? null : l))}
          />
        </div>
      </div>
    </div>
  );
}
