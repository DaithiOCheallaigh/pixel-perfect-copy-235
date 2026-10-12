# Pricing overhaul — step 1

- Add the supplied central EUR pricing data and formatting helpers.
- Update only the Services hub: hero and entry offer, six industry cards plus a general web-services link, selectable service prices, care plans and payment/VAT notes.
- Preserve the tools teaser, social proof, orbital section and existing selection cleanup.
- Add focused pricing tests and check desktop/mobile rendering and selection behaviour without sending emails.

## Technical boundaries
- No files under `supabase/` will be created, edited, deleted or deployed.
- Other pages migrate in later steps; new segment links may show 404 until step 2.
- Keep the supplied pricing data unchanged; replace the helper’s non-null assertion with equivalent safe narrowing to follow project TypeScript rules.
- The server’s existing service-price map remains unchanged in this frontend-only step; email quotations are not repriced yet.