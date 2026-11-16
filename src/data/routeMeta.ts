// Pure data module (no React/DOM): read by pages via Helmet and by the route-shells Vite plugin.
import { eur, priceLabel, refresh, segments, terms, tiers, webLadder } from "@/data/pricing";
import { services } from "@/data/services";
import { fitDescription } from "@/lib/seoDescription";

export type RouteMeta = { title: string; description: string; image?: string; jsonLd?: object };

export const hubMeta = {
  services: { title: "Web Design for Irish Businesses", description: "Lacuna Digital designs and builds fixed-quote websites for Irish small businesses, with hosting, domain and email looked after for you if you want. Designed and built by Dave Kelly in Dublin." },
  webDesign: { title: "Business Website Design in Dublin", description: `Professional business websites from ${eur(webLadder[0]?.price ?? 0)} and website refreshes from ${eur(refresh.priceFrom ?? 0)}. Fixed scope, clear payment terms and senior designer-led delivery from Dublin, for clinics, trades, salons and more.` },
  getStarted: { title: "Get Started", description: "Answer a few quick questions about your business and Lacuna Digital will recommend the right website, booking or automation package for you in minutes." },
  startProject: { title: "Start a Project", description: "Send Lacuna Digital your details and your chosen package. Fixed quote within two working days." },
  refer: { title: "Refer a Friend", description: `Refer a business to Lacuna Digital: you get ${eur(terms.referral)} off your next invoice and they get ${eur(terms.referral)} off their package once their deposit is paid. No limit on referrals.` },
  terms: { title: "Project Terms", description: "Lacuna Digital's plain-English project terms covering payment stages, care plans, revisions, content deadlines, AI disclosure and third-party services." },
} satisfies Record<string, RouteMeta>;

export function segmentMeta(key: keyof typeof segments, metaCategory: string): RouteMeta {
  const segment = segments[key];
  return {
    title: `${segment.title} Websites in Dublin`,
    description: fitDescription(`${metaCategory} from ${priceLabel(tiers[0])}.`, segment.tagline, "Fixed scope, clear payment terms and a free 20-minute call with Dave Kelly in Dublin."),
  };
}

export function serviceMeta(service: (typeof services)[number]): RouteMeta {
  return {
    title: /dublin/i.test(service.title) ? service.title : `${service.title} Services in Dublin`,
    description: fitDescription(service.metaDescription, service.intro, "Delivered by Dave Kelly at Lacuna Digital, a senior designer-led studio in Dublin."),
  };
}
