import { describe, expect, it } from "vitest";
import { getSegmentKey, legacySegmentRedirects, RESERVED_SERVICE_PATHS, segmentPages } from "@/data/segmentPages";
import { segments } from "@/data/pricing";

const BRANDS = /flipdish|deliveroo|uber eats|just eat|fresha|booksy|phorest|treatwell|cliniko|fareharbor|bokun|checkfront|calendly/i;

describe("industry pages", () => {
  it.each([["kitchens-joinery", "kitchens"], ["clinics-practices", "clinics"], ["salons-barbers", "salons"], ["tours-experiences", "tours"]] as const)("resolves %s with real proof", (slug, key) => {
    expect(getSegmentKey(slug)).toBe(key);
    expect(segmentPages[key].proof.length).toBeGreaterThan(0);
  });
  it("has exactly four industry segments", () => expect(Object.keys(segments)).toEqual(["kitchens", "clinics", "salons", "tours"]));
  it.each([
    ["beauty-wellness", "/services/salons-barbers"], ["food-hospitality", "/services/web-design"],
    ["startup-bootstrap", "/services/product-studio"], ["startup", "/services/product-studio"],
    ["trades-home", "/services/web-design"], ["restaurants-cafes", "/services/web-design"],
  ])("redirects %s to %s", (slug, destination) => {
    expect(legacySegmentRedirects[slug]).toBe(destination);
  });
  it("offers the grant note to kitchens, clinics and salons", () => {
    expect(Object.entries(segments).filter(([, s]) => s.growDigital).map(([key]) => key)).toEqual(["kitchens", "clinics", "salons"]);
  });
  it("names no third-party platform brands in segment copy or FAQs", () => {
    expect(JSON.stringify(segments)).not.toMatch(BRANDS);
    expect(JSON.stringify(segmentPages)).not.toMatch(BRANDS);
  });
  it("shows no showcase mock as proof", () => {
    for (const page of Object.values(segmentPages)) for (const proof of page.proof) expect(proof.name).not.toMatch(/DC Wood/);
  });
  it("does not resolve an unknown industry", () => {
    expect(getSegmentKey("not-an-industry")).toBeUndefined();
  });
  it("never uses a reserved services path as a segment slug or legacy redirect", () => {
    const reserved: readonly string[] = RESERVED_SERVICE_PATHS;
    for (const s of Object.values(segments)) expect(reserved).not.toContain(s.slug);
    for (const k of Object.keys(legacySegmentRedirects)) expect(reserved).not.toContain(k);
  });
});
