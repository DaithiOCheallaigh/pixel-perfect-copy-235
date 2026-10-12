import { describe, expect, it } from "vitest";
import { selectionTotals } from "@/data/serviceEstimates";
import { BUDGET_OPTIONS, INDUSTRIES } from "@/data/projectIntake";
import { CONTENT_PAUSE_WORKING_DAYS, REVISION_WINDOW_WORKING_DAYS } from "@/data/workingTerms";
import { terms } from "@/data/pricing";

describe("Final pricing rules", () => {
  it("keeps chatbot setup and monthly fees separate", () => expect(selectionTotals([{ id: "chatbots" }])).toEqual({ oneOff: 600, monthly: 100 }));
  it("keeps receptionist setup and monthly fees separate", () => expect(selectionTotals([{ id: "ai-assistant" }])).toEqual({ oneOff: 950, monthly: 250 }));
  it("includes social posting separately", () => expect(selectionTotals([{ id: "social-media" }])).toEqual({ oneOff: 350, monthly: 200 }));
  it("does not count optional website instalments as extra recurring charges", () => expect(selectionTotals([{ id: "website" }])).toEqual({ oneOff: 750, monthly: 0 }));
  it("combines a mixed selection without combining payment periods", () => expect(selectionTotals([{ id: "website" }, { id: "chatbots" }, { id: "ai-assistant" }])).toEqual({ oneOff: 2300, monthly: 350 }));
  it("ignores unknown service IDs", () => expect(selectionTotals([{ id: "unknown" }])).toEqual({ oneOff: 0, monthly: 0 }));
  it("offers the six requested budget bands", () => expect(BUDGET_OPTIONS.map(o => o.value)).toEqual(["Under €1,000", "€1,000–€2,500", "€2,500–€6,000", "€6,000–€20,000", "€20,000+", "Not sure yet"]));
  it("offers all ten industry choices", () => expect(INDUSTRIES).toEqual(["Kitchens & Joinery", "Clinics & Health", "Therapy & Coaching", "Trades & Home", "Salons & Barbers", "Tours & Experiences", "Restaurants & Cafés", "Professional Services", "Startup / Product team", "Other"]));
  it("credits the same referral reward to each party", () => expect(terms.referral).toBe(100));
  it("allows one discount per order", () => expect(terms.oneDiscountPerOrder).toBe(true));
  it("reschedules after 15 working days waiting for content", () => expect(CONTENT_PAUSE_WORKING_DAYS).toBe(15));
  it("sets a five-working-day consolidated revision window", () => expect(REVISION_WINDOW_WORKING_DAYS).toBe(5));
});