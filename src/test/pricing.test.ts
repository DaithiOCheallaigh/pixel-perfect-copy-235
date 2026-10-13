import { describe, expect, it } from "vitest";
import { addOnCatalogue, addOnPriceLabel, addOns, availability, bespokeFrom, carePlans, entry, incVat, segments, studio, terms, tiers, VAT_RATE, VAT_REGISTERED, webLadder } from "@/data/pricing";

describe("pricing catalogue", () => {
  it("requires upfront payment below 1000 and split payment through 3000", () => {
    expect(terms.upfrontBelow).toBe(1000);
    expect(terms.splitThrough).toBe(3000);
  });
  it("bills extra work in 30-minute blocks at 100 per hour", () => {
    expect(terms.extraWorkBlockMinutes).toBe(30);
    expect(addOns.hourly * terms.extraWorkBlockMinutes / 60).toBe(50);
  });
  it("uses the registered 23% VAT rate", () => {
    expect(VAT_REGISTERED).toBe(true);
    expect(VAT_RATE).toBe(0.23);
    expect(incVat(1000)).toBe(1230);
  });
  it("keeps the entry call free with a 48-hour quote", () => {
    expect(entry.introCall.price).toBe(0);
    expect(entry.introCall.quoteWithin).toBe("48 hours");
  });
  it("credits half of the health check with the specified onsite charge", () => {
    expect(entry.healthCheck.price).toBe(250);
    expect(entry.healthCheck.onSiteExtra).toBe(100);
    expect(entry.healthCheck.price * entry.healthCheck.creditShare).toBe(125);
  });
  it("credits half of the audit and limits it to 15 staff", () => {
    expect(entry.aiAudit.price).toBe(1250);
    expect(entry.aiAudit.price * entry.aiAudit.creditShare).toBe(625);
    expect(entry.aiAudit.maxStaff).toBe(15);
  });
  it.each([["launch", 750, 70], ["business", 2500, undefined], ["business-plus", 5000, undefined]])("keeps tier %s at the specified setup and monthly amounts", (id, price, monthly) => {
    const tier = tiers.find((t) => t.id === id);
    expect(tier?.price).toBe(price);
    expect(tier?.monthly).toBe(monthly);
  });
  it("has exactly three tiers, with webLadder as an alias", () => {
    expect(tiers.map((t) => t.id)).toEqual(["launch", "business", "business-plus"]);
    expect(webLadder).toBe(tiers);
  });
  it("quotes bespoke builds from 7500", () => expect(bespokeFrom).toBe(7500));
  it("has no per-segment package ladders", () => {
    for (const segment of Object.values(segments)) expect("packages" in segment).toBe(false);
  });
  it.each([["kitchens", "business"], ["clinics", "business"], ["salons", "launch"], ["tours", "business-plus"]] as const)("recommends the specified tier for %s", (key, tier) => {
    expect(segments[key].recommendedTier).toBe(tier);
    expect(segments[key].recommendedAddOns).toHaveLength(3);
    for (const id of segments[key].recommendedAddOns) expect(addOnCatalogue.some((a) => a.id === id)).toBe(true);
  });
  it.each([
    ["extra-page", 150, undefined], ["gbp", 350, undefined], ["booking", 350, undefined], ["stripe", 450, undefined], ["email", 150, undefined],
    ["brand-starter", 1000, undefined], ["copywriting", 100, undefined], ["ai-assistant", 600, 100], ["missed-call", undefined, 50],
    ["ai-receptionist", 950, 250], ["crm-starter", 1200, undefined], ["social", 350, 200],
  ])("prices catalogue add-on %s", (id, setup, monthly) => {
    const addOn = addOnCatalogue.find((a) => a.id === id);
    expect(addOn?.setup).toBe(setup);
    expect(addOn?.monthly).toBe(monthly);
  });
  it("labels add-ons with setup and monthly fees and one VAT suffix", () => {
    expect(addOnPriceLabel(addOnCatalogue.find((a) => a.id === "ai-assistant")!)).toBe("€600 setup + €100/mo + VAT");
  });
  it("marks Growth as the popular care tier", () => {
    expect(carePlans.map((p) => p.monthly)).toEqual([65, 200, 350]);
    expect(carePlans.filter((p) => p.popular).map((p) => p.id)).toEqual(["growth"]);
  });
  it.each([["salons", 3], ["kitchens", 6], ["clinics", 6], ["tours", 6]] as const)("sets %s's minimum care term", (key, months) => {
    expect(segments[key].careMinMonths).toBe(months);
  });
  it("sets the specified email pricing and inbox allowance", () => {
    expect(addOns.email).toEqual({ setup: 150, inboxesIncluded: 2, extraInbox: 40, migrationPerMailbox: 75 });
  });
  it("sets the specified chatbot setup, monthly charge and conversation allowance", () => {
    expect(addOns.aiAssistant).toEqual({ setup: 600, monthly: 100, conversations: 200 });
  });
  it("sets the specified receptionist setup, monthly charge and minutes", () => {
    expect(addOns.aiReceptionist).toEqual({ setup: 950, monthly: 250, minutes: 300 });
  });
  it.each([["extraPage", 150], ["gbp", 350], ["booking", 350], ["stripe", 450], ["socialSetup", 350], ["crmStarter", 1200], ["brandStarter", 1000], ["copyPerPage", 100], ["hourly", 100]] as const)("prices add-on %s", (key, price) => {
    expect(addOns[key]).toBe(price);
  });
  it("sets monthly posting and missed-call pricing", () => {
    expect(addOns.socialPosting).toEqual({ monthly: 200, posts: 6 });
    expect(addOns.missedCall.monthly).toBe(50);
  });
  it.each([["dayRate", 650], ["agencyDayRate", 600], ["agencyMinDays", 5], ["investorPrototype", 3000], ["prototypeSprint", 6000], ["userTestingAddOn", 2500], ["mvpFrom", 20000], ["uxAuditFocused", 4500], ["uxAuditComprehensive", 9000], ["designSystemFrom", 18000], ["discoveryRoadmap", 4500]] as const)("sets studio %s", (key, amount) => {
    expect(studio[key]).toBe(amount);
  });
  it("sets fractional studio days, price and minimum term", () => {
    expect(studio.fractional).toEqual({ days: 4, monthly: 2600, minMonths: 3 });
  });
  it("sets automation sprint and AI operations allowances", () => {
    expect(studio.automationSprintRange).toEqual([3000, 6500]);
    expect(studio.aiOps).toEqual({ monthly: 750, hours: 8, overageHourly: 100, minMonths: 3, noticeDays: 30 });
  });
  it("allows one discount and the specified referral reward", () => {
    expect(terms.oneDiscountPerOrder).toBe(true);
    expect(terms.referral).toBe(100);
  });
  it("starts new projects and product studio in November 2026", () => {
    expect(availability.nextStart).toBe("November 2026");
    expect(availability.productStudioFrom).toBe("November 2026");
  });
});