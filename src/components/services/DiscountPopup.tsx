import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { MosaicBackdrop } from "@/components/services/MosaicBackdrop";
import { CONTACT_EMAIL } from "@/data/pricing";
import { invokeFunction } from "@/lib/supabaseFunctions";
import { markShown, queueReveal, shouldOfferWelcome, storeDismiss, storeUnlock, welcomeOffer } from "@/lib/welcomeOffer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** The popup opens only once the visitor has scrolled to the "Choose your package" section on /services (this element id). */
export const WELCOME_POPUP_SECTION_ID = "packages";
/** The section counts as reached when its top has risen into the top WELCOME_POPUP_SECTION_BAND of the viewport. */
export const WELCOME_POPUP_SECTION_BAND = 0.6;
/** Short pause after reaching the section, so the card does not pop mid-scroll. */
export const WELCOME_POPUP_ARM_DELAY_MS = 600;
export const ENQUIRY_PATH = "/services/start-project";

/** Dark input for the mosaic card (the panel's inputClass is themed, this card is always dark). */
const darkInputClass =
  "w-full min-h-12 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-base text-white backdrop-blur-sm transition-colors placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-1 focus:ring-white/50 md:min-h-0 md:text-sm";

/**
 * /services welcome offer. Opens once the pricing section has been scrolled to; an email unlocks the
 * 10%-off-everything code (emailed to Dave by the send-discount-unlock edge function), then the visitor
 * lands on the enquiry page, which types the code into the discount field and runs one gradient loop
 * around it (see StartProject).
 */
export const DiscountPopup = ({ sectionId = WELCOME_POPUP_SECTION_ID, armDelayMs = WELCOME_POPUP_ARM_DELAY_MS }: { sectionId?: string; armDelayMs?: number }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>();
  const sendingRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!shouldOfferWelcome()) return;
    const target = document.getElementById(sectionId);
    if (!target) return;
    let timer: number | undefined;
    const unwatch = () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
    const stop = () => { if (timer !== undefined) window.clearTimeout(timer); unwatch(); };
    const show = () => { stop(); markShown(); setOpen(true); };
    const onScroll = () => {
      if (timer !== undefined) return;
      if (target.getBoundingClientRect().top > window.innerHeight * WELCOME_POPUP_SECTION_BAND) return;
      unwatch();
      timer = window.setTimeout(show, armDelayMs);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // already there (anchor link, reload mid-page)
    return stop;
  }, [sectionId, armDelayMs]);

  const dismiss = () => { storeDismiss(); setOpen(false); };
  const onOpenChange = (next: boolean) => { if (!next && !sendingRef.current) dismiss(); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) { setError("Enter a valid email address"); return; }
    setError(undefined);
    setSending(true);
    sendingRef.current = true;
    try {
      await invokeFunction("send-discount-unlock", { email: value, company_website: honeypot, page: location.pathname });
    } catch (err) {
      console.error(err);
      setSending(false);
      sendingRef.current = false;
      setError(`That didn't send. Try again, or email ${CONTACT_EMAIL} and I'll send you the code.`);
      return;
    }
    storeUnlock(welcomeOffer.code);
    queueReveal(welcomeOffer.code);
    setOpen(false);
    navigate(ENQUIRY_PATH);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Above the floating selection bar (z-200) so it never pokes through the scrim. */}
        <DialogOverlay className="z-[210] bg-background/70 backdrop-blur-sm" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => { if (window.innerWidth < 768) e.preventDefault(); }}
          className="fixed inset-x-4 bottom-4 z-[220] overflow-hidden rounded-xl border border-white/10 bg-neutral-950 text-white shadow-2xl shadow-black/60 outline-none duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-8 data-[state=open]:slide-in-from-bottom-8 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%] sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]"
        >
          <MosaicBackdrop testId="welcome-backdrop" />
          <div className="relative z-10 max-h-[calc(100dvh-2rem)] overflow-y-auto">
            <div className="px-6 pb-6 pt-8 sm:px-8">
              <span className="font-mono-label text-pink-200">Welcome offer</span>
              <DialogPrimitive.Title className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {welcomeOffer.percent}% off, for the duration of your contract.
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-3 text-sm leading-relaxed text-white/75">
                Every website package and every care plan, {welcomeOffer.percent}% off for as long as we work together. Pop in your email to unlock the code, then use it whenever you're ready.
              </DialogPrimitive.Description>
            </div>
            <form onSubmit={submit} noValidate className="space-y-4 border-t border-white/10 px-6 py-6 sm:px-8">
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                <label htmlFor="welcome-company-website">Company website</label>
                <input id="welcome-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label htmlFor="welcome-email" className="font-mono-label text-white/60">Email</label>
                <input
                  id="welcome-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="you@yourbusiness.ie"
                  className={darkInputClass}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(undefined); }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "welcome-email-error" : undefined}
                />
                {error && <p id="welcome-email-error" role="alert" className="text-xs text-red-300">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-black px-6 text-sm font-semibold text-white transition-all hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.99] disabled:opacity-60"
              >
                {sending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Unlocking…</> : `Unlock my ${welcomeOffer.percent}% code →`}
              </button>
              <button type="button" onClick={dismiss} className="block w-full text-center text-xs text-white/60 transition-colors hover:text-white hover:underline">
                No thanks
              </button>
              <p className="text-[11px] leading-relaxed text-white/50">
                Your email goes to Dave so he can honour the code when you enquire. No newsletter, nothing passed on.
              </p>
            </form>
          </div>
          <DialogPrimitive.Close className="absolute right-4 top-4 z-20 rounded-sm text-white/70 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-neutral-950">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default DiscountPopup;
