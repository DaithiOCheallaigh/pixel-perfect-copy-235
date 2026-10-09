# Architecture rules

- MedEd Workspace's route gate validates the password and signed, expiring access tokens in an edge function; never embed the password or trust a client-only unlock flag. This keeps access checks out of the public client bundle.
- This is a display gate for a client-rendered portfolio, not confidential document storage; truly sensitive content must be served by an authorized backend rather than bundled client code.
- Keep the supplied MedEd Workspace student prototype unchanged as a public standalone HTML document; mount its iframe only after a desktop visitor clicks to load it, avoiding an automatic large download.
- User-supplied self-contained HTML animations are copied into public/embeds byte-for-byte and never edited, then mounted as transparent-background iframes; their own theme and transparency handling must stay intact so they blend into whatever surface hosts them.- Lead-form edge functions validate, HTML-escape and send through supabase/functions/_shared/email-utils.ts, and send-service-selection prices services from its own server-side map (keep it in sync with allServices in Services.tsx); client-sent titles and prices are never trusted.
