import { describe, expect, it } from "vitest";
import * as front from "@/data/pricing";
import * as shared from "../../supabase/functions/_shared/pricing";

describe("backend pricing copy", () => {
  it.each(["VAT_RATE", "VAT_REGISTERED", "segments", "webLadder", "carePlans", "careTerms", "addOns", "studio", "entry", "terms"] as const)("%s matches the frontend", (key) => {
    expect(shared[key]).toEqual(front[key]);
  });
  it("formats packages identically", () => {
    for (const p of [...Object.values(front.segments).flatMap(s => s.packages), ...front.webLadder]) {
      expect(shared.priceLabel(p)).toBe(front.priceLabel(p));
      expect(shared.monthlyLabel(p)).toBe(front.monthlyLabel(p));
    }
  });
  it("shows VAT-inclusive instalments for the four inc-VAT packages", () => {
    const find = (id: string) => Object.values(front.segments).flatMap(s => s.packages).find(p => p.id === id)!;
    expect(front.monthlyLabel(find("practitioner"))).toBe("or €148/mo × 12 incl. VAT");
    expect(front.monthlyLabel(find("trade-launch"))).toBe("or €111/mo × 12 incl. VAT");
    expect(front.monthlyLabel(find("trade-site"))).toBe("or €209/mo × 12 incl. VAT");
    expect(front.monthlyLabel(find("salon-site"))).toBe("or €221/mo × 12 incl. VAT");
    expect(front.monthlyLabel(front.webLadder[0])).toBe("or €70/mo + VAT × 12");
  });
  it("excludes add-ons from the restaurants starting price", () => {
    expect(front.priceLabel(front.lowestCorePackage(front.segments.food.packages)!)).toBe("€550 incl. VAT");
  });
  it("ends the chatbot price list with the VAT line", () => {
    expect(shared.renderPricingPrompt().trim().endsWith("VAT: prices + VAT at 23% unless shown incl. VAT.")).toBe(true);
  });
});
