import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { Icon, type IconName } from "./icons";
import "./spark-components.css";

export const lines = [
  "Today we are covering multiple endocrine neoplasia, and the exam angle is matching the syndrome to its gene and its tumours.",
  "MEN1 is the menin gene on chromosome 11: think parathyroid, pancreas and pituitary.",
  "MEN2A and MEN2B are RET syndromes. Both bring medullary thyroid carcinoma and pheochromocytoma.",
  "MEN2A adds parathyroid disease. MEN2B has mucosal neuromas and a marfanoid habitus, but no hyperparathyroidism.",
  "In MEN2A, remove the thyroid first, then deal with any pheochromocytoma.",
  "Screen first-degree relatives with gene testing, and time the prophylactic thyroidectomy by the RET mutation.",
];

const summary = [
  "MEN1 (menin, chromosome 11) affects the parathyroid, pancreas and pituitary.",
  "MEN2A and MEN2B are RET syndromes with medullary thyroid carcinoma and pheochromocytoma; only MEN2A adds parathyroid disease.",
  "Treat pheochromocytoma before thyroid surgery, and time prophylactic thyroidectomy by RET mutation after screening relatives.",
];

const claims = ["MEN1 = menin gene, chromosome 11", "MEN2 = RET proto-oncogene", "MEN2B has no hyperparathyroidism"];

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const steps = ["Start", "Record", "Transcript", "Result"] as const;
type Step = 1 | 2 | 3 | 4;

export interface RecorderProps {
  tab: "notes" | "transcript";
  secs: number;
  paused: boolean;
  shown: number;
  notes: string;
  listRef?: RefObject<HTMLOListElement>;
  onTab?: (t: "notes" | "transcript") => void;
  onPause?: () => void;
  onStop?: () => void;
  onClose?: () => void;
  onNotes?: (v: string) => void;
  onListScroll?: () => void;
  showJump?: boolean;
  onJump?: () => void;
}

function DialogHead({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h4 id="sc-rec-title" style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{title}</h4>
      <button type="button" className="sc-btn sc-close" aria-label="Close recorder" onClick={onClose}>
        <Icon name="close" />
      </button>
    </div>
  );
}

/** Presentational recorder panel, shared by the live flow and the thumbnail. */
export function Recorder({ tab, secs, paused, shown, notes, listRef, onTab, onPause, onStop, onClose, onNotes, onListScroll, showJump, onJump }: RecorderProps) {
  return (
    <>
      <DialogHead title="Record a lecture" onClose={onClose ?? onStop} />
      <div className="sc-rec">
        <div className="sc-rec-head">
          <Icon name="calendar" />
          <span>Lecture<span style={{ color: "var(--sc-text-2)" }}> @Today</span></span>
        </div>
        <div className="sc-rec-bar">
          <div className="sc-tabs" role="tablist" aria-label="Recorder view">
            <button type="button" role="tab" className="sc-tab" aria-selected={tab === "notes"} onClick={() => onTab?.("notes")}>
              <Icon name="edit" size={16} /> Notes
            </button>
            <button type="button" role="tab" className="sc-tab" aria-selected={tab === "transcript"} onClick={() => onTab?.("transcript")}>
              <Icon name="microphone" size={16} /> Transcript
            </button>
          </div>
          <div className="sc-wave" data-paused={paused} aria-hidden="true">
            {Array.from({ length: 36 }, (_, i) => (
              <span key={i} style={{ height: `${30 + ((i * 37) % 60)}%`, animationDelay: `${(i * 97) % 700}ms` }} />
            ))}
          </div>
          <span role="timer" className="tabular-nums" aria-label={`Recording time ${fmt(secs)}`}>{fmt(secs)}</span>
          <button type="button" className="sc-pill" onClick={onPause}>{paused ? "Resume" : "Pause"}</button>
          <button type="button" className="sc-pill sc-stop" onClick={onStop}>Stop</button>
        </div>
        <div className="sc-rec-body relative" role="tabpanel">
          {tab === "notes" ? (
            <textarea
              className="sc-notes"
              aria-label="Your notes"
              placeholder="MEW AI will summarize the notes and transcript"
              value={notes}
              onChange={(e) => onNotes?.(e.target.value)}
              readOnly={!onNotes}
            />
          ) : (
            <>
              <ol ref={listRef} className="sc-lines" aria-live="polite" onScroll={onListScroll}>
                {lines.slice(0, shown).map((line, i) => (
                  <li key={i} className="sc-line">
                    <span className="tabular-nums" style={{ color: "var(--sc-text-2)" }}>{fmt(i * 3)}</span> {line}
                  </li>
                ))}
              </ol>
              {showJump && (
                <button type="button" className="sc-pill sc-jump font-mono-label text-xs" onClick={onJump}>Jump to latest ↓</button>
              )}
            </>
          )}
        </div>
        <div className="sc-rec-foot">
          By recording, you confirm everyone being transcribed has given consent. The recording is checked against Elsevier sources once you add it.
        </div>
      </div>
    </>
  );
}

