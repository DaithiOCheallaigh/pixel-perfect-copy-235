import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import StartProject, { WELCOME_REVEAL_TIMING } from "@/pages/StartProject";
import { DISCOUNT_STORAGE_KEY, SELECTION_STORAGE_KEY, selectionItems, selectionTotals } from "@/data/serviceEstimates";
import { queueReveal, storeUnlock, WELCOME_REVEAL_KEY } from "@/lib/welcomeOffer";

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

describe("enquiry submit", () => {
  const fill = (selector: string, value: string) => {
    const el = container.querySelector<HTMLInputElement>(selector)!;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    act(() => { setter.call(el, value); el.dispatchEvent(new Event("input", { bubbles: true })); });
  };
  const fillRequired = () => {
    fill("#sp-fullName", "Test Person");
    fill("#sp-email", "test@example.com");
    fill("#sp-companyName", "Test Co");
  };
  afterEach(() => vi.unstubAllGlobals());

  it.each([["launch", ["Landing Page"]], ["refresh", ["Redesign"]], ["business-8", ["New Website"]]])("sends projectTypes for %s without industry or source", async (id, types) => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);
    open([id]);
    fillRequired();
    await act(async () => { button("Submit Enquiry →").click(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const { formData } = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(formData.projectTypes).toEqual(types);
    expect(formData).not.toHaveProperty("industry");
    expect(formData).not.toHaveProperty("source");
    expect(formData).not.toHaveProperty("competitorUrls");
  });
  it("keeps Submit aria-disabled until the required fields are filled and shows errors when tapped early", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    open(["launch"]);
    const cta = button("Submit Enquiry →");
    expect(cta.getAttribute("aria-disabled")).toBe("true");
    expect(cta.disabled).toBe(false);
    click(cta);
    expect(container.querySelector("#sp-fullName-error")?.textContent).toBe("Required");
    expect(fetchMock).not.toHaveBeenCalled();
    fillRequired();
    expect(button("Submit Enquiry →").getAttribute("aria-disabled")).toBeNull();
  });
  it("is a single step with no project or budget questions", () => {
    open(["launch"]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.textContent).not.toMatch(/Step \d of/);
    expect(container.textContent).not.toContain("Budget");
    expect(container.textContent).not.toContain("Industry");
  });
});

describe("welcome offer on the enquiry page", () => {
  const input = () => container.querySelector<HTMLInputElement>("#sp-discount")!;
  const sweep = () => container.querySelector('[data-testid="discount-sweep"]');
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
  afterEach(() => vi.useRealTimers());

  it("pre-fills a code unlocked on an earlier visit and explains the all-in discount", () => {
    storeUnlock("LACUNA10");
    open(["business", "growth"]);
    expect(input().value).toBe("LACUNA10");
    expect(container.textContent).toContain("Welcome offer applied: 10% off your website and care plan for the duration of your contract.");
    expect(container.textContent).not.toContain("adds a further");
    expect(container.textContent).toContain("Setup €2,250 + VAT");
    expect(container.textContent).toContain("Monthly €180/mo + VAT €200/mo");
    expect(container.textContent).toContain("You save €250 on setup and €20/mo (10% off)");
  });
  it("prefers a code already typed this session over the unlocked one", () => {
    storeUnlock("LACUNA10");
    sessionStorage.setItem(DISCOUNT_STORAGE_KEY, "matesrates");
    open(["business"]);
    expect(input().value).toBe("matesrates");
    expect(container.textContent).toContain("You save €375 (15% off the website)");
  });
  it("types a queued code in, hides the status while typing, then sweeps once", () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    const { startMs, perCharMs, sweepMs } = WELCOME_REVEAL_TIMING;
    queueReveal("LACUNA10");
    open(["business", "growth"]);
    expect(sessionStorage.getItem(WELCOME_REVEAL_KEY)).toBeNull();
    expect(input().value).toBe("");
    act(() => { vi.advanceTimersByTime(startMs + perCharMs * 3); });
    expect(input().value).toBe("LACU");
    expect(container.textContent).not.toContain("Code not recognised.");
    expect(sweep()).toBeNull();
    act(() => { vi.advanceTimersByTime(perCharMs * 5); });
    expect(input().value).toBe("LACUNA10");
    expect(sweep()).not.toBeNull();
    expect(container.textContent).toContain("Welcome offer applied");
    act(() => { vi.advanceTimersByTime(sweepMs); });
    expect(sweep()).toBeNull();
    expect(input().value).toBe("LACUNA10");
    expect(sessionStorage.getItem(DISCOUNT_STORAGE_KEY)).toBe("LACUNA10");
  });
});

