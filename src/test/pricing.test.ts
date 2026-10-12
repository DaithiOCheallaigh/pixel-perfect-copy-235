import { describe, expect, it } from "vitest";
import { addOns, availability, carePlans, entry, incVat, priceLabel, segments, studio, terms, VAT_RATE, VAT_REGISTERED, webLadder } from "@/data/pricing";

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
  const packages = [...Object.values(segments).flatMap((s) => s.packages), ...webLadder];
  it.each([
    ["joinery-pro", 3000, undefined], ["showroom", 5750, undefined],
    ["practitioner", 1250, 120], ["clinic", 3500, undefined], ["clinic-plus", 6000, undefined],
    ["trade-launch", 950, 90], ["trade-site", 1750, 170],
    ["booking-fix", 295, undefined], ["switch-save", 650, undefined], ["salon-site", 1900, 180],
    ["direct-booking", 2000, undefined], ["conversion-revamp", 5500, undefined],
    ["menu-kit", 450, undefined], ["order-direct", 600, undefined], ["listing-tuneup", 250, undefined],
    ["launch", 750, 70], ["business", 2500, undefined], ["business-plus", 5000, undefined], ["bespoke", 7500, undefined],
  ])("keeps %s at the specified setup and monthly amounts", (id, price, monthly) => {
    const pkg = packages.find((p) => p.id === id);
    expect(pkg?.price ?? pkg?.priceFrom).toBe(price);
    expect(pkg?.monthly).toBe(monthly);
  });
  it.each([["practitioner", 1550], ["clinic", 4300], ["clinic-plus", 7400], ["trade-launch", 1170], ["trade-site", 2150], ["booking-fix", 360], ["switch-save", 800], ["salon-site", 2350], ["menu-kit", 550]])("keeps %s's explicit inclusive VAT headline", (id, amount) => {
    const pkg = packages.find((p) => p.id === id);
    expect(pkg?.incVatHeadline).toBe(amount);
    if (!pkg) throw new Error("Missing package");
    expect(priceLabel(pkg)).toBe(`€${Number(amount).toLocaleString("en-IE")} incl. VAT`);
  });
  it("marks Growth as the popular care tier", () => {
    expect(carePlans.map((p) => p.monthly)).toEqual([65, 200, 350]);
    expect(carePlans.filter((p) => p.popular).map((p) => p.id)).toEqual(["growth"]);
  });
  it.each([["salons", 3], ["food", 3], ["kitchens", 6], ["clinics", 6], ["trades", 6], ["tours", 6]] as const)("sets %s's minimum care term", (key, months) => {
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
  it.each([["extraPage", 150], ["gbp", 350], ["booking", 350], ["stripe", 450], ["listingTuneup", 250], ["socialSetup", 350], ["crmStarter", 1200], ["brandStarter", 1000], ["copyPerPage", 100], ["hourly", 100]] as const)("prices add-on %s", (key, price) => {
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