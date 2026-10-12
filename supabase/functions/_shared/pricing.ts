// KEEP IN SYNC with src/data/pricing.ts — src/test/pricingSync.test.ts fails on drift.
// Dependency-free, Deno-compatible copy used by edge functions.
export const VAT_RATE = 0.23;
export const VAT_REGISTERED = true; // flip to false if not VAT-registered
export const YEARS_EXPERIENCE = "over 10";
export const CALENDLY_URL = "https://calendly.com/lacunaconsulting-info/30min";
export const CONTACT_EMAIL = "info@lacunaconsulting.com";
export const availability = { headline: "Now booking new projects", nextStart: "November 2026", productStudioFrom: "November 2026" };
export type Pkg = { id: string; name: string; price?: number; priceFrom?: number; live: string; selfServe?: boolean; monthly?: number; incVatHeadline?: number; popular?: boolean; addOn?: boolean; scope?: string[] };
export const entry = {
  introCall: { name: "Free intro call + fixed written quote", price: 0, quoteWithin: "48 hours" },
  healthCheck: { name: "Digital Health Check", price: 250, onSiteExtra: 100, creditShare: 0.5, scope: "custom work only (AI, automation, multi-site)" },
  aiAudit: { name: "AI Opportunity Audit", price: 1250, creditShare: 0.5, maxStaff: 15 },
};
export const segments = {
  kitchens: { title: "Kitchens & Joinery", slug: "kitchens-joinery", tagline: "Leads you own, not leads you rent.", growthModule: "1 project post + quarterly review drive", careMinMonths: 6, growDigital: true, packages: [
    { id: "joinery-pro", name: "Joinery Pro", price: 3000, live: "4–5 weeks from site visit", popular: true, scope: ["Up to 5 pages", "One site visit to collect project photos and notes", "Copy written by Dave from that visit", "Gallery of up to 24 photos", "Quote form to WhatsApp and email", "Google profile optimisation", "Review-request flow (asks every customer)"] },
    { id: "showroom", name: "Showroom", price: 5750, live: "6–8 weeks", scope: ["Up to 10 pages", "One organised professional photo shoot (photographer up to €500 included)", "3 case-study pages", "Downloadable brochure", "Lead capture into a light CRM", "First month of Growth care"] } ] as Pkg[] },
  clinics: { title: "Clinics & Practices", slug: "clinics-practices", tagline: "Get booked, stay compliant.", growthModule: "review-response guidance + 30 min booking-system admin", careMinMonths: 6, growDigital: true, packages: [
    { id: "practitioner", name: "Practitioner", price: 1250, monthly: 120, incVatHeadline: 1550, live: "2 weeks", scope: ["Up to 3 pages", "Booking link to your own system (Cliniko, Calendly, Fresha, Jane)", "Intake on your own GDPR-compliant tool", "Google profile with a Book link"] },
    { id: "clinic", name: "Clinic", price: 3500, incVatHeadline: 4300, live: "4–6 weeks", popular: true, scope: ["Up to 6 pages", "Practitioner profiles", "Booking by link or embed from your practice software", "Compliance panel", "Google profile optimisation", "Review requests to every patient + response guidance"] },
    { id: "clinic-plus", name: "Clinic Plus", price: 6000, incVatHeadline: 7400, live: "6–8 weeks", scope: ["Up to 10 pages", "Non-clinical AI FAQ assistant (tells patients it is an AI, EU-hosted)", "First month of Growth + AI care"] } ] as Pkg[] },
  trades: { title: "Trades & Home services", slug: "trades-home", tagline: "Look the part, get the quote requests.", growthModule: "1 project post + quarterly review drive", careMinMonths: 6, growDigital: true, packages: [
    { id: "trade-launch", name: "Trade Launch", price: 950, monthly: 90, incVatHeadline: 1170, selfServe: true, live: "7 working days", scope: ["1 page", "Gallery of up to 12 photos", "Quote form to WhatsApp or email", "Google profile claim", "Year-1 domain and 12 months' hosting"] },
    { id: "trade-site", name: "Trade Site", price: 1750, monthly: 170, incVatHeadline: 2150, live: "3 weeks", popular: true, scope: ["3 pages", "Gallery of up to 24 photos", "Quote form", "Google profile optimisation", "Review-request flow", "Copy from a short questionnaire"] } ] as Pkg[] },
  salons: { title: "Salons & Barbers", slug: "salons-barbers", tagline: "Book direct.", growthModule: "4 Instagram posts a month from your photos", careMinMonths: 3, growDigital: true, packages: [
    { id: "booking-fix", name: "Booking Fix", price: 295, incVatHeadline: 360, selfServe: true, live: "5 working days", scope: ["For salons already on Fresha, Phorest or Booksy", "Google profile optimisation", "Booking links checked on Google, Instagram and Facebook", "Review QR card", "Link-in-bio page on your own domain (year-1 domain included)"] },
    { id: "switch-save", name: "Switch & Save", price: 650, incVatHeadline: 800, selfServe: true, live: "5 working days from your service list and rota", scope: ["For salons moving off Treatwell, Booksy or paper", "Your chosen system set up: up to 50 services and 6 staff", "Client list imported", "Deposit and no-show rules", "45-minute remote training", "Includes Booking Fix"] },
    { id: "salon-site", name: "Salon Site", price: 1900, monthly: 180, incVatHeadline: 2350, live: "3 weeks", popular: true, scope: ["3 pages with service menu and team", "Everything in Booking Fix", "Review-request flow"] } ] as Pkg[] },
  tours: { title: "Tours & Experiences", slug: "tours-experiences", tagline: "More direct bookings, less commission.", growthModule: "listing checks + seasonal pricing update", careMinMonths: 6, growDigital: false, packages: [
    { id: "direct-booking", name: "Direct Booking", price: 2000, live: "3 weeks", scope: ["Booking engine (FareHarbor, Bokun or Checkfront — billed to you) set up for up to 6 products", "Embedded in your site", "Google Things to Do or booking link", "Review and tipping flow"] },
    { id: "conversion-revamp", name: "Conversion Revamp", price: 5500, live: "6–8 weeks", popular: true, scope: ["UX audit of your booking funnel", "Redesign of up to 8 pages", "Booking integration", "Review and tipping flow"] } ] as Pkg[] },
  food: { title: "Restaurants & Cafés", slug: "restaurants-cafes", tagline: "Your menu, your orders, your customers.", growthModule: "menu and price updates + 1 Google post", careMinMonths: 3, growDigital: false, packages: [
    { id: "menu-kit", name: "Menu & Google Kit", price: 450, incVatHeadline: 550, selfServe: true, live: "5 working days", scope: ["HTML menu page on your own domain (up to 60 items)", "Menu and order links on your Google profile", "Review QR card", "Year-1 domain and hosting"] },
    { id: "order-direct", name: "Order Direct (Flipdish route)", price: 600, live: "2 weeks + Flipdish onboarding", popular: true, scope: ["Your own Flipdish account set up (Flipdish's fee is billed by Flipdish)", "Menu imported and branded", "Google order links"] },
    { id: "listing-tuneup", name: "Delivery listing tune-up (per platform)", price: 250, addOn: true, live: "5 working days after the platform approves you", scope: ["Menu copy, categories and photo selection on Uber Eats, Deliveroo or Just Eat"] } ] as Pkg[] },
};
export const webLadder: Pkg[] = [
  { id: "launch", name: "Launch", price: 750, monthly: 70, selfServe: true, live: "7 working days", scope: ["1-page site", "Year-1 domain and 12 months' hosting included", "Contact or booking button", "Google profile claim", "1 revision round"] },
  { id: "business", name: "Business Site", price: 2500, live: "3–4 weeks", scope: ["Up to 5 pages", "Contact or quote forms", "Basic on-page SEO", "Analytics with consent banner", "Google profile claim", "2 revision rounds"] },
  { id: "business-plus", name: "Business Plus", price: 5000, live: "5–6 weeks", scope: ["Up to 10 pages", "Blog", "Booking or CRM integration", "Local SEO setup (Google profile + 2 location pages)", "3 revision rounds"] },
  { id: "bespoke", name: "Bespoke", priceFrom: 7500, live: "8–12 weeks", scope: ["Custom functionality or e-commerce", "Single point of contact: me"] },
];
export const carePlans = [
  { id: "care", name: "Care", monthly: 65, includes: ["Hosting, SSL, backups, uptime monitoring", "Security updates and .ie renewal", "30 minutes of edits a month", "Reply within 1 business day"] },
  { id: "growth", name: "Growth", monthly: 200, popular: true, includes: ["Everything in Care", "60 minutes of edits a month", "Review-request flow (asks every customer)", "Monthly report", "One module for your industry"] },
  { id: "growth-ai", name: "Growth + AI", monthly: 350, includes: ["Everything in Growth", "AI website assistant (up to 200 conversations, says it is an AI)", "Missed-call text-back", "Quarterly 30-minute call"] },
];
export const careTerms = { minimums: "3-month minimum for salons and restaurants, 6 months for others", annualPrepay: "Pay a year upfront, get 1 month free", exit: "Your domain, your content, your code. Export any time; no exit fee after the minimum term." };
export const addOns = { extraPage: 150, gbp: 350, booking: 350, stripe: 450, email: { setup: 150, inboxesIncluded: 2, extraInbox: 40, migrationPerMailbox: 75 }, listingTuneup: 250, aiAssistant: { setup: 600, monthly: 100, conversations: 200 }, missedCall: { monthly: 50 }, aiReceptionist: { setup: 950, monthly: 250, minutes: 300 }, socialSetup: 350, socialPosting: { monthly: 200, posts: 6 }, crmStarter: 1200, brandStarter: 1000, copyPerPage: 100, hourly: 100 };
export const studio = { dayRate: 650, agencyDayRate: 600, agencyMinDays: 5, fractional: { days: 4, monthly: 2600, minMonths: 3 }, investorPrototype: 3000, prototypeSprint: 6000, userTestingAddOn: 2500, mvpFrom: 20000, uxAuditFocused: 4500, uxAuditComprehensive: 9000, designSystemFrom: 18000, discoveryRoadmap: 4500, automationSprintRange: [3000, 6500], aiOps: { monthly: 750, hours: 8, overageHourly: 100, minMonths: 3, noticeDays: 30 } };
export const terms = { upfrontBelow: 1000, splitThrough: 3000, extraWorkBlockMinutes: 30, upTo1000: "100% upfront", to3000: "50% to book, 50% before go-live", over3000: "40/40/20 (start / design sign-off / before go-live)", payMonthlyNote: "Pay monthly available on packages from €750 to €2,000 (12 months)", oneDiscountPerOrder: true, referral: 100 };
export const eur = (n: number) => `€${n.toLocaleString("en-IE")}`;
export const restaurantPayback = { appOrdersMonthly: 4000, directShare: 0.2, savingsMonthly: [85, 105] as const, paybackMonths: [6, 7] as const, flipdishMonthly: [119, 139] as const };
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
/** Lowest-priced core package, ignoring add-ons. */
export const lowestCorePackage = (packages: Pkg[]): Pkg | undefined =>
  packages.filter(p => !p.addOn).reduce<Pkg | undefined>((best, pkg) => !best || (pkg.price ?? pkg.priceFrom ?? Infinity) < (best.price ?? best.priceFrom ?? Infinity) ? pkg : best, undefined);

