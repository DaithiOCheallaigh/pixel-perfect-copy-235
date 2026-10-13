import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import SocialProof from "@/components/SocialProof";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { bespokeLine, monthlyLabel, addOns, availability, carePlans, careTerms, eur, priceLabel, terms, vatFootnote, webLadder } from "@/data/pricing";
import { usePageDescription } from "@/hooks/usePageDescription";

interface RecentProject {
  name: string;
  descriptor: string;
  url: string;
  image: string;
}

const recentProjects: RecentProject[] = [
  { name: "Nicholas Moody Kitchens", descriptor: "Bespoke kitchen design studio based in Cork", url: "https://nicholasmoodykitchens.com", image: "/images/work/nicholas-moody-kitchens.png" },
  { name: "Savvy Kitchens", descriptor: "Contemporary kitchen design and project showcase", url: "https://savvykitchens.ie", image: "/images/work/savvy-kitchens.png" },
  { name: "Appliance Showcase", descriptor: "SEO optimised subdomain site", url: "https://appliances.savvykitchens.ie/", image: "/images/work/appliance-showcase.png" },
  { name: "Glimmers Mental Health Services", descriptor: "Mental health therapy practice led by Dr. Claire Mc Grotty, PhD, LCPC", url: "https://glimmersmhs.com", image: "/images/work/glimmers-mhs.png" },
  { name: "Ease Dental", descriptor: "State-of-the-art dental clinic in Dublin 12", url: "https://easedental.ie", image: "/images/work/ease-dental.png" },
  { name: "KBB Digital", descriptor: "Interior design photography & digital marketing studio", url: "https://www.kbbdigital.ie/", image: "/images/work/kbb-digital.png" },
];

const extras = [
  ["Extra page", `${eur(addOns.extraPage)} per page`],
  ["Google Business Profile setup", eur(addOns.gbp)],
  ["Online booking setup", eur(addOns.booking)],
  ["Stripe checkout", eur(addOns.stripe)],
  ["Email setup", `${eur(addOns.email.setup)} (${addOns.email.inboxesIncluded} inboxes); +${eur(addOns.email.extraInbox)} per extra inbox. Licences billed to you.`],
  ["Brand starter", eur(addOns.brandStarter)],
  ["Copywriting", `${eur(addOns.copyPerPage)} per page`],
  ["Extra work", `${eur(addOns.hourly)}/hour in ${terms.extraWorkBlockMinutes}-minute blocks`],
];
const WebDesignServices = () => {
  const description = `Professional business websites from ${eur(webLadder[0]?.price ?? 0)}. Fixed scope, clear payment terms and senior designer-led delivery from Dublin, for clinics, trades, salons and more.`;
  usePageDescription(description);
  return (
  <main className="bg-background pt-24 text-foreground">
    <SEO title="Business Website Design in Dublin" description={description} />
    <section className="px-6 pb-12 pt-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Web Design</SectionLabel>
        <h1 className="max-w-4xl text-4xl font-black md:text-6xl">Websites for professional services &amp; other businesses</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">I handle strategy, design, build and launch. A fixed scope, a fixed price and a launch date in writing — with one person responsible from start to finish.</p>
        <p className="mt-4 text-sm text-primary">{availability.headline} · Next start: {availability.nextStart}</p>
        <Button asChild className="mt-6"><Link to="/services/start-project">Get a fixed quote in 48 hours <ArrowRight /></Link></Button>
      </div>
    </section>
    <section className="px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Recent Work</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map(project => <a key={project.name} href={project.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-lg border border-border bg-card md:hover:border-primary/40">
            <img src={project.image} alt={`${project.name} website`} className="aspect-video w-full object-cover object-top" loading="lazy" />
            <div className="p-5"><h2 className="font-bold">{project.name} ↗</h2><p className="mt-2 text-sm text-muted-foreground">{project.descriptor}</p></div>
          </a>)}
        </div>
      </div>
    </section>
    <section id="pricing" className="px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Website Packages</SectionLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {webLadder.map(tier => <article key={tier.id} className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-bold">{tier.name}</h2><p className="mt-3 text-2xl font-bold">{priceLabel(tier)}</p>
            {tier.monthly && <p className="mt-2 text-sm text-primary">{monthlyLabel(tier)}</p>}
            <ul className="mt-6 flex-1 space-y-3">{tier.scope?.map(item => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul>
            <p className="mt-5 text-xs text-muted-foreground">Live in {tier.live} from a complete intake</p>
            <Button asChild variant="outline" className="mt-6"><Link to="/services/start-project">Get a fixed quote <ArrowRight /></Link></Button>
          </article>)}
        </div>
        <p className="mt-6 text-sm"><Link to="/services/start-project" className="text-primary hover:underline">{bespokeLine()} →</Link></p>
        <p className="mt-6 text-sm text-muted-foreground">A revision round is one consolidated written list within 5 working days; new work after design sign-off is {eur(addOns.hourly)}/hour.</p>
        <div className="mt-12">
          <SectionLabel>Add-ons</SectionLabel>
          <dl>{extras.map(([name, price]) => <div key={name} className="grid gap-2 border-b border-border py-4 sm:grid-cols-2"><dt className="font-medium">{name}</dt><dd className="text-sm text-muted-foreground sm:text-right">{price}</dd></div>)}</dl>
        </div>
      </div>
    </section>
    <section className="px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl"><SectionLabel>Care Plans</SectionLabel>
        <div className="grid gap-4 md:grid-cols-3">{carePlans.map(plan => <article key={plan.id} className="rounded-lg border border-border bg-card p-6"><h2 className="text-xl font-bold">{plan.name}</h2><p className="mt-3 text-2xl font-bold">{eur(plan.monthly)}<span className="text-sm font-normal text-muted-foreground"> / month</span></p><ul className="mt-5 space-y-3 text-sm text-muted-foreground">{plan.includes.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
        <p className="mt-6 text-sm text-muted-foreground">{careTerms.minimums}. {careTerms.annualPrepay}.</p><p className="mt-3 text-sm text-muted-foreground">{careTerms.exit}</p>
      </div>
    </section>
    <section className="px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-6xl space-y-4 text-sm text-muted-foreground">
      <SectionLabel>Good to Know</SectionLabel>
      <p>Year-1 domain included. Launch includes 12 months' hosting; after that, hosting is in every care plan, or move it to your own account free.</p>
      <p>Professional email licences are billed to you directly.</p>
      <p>Under {eur(terms.upfrontBelow)}: {terms.upTo1000}. Up to {eur(terms.splitThrough)}: {terms.to3000}. Above: {terms.over3000}.</p>
      <p>{terms.payMonthlyNote}.</p><p>{vatFootnote()}</p>
      <Link to="/services#packages" className="block text-primary">Built for your industry: Kitchens &amp; Joinery · Clinics &amp; Practices · Salons &amp; Barbers · Tours &amp; Experiences →</Link>
      <Button asChild variant="outline"><Link to="/services/product-studio">Explore Product Studio <ArrowRight /></Link></Button>
    </div></section>
    <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" /><SocialProof />  </main>
);
};
export default WebDesignServices;
