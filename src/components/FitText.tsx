import { CSSProperties, ElementType, ReactNode, useLayoutEffect, useRef, useState } from "react";

interface FitTextProps {
  text: string;
  className?: string;
  /** Upper bound for the computed font size, in px. */
  maxFontSize?: number;
  /** Share of the container width the text should fill (0–1). */
  fill?: number;
  as?: ElementType;
  style?: CSSProperties;
  innerClassName?: string;
  innerStyle?: CSSProperties;
  /** Optional custom rendering of the text (e.g. per-letter animation). */
  children?: ReactNode;
}

/** Single-line text scaled so it spans its container's width. */
const FitText = ({ text, className = "", maxFontSize = 2000, fill = 1, as: Tag = "div", style, innerClassName = "", innerStyle, children }: FitTextProps) => {
  const boxRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const el = textRef.current;
    if (!box || !el) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.scrollWidth;
      const cs = getComputedStyle(box);
      const avail = (box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) * fill;
      const next = w > 0 ? Math.min(maxFontSize, (avail / w) * 100) : 100;
      el.style.fontSize = `${next}px`;
      setFontSize(next);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text, maxFontSize, fill]);

  return (
    <Tag ref={boxRef} className={className} style={style}>
      <span
        ref={textRef}
        className={`inline-block w-max whitespace-nowrap ${innerClassName}`}
        style={{ ...innerStyle, fontSize: `${fontSize}px` }}
        aria-label={children ? text : undefined}
      >
        {children ?? text}
      </span>
    </Tag>
  );
};

export default FitText;
