import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import "./spark-components.css";

const lines = [
  "Today we are covering multiple endocrine neoplasia, and the exam angle is matching the syndrome to its gene and its tumours.",
  "MEN1 is the menin gene on chromosome 11: think parathyroid, pancreas and pituitary.",
  "MEN2A and MEN2B are RET syndromes. Both bring medullary thyroid carcinoma and pheochromocytoma.",
  "MEN2A adds parathyroid disease. MEN2B has mucosal neuromas and a marfanoid habitus, but no hyperparathyroidism.",
  "In MEN2A, remove the thyroid first, then deal with any pheochromocytoma.",
  "Screen first-degree relatives with gene testing, and time the prophylactic thyroidectomy by the RET mutation.",
];

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const steps = ["Start", "Record", "Transcript"] as const;

export default function RecordFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [secs, setSecs] = useState(0);
  const [paused, setPaused] = useState(false);
  const [notes, setNotes] = useState("");
  const listRef = useRef<HTMLOListElement>(null);

  const recording = step !== 1;

  useEffect(() => {
    if (!recording || paused) return;
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording, paused]);

  const shown = Math.min(lines.length, Math.floor(secs / 3) + 1);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, step]);

  const reset = () => {
    setStep(1);
    setSecs(0);
    setPaused(false);
    setNotes("");
  };

  const goTo = (n: 1 | 2 | 3) => {
    if (n === 1) return reset();
    if (n === 3) setSecs((s) => (step === 1 || s < 15 ? 15 : s));
    if (n === 2 && step === 1) setSecs(0);
    setStep(n);
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center gap-2" aria-label="Steps">
        {steps.map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3;
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

      <div className="flex w-full items-center justify-center md:min-h-[440px]" style={{ minHeight: 360 }}>
        {step === 1 ? (
          <div className="flex flex-col items-center gap-3">
            <button type="button" className="sc-btn sc-mic" aria-label="Record lecture" title="Record lecture" onClick={() => goTo(2)}>
              <Icon name="microphone" />
            </button>
            <span className="font-mono-label text-xs" style={{ color: "var(--sc-text-2)" }}>Record lecture</span>
          </div>
        ) : (
          <div className="sc-dialog" role="dialog" aria-label="Record a lecture">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h4 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Record a lecture</h4>
              <button type="button" className="sc-btn sc-close" aria-label="Close recorder" onClick={reset}>
                <Icon name="close" />
              </button>
            </div>
            <div className="sc-rec">
              <div className="sc-rec-head">
                <Icon name="calendar" />
                <span>Lecture<span style={{ color: "var(--sc-text-2)" }}> @Today</span></span>
              </div>
              <div className="sc-rec-bar">
                <div className="sc-tabs" role="tablist" aria-label="Recorder view">
                  <button type="button" role="tab" className="sc-tab" aria-selected={step === 2} onClick={() => setStep(2)}>
                    <Icon name="edit" size={16} /> Notes
                  </button>
                  <button type="button" role="tab" className="sc-tab" aria-selected={step === 3} onClick={() => setStep(3)}>
                    <Icon name="microphone" size={16} /> Transcript
                  </button>
                </div>
                <div className="sc-wave" data-paused={paused} aria-hidden="true">
                  {Array.from({ length: 36 }, (_, i) => (
                    <span key={i} style={{ height: `${30 + ((i * 37) % 60)}%`, animationDelay: `${(i * 97) % 700}ms` }} />
                  ))}
                </div>
                <span role="timer" className="tabular-nums" aria-label={`Recording time ${fmt(secs)}`}>{fmt(secs)}</span>
                <button type="button" className="sc-pill" onClick={() => setPaused((p) => !p)}>{paused ? "Resume" : "Pause"}</button>
                <button type="button" className="sc-pill sc-stop" onClick={reset}>Stop</button>
              </div>
              <div className="sc-rec-body" role="tabpanel">
                {step === 2 ? (
                  <textarea
                    className="sc-notes"
                    aria-label="Your notes"
                    placeholder="MEW AI will summarize the notes and transcript"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                ) : (
                  <ol ref={listRef} className="sc-lines" aria-live="polite">
                    {lines.slice(0, shown).map((line, i) => (
                      <li key={i} className="sc-line">
                        <span className="tabular-nums" style={{ color: "var(--sc-text-2)" }}>{fmt(i * 3)}</span> {line}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              <div className="sc-rec-foot">
                By recording, you confirm everyone being transcribed has given consent. The recording is checked against Elsevier sources once you add it.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
