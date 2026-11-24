import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { DiscountPopup } from "@/components/services/DiscountPopup";
import { dismissedRecently, readUnlockedCode, storeDismiss, storeUnlock, WELCOME_DISMISS_KEY, WELCOME_REVEAL_KEY, WELCOME_SHOWN_KEY } from "@/lib/welcomeOffer";
import { DISCOUNT_STORAGE_KEY } from "@/data/serviceEstimates";

const Where = () => <p data-testid="where">{useLocation().pathname}</p>;
let root: Root | undefined;
let container: HTMLDivElement;
const render = (delayMs: number) => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root?.render(
    <MemoryRouter initialEntries={["/services"]}>
      <Routes>
        <Route path="/services" element={<><DiscountPopup delayMs={delayMs} /><Where /></>} />
        <Route path="/services/start-project" element={<Where />} />
      </Routes>
    </MemoryRouter>,
  ));
};
const cleanup = () => { act(() => root?.unmount()); container?.remove(); };
const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]');
const where = () => container.querySelector('[data-testid="where"]')?.textContent;
const setValue = (el: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
  act(() => { setter.call(el, value); el.dispatchEvent(new Event("input", { bubbles: true })); });
};
const emailInput = () => document.querySelector<HTMLInputElement>("#welcome-email")!;
const findButton = (text: string) => Array.from(document.querySelectorAll("button")).find((b) => b.textContent?.startsWith(text))!;
const show = (delayMs = 100) => { render(delayMs); act(() => { vi.advanceTimersByTime(delayMs); }); };

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] }); });
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("welcome offer popup", () => {
  it("opens after the delay and never prints the code", () => {
    render(1000);
    expect(dialog()).toBeNull();
    act(() => { vi.advanceTimersByTime(999); });
    expect(dialog()).toBeNull();
    act(() => { vi.advanceTimersByTime(1); });
    expect(dialog()).not.toBeNull();
    expect(dialog()!.textContent).toContain("10% off, for the duration of your contract.");
    expect(dialog()!.textContent).toContain("Unlock my 10% code");
    expect(dialog()!.textContent).not.toContain("LACUNA10");
    expect(sessionStorage.getItem(WELCOME_SHOWN_KEY)).toBe("1");
  });
  it.each([
    ["already unlocked", () => storeUnlock("LACUNA10")],
    ["dismissed recently", () => storeDismiss()],
    ["shown in this tab", () => sessionStorage.setItem(WELCOME_SHOWN_KEY, "1")],
    ["a code is already entered", () => sessionStorage.setItem(DISCOUNT_STORAGE_KEY, "matesrates")],
  ])("stays closed when %s", (_label, setup) => {
    setup();
    render(100);
    act(() => { vi.advanceTimersByTime(5000); });
    expect(dialog()).toBeNull();
  });
  it("remembers a dismissal for two weeks", () => {
    show();
    act(() => findButton("No thanks").click());
    expect(dialog()).toBeNull();
    const at = Date.parse(localStorage.getItem(WELCOME_DISMISS_KEY) ?? "");
    expect(at).toBeGreaterThan(0);
    expect(dismissedRecently(at + 13 * 86_400_000)).toBe(true);
    expect(dismissedRecently(at + 15 * 86_400_000)).toBe(false);
  });
  it("rejects a bad email without calling the function", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    show();
    setValue(emailInput(), "nope");
    act(() => findButton("Unlock my 10% code").click());
    expect(document.getElementById("welcome-email-error")?.textContent).toBe("Enter a valid email address");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(dialog()).not.toBeNull();
  });
  it("emails Dave, stores the unlock, queues the reveal and goes to the enquiry page", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);
    show();
    setValue(emailInput(), " jane@example.ie ");
    await act(async () => { findButton("Unlock my 10% code").click(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toMatch(/\/functions\/v1\/send-discount-unlock$/);
    expect(init.headers.apikey).toBeTruthy();
    expect(JSON.parse(init.body)).toEqual({ email: "jane@example.ie", company_website: "", page: "/services" });
    expect(readUnlockedCode()).toBe("LACUNA10");
    expect(sessionStorage.getItem(WELCOME_REVEAL_KEY)).toBe("LACUNA10");
    expect(where()).toBe("/services/start-project");
    expect(dialog()).toBeNull();
    expect(localStorage.getItem(WELCOME_DISMISS_KEY)).toBeNull();
  });
  it("keeps the popup open with an error when the email cannot be sent", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500, text: async () => "boom" });
    vi.stubGlobal("fetch", fetchMock);
    show();
    setValue(emailInput(), "jane@example.ie");
    await act(async () => { findButton("Unlock my 10% code").click(); });
    expect(dialog()).not.toBeNull();
    expect(document.getElementById("welcome-email-error")?.textContent).toContain("That didn't send");
    expect(readUnlockedCode()).toBeUndefined();
    expect(sessionStorage.getItem(WELCOME_REVEAL_KEY)).toBeNull();
    expect(where()).toBe("/services");
  });
});