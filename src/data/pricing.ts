// src/data/pricing.ts — EUR. The figure shown is what Dave keeps.
export const VAT_RATE = 0.23;
export const VAT_REGISTERED = true; // flip to false if not VAT-registered
export { YEARS_EXPERIENCE } from "./profile";
export const CALENDLY_URL = "https://calendly.com/lacunaconsulting-info/30min";
export const CONTACT_EMAIL = "info@lacunaconsulting.com";
export const availability = { headline: "Now booking new projects", nextStart: "November 2026", productStudioFrom: "November 2026" };
export type Pkg = { id: string; name: string; price?: number; priceFrom?: number; live: string; selfServe?: boolean; monthly?: number; incVatHeadline?: number; popular?: boolean; addOn?: boolean; scope?: string[] };
export const entry = {
  introCall: { name: "Free intro call + fixed written quote", price: 0, quoteWithin: "48 hours" },
  healthCheck: { name: "Digital Health Check", price: 250, onSiteExtra: 100, creditShare: 0.5, scope: "custom work only (AI, automation, multi-site)" },
  aiAudit: { name: "AI Opportunity Audit", price: 1250, creditShare: 0.5, maxStaff: 15 },
};
export type TierId = "launch" | "refresh" | "business";
export type AddOnId = "extra-page" | "gbp" | "booking" | "stripe" | "email" | "brand-starter" | "copywriting" | "ai-assistant" | "missed-call" | "ai-receptionist" | "crm-starter" | "social";
/** Existing-site redesign (from-price). */
export const refresh: Pkg = { id: "refresh", name: "Website Refresh", priceFrom: 1500, monthly: 140, live: "2–3 weeks from access to your current site", scope: ["Your existing content and photos, redesigned page by page (up to 5 pages)", "Mobile and speed fixes", "Every old address redirected so you keep your Google rankings", "Forms, analytics and Google profile checked and reconnected", "Moved to new hosting if you want (see step 2)", "1 revision round"] };
/** The only website pricing: one three-tier ladder shared by every services page. */
export const tiers: Pkg[] = [
  { id: "launch", name: "Launch", price: 750, monthly: 70, selfServe: true, live: "7 working days", scope: ["1-page site", "Year-1 domain and 12 months' hosting included", "Contact or booking button", "Google profile claim", "1 revision round"] },
  refresh,
  { id: "business", name: "Business Site", price: 2500, live: "3–4 weeks", scope: ["Up to 5 pages", "Contact or quote forms", "Basic on-page SEO", "Analytics with consent banner", "Google profile claim", "2 revision rounds"] },
];
/** Kept as an alias for existing imports. */
export const webLadder = tiers;