const vatSuffix = () => (VAT_REGISTERED ? " + VAT" : "");
const withMonthly = (p: Pkg) => `${priceLabel(p)}${p.monthly !== undefined ? ` (${monthlyLabel(p)})` : ""}`;

/** Compact plain-text price list for chatbot system prompts. */
export function renderPricingPrompt(): string {
  const lines: string[] = [];
  lines.push("PRICE LIST (EUR)");
  lines.push(`- ${entry.introCall.name}: free; fixed written quote within ${entry.introCall.quoteWithin}.`);
  lines.push(`- ${entry.healthCheck.name}: ${eur(entry.healthCheck.price)}${vatSuffix()} (custom AI/multi-site work, half credited against the project).`);
  for (const s of Object.values(segments)) {
    lines.push(`\n${s.title}:`);
    for (const p of s.packages) lines.push(`- ${p.name}${p.addOn ? " (add-on)" : ""}: ${withMonthly(p)}. Live in ${p.live}.`);
  }
  lines.push("\nOther businesses (websites):");
  for (const p of webLadder) lines.push(`- ${p.name}: ${withMonthly(p)}. Live in ${p.live}.`);
  lines.push("\nCare plans (monthly):");
  for (const c of carePlans) lines.push(`- ${c.name}: ${eur(c.monthly)}/mo${vatSuffix()}.`);
  lines.push(`- ${careTerms.minimums}. ${careTerms.annualPrepay}.`);
  const v = vatSuffix();
  lines.push("\nKey add-ons:");
  lines.push(`- Extra page ${eur(addOns.extraPage)}${v}; Google profile setup ${eur(addOns.gbp)}${v}; online booking setup ${eur(addOns.booking)}${v}; Stripe checkout ${eur(addOns.stripe)}${v}.`);
  lines.push(`- Email setup ${eur(addOns.email.setup)}${v} (${addOns.email.inboxesIncluded} inboxes, licences billed directly).`);
  lines.push(`- AI website assistant ${eur(addOns.aiAssistant.setup)} + ${eur(addOns.aiAssistant.monthly)}/mo${v}; missed-call text-back ${eur(addOns.missedCall.monthly)}/mo${v}; AI receptionist ${eur(addOns.aiReceptionist.setup)} + ${eur(addOns.aiReceptionist.monthly)}/mo${v}.`);
  lines.push(`- Social setup ${eur(addOns.socialSetup)}${v}; posting ${eur(addOns.socialPosting.monthly)}/mo${v} (${addOns.socialPosting.posts} posts).`);
  lines.push(`- CRM starter ${eur(addOns.crmStarter)}${v}; brand starter ${eur(addOns.brandStarter)}${v}; copywriting ${eur(addOns.copyPerPage)}/page${v}; extra work ${eur(addOns.hourly)}/hour${v}.`);
  lines.push("\nProduct Studio:");
  lines.push(`- ${entry.aiAudit.name} ${eur(entry.aiAudit.price)}${v} (half credited, up to ${entry.aiAudit.maxStaff} staff).`);
  lines.push(`- Automation Sprint typically ${eur(studio.automationSprintRange[0])}–${eur(studio.automationSprintRange[1])}${v}, fixed price agreed in writing.`);
  lines.push(`- AI Ops retainer ${eur(studio.aiOps.monthly)}/mo${v} (${studio.aiOps.hours} hours, ${studio.aiOps.minMonths}-month minimum).`);
  lines.push(`- Day rate ${eur(studio.dayRate)}${v}; Investor Prototype ${eur(studio.investorPrototype)}${v}; Prototype Sprint ${eur(studio.prototypeSprint)}${v}; AI-built MVP from ${eur(studio.mvpFrom)}${v}.`);
  lines.push(`- UX & Accessibility Audit ${eur(studio.uxAuditFocused)} focused / ${eur(studio.uxAuditComprehensive)} comprehensive${v}; Design System Foundation from ${eur(studio.designSystemFrom)}${v}; Digital / AI Discovery Roadmap ${eur(studio.discoveryRoadmap)}${v}.`);
  lines.push("\nVAT: prices + VAT at 23% unless shown incl. VAT.");
  return lines.join("\n");
}