describe("package tier details", () => {
  beforeAll(() => {
    // embla-carousel observes slide sizes and visibility; jsdom has neither observer.
    const Noop = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
    const g = globalThis as unknown as { ResizeObserver?: unknown; IntersectionObserver?: unknown };
    if (typeof g.ResizeObserver === "undefined") g.ResizeObserver = Noop;
    if (typeof g.IntersectionObserver === "undefined") g.IntersectionObserver = Noop;
  });
  const byLabel = (label: string): HTMLButtonElement => {
    const el = container.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
    if (!el) throw new Error(`Missing button: ${label}`);
    return el;
  };

  it("hides the tier details until the (i) button is pressed, then lets a slide select the website", () => {
    open(["growth"]);
    expect(container.textContent).not.toContain("1-page site");
    const toggle = byLabel("Show website package details");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("aria-controls")).toBe("sp-website-details");
    click(toggle);
    expect(byLabel("Hide website package details").getAttribute("aria-expanded")).toBe("true");
    const details = container.querySelector("#sp-website-details")!;
    // Same always-dark Mosaic surface as the welcome popup; jsdom has no WebGL so the static fallback renders.
    expect(details.querySelector('[data-testid="sp-website-backdrop"]')?.getAttribute("data-shader")).toBe("off");
    expect(details.textContent).toContain("Website · 1 of 3");
    expect(details.textContent).toContain("1-page site");
    expect(details.textContent).toContain("Every old address redirected so you keep your Google rankings");
    expect(details.textContent).toContain("Up to 5 pages");
    expect(details.textContent).toContain("or €70/mo + VAT × 12");
    expect(details.querySelectorAll('[aria-roledescription="slide"]')).toHaveLength(3);
    click(byLabel("Select: Launch"));
    expect(saved()).toEqual(["growth", "launch"]);
    expect(byLabel("Selected: Launch").getAttribute("aria-pressed")).toBe("true");
    expect(button("Launch · €750").getAttribute("aria-pressed")).toBe("true");
    click(byLabel("Hide website package details"));
    expect(byLabel("Show website package details").getAttribute("aria-expanded")).toBe("false");
  });

  it("shows the care plan details with the self-managed handover first and selects from a slide", () => {
    open(["business"]);
    click(byLabel("Show care plan details"));
    const details = container.querySelector("#sp-aftercare-details")!;
    const slides = Array.from(details.querySelectorAll('[aria-roledescription="slide"]'));
    expect(slides).toHaveLength(4);
    expect(slides[0].textContent).toContain("Aftercare · 1 of 4");
    expect(slides[0].textContent).toContain("30-minute handover call and a short written guide");
    expect(details.textContent).toContain("Everything in Growth");
    expect(details.textContent).toContain("Most popular");
    click(byLabel("Select: Growth"));
    expect(saved()).toEqual(["business", "growth"]);
    expect(growth().getAttribute("aria-pressed")).toBe("true");
    click(byLabel("Selected: Growth"));
    expect(saved()).toEqual(["business"]);
  });

  it("keeps the Business pages control in the Business slide", () => {
    open(["business-8"]);
    click(byLabel("Show website package details"));
    const details = container.querySelector("#sp-website-details")!;
    expect(details.textContent).toContain("€4,000 + VAT");
    expect(details.textContent).toContain("Booking or CRM integration");
    const select = details.querySelector<HTMLSelectElement>('select[aria-label="Pages"]')!;
    act(() => { select.value = "10"; select.dispatchEvent(new Event("change", { bubbles: true })); });
    expect(saved()).toEqual(["business-10"]);
    expect(details.textContent).toContain("€5,000 + VAT");
  });
});
