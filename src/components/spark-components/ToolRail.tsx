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

const CHEVRON = "__chevron";

function Rail({ interactive, forceLabel, tip, selected, focusIdx, expanded = false, onSelect, onFocusIdx, onTouchTip, onToggle }: {
  interactive: boolean;
  forceLabel?: string;
  tip?: string | null;
  selected?: string | null;
  focusIdx?: number;
  expanded?: boolean;
  onSelect?: (label: string) => void;
  onFocusIdx?: (i: number) => void;
  onTouchTip?: (label: string) => void;
  onToggle?: () => void;
}) {
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const count = tools.length + 1;
  const move = (i: number) => {
    const n = (i + count) % count;
    onFocusIdx?.(n);
    btns.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: count - 1 };
    if (e.key in map) {
      e.preventDefault();
      move(map[e.key]);
    } else if (e.key === "Escape" && expanded) {
      e.preventDefault();
      onToggle?.();
      onFocusIdx?.(0);
      btns.current[0]?.focus();
    }
  };
  const handlers = (i: number, onClick: () => void, tipKey: string) =>
    interactive
      ? {
          tabIndex: focusIdx === i ? 0 : -1,
          onClick,
          onFocus: () => onFocusIdx?.(i),
          onKeyDown: (e: KeyboardEvent) => onKey(e, i),
          onPointerDown: (e: RPointerEvent) => !expanded && e.pointerType === "touch" && onTouchTip?.(tipKey),
        }
      : { tabIndex: -1 };
  const chevLabel = expanded ? "Collapse study tools" : "Show study tools";
  const showTip = (key: string) => !expanded && (forceLabel ?? tip) === key;

  return (
    <div className="sc-rail" data-expanded={expanded} role="toolbar" aria-label="Study tools" aria-orientation="vertical">
      <div className="sc-rail-item" style={expanded ? { alignSelf: "flex-start" } : undefined}>
        <button
          ref={(el) => (btns.current[0] = el)}
          type="button"
          className="sc-btn sc-rail-btn"
          aria-label={chevLabel}
          aria-expanded={expanded}
          {...handlers(0, () => onToggle?.(), CHEVRON)}
        >
          <Icon name={expanded ? "chevronRight" : "chevronLeft"} />
        </button>
        {!expanded && <span className="sc-tip" data-show={showTip(CHEVRON)} aria-hidden="true">{chevLabel}</span>}
      </div>
      {tools.map((t, i) => {
        const on = selected === t.label;
        const idx = i + 1;
        const h = handlers(idx, () => onSelect?.(t.label), t.label);
        if (expanded) {
          return (
            <button
              key={t.label}
              ref={(el) => (btns.current[idx] = el)}
              type="button"
              className="sc-btn sc-rail-row"
              aria-pressed={on}
              {...h}
            >
              <Icon name={t.icon} />
              <span style={{ minWidth: 0 }}>
                <span style={{ fontWeight: 500 }}>{t.label}</span>
                {on && <span className="sc-row-desc">{t.desc}</span>}
              </span>
            </button>
          );
        }
        return (
          <div key={t.label} className="sc-rail-item">
            <button
              ref={(el) => (btns.current[idx] = el)}
              type="button"
              className="sc-btn sc-rail-btn"
              aria-label={t.label}
              {...(interactive ? { "aria-pressed": on } : {})}
              {...h}
            >
              <Icon name={t.icon} />
            </button>
            <span className="sc-tip" data-show={showTip(t.label)} aria-hidden="true">{t.label}</span>
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
  const [expanded, setExpanded] = useState(false);
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
        <div className="sc-result" data-open={!!tool && !expanded} role="region" aria-label="Active study tool" aria-live="polite">
          {tool && !expanded && (
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
            expanded={expanded}
            onFocusIdx={setFocusIdx}
            onTouchTip={setTip}
            onToggle={() => { setTip(null); setExpanded((x) => !x); }}
            onSelect={(l) => setSelected((s) => (s === l ? null : l))}
          />
        </div>
      </div>
    </div>
  );
}
