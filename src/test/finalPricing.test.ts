import { describe, expect, it } from "vitest";
import { selectionSummary, selectionTotals, selectionPrice, selectionItems } from "@/data/serviceEstimates";
import { BUDGET_OPTIONS, INDUSTRIES } from "@/data/projectIntake";
import { CONTENT_PAUSE_WORKING_DAYS, REVISION_WINDOW_WORKING_DAYS } from "@/data/workingTerms";
import { addOns, aftercare, emailSetup, terms } from "@/data/pricing";

describe("Final pricing rules", () => {
  it("prices a tier and care plan while ignoring retired add-on selections", () => {
    expect(selectionTotals([{ id: "business" }, { id: "gbp" }, { id: "ai-assistant" }, { id: "growth" }])).toEqual({ oneOff: 2500, monthly: 200 });
  });
  it("labels setup and monthly selection estimates with VAT", () => {
    expect(selectionPrice([{ id: "launch" }, { id: "care" }])).toBe("from €750 + €65/mo + VAT");
  });
  it("excludes add-ons from selection-bar items and brief summaries", () => {
    const selections = [{ id: "business" }, { id: "gbp" }, { id: "ai-assistant" }, { id: "growth" }];
    expect(selectionItems(selections).map(item => item.id)).toEqual(["business", "growth"]);
    expect(selectionSummary(selections)).toBe(selectionSummary([{ id: "business" }, { id: "growth" }]));
  });
  it("ignores retired add-on-only selections", () => expect(selectionTotals([{ id: "ai-receptionist" }, { id: "social" }])).toEqual({ oneOff: 0, monthly: 0 }));
  it("does not count optional Launch instalments as extra recurring charges", () => expect(selectionTotals([{ id: "launch" }])).toEqual({ oneOff: 750, monthly: 0 }));
  it("prices care plans as monthly only", () => expect(selectionTotals([{ id: "growth-ai" }])).toEqual({ oneOff: 0, monthly: 350 }));
  it("ignores unknown service IDs", () => expect(selectionTotals([{ id: "unknown" }])).toEqual({ oneOff: 0, monthly: 0 }));
  it("writes a human-readable summary with separate totals", () => {
    expect(selectionSummary([{ id: "business" }, { id: "growth" }])).toBe("Selected package:\n- Business Site website: €2,500 + VAT\n- Growth care plan: €200/mo + VAT\nOne-off setup: €2,500 + VAT\nMonthly: €200/mo + VAT");
  });
  it("offers the six requested budget bands", () => expect(BUDGET_OPTIONS.map(o => o.value)).toEqual(["Under €1,000", "€1,000–€2,500", "€2,500–€6,000", "€6,000–€20,000", "€20,000+", "Not sure yet"]));
  it("offers all ten industry choices", () => expect(INDUSTRIES).toEqual(["Kitchens & Joinery", "Clinics & Health", "Therapy & Coaching", "Trades & Home", "Salons & Barbers", "Tours & Experiences", "Restaurants & Cafés", "Professional Services", "Startup / Product team", "Other"]));
  it("prices a self-managed Business Site with email setup", () => expect(selectionTotals([{ id: "business" }, { id: "self-managed" }, { id: "email-setup" }])).toEqual({ oneOff: 2650, monthly: 0 }));
  it("keeps self-managed and email-setup as selection items", () => expect(selectionItems([{ id: "business" }, { id: "self-managed" }, { id: "email-setup" }]).map(i => i.id)).toEqual(["business", "self-managed", "email-setup"]));
  it("prices Launch with Care and email setup", () => expect(selectionTotals([{ id: "launch" }, { id: "care" }, { id: "email-setup" }])).toEqual({ oneOff: 900, monthly: 65 }));
  it("summarises a self-managed handover without a monthly line", () => {
    const summary = selectionSummary([{ id: "business" }, { id: "self-managed" }]);
    expect(summary).toContain("- Self-managed after launch: Free handover");
    expect(summary).toContain("One-off setup: €2,500 + VAT");
    expect(summary).not.toContain("Monthly");
  });
  it("prices email setup from the add-on catalogue", () => expect(emailSetup.setup).toBe(addOns.email.setup));
  it("uses the self-managed aftercare ID", () => expect(aftercare.selfManaged.id).toBe("self-managed"));
  it("credits the same referral reward to each party", () => expect(terms.referral).toBe(100));
  it("allows one discount per order", () => expect(terms.oneDiscountPerOrder).toBe(true));
  it("reschedules after 15 working days waiting for content", () => expect(CONTENT_PAUSE_WORKING_DAYS).toBe(15));
  it("sets a five-working-day consolidated revision window", () => expect(REVISION_WINDOW_WORKING_DAYS).toBe(5));
});
describe("business page options selection", () => {
  it("totals 8 pages at 4000", () => { expect(selectionTotals([{ id: "business-8" }])).toEqual({ oneOff: 4000, monthly: 0 }); });
  it("titles 10 pages", () => { expect(selectionItems([{ id: "business-10" }])[0].title).toBe("Business Site website (10 pages)"); });
});
describe("website refresh selection", () => {
  it("titles the refresh without a website suffix", () => { expect(selectionItems([{ id: "refresh" }])[0].title).toBe("Website Refresh"); });
  it("totals refresh + growth + email", () => { expect(selectionTotals([{ id: "refresh" }, { id: "growth" }, { id: "email-setup" }])).toEqual({ oneOff: 1650, monthly: 200 }); });
  it("summarises as a from-price", () => {
    const s = selectionSummary([{ id: "refresh" }, { id: "care" }]);
    expect(s).toContain("- Website Refresh: from €1,500 + VAT");
    expect(s).toContain("One-off setup: from €1,500 + VAT");
  });
});
