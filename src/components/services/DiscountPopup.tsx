import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { inputClass } from "@/components/services/PackagePanel";
import { CONTACT_EMAIL } from "@/data/pricing";
import { invokeFunction } from "@/lib/supabaseFunctions";
import { markShown, queueReveal, shouldOfferWelcome, storeDismiss, storeUnlock, welcomeOffer } from "@/lib/welcomeOffer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** The popup opens after this long on /services, or once the visitor has scrolled WELCOME_POPUP_SCROLL of the page, whichever comes first. */
export const WELCOME_POPUP_DELAY_MS = 7000;
export const WELCOME_POPUP_SCROLL = 0.35;
export const ENQUIRY_PATH = "/services/start-project";

/**
 * /services welcome offer. An email unlocks the 10%-off-everything code (emailed to Dave by the
 * send-discount-unlock edge function), then the visitor lands on the enquiry page, which types the
 * code into the discount field and runs one gradient loop around it (see StartProject).
 */
export const DiscountPopup = ({ delayMs = WELCOME_POPUP_DELAY_MS, scrollFraction = WELCOME_POPUP_SCROLL }: { delayMs?: number; scrollFraction?: number }) => {
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
    let timer: number | undefined;
    const stop = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    const show = () => { stop(); markShown(); setOpen(true); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= scrollFraction) show();
    };
    timer = window.setTimeout(show, delayMs);
    window.addEventListener("scroll", onScroll, { passive: true });
    return stop;
  }, [delayMs, scrollFraction]);

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
          className="fixed inset-x-4 bottom-4 z-[220] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-primary/30 bg-card text-card-foreground shadow-2xl shadow-primary/20 outline-none duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-8 data-[state=open]:slide-in-from-bottom-8 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%] sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]"
        >
          <div className="bg-primary/10 px-6 pb-6 pt-8 sm:px-8">
            <span className="font-mono-label text-primary">Welcome offer</span>
            <DialogPrimitive.Title className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {welcomeOffer.percent}% off, for the duration of your contract.
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every website package and every care plan, {welcomeOffer.percent}% off for as long as we work together. Pop in your email to unlock the code, then use it whenever you're ready.
            </DialogPrimitive.Description>
          </div>
          <form onSubmit={submit} noValidate className="space-y-4 px-6 py-6 sm:px-8">
            <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
              <label htmlFor="welcome-company-website">Company website</label>
              <input id="welcome-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="welcome-email" className="font-mono-label text-muted-foreground">Email</label>
              <input
                id="welcome-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={254}
                placeholder="you@yourbusiness.ie"
                className={inputClass}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(undefined); }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "welcome-email-error" : undefined}
              />
              {error && <p id="welcome-email-error" role="alert" className="text-xs text-destructive">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] disabled:opacity-60"
            >
              {sending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Unlocking…</> : `Unlock my ${welcomeOffer.percent}% code →`}
            </button>
            <button type="button" onClick={dismiss} className="block w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline">
              No thanks
            </button>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Your email goes to Dave so he can honour the code when you enquire. No newsletter, nothing passed on.
            </p>
          </form>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm text-muted-foreground opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default DiscountPopup;