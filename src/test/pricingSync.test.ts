import { describe, expect, it } from "vitest";
import * as front from "@/data/pricing";
import * as shared from "../../supabase/functions/_shared/pricing";

// The backend copy is intentionally unchanged by the frontend tier restructure;
// only the values both sides still share are compared.
describe("backend pricing copy", () => {
  it.each(["VAT_RATE", "VAT_REGISTERED", "carePlans", "careTerms", "studio", "entry", "terms"] as const)("%s matches the frontend", (key) => {
    expect(shared[key]).toEqual(front[key]);
  });
  it("shares the three website tiers", () => {
    expect(shared.webLadder.slice(0, 3)).toEqual(front.tiers);
  });
  it("shares every add-on price the frontend still uses", () => {
    const { listingTuneup: _unused, ...backendAddOns } = shared.addOns as typeof shared.addOns & { listingTuneup?: number };
    expect(backendAddOns).toEqual(front.addOns);
  });
  it("formats tiers identically", () => {
    for (const p of front.tiers) {
      expect(shared.priceLabel(p)).toBe(front.priceLabel(p));
      expect(shared.monthlyLabel(p)).toBe(front.monthlyLabel(p));
    }
  });
  it("shows the Launch instalment ex VAT", () => {
    expect(front.monthlyLabel(front.tiers[0])).toBe("or €70/mo + VAT × 12");
  });
  it("ends the chatbot price list with the VAT line", () => {
    expect(shared.renderPricingPrompt().trim().endsWith("VAT: prices + VAT at 23% unless shown incl. VAT.")).toBe(true);
  });
});