export const BUSINESS_BASE_PAGES = 5;
export const BUSINESS_MAX_PAGES = 10;
export const BUSINESS_PER_PAGE = 500;
export type BusinessOption = { pages: number; id: string; price: number; live: string; scope: string[] };
/** Business Site priced and scoped by page count (5–10); id "business" at 5 pages, otherwise business-N. */
export const businessOption = (pages: number): BusinessOption => ({
  pages,
  id: pages === BUSINESS_BASE_PAGES ? "business" : `business-${pages}`,
  price: 2500 + (pages - BUSINESS_BASE_PAGES) * BUSINESS_PER_PAGE,
  live: pages <= 6 ? "3–4 weeks" : pages <= 8 ? "4–5 weeks" : "5–6 weeks",
  scope: [
    `Up to ${pages} pages`, "Contact or quote forms", "Basic on-page SEO", "Analytics with consent banner", "Google profile claim",
    ...(pages >= 6 ? ["Blog"] : []),
    ...(pages >= 8 ? ["Booking or CRM integration"] : []),
    ...(pages >= 10 ? ["Local SEO setup (Google profile + 2 location pages)"] : []),
    `${pages >= 10 ? 3 : 2} revision rounds`,
  ],
});
export const businessOptions = [5, 6, 7, 8, 9, 10].map(businessOption);
export const bespokeFrom = 7500;
export const segments = {
  kitchens: { title: "Kitchens & Joinery", slug: "kitchens-joinery", tagline: "Leads you own, not leads you rent.", growthModule: "1 project post + quarterly review drive", careMinMonths: 6, growDigital: true,
    recommendedTier: "business" as TierId, tierNote: "Most kitchen and joinery firms choose Business Site: up to five pages with a project gallery, quote forms and on-page SEO.", recommendedAddOns: ["gbp", "copywriting", "crm-starter"] as AddOnId[] },
  clinics: { title: "Clinics & Practices", slug: "clinics-practices", tagline: "Get booked, stay compliant.", growthModule: "review-response guidance + 30 min booking-system admin", careMinMonths: 6, growDigital: true,
    recommendedTier: "business" as TierId, tierNote: "Most practices choose Business Site: practitioner pages, a link to your own booking system and content ready for practice sign-off.", recommendedAddOns: ["booking", "gbp", "ai-assistant"] as AddOnId[] },
  salons: { title: "Salons & Barbers", slug: "salons-barbers", tagline: "Book direct.", growthModule: "4 Instagram posts a month from your photos", careMinMonths: 3, growDigital: true,
    recommendedTier: "launch" as TierId, tierNote: "Most salons and barbers start with Launch: one page with your service menu and a Book button into your own booking system.", recommendedAddOns: ["booking", "gbp", "social"] as AddOnId[] },
  tours: { title: "Tours & Experiences", slug: "tours-experiences", tagline: "More direct bookings, less commission.", growthModule: "listing checks + seasonal pricing update", careMinMonths: 6, growDigital: false,
    recommendedTier: "business" as TierId, tierNote: "Most tour operators choose a Business Site of 8 pages or more: a blog for itineraries and your own booking engine embedded.", recommendedAddOns: ["gbp", "stripe", "ai-assistant"] as AddOnId[] },
};
export const carePlans = [
  { id: "care", name: "Care", monthly: 65, includes: ["Hosting, SSL, backups, uptime monitoring", "Security updates and .ie renewal", "30 minutes of edits a month", "Reply within 1 business day"] },
  { id: "growth", name: "Growth", monthly: 200, popular: true, includes: ["Everything in Care", "60 minutes of edits a month", "Review-request flow (asks every customer)", "Monthly report", "One module for your industry"] },
  { id: "growth-ai", name: "Growth + AI", monthly: 350, includes: ["Everything in Growth", "AI website assistant (up to 200 conversations, says it is an AI)", "Missed-call text-back", "Quarterly 30-minute call"] },
];
export const careTerms = { minimums: "3-month minimum for salons and restaurants, 6 months for others", annualPrepay: "Pay a year upfront, get 1 month free", exit: "Your domain, your content, your code. Export any time; no exit fee after the minimum term." };
export const addOns = { extraPage: 150, gbp: 350, booking: 350, stripe: 450, email: { setup: 150, inboxesIncluded: 2, extraInbox: 40, migrationPerMailbox: 75 }, aiAssistant: { setup: 600, monthly: 100, conversations: 200 }, missedCall: { monthly: 50 }, aiReceptionist: { setup: 950, monthly: 250, minutes: 300 }, socialSetup: 350, socialPosting: { monthly: 200, posts: 6 }, crmStarter: 1200, brandStarter: 1000, copyPerPage: 100, hourly: 100 };
export const studio = { dayRate: 650, agencyDayRate: 600, agencyMinDays: 5, fractional: { days: 4, monthly: 2600, minMonths: 3 }, investorPrototype: 3000, prototypeSprint: 6000, userTestingAddOn: 2500, mvpFrom: 20000, uxAuditFocused: 4500, uxAuditComprehensive: 9000, designSystemFrom: 18000, discoveryRoadmap: 4500, automationSprintRange: [3000, 6500], aiOps: { monthly: 750, hours: 8, overageHourly: 100, minMonths: 3, noticeDays: 30 } };
export const terms = { upfrontBelow: 1000, splitThrough: 3000, extraWorkBlockMinutes: 30, upTo1000: "100% upfront", to3000: "50% to book, 50% before go-live", over3000: "40/40/20 (start / design sign-off / before go-live)", payMonthlyNote: "Pay monthly available on packages from €750 to €2,000 (12 months)", oneDiscountPerOrder: true, referral: 100 };
export const eur = (n: number) => `€${n.toLocaleString("en-IE")}`;
export const incVat = (ex: number) => Math.round(ex * (1 + VAT_RATE));
export const priceLabel = (p: Pkg) => {
  if (VAT_REGISTERED && p.incVatHeadline) return `${eur(p.incVatHeadline)} incl. VAT`;
  const amount = p.price ?? p.priceFrom;
  if (amount === undefined) return "Price on request";
  return `${p.priceFrom ? "from " : ""}${eur(amount)}${VAT_REGISTERED ? " + VAT" : ""}`;
};
export const vatFootnote = () => VAT_REGISTERED ? "Prices + VAT at 23% unless shown as incl. VAT." : "No VAT charged.";
export const monthlyLabel = (p: Pkg) => {
  if (p.monthly === undefined) return undefined;
  if (VAT_REGISTERED && p.incVatHeadline) return `or ${eur(incVat(p.monthly))}/mo × 12 incl. VAT`;
  return `or ${eur(p.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""} × 12`;
};
export type AddOn = { id: AddOnId; name: string; desc: string; setup?: number; monthly?: number; unit?: string };
export const addOnCatalogue: AddOn[] = [
  { id: "extra-page", name: "Extra page", desc: "Another page in the same design, with copy you supply.", setup: addOns.extraPage, unit: "per page" },
  { id: "gbp", name: "Google Business Profile setup", desc: "Your profile claimed, completed and optimised so local customers find you.", setup: addOns.gbp },
  { id: "booking", name: "Online booking setup", desc: "Your own booking system connected to your site and Google profile.", setup: addOns.booking },
  { id: "stripe", name: "Stripe checkout", desc: "Take deposits or payments online through your own Stripe account.", setup: addOns.stripe },
  { id: "email", name: "Email setup", desc: `Professional email on your domain, ${addOns.email.inboxesIncluded} inboxes included; licences billed to you.`, setup: addOns.email.setup },
  { id: "brand-starter", name: "Brand starter", desc: "A simple logo, colours and type so everything looks like one business.", setup: addOns.brandStarter },
  { id: "copywriting", name: "Copywriting", desc: "Website copy written for you from a short questionnaire.", setup: addOns.copyPerPage, unit: "per page" },
  { id: "ai-assistant", name: "AI website assistant", desc: `Answers common questions and qualifies leads, up to ${addOns.aiAssistant.conversations} conversations a month; says it is an AI.`, setup: addOns.aiAssistant.setup, monthly: addOns.aiAssistant.monthly },
  { id: "missed-call", name: "Missed-call text-back", desc: "Automatically texts back anyone whose call you miss.", monthly: addOns.missedCall.monthly },
  { id: "ai-receptionist", name: "AI receptionist", desc: `Answers calls, books appointments and follows up, up to ${addOns.aiReceptionist.minutes} minutes a month.`, setup: addOns.aiReceptionist.setup, monthly: addOns.aiReceptionist.monthly },
  { id: "crm-starter", name: "CRM starter", desc: "Every enquiry tracked in one place so no lead is dropped.", setup: addOns.crmStarter },
  { id: "social", name: "Social media", desc: `Profiles set up, then ${addOns.socialPosting.posts} posts a month from your photos.`, setup: addOns.socialSetup, monthly: addOns.socialPosting.monthly },
];
const vatSuffix = () => (VAT_REGISTERED ? " + VAT" : "");
export const addOnSetupLabel = (a: AddOn) => a.setup === undefined ? undefined : `${eur(a.setup)}${a.unit ? ` ${a.unit}` : " setup"}${vatSuffix()}`;
export const addOnMonthlyLabel = (a: AddOn) => a.monthly === undefined ? undefined : `${eur(a.monthly)}/mo${vatSuffix()}`;
export const addOnPriceLabel = (a: AddOn) => [addOnSetupLabel(a), addOnMonthlyLabel(a)].filter(Boolean).join(" + ").replace(/ \+ VAT \+ /, " + ");
export const bespokeLine = () => `Need more? Bespoke builds from ${eur(bespokeFrom)}${vatSuffix()} — get a quote`;

