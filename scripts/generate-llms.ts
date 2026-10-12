import { segments, webLadder, carePlans, careTerms, addOns, studio, entry, terms, eur, priceLabel, vatFootnote, CONTACT_EMAIL, CALENDLY_URL } from "../src/data/pricing";
import { writeFileSync } from "node:fs";

export function buildLlmsText() {
  const packageLine = (p: (typeof webLadder)[number]) => `- ${p.name}: ${priceLabel(p)}${p.monthly ? `; or ${eur(p.monthly)}/mo × 12` : ""}. Live in ${p.live}.`;
  const studioRows = [
    `Day rate ${eur(studio.dayRate)}; agency white-label ${eur(studio.agencyDayRate)}/day (${studio.agencyMinDays}-day minimum).`,
    `Fractional Product Designer ${eur(studio.fractional.monthly)}/month for ${studio.fractional.days} days (${studio.fractional.minMonths}-month minimum).`,
    `Investor Prototype ${eur(studio.investorPrototype)} (5 working days); Prototype Sprint ${eur(studio.prototypeSprint)} (3 weeks); 5 moderated tests +${eur(studio.userTestingAddOn)}.`,
    `AI-built MVP from ${eur(studio.mvpFrom)} (6–10 weeks, only after a Prototype Sprint).`,
    `UX & Accessibility Audit: Focused ${eur(studio.uxAuditFocused)} (5 days, WCAG 2.2 AA spot check); Comprehensive ${eur(studio.uxAuditComprehensive)}.`,
    `Design System Foundation from ${eur(studio.designSystemFrom)} (8 weeks); Digital / AI Discovery Roadmap ${eur(studio.discoveryRoadmap)} (5 days).`,
    `AI Opportunity Audit ${eur(entry.aiAudit.price)} (about 2 days, half credited against Automation Sprint, up to ${entry.aiAudit.maxStaff} staff). Automation Sprint typically ${eur(studio.automationSprintRange[0])}–${eur(studio.automationSprintRange[1])}, fixed price agreed in writing.`,
    `AI Ops ${eur(studio.aiOps.monthly)}/month for ${studio.aiOps.hours} hours including meetings; ${studio.aiOps.minMonths}-month minimum then ${studio.aiOps.noticeDays} days' notice; overage ${eur(studio.aiOps.overageHourly)}/hour.`,
  ];
  return `# Lacuna Digital

> Lacuna Digital is Dave Kelly's independent product design and digital consulting practice in North County Dublin.

Senior product design and AI-assisted build: fixed-price launches from 5 working days; prototypes in 5 days.

## Pages

- [Home](/)
- [About](/about)
- [Skill Set](/skills)
- [My Work](/work)
- [Blog](/blog)
- [AI Design Process](/ai-design-process)
- [Services](/services)
${Object.values(segments).map(s => `- [${s.title}](/services/${s.slug})`).join("\n")}
- [Web Design](/web-design)
- [Product Studio](/product-studio)
- [Free tools](/tools)
- [Refer](/refer)
- [Terms](/terms)
- [Get Started](/get-started)
- [Start a Project](/start-project)

## Services & pricing (EUR, + VAT unless stated)

${vatFootnote()}
Free 20-minute introductory call and fixed written quote within ${entry.introCall.quoteWithin}. Digital Health Check ${eur(entry.healthCheck.price)} (+${eur(entry.healthCheck.onSiteExtra)} on site), half credited against custom work.

${Object.values(segments).map(s => `### ${s.title}\n\n${s.packages.map(packageLine).join("\n")}`).join("\n\n")}

### Web ladder

${webLadder.map(packageLine).join("\n")}

### Care plans

${carePlans.map(p => `- ${p.name}: ${eur(p.monthly)}/month. ${p.includes.join("; ")}.`).join("\n")}
${careTerms.minimums}. ${careTerms.annualPrepay}. ${careTerms.exit}

### Key add-ons

- Extra page ${eur(addOns.extraPage)}; Google profile ${eur(addOns.gbp)}; booking ${eur(addOns.booking)}; Stripe checkout ${eur(addOns.stripe)}.
- Email setup ${eur(addOns.email.setup)} (${addOns.email.inboxesIncluded} inboxes); extra inbox ${eur(addOns.email.extraInbox)}; migration ${eur(addOns.email.migrationPerMailbox)} per mailbox; licences billed directly.
- Social setup ${eur(addOns.socialSetup)}; posting ${eur(addOns.socialPosting.monthly)}/month (${addOns.socialPosting.posts} posts).
- Delivery listing tune-up ${eur(addOns.listingTuneup)} per approved platform.
- AI assistant ${eur(addOns.aiAssistant.setup)} + ${eur(addOns.aiAssistant.monthly)}/month (${addOns.aiAssistant.conversations} conversations); missed-call text-back ${eur(addOns.missedCall.monthly)}/month.
- AI receptionist ${eur(addOns.aiReceptionist.setup)} + ${eur(addOns.aiReceptionist.monthly)}/month (${addOns.aiReceptionist.minutes} minutes).
- CRM starter ${eur(addOns.crmStarter)}; brand starter ${eur(addOns.brandStarter)}; copy ${eur(addOns.copyPerPage)} per page; extra work ${eur(addOns.hourly)}/hour in ${terms.extraWorkBlockMinutes}-minute blocks.

### Product Studio

${studioRows.map(row => `- ${row}`).join("\n")}

## Case studies

- [Marsh Design System](/work/marsh-design-system)
- [Marsh Internal Tooling](/work/marsh-internal-tooling)
- [MedEd Workspace](/work/spark): password-protected portfolio case study.
- [TripAdmit white-label](/case/whitelabel)
- [TipDirect tipping](/case/digital-tipping)
- [AI-assisted reviews](/case/ai-reviews)
- [Therapie booking](/case/booking-app)

## Contact

${CONTACT_EMAIL}
Book a 20-minute call: ${CALENDLY_URL}

## Optional

- [Sitemap](/sitemap)
`;
}

if (import.meta.main) writeFileSync("public/llms.txt", buildLlmsText());