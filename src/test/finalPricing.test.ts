import { describe, expect, it } from "vitest";
import { selectionSummary, selectionTotals, selectionPrice } from "@/data/serviceEstimates";
import { BUDGET_OPTIONS, INDUSTRIES } from "@/data/projectIntake";
import { CONTENT_PAUSE_WORKING_DAYS, REVISION_WINDOW_WORKING_DAYS } from "@/data/workingTerms";
import { terms } from "@/data/pricing";

describe("Final pricing rules", () => {
  it("prices a tier, add-ons and care plan with setup and monthly kept separate", () => {
    expect(selectionTotals([{ id: "business" }, { id: "gbp" }, { id: "ai-assistant" }, { id: "growth" }])).toEqual({ oneOff: 3450, monthly: 300 });
  });
  it("labels setup and monthly selection estimates with VAT", () => {
    expect(selectionPrice([{ id: "launch" }, { id: "ai-assistant" }])).toBe("from €1,350 + €100/mo + VAT");
  });
  it("keeps receptionist setup and monthly fees separate", () => expect(selectionTotals([{ id: "ai-receptionist" }])).toEqual({ oneOff: 950, monthly: 250 }));
  it("includes social posting separately", () => expect(selectionTotals([{ id: "social" }])).toEqual({ oneOff: 350, monthly: 200 }));
  it("does not count optional Launch instalments as extra recurring charges", () => expect(selectionTotals([{ id: "launch" }])).toEqual({ oneOff: 750, monthly: 0 }));
  it("prices care plans as monthly only", () => expect(selectionTotals([{ id: "growth-ai" }])).toEqual({ oneOff: 0, monthly: 350 }));
  it("ignores unknown service IDs", () => expect(selectionTotals([{ id: "unknown" }])).toEqual({ oneOff: 0, monthly: 0 }));
  it("writes a human-readable summary with separate totals", () => {
    expect(selectionSummary([{ id: "business" }, { id: "growth" }])).toBe("Selected package:\n- Business Site website: €2,500 + VAT\n- Growth care plan: €200/mo + VAT\nOne-off setup: €2,500 + VAT\nMonthly: €200/mo + VAT");
  });
  it("offers the six requested budget bands", () => expect(BUDGET_OPTIONS.map(o => o.value)).toEqual(["Under €1,000", "€1,000–€2,500", "€2,500–€6,000", "€6,000–€20,000", "€20,000+", "Not sure yet"]));
  it("offers all ten industry choices", () => expect(INDUSTRIES).toEqual(["Kitchens & Joinery", "Clinics & Health", "Therapy & Coaching", "Trades & Home", "Salons & Barbers", "Tours & Experiences", "Restaurants & Cafés", "Professional Services", "Startup / Product team", "Other"]));
  it("credits the same referral reward to each party", () => expect(terms.referral).toBe(100));
  it("allows one discount per order", () => expect(terms.oneDiscountPerOrder).toBe(true));
  it("reschedules after 15 working days waiting for content", () => expect(CONTENT_PAUSE_WORKING_DAYS).toBe(15));
  it("sets a five-working-day consolidated revision window", () => expect(REVISION_WINDOW_WORKING_DAYS).toBe(5));
});