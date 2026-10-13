import { describe, expect, it } from "vitest";
import { getServiceById, services } from "@/data/services";
import { addOns, carePlans, studio, terms, webLadder } from "@/data/pricing";

describe("detail-page pricing rules", () => {
  it("does not use broken WordPress image proxy URLs", () => {
    expect(services.some(service => service.image?.startsWith("https://i0.wp.com"))).toBe(false);
  });
  it("prices Shopify at from 7500 plus VAT without a duplicate prefix", () => {
    expect(getServiceById("shopify")?.priceLine).toBe("from €7,500 + VAT");
    for (const service of services) expect(service.priceLine).not.toMatch(/from\s+from/i);
  });
  it("provides a price for every requested local-business service", () => {
    for (const id of ["social-media-management", "local-seo", "domain-email", "reservations", "chatbots", "crm"]) {
      expect(getServiceById(id)?.priceLine).toBeDefined();
    }
  });
  it("starts websites at 750 with the 70 monthly alternative", () => {
    expect(webLadder.find(pkg => pkg.id === "launch")?.price).toBe(750);
    expect(webLadder.find(pkg => pkg.id === "launch")?.monthly).toBe(70);
  });
  it("uses 350 setup and 200 monthly for six social posts", () => {
    expect(addOns.socialSetup).toBe(350);
    expect(addOns.socialPosting).toEqual({ monthly: 200, posts: 6 });
  });
  it("uses 350 profile setup or 200 monthly Growth care", () => {
    expect(addOns.gbp).toBe(350);
    expect(carePlans.find(plan => plan.id === "growth")?.monthly).toBe(200);
  });
  it("prices general booking setup at 350", () => {
    expect(addOns.booking).toBe(350);
  });
  it("requires 3 months and 30 days notice for AI operations", () => {
    expect(studio.aiOps.minMonths).toBe(3);
    expect(studio.aiOps.noticeDays).toBe(30);
  });
  it("charges 50 for a 30-minute extra-work block", () => {
    expect(addOns.hourly * terms.extraWorkBlockMinutes / 60).toBe(50);
  });
});