import { eur, terms, webLadder, studio } from "./pricing";

const businessPrice = webLadder.find((t) => t.id === "business")?.price ?? 0;

export const INDUSTRIES = ["Kitchens & Joinery", "Clinics & Health", "Therapy & Coaching", "Trades & Home", "Salons & Barbers", "Tours & Experiences", "Restaurants & Cafés", "Professional Services", "Startup / Product team", "Other"];
// The consultation handler accepts bounded strings, not an enum.
export const BUDGET_OPTIONS = [
  { value: `Under ${eur(terms.upfrontBelow)}`, label: `Under ${eur(terms.upfrontBelow)} (Launch)`, desc: "A focused launch or booking fix" },
  { value: `${eur(terms.upfrontBelow)}–${eur(businessPrice)}`, label: `${eur(terms.upfrontBelow)}–${eur(businessPrice)} (Business Site)`, desc: "A complete business presence" },
  { value: `${eur(businessPrice)}–${eur(studio.prototypeSprint)}`, label: `${eur(businessPrice)}–${eur(studio.prototypeSprint)} (Business Site full build)`, desc: "A deeper website or booking project" },
  { value: `${eur(studio.prototypeSprint)}–${eur(studio.mvpFrom)}`, label: `${eur(studio.prototypeSprint)}–${eur(studio.mvpFrom)} (Bespoke)`, desc: "Custom work and product design" },
  { value: `${eur(studio.mvpFrom)}+`, label: `${eur(studio.mvpFrom)}+`, desc: "A larger product engagement" },
  { value: "Not sure yet", label: "Not sure yet — start with a free intro call", desc: "Discuss the right scope first" },
];
export const BUDGET_LABEL = "Budget (ex VAT)";
