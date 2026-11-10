import { aftercare, emailSetup, monthlyLabel, segments, tiers, bespokeFrom, addOnCatalogue, addOnPriceLabel, carePlans, careTerms, addOns, entry, terms, eur, priceLabel, BUSINESS_BASE_PAGES, BUSINESS_MAX_PAGES, BUSINESS_PER_PAGE, businessOption, refreshNotes, vatFootnote, CONTACT_EMAIL, CALENDLY_URL } from "../src/data/pricing";
import { writeFileSync } from "node:fs";
import { projects } from "../src/data/projects";
import { YEARS_EXPERIENCE, CV_URL, PORTFOLIO_EMAIL, LINKEDIN_URL } from "../src/data/profile";

const BASE_URL = "https://www.lacunadigital.io";

export function buildPortfolioLlms() {
  const caseStudies = projects.filter(project => !project.comingSoon && project.listed !== false).map(project => {
    if (project.id === "spark") return `- [MedEd Workspace (Elsevier)](${BASE_URL}/work/spark): password-protected`;
    const path = project.id === "marsh-design-system" || project.id === "marsh-internal-tooling"
      ? `/work/${project.id}` : `/case/${project.id}`;
    return `- [${project.title}](${BASE_URL}${path})`;
  });
  return `# Dave Kelly — Senior Product Designer

> Dave Kelly is a senior product designer based in Dublin, Ireland, with ${YEARS_EXPERIENCE} years' experience across enterprise tools, design systems and consumer products. Open to full-time senior product design roles.

## Pages

- [Home](${BASE_URL}/)
- [Work](${BASE_URL}/work)
- [About](${BASE_URL}/about)
- [Skills](${BASE_URL}/skills)
- [AI Design Process](${BASE_URL}/ai-design-process)
- [Blog](${BASE_URL}/blog)
- [CV (PDF)](${BASE_URL}${CV_URL})

## Case studies

${caseStudies.join("\n")}

## Contact

- Email: ${PORTFOLIO_EMAIL}
- LinkedIn: ${LINKEDIN_URL}
`;
}

export function buildServicesLlms() {
  const packageLine = (p: (typeof tiers)[number]) => `- ${p.name}: ${priceLabel(p)}${p.monthly ? `; ${monthlyLabel(p)}` : ""}. Live in ${p.live}.`;
  return `# Lacuna Digital

> Lacuna Digital is Dave Kelly's independent web design practice in North County Dublin.

Websites for Irish small businesses, designed and built by a senior product designer: fixed price, launch date in writing, and optional care plans after launch.

## Pages

- [Services](${BASE_URL}/services)
${Object.values(segments).map(s => `- [${s.title}](${BASE_URL}/services/${s.slug})`).join("\n")}
- [Web Design](${BASE_URL}/services/web-design)
- [Refer](${BASE_URL}/services/refer)
- [Terms](${BASE_URL}/services/terms)
- [Get Started](${BASE_URL}/services/get-started)
- [Start a Project](${BASE_URL}/services/start-project)

## Services & pricing (EUR, + VAT unless stated)

${vatFootnote()}
Free intro call and fixed written quote within ${entry.introCall.quoteWithin}. Digital Health Check ${eur(entry.healthCheck.price)} (+${eur(entry.healthCheck.onSiteExtra)} on site), half credited against custom work.

### Website tiers (one ladder for every business)

${tiers.map(packageLine).join("\n")}
- Business Site pages: ${BUSINESS_BASE_PAGES} pages ${eur(businessOption(BUSINESS_BASE_PAGES).price)}, then ${eur(BUSINESS_PER_PAGE)} per extra page up to ${BUSINESS_MAX_PAGES} (${eur(businessOption(BUSINESS_MAX_PAGES).price)}); blog from 6 pages, booking or CRM integration from 8, local SEO setup and 3 revision rounds at 10.
${refreshNotes()}
Need more? Bespoke builds from ${eur(bespokeFrom)} + VAT, quoted in writing.
Industry pages (${Object.values(segments).map(s => s.title).join(", ")}) reuse these tiers.

### Add-ons

${addOnCatalogue.map(a => `- ${a.name}: ${addOnPriceLabel(a)}.`).join("\n")}
- Extra email inbox ${eur(addOns.email.extraInbox)}; migration ${eur(addOns.email.migrationPerMailbox)} per mailbox; licences billed directly. Extra work quoted per job.

### After launch

- ${aftercare.selfManaged.name}: ${aftercare.selfManaged.priceLine}. ${aftercare.selfManaged.includes.join("; ")}.
- ${aftercare.managed.name}: ${aftercare.managed.priceLine}. ${aftercare.managed.includes.join("; ")}.

### Email setup

- ${emailSetup.name}: ${eur(emailSetup.setup)} + VAT one-off. ${emailSetup.includes.join("; ")}.

### Care plans

${carePlans.map(p => `- ${p.name}: ${eur(p.monthly)}/month. ${p.includes.join("; ")}.`).join("\n")}
${careTerms.minimums}. ${careTerms.annualPrepay}. ${careTerms.exit}

## Proof (portfolio case studies)

- [Marsh Design System](${BASE_URL}/work/marsh-design-system)
- [Marsh Internal Tooling](${BASE_URL}/work/marsh-internal-tooling)
- [MedEd Workspace](${BASE_URL}/work/spark): password-protected portfolio case study.
- [TripAdmit white-label](${BASE_URL}/case/whitelabel)
- [TipDirect tipping](${BASE_URL}/case/digital-tipping)
- [AI-assisted reviews](${BASE_URL}/case/ai-reviews)
- [Therapie booking](${BASE_URL}/case/booking-app)

## Contact

${CONTACT_EMAIL}
Book a free call: ${CALENDLY_URL}
`;
}

if (process.argv[1]?.endsWith("generate-llms.ts")) {
  writeFileSync("public/llms.txt", buildPortfolioLlms());
  if (!process.argv.includes("--portfolio-only")) writeFileSync("public/llms-services.txt", buildServicesLlms());
}