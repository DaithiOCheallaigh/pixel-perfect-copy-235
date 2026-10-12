import { describe, expect, it } from "vitest";
import { getSegmentKey, legacySegmentRedirects, lowestPackage, segmentPages } from "@/data/segmentPages";
import { restaurantPayback, segments } from "@/data/pricing";

describe("industry pages", () => {
  it.each([
    ["kitchens-joinery", "kitchens", 3000], ["clinics-practices", "clinics", 1250],
    ["trades-home", "trades", 950], ["salons-barbers", "salons", 295],
    ["tours-experiences", "tours", 2000], ["restaurants-cafes", "food", 250],
  ] as const)("resolves %s with its lowest package price", (slug, key, amount) => {
    expect(getSegmentKey(slug)).toBe(key);
    expect(lowestPackage(segments[key].packages)?.price).toBe(amount);
    expect(segmentPages[key].proof.length).toBeGreaterThan(0);
  });
  it.each([
    ["beauty-wellness", "/services/salons-barbers"], ["food-hospitality", "/services/restaurants-cafes"],
    ["startup-bootstrap", "/product-studio"], ["startup", "/product-studio"],
  ])("redirects %s to %s", (slug, destination) => {
    expect(legacySegmentRedirects[slug]).toBe(destination);
  });
  it("offers the grant note only to the four specified segments", () => {
    expect(Object.entries(segments).filter(([, s]) => s.growDigital).map(([key]) => key)).toEqual(["kitchens", "clinics", "trades", "salons"]);
  });
  it("uses the requested monthly app orders and direct-order share", () => {
    expect(restaurantPayback.appOrdersMonthly).toBe(4000);
    expect(restaurantPayback.directShare).toBe(0.2);
  });
  it("uses the specified illustrative savings range", () => {
    expect(restaurantPayback.savingsMonthly).toEqual([85, 105]);
  });
  it("uses the specified payback months", () => {
    expect(restaurantPayback.paybackMonths).toEqual([6, 7]);
  });
  it("uses the specified Flipdish fee range", () => {
    expect(restaurantPayback.flipdishMonthly).toEqual([119, 139]);
  });
  it("does not resolve an unknown industry", () => {
    expect(getSegmentKey("not-an-industry")).toBeUndefined();
  });
});