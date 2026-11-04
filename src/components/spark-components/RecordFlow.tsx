import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
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

export const AUTO_TITLE = "Multiple endocrine neoplasia: genes and tumours";
const AUTO_TITLE_AFTER = 6;
const MIN_DURATION = 18;
const PROCESSING_MS = 1500;

const summary = [
  "MEN1 (menin, chromosome 11) affects the parathyroid, pancreas and pituitary.",
  "MEN2A and MEN2B are RET syndromes with medullary thyroid carcinoma and pheochromocytoma; only MEN2A adds parathyroid disease.",
  "Screen first-degree relatives with gene testing and time prophylactic thyroidectomy by RET mutation. One claim on treatment order was flagged below.",
];

const claims = ["MEN1 = menin gene, chromosome 11", "MEN2 = RET proto-oncogene", "MEN2B has no hyperparathyroidism"];

export const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const steps = ["Start", "Record", "Transcript"] as const;
type Step = 1 | 2 | 3;
export interface Note { t: number; text: string }

/** Spoken lines spread evenly over the recording (min 18s), merged with notes by time. */
export function buildTranscript(duration: number, notes: Note[]) {
  const span = Math.max(duration, MIN_DURATION);
  const spoken = lines.map((text, i) => ({ t: Math.round((i * span) / lines.length), text, note: false }));
  const mine = notes.map((n) => ({ t: Math.min(n.t, span), text: n.text, note: true }));
  return [...spoken, ...mine].sort((a, b) => a.t - b.t || Number(a.note) - Number(b.note));
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

function TitleRow({ title, placeholder, onTitle, animate }: { title: string; placeholder: string; onTitle?: (v: string) => void; animate?: boolean }) {
  return (
    <div className="sc-rec-head">
      <Icon name="calendar" />
      <label className="sc-title">
        <input
          key={animate ? "auto" : "manual"}
          className={animate ? "sc-title-in" : undefined}
          aria-label="Lecture title"
          value={title}
          placeholder={placeholder}
          readOnly={!onTitle}
          tabIndex={onTitle ? undefined : -1}
          size={Math.max(8, (title || placeholder).length)}
          onChange={(e) => onTitle?.(e.target.value)}
        />
        <span style={{ color: "var(--sc-text-2)", display: "inline-flex" }}><Icon name="edit" size={14} /></span>
        <span style={{ color: "var(--sc-text-2)", whiteSpace: "nowrap" }}> @Today</span>
      </label>
    </div>
  );
}

export interface RecorderProps {
  title: string;
  titlePlaceholder?: string;
  autoTitled?: boolean;
  secs: number;
  paused: boolean;
  notes: Note[];
  draft: string;
  onTitle?: (v: string) => void;
  onPause?: () => void;
  onStop?: () => void;
  onClose?: () => void;
  onDraft?: (v: string) => void;
  onCommit?: () => void;
}

/** Presentational recording view, shared by the live flow and the thumbnail. */
export function Recorder({ title, titlePlaceholder = "Generating title…", autoTitled, secs, paused, notes, draft, onTitle, onPause, onStop, onClose, onDraft, onCommit }: RecorderProps) {
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [notes.length]);
  return (
    <>
      <DialogHead title="Record a lecture" onClose={onClose ?? onStop} />
      <div className="sc-rec">
        <TitleRow title={title} placeholder={titlePlaceholder} onTitle={onTitle} animate={autoTitled} />
        <div className="sc-rec-bar">
          <div className="sc-wave" data-paused={paused} aria-hidden="true" style={{ marginRight: "auto" }}>
            {Array.from({ length: 36 }, (_, i) => (
              <span key={i} style={{ height: `${30 + ((i * 37) % 60)}%`, animationDelay: `${(i * 97) % 700}ms` }} />
            ))}
          </div>
          <span role="timer" className="tabular-nums" aria-label={`Recording time ${fmt(secs)}`} style={{ marginLeft: "auto" }}>{fmt(secs)}</span>
          <button type="button" className="sc-pill" onClick={onPause}>{paused ? "Resume" : "Pause"}</button>
          <button type="button" className="sc-pill sc-stop" onClick={onStop}>Stop</button>
        </div>
        <div className="sc-rec-body" style={{ borderTop: "1px solid var(--sc-border-soft)", paddingTop: 12 }}>
          {notes.length > 0 && (
            <ol ref={listRef} className="sc-note-list" aria-label="Your notes">
              {notes.map((n, i) => (
                <li key={i} className="sc-note">
                  <span className="tabular-nums" style={{ color: "var(--sc-text-2)" }}>{fmt(n.t)}</span>
                  <span>{n.text}</span>
                </li>
              ))}
            </ol>
          )}
          <textarea
            className="sc-notes"
            style={{ minHeight: notes.length ? 72 : 110 }}
            aria-label="Add a note"
            aria-describedby="sc-notes-help"
            placeholder="Type a note, press Enter to stamp it with the time"
            value={draft}
            readOnly={!onDraft}
            tabIndex={onDraft ? undefined : -1}
            onChange={(e) => onDraft?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                onCommit?.();
              }
            }}
          />
          <span id="sc-notes-help" className="sr-only">Enter adds the note at the current recording time. Shift and Enter adds a new line.</span>
        </div>
        <div className="sc-rec-foot">
          By recording, you confirm everyone being transcribed has given consent. The recording is checked against Elsevier sources once you add it.
        </div>
      </div>
    </>
  );
}

