# Architecture rules

- MedEd Workspace's route gate validates the password and signed, expiring access tokens in an edge function; never embed the password or trust a client-only unlock flag. This keeps access checks out of the public client bundle.
- This is a display gate for a client-rendered portfolio, not confidential document storage; truly sensitive content must be served by an authorized backend rather than bundled client code.
- Keep the supplied MedEd Workspace student prototype unchanged as a public standalone HTML document; mount its iframe only after a desktop visitor clicks to load it, avoiding an automatic large download.
- User-supplied self-contained HTML animations are copied into public/embeds byte-for-byte and never edited, then mounted as transparent-background iframes; their own theme and transparency handling must stay intact so they blend into whatever surface hosts them.
- Lead-form edge functions validate, HTML-escape and send through supabase/functions/_shared/email-utils.ts, and send-service-selection prices services from its own server-side map; client-sent titles and prices are never trusted. The frontend-only pricing overhaul leaves that map unchanged until a separately authorized backend update.
- All new or migrated frontend pricing reads src/data/pricing.ts and its formatting helpers; this prevents duplicated prices and keeps VAT handling consistent while existing pages migrate in subsequent steps.
- IndustryLanding renders all six pricing segments through one template, with editorial proof and FAQs in src/data/segmentPages.ts and legacy URLs redirected by React Router; this keeps scopes, VAT and care terms consistent without duplicating prices.
- ProductStudio owns the product-team and business-automation offers; legacy AI Integration URLs redirect there, keeping one current offer page rather than competing pricing pages.
- Individual service price lines are defined in the service catalogue using the shared pricing exports and rendered by ServicePage; this keeps every detail page priced without duplicating amounts in presentation code.
- Pages using usePageDescription synchronise the static description fallback with their managed SEO description and restore it on unmount; this avoids conflicting descriptions without changing the site's static head globally.
- Intake options and plain-English working terms are shared data modules using the pricing catalogue; this makes numeric rules testable without duplicating page values.
- Selection estimates derive setup and recurring fees by service ID from the pricing catalogue, never by parsing labels or trusting stored price totals; this keeps monthly fees separate and stale session prices out of quotes.
- Generate portfolio public/llms.txt from projects/profile and public/llms-services.txt pricing from the shared catalogue using scripts/generate-llms.ts; this separates recruiter discovery from commercial pricing without creating a services directory.
- Keep personal identity and hiring-contact constants in the profile module, re-exporting shared experience from pricing; this prevents portfolio code depending on the commercial catalogue.
- SEO derives section branding, default sharing image and fallback service schema from the current pathname; PortfolioSEO is a compatibility re-export and layouts do not set page metadata, avoiding competing head tags.
- Portfolio pages use HiringCTA while commercial pages retain AvailabilityCTA; this isolates hiring contact from commercial offers.

- Work filters and sorts a copy of the project catalogue independently of catalogue order; this preserves other consumers while prioritising recruiter case studies.
- Portfolio images live under public/images with lowercase-kebab names, at most 1600px wide, and their pixel sizes are recorded in src/data/imageDimensions.ts for <img> width/height; regenerate that map after adding or resizing images so layout space stays reserved.
- Pages are lazy-loaded route chunks in App.tsx while layouts, LegacyRedirect and NotFound stay eager; this keeps the first download small.
- The portfolio Skills expertise list is intentionally plain text, not links, so recruiters are not sent into the Lacuna Digital services site.
