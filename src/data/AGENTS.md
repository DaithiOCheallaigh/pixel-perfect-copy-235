# src/data rules

- Discount codes live in `discountCodes` in src/data/pricing.ts and are applied client-side only on the enquiry page (website one-off prices, never care plans); the discount line goes into the brief summary; codes are never shown in site copy, llms files or the services page bar.
- Care plans add a further 5% (Care) or 10% (Growth, Growth + AI) to a valid discount code, additive, website one-off only. The enquiry panel is the full package builder (website incl. Business pages, aftercare, code) and is the only place totals with discounts are shown.
- The enquiry form is two steps (About You required; Your Project optional, pre-filled project type from the chosen website). The package panel renders inline on desktop step 1 and as a compact sticky bottom bar with a vaul Drawer editor elsewhere; both share PackagePanel and the same state.