/** Services picker step 2: who looks after the site after launch. */
export const aftercare = {
  selfManaged: {
    id: "self-managed",
    name: "I'll look after it myself",
    priceLine: "Free handover",
    includes: [
      "At launch the site, hosting and domain go into accounts in your name",
      "You pay the hosting and domain providers directly",
      "30-minute handover call and a short written guide",
      "Edits when you need them, quoted per job based on the work",
    ],
  },
  managed: {
    name: "Lacuna looks after it",
    priceLine: `Care plans from ${eur(carePlans[0].monthly)}/mo`,
    includes: [
      "Hosting, SSL, backups and uptime monitoring",
      "Security updates and domain renewal",
      "Email accounts managed within your monthly edit time",
      "A set amount of edit time every month",
    ],
  },
};
/** Services picker step 3: optional email on the client's domain. */
export const emailSetup = {
  id: "email-setup",
  name: "Email setup",
  setup: addOns.email.setup,
  includes: [
    `${addOns.email.inboxesIncluded} inboxes set up on your domain`,
    "Tested on your phone and laptop",
    "Licences billed to you by the provider",
    `Extra inboxes ${eur(addOns.email.extraInbox)} each; moving an existing mailbox ${eur(addOns.email.migrationPerMailbox)} each`,
  ],
};
export const refreshNotes = () => `${eur(addOns.extraPage)} per page beyond 5; new copy ${eur(addOns.copyPerPage)} a page. Sites over 10 pages or on an unsupported platform are quoted individually.`;
