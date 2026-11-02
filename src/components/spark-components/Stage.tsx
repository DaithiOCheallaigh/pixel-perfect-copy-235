import { useState, type ReactNode } from "react";
import "./spark-components.css";

/** Scoped light/dark panel for prototype components; never touches site tokens. */
export function Stage({ children, label }: { children: ReactNode; label: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <div data-stage-theme={theme} className="sc-stage relative overflow-hidden rounded-2xl border border-border p-6 pt-16 md:p-14 md:pt-16">
      <div role="group" aria-label={`${label} stage theme`} className="absolute right-4 top-4 flex rounded-full p-1" style={{ background: "var(--sc-surface)", border: "1px solid var(--sc-border)" }}>
        {(["light", "dark"] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={theme === t}
            onClick={() => setTheme(t)}
            className="sc-pill font-mono-label text-xs capitalize"
            style={theme === t ? { background: "var(--sc-text)", color: "var(--sc-surface)", borderRadius: 9999 } : { background: "transparent", color: "var(--sc-text-2)", borderRadius: 9999 }}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
