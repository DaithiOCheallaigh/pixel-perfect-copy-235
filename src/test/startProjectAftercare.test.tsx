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

beforeAll(() => {
  // embla-carousel (the phone layout) observes slide sizes and visibility; jsdom has neither observer.
  const Noop = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
  const g = globalThis as unknown as { ResizeObserver?: unknown; IntersectionObserver?: unknown };
  if (typeof g.ResizeObserver === "undefined") g.ResizeObserver = Noop;
  if (typeof g.IntersectionObserver === "undefined") g.IntersectionObserver = Noop;
});

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
  if (!found) throw new Error(`Missing button: ${label}`);
  return found;
};
const byLabel = (label: string): HTMLButtonElement => {
  const el = container.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
  if (!el) throw new Error(`Missing button: ${label}`);
  return el;
};
/** The option cards are the selectors: "Select: <name>" picks, "Selected: <name>" clears. */
const select = (name: string) => byLabel(`Select: ${name}`);
const selected = (name: string) => byLabel(`Selected: ${name}`);
const click = (item: HTMLButtonElement) => act(() => item.click());

const open = (ids: unknown[] = []) => {
  sessionStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(ids));
  render();
};
const saved = (): string[] => JSON.parse(sessionStorage.getItem(SELECTION_STORAGE_KEY) ?? "[]");

beforeEach(() => sessionStorage.clear());
afterEach(cleanup);

describe("enquiry aftercare choices", () => {
  it("adds Growth to Launch and prices setup and monthly separately", () => {
    open(["launch"]);
    click(select("Growth"));
    expect(saved()).toEqual(["launch", "growth"]);
    expect(selectionTotals(selectionItems(saved().map((id) => ({ id }))))).toEqual({ oneOff: 750, monthly: 200 });
  });

  it("replaces existing aftercare while keeping the website", () => {
    open(["business-8", "self-managed"]);
    click(select("Growth"));
    expect(saved()).toEqual(["business-8", "growth"]);
    click(select("Care"));
    expect(saved()).toEqual(["business-8", "care"]);
  });

  it("clears an active option without removing the website", () => {
    open(["launch", "growth"]);
    click(selected("Growth"));
    expect(saved()).toEqual(["launch"]);
  });

  it("allows aftercare without a website and restores it after remount", () => {
    open();
    click(select("Growth"));
    expect(saved()).toEqual(["growth"]);
    cleanup();
    render();
    expect(selected("Growth")).toHaveAttribute("aria-pressed", "true");
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
    expect(legends.some((l) => /^1\. Website · \d of 3$/.test(l ?? ""))).toBe(true);
    expect(legends.some((l) => /^2\. Care plans · \d of 4$/.test(l ?? ""))).toBe(true);
    expect(legends.some((l) => l?.startsWith("Once it's live"))).toBe(false);
  });
  it("shows every option as a slide on one Mosaic surface, with no pills or (i) toggle", () => {
    open(["growth"]);
    const surface = container.querySelector('[data-testid="sp-options"]')!;
    // jsdom has no WebGL, so the shared backdrop renders its static fallback.
    expect(surface.querySelectorAll('[data-testid="sp-mosaic"]')).toHaveLength(1);
    expect(surface.querySelector('[data-testid="sp-mosaic"]')?.getAttribute("data-shader")).toBe("off");
    const website = container.querySelector("#sp-website")!;
    const care = container.querySelector("#sp-aftercare")!;
    expect(website.querySelectorAll("article")).toHaveLength(3);
    expect(care.querySelectorAll("article")).toHaveLength(4);
    expect(website.querySelector("legend")?.textContent).toBe("1. Website · 1 of 3");
    expect(website.querySelectorAll('[aria-roledescription="slide"]')).toHaveLength(3);
    expect(website.querySelectorAll('button[aria-label="Previous option"]')).toHaveLength(1);
    expect(website.textContent).toContain("1-page site");
    expect(website.textContent).toContain("Every old address redirected so you keep your Google rankings");
    expect(website.textContent).toContain("or €70/mo + VAT × 12");
    expect(care.querySelector("legend")?.textContent).toMatch(/^2\. Care plans · \d of 4$/);
    expect(care.querySelectorAll('[aria-roledescription="slide"]')).toHaveLength(4);
    expect(care.querySelectorAll("article")[0].textContent).toContain("30-minute handover call and a short written guide");
    expect(care.textContent).toContain("Most popular");
    expect(container.querySelector('button[aria-label^="Show "]')).toBeNull();
    expect(Array.from(container.querySelectorAll("button")).some((b) => b.textContent === "Launch · €750")).toBe(false);
    expect(container.textContent).not.toContain("Aftercare ·");
  });
  it("keeps the same one-card sliders inside the phone drawer", () => {
    const width = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 390 });
    try {
      open(["business", "growth"]);
      click(byLabel("Adjust package: Business Site · 5 pages · Growth"));
      const slides = document.querySelectorAll('[aria-roledescription="slide"]');
      expect(slides).toHaveLength(7);
      expect(document.querySelectorAll('button[aria-label="Previous option"]')).toHaveLength(2);
      expect(document.querySelectorAll('[data-testid="sp-mosaic"]')).toHaveLength(1);
    } finally {
      Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: width });
    }
  });
});
describe("enquiry website choices", () => {
  it("swaps a stored Business option for Launch, keeping aftercare", () => {
    open(["business-8", "growth"]);
    click(select("Launch"));
    expect(new Set(saved())).toEqual(new Set(["launch", "growth"]));
    expect(selected("Launch").getAttribute("aria-pressed")).toBe("true");
  });
  it("selects Business Site then 8 pages", () => {
    open();
    click(select("Business Site"));
    expect(saved()).toEqual(["business"]);
    const selectEl = container.querySelector<HTMLSelectElement>('select[aria-label="Pages"]')!;
    act(() => { selectEl.value = "8"; selectEl.dispatchEvent(new Event("change", { bubbles: true })); });
    expect(saved()).toEqual(["business-8"]);
    expect(container.querySelector("#sp-website")!.textContent).toContain("€4,000 + VAT");
    expect(container.querySelector("#sp-website")!.textContent).toContain("Booking or CRM integration");
  });
  it("clears the website from its own card", () => {
    open(["refresh", "care"]);
    click(selected("Website Refresh"));
    expect(saved()).toEqual(["care"]);
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
