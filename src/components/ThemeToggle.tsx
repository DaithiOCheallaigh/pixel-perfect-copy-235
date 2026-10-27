import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const [dark, setDark] = useState(() => typeof document === "undefined" || document.documentElement.classList.contains("dark"));

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-primary ${className}`}
    >
      {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
