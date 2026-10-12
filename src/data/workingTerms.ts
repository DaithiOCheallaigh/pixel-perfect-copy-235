import { addOns, careTerms, eur, terms } from "./pricing";

export const CONTENT_PAUSE_WORKING_DAYS = 15;
export const REVISION_WINDOW_WORKING_DAYS = 5;
export const workingTerms = [
  { title: "Payment", text: `Under ${eur(terms.upfrontBelow)}: ${terms.upTo1000}. Up to ${eur(terms.splitThrough)}: ${terms.to3000}. Above ${eur(terms.splitThrough)}: ${terms.over3000}. ${terms.payMonthlyNote}.` },
  { title: "Discounts", text: "One discount per order." },
  { title: "Care plans", text: `${careTerms.minimums}. ${careTerms.annualPrepay}. ${careTerms.exit}` },
  { title: "Revision rounds", text: `A revision round is one consolidated written list within ${REVISION_WINDOW_WORKING_DAYS} working days. New work after design sign-off is ${eur(addOns.hourly)}/hour, billed in ${terms.extraWorkBlockMinutes}-minute blocks.` },
  { title: "Content and deadlines", text: `You supply accurate content, approvals and any agreed materials by the dates in your quote. A project paused ${CONTENT_PAUSE_WORKING_DAYS}+ working days waiting on content may be rescheduled. I agree any revised launch date with you.` },
  { title: "Third-party vendors", text: "Google, Fresha, Flipdish, Deliveroo and other vendors support their own products. I can't promise their approval dates. Software licences are billed directly to you." },
  { title: "AI and personal data", text: "AI features disclose that they are AI. Personal data is processed under a data-processing agreement; responsibilities and scope are agreed before processing begins." },
  { title: "Overdue business invoices", text: "Statutory late-payment interest applies to overdue business invoices." },
];