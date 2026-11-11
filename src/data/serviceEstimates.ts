import { aftercare, aftercareBonusPercent, businessOptions, carePlans, eur, findDiscountCode, type DiscountCode, priceLabel, refresh, tiers, VAT_REGISTERED } from "./pricing";

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

/** Enquiry-page discount: code % plus care-plan bonus % (additive), off website (tier) one-off prices only, rounded to the euro. */
export function discountBreakdown(selections: readonly { id: string }[], code?: string | null): { code?: DiscountCode; basePercent: number; bonusPercent: number; bonusPlan?: string; percent: number; websiteOneOff: number; amount: number } {
  const d = findDiscountCode(code);
  const items = selectionItems(selections);
  const websiteOneOff = items.filter((s) => s.kind === "tier").reduce((t, s) => t + s.oneOff, 0);
  const plan = d ? carePlans.find((c) => items.some((s) => s.id === c.id) && aftercareBonusPercent[c.id]) : undefined;
  const basePercent = d?.percent ?? 0;
  const bonusPercent = plan ? aftercareBonusPercent[plan.id] : 0;
  const percent = basePercent + bonusPercent;
  const amount = d && websiteOneOff ? Math.round((websiteOneOff * percent) / 100) : 0;
  return { ...(d ? { code: d } : {}), basePercent, bonusPercent, ...(plan ? { bonusPlan: plan.name } : {}), percent, websiteOneOff, amount };
}

export const discountAmount = (selections: readonly { id: string }[], code?: string | null): number => discountBreakdown(selections, code).amount;

export function selectionTotalsWithDiscount(selections: readonly { id: string }[], code?: string | null) {
  const totals = selectionTotals(selections);
  const b = discountBreakdown(selections, code);
  const amount = b.amount;
  return {
    oneOff: totals.oneOff - amount, monthly: totals.monthly, discount: amount,
    ...(amount > 0 && b.code ? { discountPercent: b.percent, discountLabel: b.code.label, bonusPercent: b.bonusPercent, ...(b.bonusPlan ? { bonusPlan: b.bonusPlan } : {}) } : {}),
  };
}

/** Human-readable selection for enquiry emails: names, prices and separate totals. */
export function selectionSummary(selections: readonly { id: string }[], code?: string | null) {
  const items = selectionItems(selections);
  if (!items.length) return "";
  const totals = selectionTotals(items);
  const v = VAT_REGISTERED ? " + VAT" : "";
  const from = selectionIsFrom(items) ? "from " : "";
  const b = discountBreakdown(items, code);
  const discount = b.amount;
  const d = discount > 0 ? b.code : undefined;
  return [
    "Selected package:",
    ...items.map((s) => `- ${s.title}: ${s.price}`),
    ...(d ? [`- Discount code ${d.code} (${b.bonusPlan ? `${d.label} ${b.basePercent}% + ${b.bonusPlan} bonus ${b.bonusPercent}% = ${b.percent}%` : `${d.label}, ${b.percent}%`} off website packages): −${eur(discount)}`] : []),
    d ? `One-off setup: ${from}${eur(totals.oneOff - discount)}${v} (was ${eur(totals.oneOff)}${v})` : `One-off setup: ${from}${eur(totals.oneOff)}${v}`,
    ...(totals.monthly ? [`Monthly: ${eur(totals.monthly)}/mo${v}`] : []),
  ].join("\n");
}
