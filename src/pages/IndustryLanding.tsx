import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { resolveLegacyTarget } from "@/routing/resolveLegacyTarget";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CALENDLY_URL, carePlans, careTerms, eur, priceLabel, monthlyLabel, restaurantPayback, segments, vatFootnote } from "@/data/pricing";
import { clinicCompliance, getSegmentKey, grantNote, legacySegmentRedirects, lowestPackage, segmentPages } from "@/data/segmentPages";

const IndustryLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const { search, hash } = useLocation();
  const redirect = slug ? legacySegmentRedirects[slug] : undefined;
  if (redirect) return <Navigate to={resolveLegacyTarget(redirect, {}, search, hash)} replace />;
  const key = getSegmentKey(slug);
  if (!key) return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <SEO title="Page not found" description="This industry page is not available." url={`/services/${slug ?? ""}`} noindex />
      <div className="text-center"><h1 className="text-2xl font-bold">Page not found</h1><Button asChild variant="link" className="mt-4"><Link to="/services"><ArrowLeft />Back to Services</Link></Button></div>
    </main>
  );
  const segment = segments[key];
  const content = segmentPages[key];
  const lowest = lowestPackage(segment.packages);
  const orderDirect = segments.food.packages.find((pkg) => pkg.id === "order-direct");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title={segment.title} description={`${content.metaCategory} from ${lowest ? priceLabel(lowest) : "a fixed quote"}. ${segment.tagline}`} url={`/services/${segment.slug}`} />
      <main>
        <section className="relative px-6 pb-16 pt-32 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <Button asChild variant="outline" size="sm" className="mb-8 rounded-full"><Link to="/services"><ArrowLeft />Back to Services</Link></Button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <SectionLabel>Industry packages</SectionLabel>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">{segment.title}</h1>
              <p className="mt-4 text-2xl font-bold text-primary md:text-3xl">{segment.tagline}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{content.supporting}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild className="h-auto whitespace-normal rounded-sm px-6 py-3"><Link to="/services/start-project">Get a fixed quote in 48 hours <ArrowRight /></Link></Button>
                <Button asChild variant="outline" className="h-auto whitespace-normal rounded-sm px-6 py-3"><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a free call</a></Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section aria-labelledby="proof-heading" className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal><SectionLabel>Selected work</SectionLabel><h2 id="proof-heading" className="text-2xl font-bold md:text-3xl">Work you can see</h2></ScrollReveal>
            <div className={`mt-8 grid gap-6 ${content.proof.length > 1 ? "sm:grid-cols-2" : "max-w-2xl"} ${content.proof.length > 2 ? "lg:grid-cols-3" : ""}`}>
              {content.proof.map((proof, i) => (
                <ScrollReveal key={proof.name} delay={i * 0.08}>
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                    <img src={proof.image} alt={proof.alt} loading="lazy" className="aspect-[16/10] w-full object-contain" />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base font-bold">{proof.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{proof.description}</p>
                      {proof.link && !proof.link.startsWith("/showcase/") && <Button asChild variant="link" className="mt-4 justify-start self-start p-0"><Link to={proof.link}>View case study<ArrowRight /></Link></Button>}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {key === "clinics" && <section aria-labelledby="compliance-heading" className="border-y border-border px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl"><ScrollReveal>
            <SectionLabel>Practice safeguards</SectionLabel><h2 id="compliance-heading" className="text-2xl font-bold md:text-3xl">Compliance panel</h2>
            <ul className="mt-6 space-y-4">{clinicCompliance.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{point}</span></li>)}</ul>
          </ScrollReveal></div>
        </section>}

        <section id="packages" className="px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal><SectionLabel>Fixed scope</SectionLabel><h2 className="text-2xl font-bold md:text-3xl">Packages</h2></ScrollReveal>
            <div className={`mt-10 grid gap-6 md:grid-cols-2 ${segment.packages.length === 3 ? "lg:grid-cols-3" : ""}`}>
              {segment.packages.map((pkg, i) => <ScrollReveal key={pkg.id} delay={i * 0.08}>
                <article className={`relative flex h-full flex-col rounded-xl border bg-card p-6 md:p-8 ${pkg.popular ? "border-primary" : "border-border"}`}>
                  {pkg.popular && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>}
                  <h3 className="text-lg font-bold">{pkg.name}</h3>
                  <p className="mt-4 text-2xl font-bold text-primary">{priceLabel(pkg)}</p>
                  {pkg.monthly && <p className="mt-2 text-sm text-muted-foreground">{monthlyLabel(pkg)}</p>}
                  <ul className="mt-6 flex-1 space-y-3">{pkg.scope?.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}</ul>
                  <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">Live in {pkg.live} from a complete intake</p>
                  <Button asChild variant={pkg.popular ? "default" : "outline"} className="mt-6 h-auto whitespace-normal rounded-sm py-3"><Link to="/services/start-project">Get a fixed quote in 48 hours<ArrowRight /></Link></Button>
                </article>
              </ScrollReveal>)}
            </div>
            {segment.growDigital && <ScrollReveal><p className="mt-8 border-l-2 border-primary pl-5 text-sm leading-relaxed text-muted-foreground">{grantNote}</p></ScrollReveal>}
          </div>
        </section>

        {key === "food" && <section className="border-y border-border px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-5xl"><ScrollReveal>
          <SectionLabel>Direct ordering</SectionLabel><h2 className="text-2xl font-bold md:text-3xl">An illustrative payback</h2>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">Example: on {eur(restaurantPayback.appOrdersMonthly)}/month of app orders, moving {restaurantPayback.directShare * 100}% to your own Flipdish ordering saves roughly {eur(restaurantPayback.savingsMonthly[0])}–{restaurantPayback.savingsMonthly[1]}/month after Flipdish's fee and card costs, so the {eur(orderDirect?.price ?? 0)} setup pays back in about {restaurantPayback.paybackMonths.join("–")} months.</p>
          <p className="mt-4 text-sm text-muted-foreground">Flipdish's own fee ({eur(restaurantPayback.flipdishMonthly[0])}–{restaurantPayback.flipdishMonthly[1]}/month) is billed by Flipdish.</p>
        </ScrollReveal></div></section>}

        <section id="care" className="px-6 py-16 md:px-12 lg:px-24"><div className="mx-auto max-w-5xl">
          <ScrollReveal><SectionLabel>After launch</SectionLabel><h2 className="text-2xl font-bold md:text-3xl">Care plans</h2></ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">{carePlans.map((plan, i) => <ScrollReveal key={plan.id} delay={i * 0.08}>
            <article className={`relative flex h-full flex-col rounded-xl border bg-card p-6 ${plan.popular ? "border-primary" : "border-border"}`}>
              {plan.popular && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>}
              <h3 className="text-lg font-bold">{plan.name}</h3><p className="mt-4 text-2xl font-bold">{eur(plan.monthly)}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <ul className="mt-6 flex-1 space-y-3">{plan.includes.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{item === "One module for your industry" ? `Growth module: ${segment.growthModule}` : item}</span></li>)}</ul>
              <Button asChild variant={plan.popular ? "default" : "outline"} className="mt-6 rounded-sm"><Link to="/services/start-project">Choose {plan.name}<ArrowRight /></Link></Button>
            </article>
          </ScrollReveal>)}</div>
          <div className="mt-6 space-y-3 text-xs leading-relaxed text-muted-foreground"><p>Minimum term: {segment.careMinMonths} months</p><p>{careTerms.annualPrepay}</p><p>{careTerms.exit}</p></div>
        </div></section>

        <section className="px-6 py-16 md:px-12 lg:px-24"><div className="mx-auto max-w-5xl"><ScrollReveal>
          <SectionLabel>Questions</SectionLabel><h2 className="text-2xl font-bold md:text-3xl">Before you book</h2>
          <Accordion type="single" collapsible className="mt-8">{content.faqs.map((faq, i) => <AccordionItem key={faq.question} value={`faq-${i}`} className="border-border"><AccordionTrigger className="gap-4 text-left">{faq.question}</AccordionTrigger><AccordionContent className="max-w-3xl leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion>
        </ScrollReveal></div></section>

        <section className="px-6 pb-16 pt-8 md:px-12 lg:px-24"><div className="mx-auto max-w-5xl"><p className="text-xs leading-relaxed text-muted-foreground">{vatFootnote()} Software licences are billed to you directly.</p></div></section>
      </main>
          </div>
  );
};
export default IndustryLanding;
