import { aftercare, businessOptions, carePlans, eur, findDiscountCode, priceLabel, refresh, tiers, VAT_REGISTERED } from "./pricing";

/** Setup and recurring fees are separate; optional website instalments are not added to setup. */
export type Fee = { oneOff: number; monthly: number };
export type SelectionKind = "tier" | "aftercare" | "care";
export type SelectionItem = { id: string; kind: SelectionKind; title: string; price: string } & Fee;

export const SELECTION_STORAGE_KEY = "lacuna-services-selection";
export const DISCOUNT_STORAGE_KEY = "lacuna-services-discount";

/** Price a tier, aftercare choice, or care plan by its catalogue ID; unknown IDs return undefined. */
export function selectionItem(id: string): SelectionItem | undefined {
  const tier = tiers.find((t) => t.id === id);
  if (tier) return { id, kind: "tier", title: tier.id === "refresh" ? tier.name : `${tier.name} website`, price: priceLabel(tier), oneOff: tier.price ?? tier.priceFrom ?? 0, monthly: 0 };
  const biz = id !== "business" ? businessOptions.find((o) => o.id === id) : undefined;
  if (biz) return { id, kind: "tier", title: `Business Site website (${biz.pages} pages)`, price: `${eur(biz.price)}${VAT_REGISTERED ? " + VAT" : ""}`, oneOff: biz.price, monthly: 0 };
  const care = carePlans.find((c) => c.id === id);
  if (care) return { id, kind: "care", title: `${care.name} care plan`, price: `${eur(care.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`, oneOff: 0, monthly: care.monthly };
  if (id === aftercare.selfManaged.id) return { id, kind: "aftercare", title: "Self-managed after launch", price: aftercare.selfManaged.priceLine, oneOff: 0, monthly: 0 };
  return undefined;
}

export const selectionItems = (selections: readonly { id: string }[]) =>
  selections.map((s) => selectionItem(s.id)).filter((s): s is SelectionItem => Boolean(s));

export function selectionTotals(selections: readonly { id: string }[]): Fee {
  return selectionItems(selections).reduce((t, s) => ({ oneOff: t.oneOff + s.oneOff, monthly: t.monthly + s.monthly }), { oneOff: 0, monthly: 0 });
}

/** True when the selection includes a from-priced package (the refresh). */
export const selectionIsFrom = (selections: readonly { id: string }[]) => selections.some((s) => s.id === refresh.id);

export function selectionPrice(selections: readonly { id: string }[]) {
  const totals = selectionTotals(selections);
  return `from ${eur(totals.oneOff)}${totals.monthly ? ` + ${eur(totals.monthly)}/mo` : ""}${VAT_REGISTERED ? " + VAT" : ""}`;
}

/** Enquiry-page discount: percent off website (tier) one-off prices only, rounded to the euro. */
export function discountAmount(selections: readonly { id: string }[], code?: string | null): number {
  const d = findDiscountCode(code);
  if (!d) return 0;
  const website = selectionItems(selections).filter((s) => s.kind === "tier").reduce((t, s) => t + s.oneOff, 0);
  return website ? Math.round((website * d.percent) / 100) : 0;
}

export function selectionTotalsWithDiscount(selections: readonly { id: string }[], code?: string | null) {
  const totals = selectionTotals(selections);
  const discount = discountAmount(selections, code);
  const d = discount > 0 ? findDiscountCode(code) : undefined;
  return { oneOff: totals.oneOff - discount, monthly: totals.monthly, discount, ...(d ? { discountLabel: d.label, discountPercent: d.percent } : {}) };
}

/** Human-readable selection for enquiry emails: names, prices and separate totals. */
export function selectionSummary(selections: readonly { id: string }[], code?: string | null) {
  const items = selectionItems(selections);
  if (!items.length) return "";
  const totals = selectionTotals(items);
  const v = VAT_REGISTERED ? " + VAT" : "";
  const from = selectionIsFrom(items) ? "from " : "";
  const discount = discountAmount(items, code);
  const d = discount > 0 ? findDiscountCode(code) : undefined;
  return [
    "Selected package:",
    ...items.map((s) => `- ${s.title}: ${s.price}`),
    ...(d ? [`- Discount code ${d.code} (${d.label}, ${d.percent}% off website packages): −${eur(discount)}`] : []),
    d ? `One-off setup: ${from}${eur(totals.oneOff - discount)}${v} (was ${eur(totals.oneOff)}${v})` : `One-off setup: ${from}${eur(totals.oneOff)}${v}`,
    ...(totals.monthly ? [`Monthly: ${eur(totals.monthly)}/mo${v}`] : []),
  ].join("\n");
}