function Result({ secs, notes, onClose, onAgain }: { secs: number; notes: string; onClose: () => void; onAgain: () => void }) {
  return (
    <>
      <DialogHead title="Lecture added" onClose={onClose} />
      <div className="sc-rec">
        <div className="sc-rec-head" style={{ fontSize: 16 }}>
          <Icon name="microphone" size={16} />
          <span>Lecture @Today<span style={{ color: "var(--sc-text-2)" }}> · {fmt(secs)}</span></span>
        </div>
        <div style={{ padding: "12px 16px" }}>
          <div className="font-mono-label text-xs" style={{ color: "var(--sc-text-2)" }}>MEW AI summary</div>
          <ul className="sc-summary">
            {summary.map((s) => <li key={s}>{s}</li>)}
          </ul>
          {notes.trim() && (
            <>
              <div className="font-mono-label mt-3 text-xs" style={{ color: "var(--sc-text-2)" }}>Your notes</div>
              <p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{notes}</p>
            </>
          )}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--sc-border-soft)" }}>
          <div className="font-mono-label text-xs" style={{ color: "var(--sc-text-2)" }}>Checked against Elsevier sources</div>
          <ul className="sc-claims">
            {claims.map((c) => (
              <li key={c}>
                <span className="sc-check"><Icon name="check" size={14} /></span>
                <span style={{ flex: 1 }}>{c}</span>
                <span className="sr-only">verified</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button type="button" className="sc-pill" style={{ padding: "8px 16px" }} onClick={onAgain}>Record another</button>
      </div>
    </>
  );
}

const sources: { icon: IconName; label: string }[] = [
  { icon: "upload", label: "Upload a file" },
  { icon: "link", label: "Add a link" },
  { icon: "paste", label: "Paste text" },
];

export default function RecordFlow() {
  const [step, setStep] = useState<Step>(1);
  const [secs, setSecs] = useState(0);
  const [paused, setPaused] = useState(false);
  const [notes, setNotes] = useState("");
  const [follow, setFollow] = useState(true);
  const listRef = useRef<HTMLOListElement>(null);
  const micRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const recording = step === 2 || step === 3;
  const open = step !== 1;

  useEffect(() => {
    if (!recording || paused) return;
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording, paused]);

  const shown = Math.min(lines.length, Math.floor(secs / 3) + 1);

  useEffect(() => {
    const el = listRef.current;
    if (el && follow) el.scrollTop = el.scrollHeight;
  }, [shown, step, follow]);

  // Move focus into the dialog when it opens or changes content; return it to the mic on close.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      const first = dialogRef.current?.querySelector<HTMLElement>(step === 4 ? ".sc-close" : step === 2 ? ".sc-notes" : '[role="tab"][aria-selected="true"]');
      if (!wasOpen.current || step === 4) first?.focus();
    } else if (wasOpen.current) micRef.current?.focus();
    wasOpen.current = open;
  }, [open, step]);

  const reset = () => {
    setStep(1);
    setSecs(0);
    setPaused(false);
    setNotes("");
    setFollow(true);
  };

  const goTo = (n: Step) => {
    if (n === 1) return reset();
    if (n === 2 && (step === 1 || step === 4)) {
      setSecs(0);
      setPaused(false);
    }
    if (n === 3 || n === 4) setSecs((s) => (step === 1 || step === 4 || s < 15 ? (n === 4 && step === 4 ? s : 15) : s));
    if (n === 3) setFollow(true);
    if (n === 4) setPaused(false);
    setStep(n);
  };

  const onListScroll = () => {
    const el = listRef.current;
    if (el) setFollow(el.scrollHeight - el.scrollTop - el.clientHeight < 8);
  };

  const trap = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      return reset();
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const f = [...dialogRef.current.querySelectorAll<HTMLElement>("button, textarea, [tabindex]:not([tabindex='-1'])")].filter((el) => !el.hasAttribute("disabled"));
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center gap-2" aria-label="Steps">
        {steps.map((label, i) => {
          const n = (i + 1) as Step;
          const on = step === n;
          return (
            <button
              key={label}
              type="button"
              aria-current={on ? "step" : undefined}
              onClick={() => goTo(n)}
              className="sc-pill font-mono-label text-xs"
              style={{ borderRadius: 9999, padding: "6px 12px", border: "1px solid var(--sc-border)", background: on ? "var(--sc-text)" : "var(--sc-surface)", color: on ? "var(--sc-surface)" : "var(--sc-text-2)" }}
            >
              {n} {label}
            </button>
          );
        })}
      </div>

      <div className="sc-space relative w-full md:min-h-[560px]" style={{ minHeight: 520 }}>
        <div className="sc-sources" inert={open ? true : undefined} aria-hidden={open || undefined}>
          <h4 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>Add a source</h4>
          <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--sc-text-2)" }}>Bring material into this study space.</p>
          <div className="flex flex-wrap gap-2">
            {sources.map((s) => (
              <button key={s.label} type="button" className="sc-btn sc-mic" aria-label={s.label} title={s.label}>
                <Icon name={s.icon} />
              </button>
            ))}
            <button ref={micRef} type="button" className="sc-btn sc-mic" data-primary="true" aria-label="Record lecture" title="Record lecture" onClick={() => goTo(2)}>
              <Icon name="microphone" />
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-2" aria-hidden="true">
            {[90, 70, 80].map((w) => <div key={w} className="sc-skel" style={{ width: `${w}%` }} />)}
          </div>
        </div>

        {open && (
          <div className="sc-backdrop" onMouseDown={(e) => e.target === e.currentTarget && reset()}>
            <div ref={dialogRef} className="sc-dialog" role="dialog" aria-modal="true" aria-labelledby="sc-rec-title" onKeyDown={trap}>
              {step === 4 ? (
                <Result secs={secs} notes={notes} onClose={reset} onAgain={reset} />
              ) : (
                <Recorder
                  tab={step === 3 ? "transcript" : "notes"}
                  secs={secs}
                  paused={paused}
                  shown={shown}
                  notes={notes}
                  listRef={listRef}
                  onTab={(t) => {
                    if (t === "transcript") setFollow(true);
                    setStep(t === "transcript" ? 3 : 2);
                  }}
                  onPause={() => setPaused((p) => !p)}
                  onStop={() => goTo(4)}
                  onClose={reset}
                  onNotes={setNotes}
                  onListScroll={onListScroll}
                  showJump={!follow}
                  onJump={() => setFollow(true)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
