import { Link } from "react-router-dom";
import { ArrowRight, Clock3, TrendingUp, Users } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import ScrollReveal from "@/components/ScrollReveal";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { availability, CALENDLY_URL, entry, eur, studio, vatFootnote, YEARS_EXPERIENCE } from "@/data/pricing";
import { projects } from "@/data/projects";
import { imgDims } from "@/data/imageDimensions";
import { usePageDescription } from "@/hooks/usePageDescription";

const proofIds = [
  { id: "marsh-design-system", name: "Marsh Design System", link: "/work/marsh-design-system", image: "/images/work/marsh-design-system.webp", client: "Marsh McLennan" },
  { id: "marsh-internal-tooling", name: "Marsh Internal Tooling", link: "/work/marsh-internal-tooling", image: "/images/work/marsh-internal-tools-poster.webp", client: "Marsh McLennan" },
  { id: "admin-dashboard", name: "TipDirect Admin Dashboard", link: "/case/admin-dashboard" },
  { id: "tipdirect-app", name: "TipDirect App", link: "/case/tipdirect-app" },
  { id: "digital-tipping", name: "Digital Tipping", link: "/case/digital-tipping", image: "/images/work/tipping-header.webp" },
  { id: "ai-reviews", name: "AI-Assisted Reviews", link: "/case/ai-reviews" },
];
/** Outcomes, clients and missing hero images come from the projects catalogue. */
const proof = proofIds.map((item) => {
  const project = projects.find((p) => p.id === item.id);
  return { ...item, client: item.client ?? project?.client ?? "", outcome: project?.subtitle ?? "", image: item.image ?? project?.headerImage ?? "" };
});
const offers = [
  { name: "Day rate", price: `${eur(studio.dayRate)}/day`, scope: "Senior product design, directly with me." },
  { name: "Agency white-label", price: `${eur(studio.agencyDayRate)}/day`, scope: `${studio.agencyMinDays}-day minimum. I work as an extension of your agency team.` },
  { name: "Fractional Product Designer", price: `${eur(studio.fractional.monthly)}/month`, scope: `${studio.fractional.days} days a month; ${studio.fractional.minMonths}-month minimum.` },
  { name: "Investor Prototype", price: eur(studio.investorPrototype), scope: "5 working days: one core flow up to 8 screens, clickable, plus a 1-page landing page." },
  { name: "Prototype Sprint", price: eur(studio.prototypeSprint), scope: `3 weeks. Add ${eur(studio.userTestingAddOn)} for 5 moderated user tests.` },
  { name: "AI-built MVP", price: `from ${eur(studio.mvpFrom)}`, scope: "6–10 weeks, only after a Prototype Sprint." },
  { name: "UX & Accessibility Audit", price: `Focused ${eur(studio.uxAuditFocused)} / Comprehensive ${eur(studio.uxAuditComprehensive)}`, scope: "Focused: 5 days, WCAG 2.2 AA spot check. Comprehensive: broader journeys and accessibility coverage, scoped in writing." },
  { name: "Design System Foundation", price: `from ${eur(studio.designSystemFrom)}`, scope: "8 weeks: foundations, reusable components and documentation for your team." },
  { name: "Digital / AI Discovery Roadmap", price: eur(studio.discoveryRoadmap), scope: "5 days: workflow discovery, priorities and a practical delivery roadmap." },
];
const aiOffers = [
  { name: entry.aiAudit.name, price: eur(entry.aiAudit.price), scope: `About 2 days; half credited against an Automation Sprint; up to ${entry.aiAudit.maxStaff} staff, larger quoted.` },
  { name: "Automation Sprint", price: `typically ${eur(studio.automationSprintRange[0])}–${eur(studio.automationSprintRange[1])}`, scope: "Fixed price agreed in writing. I build and connect the workflows prioritised in the audit." },
  { name: "AI Ops Retainer", price: `${eur(studio.aiOps.monthly)}/month`, scope: `${studio.aiOps.hours} hours including meetings, ${studio.aiOps.minMonths}-month minimum then ${studio.aiOps.noticeDays} days' notice; overage ${eur(studio.aiOps.overageHourly)}/hour.` },
];
const benefits = [
  { icon: Clock3, title: "Recover lost hours", body: "I automate repetitive reporting, data entry and follow-ups so your team can focus on useful work." },
  { icon: TrendingUp, title: "Protect your margin", body: "I map disconnected workflows, reduce duplicated effort and design around the exceptions that cost your team time." },
  { icon: Users, title: "Build around your team", body: "Every tool starts with the people using it. I test the journey and iterate with your team, not just deliver code." },
];
const faqs = [
  { question: "Do I need a specific tool or platform already in place?", answer: "No. I start from where you are, work with tools you want to keep, and recommend what fits your needs. Software accounts remain yours." },
  { question: "What size of team is the AI audit suitable for?", answer: `The published AI Opportunity Audit covers up to ${entry.aiAudit.maxStaff} staff. I quote larger teams separately after discussing the scope.` },
  { question: "How soon can I see working results?", answer: "The AI Opportunity Audit takes about 2 days. Prototypes and builds use the timelines listed above, with scope and dependencies agreed in writing before I start." },
  { question: "Can I cancel the retainer?", answer: `After a ${studio.aiOps.minMonths}-month minimum, yes, with ${studio.aiOps.noticeDays} days' notice.` },
  { question: "What if the work is more complex than the retainer covers?", answer: `The retainer includes ${studio.aiOps.hours} hours a month including meetings. Additional time is ${eur(studio.aiOps.overageHourly)}/hour; larger builds are scoped as fixed-fee projects before work begins.` },
  { question: "How should I treat this cost for tax?", answer: "That depends on your business — please check with your accountant." },
];

