import { useEffect, useState } from "react";

export const KEYBOARD_THRESHOLD = 120;

/** Space between the bottom of the layout viewport and the visible (visual) viewport, e.g. an on-screen keyboard. */
export const computeBottomOffset = (innerHeight: number, vv?: { offsetTop: number; height: number } | null) =>
  vv ? Math.max(0, Math.round(innerHeight - (vv.offsetTop + vv.height))) : 0;

export function useVisualViewport() {
  const [bottomOffset, setBottomOffset] = useState(() =>
    typeof window === "undefined" ? 0 : computeBottomOffset(window.innerHeight, window.visualViewport),
  );
  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => setBottomOffset(computeBottomOffset(window.innerHeight, window.visualViewport));
    update();
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return { bottomOffset, keyboardOpen: bottomOffset > KEYBOARD_THRESHOLD };
}
