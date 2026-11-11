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
vi.mock("@/components/ui/select", () => ({
  Select: ({ value, onValueChange, children }: { value?: string; onValueChange: (v: string) => void; children: React.ReactNode }) => (
    <select data-native-select value={value ?? ""} onChange={(e) => onValueChange(e.target.value)}><option value="" />{children}</select>
  ),
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) => <option value={value}>{children}</option>,
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
  it("invites a care plan when no bonus plan is chosen", () => {
    open(["business", "self-managed"]);
    type("matesrates");
    expect(container.textContent).toContain("Mates rates applied: 15% off website packages. Select a care plan for a further discount.");
    expect(container.textContent).not.toContain("Care plans are not discounted.");
  });
  it("names the bonus plan and the combined discount", () => {
    open(["business", "growth"]);
    type("matesrates");
    expect(container.textContent).toContain("Mates rates applied: 15% off website packages. Your Growth plan adds a further 10%: 25% off in total.");
  });
  it("ticks the input only for an accepted code", () => {
    open(["business"]);
    expect(container.querySelector("#sp-discount + svg")).toBeNull();
    type("matesrates");
    expect(container.querySelector("#sp-discount + svg")).not.toBeNull();
    type("xyz");
    expect(container.querySelector("#sp-discount + svg")).toBeNull();
  });
});
describe("enquiry package panel", () => {
  it("heads the panel with an h2 and numbers its groups", () => {
    open();
    expect(Array.from(container.querySelectorAll("h2")).some((h) => h.textContent === "Your package")).toBe(true);
    const legends = Array.from(container.querySelectorAll("legend")).map((l) => l.textContent?.trim());
    expect(legends).toContain("1. Website");
    expect(legends).toContain("2. Care plans");
    expect(legends).not.toContain("Once it's live, who looks after it?");
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

describe("enquiry step 2", () => {
  const fill = (selector: string, value: string) => {
    const el = container.querySelector<HTMLInputElement>(selector)!;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    act(() => { setter.call(el, value); el.dispatchEvent(new Event("input", { bubbles: true })); });
  };
  const settle = () => act(() => new Promise((r) => setTimeout(r, 700)));
  const toStep2 = async () => {
    fill("#sp-fullName", "Test Person");
    fill("#sp-email", "test@example.com");
    fill("#sp-companyName", "Test Co");
    container.querySelectorAll<HTMLSelectElement>("select[data-native-select]").forEach((sel) => {
      act(() => { sel.value = sel.options[1].value; sel.dispatchEvent(new Event("change", { bubbles: true })); });
    });
    click(button("Continue →"));
    await settle();
  };
  const pressed = (label: string) => button(label).getAttribute("aria-pressed");

  it.each([["launch", "Landing Page"], ["refresh", "Redesign"], ["business-8", "New Website"]])("pre-fills the project type for %s", async (id, type) => {
    open([id]);
    await toStep2();
    expect(pressed(type)).toBe("true");
  });
  it("keeps a manual project type when the website changes", async () => {
    open(["launch"]);
    await toStep2();
    click(button("Web App"));
    click(button("← Back"));
    await settle();
    click(Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.startsWith("Website Refresh"))!);
    click(button("Continue →"));
    await settle();
    expect(pressed("Web App")).toBe("true");
    expect(pressed("Landing Page")).toBe("true");
    expect(pressed("Redesign")).toBe("false");
  });
  it("keeps Continue aria-disabled until step 1 is filled and shows errors when tapped early", async () => {
    open(["launch"]);
    const cta = button("Continue →");
    expect(cta.getAttribute("aria-disabled")).toBe("true");
    expect(cta.disabled).toBe(false);
    click(cta);
    expect(container.querySelector("#sp-fullName-error")?.textContent).toBe("Required");
    expect(container.textContent).toContain("Step 1 of 2");
    fill("#sp-fullName", "Test Person");
    fill("#sp-email", "test@example.com");
    fill("#sp-companyName", "Test Co");
    container.querySelectorAll<HTMLSelectElement>("select[data-native-select]").forEach((sel) => {
      act(() => { sel.value = sel.options[1].value; sel.dispatchEvent(new Event("change", { bubbles: true })); });
    });
    expect(button("Continue →").getAttribute("aria-disabled")).toBeNull();
  });
  it("has no budget step and is two steps long", async () => {
    open(["launch"]);
    await toStep2();
    expect(container.textContent).toContain("Step 2 of 2 — Your Project");
    expect(Array.from(container.querySelectorAll("legend")).some((l) => /budget/i.test(l.textContent ?? ""))).toBe(false);
    expect(container.textContent).not.toContain("Budget");
  });
});
