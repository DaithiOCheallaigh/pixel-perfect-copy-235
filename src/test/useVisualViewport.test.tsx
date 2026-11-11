import { afterEach, describe, expect, it } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { computeBottomOffset, useVisualViewport } from "@/hooks/use-visual-viewport";

let root: Root | undefined;
afterEach(() => { act(() => root?.unmount()); delete (window as { visualViewport?: unknown }).visualViewport; });

describe("visual viewport offset", () => {
  it("reports a 400px keyboard as open", () => {
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
    Object.defineProperty(window, "visualViewport", { configurable: true, value: Object.assign(new EventTarget(), { offsetTop: 0, height: 400 }) });
    let result = { bottomOffset: -1, keyboardOpen: false };
    const Probe = () => { result = useVisualViewport(); return null; };
    const el = document.createElement("div");
    root = createRoot(el);
    act(() => root!.render(<Probe />));
    expect(result).toEqual({ bottomOffset: 400, keyboardOpen: true });
  });
  it("is closed with no gap and never negative", () => {
    expect(computeBottomOffset(800, { offsetTop: 0, height: 800 })).toBe(0);
    expect(computeBottomOffset(800, { offsetTop: 10, height: 900 })).toBe(0);
    expect(computeBottomOffset(800, { offsetTop: 0, height: 700 })).toBe(100);
  });
});
