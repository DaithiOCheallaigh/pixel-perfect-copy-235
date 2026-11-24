import { discountCodes, type DiscountCode } from "@/data/pricing";
import { DISCOUNT_STORAGE_KEY } from "@/data/serviceEstimates";

/** The 10%-off-everything code unlocked by the /services email popup (src/components/services/DiscountPopup.tsx). */
export const WELCOME_OFFER_ID = "welcome10";
export const welcomeOffer: DiscountCode = discountCodes.find((d) => d.id === WELCOME_OFFER_ID)!;

/** localStorage: JSON { code, unlockedAt } once an email has been submitted; the enquiry page pre-fills the code from it on later visits. */
export const WELCOME_UNLOCK_KEY = "lacuna-welcome-offer";
/** localStorage: ISO time of the last dismissal; the popup stays away for WELCOME_DISMISS_DAYS. */
export const WELCOME_DISMISS_KEY = "lacuna-welcome-offer-dismissed";
/** sessionStorage: "1" once the popup has been shown in this tab. */
export const WELCOME_SHOWN_KEY = "lacuna-welcome-offer-shown";
/** sessionStorage: the code the enquiry page should type into the discount field on arrival. */
export const WELCOME_REVEAL_KEY = "lacuna-welcome-offer-reveal";
export const WELCOME_DISMISS_DAYS = 14;

type Store = () => Storage;
const local: Store = () => window.localStorage;
const session: Store = () => window.sessionStorage;
const read = (store: Store, key: string): string | null => { try { return store().getItem(key); } catch { return null; } };
const write = (store: Store, key: string, value: string | null) => {
  try { if (value === null) store().removeItem(key); else store().setItem(key, value); } catch { /* storage unavailable (private mode, quota) */ }
};

export function readUnlockedCode(): string | undefined {
  const raw = read(local, WELCOME_UNLOCK_KEY);
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as { code?: unknown };
    return typeof parsed?.code === "string" && parsed.code ? parsed.code : undefined;
  } catch { return undefined; }
}
export const storeUnlock = (code: string, now = new Date()) => write(local, WELCOME_UNLOCK_KEY, JSON.stringify({ code, unlockedAt: now.toISOString() }));

export function dismissedRecently(now = Date.now()): boolean {
  const at = Date.parse(read(local, WELCOME_DISMISS_KEY) ?? "");
  return Number.isFinite(at) && now - at < WELCOME_DISMISS_DAYS * 86_400_000;
}
export const storeDismiss = (now = new Date()) => write(local, WELCOME_DISMISS_KEY, now.toISOString());

export const shownThisSession = () => read(session, WELCOME_SHOWN_KEY) === "1";
export const markShown = () => write(session, WELCOME_SHOWN_KEY, "1");

/** Whether /services should offer the popup at all: never after an unlock, a recent dismissal, once per tab, or when a code is already entered. */
export const shouldOfferWelcome = () => !readUnlockedCode() && !dismissedRecently() && !shownThisSession() && !read(session, DISCOUNT_STORAGE_KEY);

export const queueReveal = (code: string) => write(session, WELCOME_REVEAL_KEY, code);
export const peekReveal = (): string | undefined => read(session, WELCOME_REVEAL_KEY) ?? undefined;
export const clearReveal = () => write(session, WELCOME_REVEAL_KEY, null);