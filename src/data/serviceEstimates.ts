import { addOns, entry, webLadder, eur, VAT_REGISTERED } from "./pricing";

/** Setup and recurring fees are separate; optional website instalments are not added to setup. */
export const serviceFees: Record<string, { oneOff: number; monthly: number }> = {
  website: { oneOff: webLadder[0].price ?? 0, monthly: 0 },
  "domain-email": { oneOff: addOns.email.setup, monthly: 0 },
  "social-media": { oneOff: addOns.socialSetup, monthly: addOns.socialPosting.monthly },
  "local-seo": { oneOff: addOns.gbp, monthly: 0 },
  "platform-onboarding": { oneOff: addOns.listingTuneup, monthly: 0 },
  "ai-audit": { oneOff: entry.aiAudit.price, monthly: 0 },
  chatbots: { oneOff: addOns.aiAssistant.setup, monthly: addOns.aiAssistant.monthly },
  reservations: { oneOff: addOns.booking, monthly: 0 },
  crm: { oneOff: addOns.crmStarter, monthly: 0 },
  "ai-assistant": { oneOff: addOns.aiReceptionist.setup, monthly: addOns.aiReceptionist.monthly },
};

export function selectionTotals(selections: readonly { id: string }[]) {
  return selections.reduce((total, service) => {
    const fee = serviceFees[service.id];
    return fee ? { oneOff: total.oneOff + fee.oneOff, monthly: total.monthly + fee.monthly } : total;
  }, { oneOff: 0, monthly: 0 });
}

export function selectionPrice(selections: readonly { id: string }[]) {
  const totals = selectionTotals(selections);
  return `from ${eur(totals.oneOff)}${totals.monthly ? ` + ${eur(totals.monthly)}/mo` : ""}${VAT_REGISTERED ? " + VAT" : ""}`;
}