function TranscriptView({ title, onTitle, duration, notes, onClose, onAgain }: { title: string; onTitle: (v: string) => void; duration: number; notes: Note[]; onClose: () => void; onAgain: () => void }) {
  const [tab, setTab] = useState<"transcript" | "summary">("transcript");
  const items = buildTranscript(duration, notes);
  const tabKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = tab === "transcript" ? "summary" : "transcript";
      setTab(next);
      (e.currentTarget.parentElement?.querySelector(`#sc-tab-${next}`) as HTMLElement | null)?.focus();
    }
  };
  return (
    <>
      <DialogHead title="Lecture added" onClose={onClose} />
      <div className="sc-rec">
        <TitleRow title={title} placeholder="Lecture title" onTitle={onTitle} />
        <div className="sc-rec-bar">
          <div className="sc-tabs" role="tablist" aria-label="Lecture view">
            {(["transcript", "summary"] as const).map((t) => (
              <button
                key={t}
                id={`sc-tab-${t}`}
                type="button"
                role="tab"
                className="sc-tab"
                aria-selected={tab === t}
                aria-controls="sc-tabpanel"
                tabIndex={tab === t ? 0 : -1}
                onClick={() => setTab(t)}
                onKeyDown={tabKey}
              >
                <Icon name={t === "transcript" ? "microphone" : "openBook"} size={16} /> {t === "transcript" ? "Transcript" : "Summary"}
              </button>
            ))}
          </div>
          <span className="tabular-nums" style={{ color: "var(--sc-text-2)" }}>{fmt(duration)}</span>
        </div>
        <div id="sc-tabpanel" role="tabpanel" aria-labelledby={`sc-tab-${tab}`} style={{ borderTop: "1px solid var(--sc-border-soft)" }}>
          {tab === "transcript" ? (
            <ol className="sc-lines" style={{ padding: "12px 16px", maxHeight: 280 }}>
              {items.map((it, i) => (
                <li key={i} className="sc-tline" data-note={it.note}>
                  <span className="tabular-nums" style={{ color: "var(--sc-text-2)", flex: "0 0 auto" }}>{fmt(it.t)}</span>
                  <span>
                    {it.note && <span className="font-mono-label text-xs" style={{ display: "block", color: "var(--sc-text-2)" }}>Your note</span>}
                    {it.text}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <>
              <div style={{ padding: "12px 16px" }}>
                <div className="font-mono-label text-xs" style={{ color: "var(--sc-text-2)" }}>MEW AI summary</div>
                <ul className="sc-summary">
                  {summary.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div style={{ padding: "12px 16px", borderTop: "1px solid var(--sc-border-soft)" }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono-label text-xs" style={{ color: "var(--sc-text-2)" }}>
                  <span>Checked against Elsevier sources</span>
                  <span>{claims.length} verified · 1 flagged</span>
                </div>
                <ul className="sc-claims">
                  {claims.map((c) => (
                    <li key={c}>
                      <span className="sc-check"><Icon name="check" size={14} /></span>
                      <span style={{ flex: 1 }}>{c}</span>
                      <span className="sr-only">verified</span>
                    </li>
                  ))}
                  <li style={{ flexWrap: "wrap" }}>
                    <span className="sc-check" aria-hidden="true" style={{ background: "var(--sc-stop-bg)", color: "var(--sc-stop-text)", fontWeight: 700, fontSize: 12 }}>!</span>
                    <span style={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>Remove the thyroid first, then treat any pheochromocytoma</span>
                    <span aria-hidden="true" className="font-mono-label text-xs" style={{ padding: "2px 8px", borderRadius: 9999, background: "var(--sc-stop-bg)", color: "var(--sc-stop-text)" }}>Flagged</span>
                    <span className="sr-only">flagged, does not match Elsevier sources</span>
                    <span style={{ flexBasis: "100%", paddingLeft: 30, fontSize: 13, color: "var(--sc-text-2)" }}>Elsevier: treat the pheochromocytoma first, then the thyroid.</span>
                  </li>
                </ul>
              </div>
            </>
          )}
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
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(1);
  const [secs, setSecs] = useState(0);
  const [paused, setPaused] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [autoTitled, setAutoTitled] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [confirming, setConfirming] = useState(false);
  const micRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const keepRef = useRef<HTMLButtonElement>(null);
  const procTimer = useRef<number>();

  const recording = step === 2 && !processing;
  const open = step !== 1;

  useEffect(() => {
    if (!recording || paused) return;
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording, paused]);

  // Auto-title after a few seconds, never over anything the user typed.
  useEffect(() => {
    if (recording && secs >= AUTO_TITLE_AFTER && !titleTouched && !title) {
      setTitle(AUTO_TITLE);
      setAutoTitled(!reduce);
    }
  }, [recording, secs, titleTouched, title, reduce]);

  useEffect(() => () => window.clearTimeout(procTimer.current), []);

  // Focus into the dialog when it opens or changes view; back to the mic on close.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      const d = dialogRef.current;
      if (processing) d?.focus();
      else if (step === 3) d?.querySelector<HTMLElement>(".sc-close")?.focus();
      else if (!wasOpen.current || d?.contains(document.activeElement) === false || document.activeElement === d) d?.querySelector<HTMLElement>(".sc-notes")?.focus();
    } else if (wasOpen.current) micRef.current?.focus();
    wasOpen.current = open;
  }, [open, step, processing]);

  const clearAll = () => {
    window.clearTimeout(procTimer.current);
    setProcessing(false);
    setSecs(0);
    setPaused(false);
    setDuration(0);
    setTitle("");
    setTitleTouched(false);
    setAutoTitled(false);
    setNotes([]);
    setDraft("");
    setConfirming(false);
  };
  const reset = () => {
    clearAll();
    setStep(1);
  };

  const commit = (at = secs) => {
    const text = draft.trim();
    if (!text) return notes;
    const next = [...notes, { t: at, text }];
    setNotes(next);
    setDraft("");
    return next;
  };

  const stop = () => {
    commit(secs);
    setDuration(secs);
    setConfirming(false);
    setProcessing(true);
    procTimer.current = window.setTimeout(() => {
      setProcessing(false);
      setStep(3);
    }, PROCESSING_MS);
  };

  const goTo = (n: Step) => {
    if (n === 1) return reset();
    if (n === 2) {
      if (step === 2 && !processing) return;
      clearAll();
      return setStep(2);
    }
    if (step === 3) return;
    if (step === 2 && !processing) return stop();
    if (step === 1) {
      clearAll();
      setDuration(MIN_DURATION);
      setSecs(MIN_DURATION);
      setTitle(AUTO_TITLE);
      setStep(3);
    }
  };

  // Closing mid-recording asks first when there is something to lose; the transcript is final.
  const requestClose = (fromBackdrop = false) => {
    if (step === 3) return fromBackdrop === true ? undefined : reset();
    if (notes.length || draft.trim() || secs > 0 || title) return setConfirming(true);
    reset();
  };

  useEffect(() => {
    if (confirming) keepRef.current?.focus();
  }, [confirming]);

  // Pull focus back into the dialog if it escapes to the stage (e.g. backdrop click).
  useEffect(() => {
    const stage = stageRef.current;
    if (!open || !stage) return;
    const onIn = (e: FocusEvent) => {
      const d = dialogRef.current;
      if (d && !d.contains(e.target as Node)) (d.querySelector<HTMLElement>(confirming ? "[role='alertdialog'] button" : "button, textarea, input") ?? d).focus();
    };
    stage.addEventListener("focusin", onIn);
    return () => stage.removeEventListener("focusin", onIn);
  }, [open, confirming]);

  const trap = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (confirming) return setConfirming(false);
      return requestClose();
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const f = [...dialogRef.current.querySelectorAll<HTMLElement>("button, textarea, input, [tabindex]:not([tabindex='-1'])")].filter(
      (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
    );
    if (!f.length) return e.preventDefault();
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const onTitle = (v: string) => {
    setTitleTouched(true);
    setAutoTitled(false);
    setTitle(v);
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

      <div ref={stageRef} className="sc-space relative w-full md:min-h-[560px]" style={{ minHeight: 520 }}>
        <div className="sc-sources" {...(open ? { inert: "", "aria-hidden": true } : {})}>
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
          <div className="sc-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) { e.preventDefault(); requestClose(true); } }}>
            <div ref={dialogRef} tabIndex={-1} className="sc-dialog" role="dialog" aria-modal="true" aria-labelledby="sc-rec-title" onKeyDown={trap} style={{ outline: "none" }}>
              {confirming && (
                <div role="alertdialog" aria-labelledby="sc-discard-title" className="mb-4 flex flex-wrap items-center gap-3" style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid var(--sc-border)", background: "var(--sc-surface)" }}>
                  <span id="sc-discard-title" style={{ flex: "1 1 160px", fontWeight: 600 }}>Discard this recording?</span>
                  <button ref={keepRef} type="button" className="sc-pill" style={{ padding: "6px 14px" }} onClick={() => setConfirming(false)}>Keep recording</button>
                  <button type="button" className="sc-pill sc-stop" style={{ padding: "6px 14px" }} onClick={reset}>Discard</button>
                </div>
              )}
              {processing ? (
                <>
                  <DialogHead title="Record a lecture" onClose={() => requestClose()} />
                  <div className="sc-rec sc-processing" role="status" aria-live="polite">
                    <span className="font-mono-label text-xs">Generating transcript…</span>
                  </div>
                </>
              ) : step === 3 ? (
                <TranscriptView title={title} onTitle={onTitle} duration={duration} notes={notes} onClose={reset} onAgain={() => goTo(2)} />
              ) : (
                <Recorder
                  title={title}
                  autoTitled={autoTitled}
                  secs={secs}
                  paused={paused}
                  notes={notes}
                  draft={draft}
                  onTitle={onTitle}
                  onPause={() => setPaused((p) => !p)}
                  onStop={stop}
                  onClose={requestClose}
                  onDraft={setDraft}
                  onCommit={() => commit()}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
