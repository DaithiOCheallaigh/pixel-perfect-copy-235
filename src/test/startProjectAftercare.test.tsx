import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import StartProject from "@/pages/StartProject";
import { DISCOUNT_STORAGE_KEY, SELECTION_STORAGE_KEY, selectionItems, selectionTotals } from "@/data/serviceEstimates";

vi.mock("@/components/SEO", () => ({ SEO: () => null }));
vi.mock("@/components/services/BusinessPagesSelect", () => ({
  BusinessPagesSelect: ({ pages, onChange }: { pages: number; onChange: (p: number) => void }) => (
    <select aria-label="Pages" value={pages} onChange={(e) => onChange(Number(e.target.value))}>{[5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n}</option>)}</select>
  ),
}));
vi.mock("@/lib/submitLead", () => ({ submitLead: vi.fn() }));

let root: Root | undefined;
let container: HTMLDivElement;
const render = () => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root?.render(<MemoryRouter><StartProject /></MemoryRouter>));
};
const cleanup = () => {
  act(() => root?.unmount());
  container?.remove();
};
const button = (label: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll("button")).find((item) => item.textContent === label);
  if (!found) throw new Error(`Missing aftercare option: ${label}`);
  return found;
};
const click = (item: HTMLButtonElement) => act(() => item.click());

const open = (ids: unknown[] = []) => {
  sessionStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(ids));
  render();
};
const saved = (): string[] => JSON.parse(sessionStorage.getItem(SELECTION_STORAGE_KEY) ?? "[]");
const growth = () => button("Growth · €200/mo");

beforeEach(() => sessionStorage.clear());
afterEach(cleanup);

describe("enquiry aftercare choices", () => {
  it("adds Growth to Launch and prices setup and monthly separately", () => {
    open(["launch"]);
    click(growth());
    expect(saved()).toEqual(["launch", "growth"]);
    expect(selectionTotals(selectionItems(saved().map((id) => ({ id }))))).toEqual({ oneOff: 750, monthly: 200 });
  });

  it("replaces existing aftercare while keeping the website", () => {
    open(["business-8", "self-managed"]);
    click(growth());
    expect(saved()).toEqual(["business-8", "growth"]);
    click(button("Care · €65/mo"));
    expect(saved()).toEqual(["business-8", "care"]);
  });

  it("clears an active option without removing the website", () => {
    open(["launch", "growth"]);
    click(growth());
    expect(saved()).toEqual(["launch"]);
  });

  it("allows aftercare without a website and restores it after remount", () => {
    open();
    click(growth());
    expect(saved()).toEqual(["growth"]);
    cleanup();
    render();
    expect(growth()).toHaveAttribute("aria-pressed", "true");
    expect(selectionTotals(selectionItems(saved().map((id) => ({ id }))))).toEqual({ oneOff: 0, monthly: 200 });
  });

  it("reads only string IDs from storage", () => {
    open(["launch", 123, null, { id: "care" }]);
    expect(saved()).toEqual(["launch"]);
  });
});
describe("enquiry discount code", () => {
  const type = (value: string) => {
    const input = container.querySelector<HTMLInputElement>("#sp-discount")!;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    act(() => { setter.call(input, value); input.dispatchEvent(new Event("input", { bubbles: true })); });
  };
  it("stores a valid code and confirms it", () => {
    open(["business", "growth"]);
    type("matesrates");
    expect(sessionStorage.getItem(DISCOUNT_STORAGE_KEY)).toBe("matesrates");
    expect(container.textContent).toContain("Mates rates applied");
  });
  it("flags an unknown code", () => {
    open(["business"]);
    type("xyz");
    expect(container.textContent).toContain("Code not recognised.");
  });
});
describe("enquiry website choices", () => {
  it("swaps a stored Business option for Launch, keeping aftercare", () => {
    open(["business-8", "growth"]);
    click(button("Launch · €750"));
    expect(new Set(saved())).toEqual(new Set(["launch", "growth"]));
  });
  it("selects Business Site then 8 pages", () => {
    open();
    click(button("Business Site · €2,500"));
    expect(saved()).toEqual(["business"]);
    const select = container.querySelector<HTMLSelectElement>('select[aria-label="Pages"]')!;
    act(() => { select.value = "8"; select.dispatchEvent(new Event("change", { bubbles: true })); });
    expect(saved()).toEqual(["business-8"]);
  });
  it("shows the contact email in the panel footer", () => {
    open();
    expect(container.querySelector('section[aria-label="Your selected package"]')!.textContent).toContain("info@lacunadigital.io");
  });
});