const ProductStudio = () => {
  const description = `Fixed-fee AI audits (${eur(entry.aiAudit.price)}), automation sprints, UX audits and AI-built prototypes for product teams and growing firms, senior and designer-led from Dublin.`;
  usePageDescription(description);
  return (
  <main className="bg-background pt-24 text-foreground">
    <SEO title="Product Studio: AI Audits & Prototypes" description={description} />
    <section className="relative px-6 pb-12 pt-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Product Studio</SectionLabel>
        <h1 className="max-w-4xl text-4xl font-black md:text-6xl lg:text-7xl">Senior product design for teams that ship.</h1>
        <p className="mt-8 max-w-3xl text-lg text-muted-foreground">UX audits, design systems and AI-built prototypes — from a product designer with {YEARS_EXPERIENCE} years' experience.</p>
        <p className="mt-5 text-sm text-primary">Product design engagements: next start {availability.productStudioFrom}</p>
        <Button asChild className="mt-8"><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a free call <ArrowRight /></a></Button>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5 text-sm text-muted-foreground"><span>{YEARS_EXPERIENCE} years' experience</span><span>End-to-end design &amp; build</span><span>Designer-led delivery</span><span>Grant-ready quotes</span></div>
      </div>
    </section>
    <section className="px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-6xl">
      <SectionLabel>Selected Product Work</SectionLabel>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{proof.map(item => <Link key={item.id} to={item.link} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card md:hover:border-primary/40">
        <img src={item.image} alt={item.name} className="aspect-video w-full object-cover object-top" loading="lazy" decoding="async" {...imgDims(item.image)} />
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono-label text-muted-foreground">{item.client}</p>
          <h2 className="mt-2 flex items-center gap-2 text-base font-bold">{item.name}<ArrowRight className="ml-auto h-4 w-4 shrink-0 text-primary" /></h2>
          <p className="mt-2 text-sm text-muted-foreground">{item.outcome}</p>
        </div>
      </Link>)}</div>
    </div></section>
    <section className="px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-6xl">
      <SectionLabel>Studio Engagements</SectionLabel>
      <h2 className="mb-8 text-3xl font-black md:text-4xl">A clear scope. Senior execution.</h2>
      <div>{offers.map(item => <article key={item.name} className="grid gap-3 border-b border-border py-6 md:grid-cols-[1fr_1fr_1.3fr]"><h3 className="text-lg font-bold">{item.name}</h3><p className="font-semibold text-primary">{item.price}</p><p className="text-sm text-muted-foreground">{item.scope}</p></article>)}</div>
      <p className="mt-5 text-xs text-muted-foreground">{vatFootnote()}</p>
    </div></section>
    <section className="px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-6xl">
      <SectionLabel>MVP Ownership</SectionLabel>
      <aside className="border-l-2 border-primary bg-card p-6 md:p-8"><h2 className="text-2xl font-bold">Your product. Your code.</h2><p className="mt-4 text-muted-foreground">You own the GitHub repo; IP is assigned on payment. A Supabase security review (RLS) is included. Lovable, Supabase and hosting are billed to you.</p></aside>
    </div></section>
    <section className="px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-6xl">
      <SectionLabel>AI for Businesses</SectionLabel>
      <h2 className="max-w-3xl text-3xl font-black md:text-4xl">Less manual work. More room to grow.</h2>
      <p className="mt-5 max-w-3xl text-muted-foreground">I map how your team actually works, prioritise the friction, then build tools that fit. You see working results early, with a fixed scope before any build begins.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{benefits.map(({ icon: Icon, title, body }) => <ScrollReveal key={title}><Icon className="h-6 w-6 text-primary" /><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-3 text-sm text-muted-foreground">{body}</p></ScrollReveal>)}</div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">{aiOffers.map(item => <article key={item.name} className="flex flex-col rounded-lg border border-border bg-card p-6"><h3 className="text-xl font-bold">{item.name}</h3><p className="mt-4 text-xl font-bold text-primary">{item.price}</p><p className="mt-4 flex-1 text-sm text-muted-foreground">{item.scope}</p><Button asChild variant="outline" className="mt-6"><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Discuss the scope <ArrowRight /></a></Button></article>)}</div>
      <p className="mt-5 text-xs text-muted-foreground">{vatFootnote()}</p>
    </div></section>
    <section className="px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-6xl">
      <SectionLabel>Funding Supports</SectionLabel><p className="max-w-4xl text-muted-foreground">Supports may apply depending on your business — for example Enterprise Ireland's Digital Discovery or a LEO Feasibility Grant — each with its own eligibility rules and approval required before any spend. I'll format quotes the way they require.</p>
    </div></section>
    <section className="px-6 py-12 md:px-12 lg:px-24"><div className="mx-auto max-w-6xl"><SectionLabel>Questions</SectionLabel><Accordion type="single" collapsible>{faqs.map((faq, i) => <AccordionItem key={faq.question} value={`faq-${i}`}><AccordionTrigger className="text-left">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
  </main>
);
};
export default ProductStudio;