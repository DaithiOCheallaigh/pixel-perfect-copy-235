import { addOnCatalogue, addOnPriceLabel, carePlans, eur, priceLabel, tiers, VAT_REGISTERED } from "./pricing";

/** Setup and recurring fees are separate; optional website instalments are not added to setup. */
export type Fee = { oneOff: number; monthly: number };
export type SelectionKind = "tier" | "addon" | "care";
export type SelectionItem = { id: string; kind: SelectionKind; title: string; price: string } & Fee;

export const SELECTION_STORAGE_KEY = "lacuna-services-selection";

/** Price a tier, add-on or care plan by its catalogue ID; unknown IDs return undefined. */
export function selectionItem(id: string): SelectionItem | undefined {
  const tier = tiers.find((t) => t.id === id);
  if (tier) return { id, kind: "tier", title: `${tier.name} website`, price: priceLabel(tier), oneOff: tier.price ?? 0, monthly: 0 };
  const addOn = addOnCatalogue.find((a) => a.id === id);
  if (addOn) return { id, kind: "addon", title: addOn.name, price: addOnPriceLabel(addOn), oneOff: addOn.setup ?? 0, monthly: addOn.monthly ?? 0 };
  const care = carePlans.find((c) => c.id === id);
  if (care) return { id, kind: "care", title: `${care.name} care plan`, price: `${eur(care.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`, oneOff: 0, monthly: care.monthly };
  return undefined;
}

export const selectionItems = (selections: readonly { id: string }[]) =>
  selections.map((s) => selectionItem(s.id)).filter((s): s is SelectionItem => Boolean(s));

export function selectionTotals(selections: readonly { id: string }[]): Fee {
  return selectionItems(selections).reduce((t, s) => ({ oneOff: t.oneOff + s.oneOff, monthly: t.monthly + s.monthly }), { oneOff: 0, monthly: 0 });
}

export function selectionPrice(selections: readonly { id: string }[]) {
  const totals = selectionTotals(selections);
  return `from ${eur(totals.oneOff)}${totals.monthly ? ` + ${eur(totals.monthly)}/mo` : ""}${VAT_REGISTERED ? " + VAT" : ""}`;
}

/** Human-readable selection for enquiry emails: names, prices and separate totals. */
export function selectionSummary(selections: readonly { id: string }[]) {
  const items = selectionItems(selections);
  if (!items.length) return "";
  const totals = selectionTotals(items);
  const v = VAT_REGISTERED ? " + VAT" : "";
  return [
    "Selected package:",
    ...items.map((s) => `- ${s.title}: ${s.price}`),
    `One-off setup: ${eur(totals.oneOff)}${v}`,
    ...(totals.monthly ? [`Monthly: ${eur(totals.monthly)}/mo${v}`] : []),
  ].join("\n");
}
