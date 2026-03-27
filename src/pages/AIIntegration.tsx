import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionLabel from "@/components/SectionLabel";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, ArrowRight, Clock3, TrendingUp, Users, ArrowDown } from "lucide-react";

const bookingHref = "https://calendly.com/lacunaconsulting-info/30min?back=1&month=2025-02";
const canonicalUrl = "https://lacunadigital.io/ai-integration";

const benefits = [
  {
    icon: Clock3,
    title: "Recover lost hours",
    body: "I help you automate the repetitive work that fills your team's week — data entry, reporting, scheduling, follow-ups. Those hours go back to your people, and back to your customers.",
  },
  {
    icon: TrendingUp,
    title: "Protect your margin",
    body: "Manual processes carry hidden costs — errors, delays, duplicated effort. I design tighter, smarter workflows so fewer mistakes happen and less money is left on the table.",
  },
  {
    icon: Users,
    title: "Scale without overextending",
    body: "I build AI tools that help your team serve more customers without a proportional increase in headcount or workload.",
  },
];

const phases = [
  {
    number: "01",
    title: "Discovery & Audit",
    body: "I come into your business (in person or remotely) and map how your team actually works. I look at what's taking time, what's manual, what's duplicated, and where the friction is. You get a plain-English AI Opportunity Report — a prioritised breakdown of where AI can have the most impact, with estimated time and cost savings.",
  },
  {
    number: "02",
    title: "Strategy & Roadmap",
    body: "I translate the audit findings into a clear, phased plan. What to fix first. What to buy versus what to build. Where quick wins are and where the bigger structural changes live. I also assess your eligibility for LEO funding at this stage — many Irish businesses qualify for grants that can offset a significant portion of the cost.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    body: "I build exactly what your business needs — not a generic off-the-shelf tool retrofitted to your workflow. Every solution is designed with your staff in mind from day one, because tools only deliver value when people actually use them. Delivery is iterative — you see working results early and often, not at the end of a long engagement.",
  },
  {
    number: "04",
    title: "Ongoing Optimisation",
    body: "Once your first integrations are live, the retainer keeps everything running, refined, and growing. I use monthly check-ins and performance reviews to keep improving what is already in place, while layering in new use cases as your business evolves. Your AI stack grows with you.",
  },
];

const pricing = [
  {
    title: "Discovery Audit",
    price: "Free",
    label: "One-off",
    description:
      "The starting point. I map your workflows, identify AI opportunities, and deliver a prioritised report with estimated impact.",
    cta: "Get Started",
    featured: false,
    badge: null,
  },
  {
    title: "Monthly Retainer",
    price: "€500 / month",
    label: "Ongoing",
    description:
      "This covers ongoing build, integration, a monthly strategy call, support, and iteration. New use cases can be added as your needs grow. Cancel with notice — no long lock-ins.",
    cta: "Book a Call",
    featured: true,
    badge: "Tax deductible",
  },
  {
    title: "Bespoke Integration",
    price: "Pre-agreed fixed fee",
    label: "Project-based",
    description:
      "For complex integrations or where your business has specific tools that must be connected, I scope the work fully before anything begins. You get a fixed price, agreed in writing, before a single line of code is written.",
    cta: "Discuss Your Project",
    featured: false,
    badge: null,
  },
];

const useCases = [
  {
    sector: "Hospitality / Food & Beverage",
    title: "Automated supplier invoice processing",
    body: "Instead of manually matching invoices to orders across email, WhatsApp, and PDFs, I can create a single system that captures, categorises, and flags exceptions automatically.",
  },
  {
    sector: "Professional Services",
    title: "Client onboarding without the admin",
    body: "I can automate proposal generation, contract sending, onboarding checklists, and CRM updates so everything is triggered when a deal closes, with no manual handoff.",
  },
  {
    sector: "Retail / eCommerce",
    title: "Inventory and reorder intelligence",
    body: "Instead of relying on weekly manual stock checks, I can build a live dashboard that flags low stock and generates reorder recommendations based on sales velocity.",
  },
  {
    sector: "Healthcare / Wellness",
    title: "Appointment and follow-up automation",
    body: "I can automate booking confirmations, reminders, post-appointment follow-ups, and review requests — while keeping the tone human.",
  },
  {
    sector: "Construction / Trade",
    title: "Quote and job documentation",
    body: "I can streamline job scoping, quote generation, materials lists, and site documentation using templates that learn your pricing and your language over time.",
  },
  {
    sector: "Any Business",
    title: "Reporting that writes itself",
    body: "I can generate weekly performance summaries, KPI dashboards, and management reports automatically from your existing data — with no spreadsheet wrangling required.",
  },
];

const stats = [
  "10+ years experience",
  "End-to-end design & build",
  "Irish-based, SME-focused",
  "LEO funding support included",
];

const faqs = [
  {
    question: "Do I need to have a specific tool or platform already in place?",
    answer:
      "No. I start from where you are. If you have existing tools you want to keep, I'll work with them. If you're starting fresh, I'll recommend the right stack for your needs and budget. Either way, there are no assumptions and no surprises.",
  },
  {
    question: "What size of business is this suitable for?",
    answer:
      "I work with SMEs — typically businesses with between 3 and 50 staff. You don't need a dedicated IT team or an existing tech infrastructure. In fact, some of the highest-impact integrations come from businesses that have relied on manual processes for years and are ready to change that.",
  },
  {
    question: "How long before we see results?",
    answer:
      "The Discovery Audit usually takes 1–2 weeks. From there, most businesses see their first working integration within 4–6 weeks. Quick wins — automations that save hours immediately — are typically live within the first month.",
  },
  {
    question: "Can I cancel the retainer?",
    answer:
      "Yes. I ask for 30 days' notice. I don't believe in locking businesses into agreements that no longer serve them. If the engagement isn't delivering value, I'd rather know and fix it than trap you in a contract.",
  },
  {
    question: "What if our integration is more complex than a standard retainer covers?",
    answer:
      "For anything beyond the scope of the monthly retainer — particularly complex builds or integrations with existing enterprise tools — I scope the work fully and agree a fixed fee in writing before anything begins. You'll always know the cost before I start.",
  },
  {
    question: "Is the retainer fee tax deductible?",
    answer:
      "In most cases, yes — as a business expense for an Irish SME. I'd always recommend confirming with your accountant, but for the vast majority of clients this cost is fully deductible.",
  },
];

const ensureMetaTag = (name: string, content: string) => {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const ensureCanonicalLink = (href: string) => {
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = href;
};

const AIIntegration = () => {
  useEffect(() => {
    document.title = "AI Integration for SMEs | Lacuna Digital";
    ensureMetaTag(
      "description",
      "Lacuna Digital helps Irish SMEs identify workflow inefficiencies and build custom AI tools to recover lost time and margin. Fixed-fee transparency, LEO funding support, designer-led delivery.",
    );
    ensureCanonicalLink(canonicalUrl);

    return () => {
      document.title = "Lacuna Digital";
    };
  }, []);

  const scrollToProcess = () => {
    document.getElementById("process")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-background pt-24 text-foreground">
      <section className="relative overflow-hidden px-6 pb-16 pt-4 md:px-12 lg:px-24 lg:pb-24">
        <div className="relative z-10 mb-8">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <ArrowLeft size={14} />
            Back to Services
          </Link>
        </div>
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-x-0 top-0 h-px bg-border" />
          <div className="grid-background absolute inset-0" />
          <motion.div
            className="absolute left-[8%] top-[18%] h-px w-[26%] bg-primary/30"
            animate={{ x: [0, 30, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[12%] top-[34%] h-px w-[18%] bg-primary/20"
            animate={{ x: [0, -24, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-[22%] left-[18%] h-px w-[34%] bg-primary/25"
            animate={{ x: [0, 36, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-label text-primary">AI Workflow Integration</span>
            <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tighter text-foreground md:text-7xl lg:text-[5.5rem] lg:leading-[0.92]">
              Your business,
              <br />
              running leaner.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              I go inside your business, find where time and money are quietly slipping away, and build AI tools to get them back — so you can serve more customers, better.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a Discovery Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={scrollToProcess}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                See How It Works
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm"
          >
            <div className="absolute inset-x-6 top-6 h-px bg-border" />
            <div className="space-y-6 pt-6">
              {[
                "Audit workflows",
                "Prioritise AI opportunities",
                "Build around your team",
                "Improve and iterate",
              ].map((item, index) => (
                <div key={item} className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <span className="font-mono-label text-primary">0{index + 1}</span>
                  <div className="relative">
                    <div className="h-10 rounded-full border border-border bg-background/80" />
                    <motion.div
                      className="absolute inset-y-2 left-2 right-2 origin-left rounded-full bg-primary/20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className="absolute inset-y-0 left-5 flex items-center text-xs font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionLabel>The Real Cost of Manual Work</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Every hour your team spends on manual work is an hour not spent on your customers.
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Repetitive tasks. Disconnected systems. Information that lives in someone&apos;s inbox instead of somewhere useful. These aren&apos;t just frustrations — they&apos;re a hidden tax on your business.
              </p>
              <p>
                Most SMEs are running lean teams that punch well above their weight. But those same teams are spending hours each week on work that could be handled automatically — invoicing, data entry, scheduling, reporting, chasing, collating.
              </p>
              <p>That&apos;s not a staffing problem. It&apos;s a systems problem. And it has a ceiling.</p>
              <p>
                When manual work fills your team&apos;s time, your capacity to grow is capped. You can&apos;t serve more customers without burning people out or hiring before you&apos;re ready. Margins get squeezed. Customer experience suffers at the edges.
              </p>
              <p>I use AI integration to help break that ceiling.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>What Changes</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              A leaner operation. Better service. More room to grow.
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={benefit.title} delay={index * 0.08}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-5 text-lg font-bold text-foreground">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Four phases. No surprises.
            </h2>
          </ScrollReveal>
          <div className="mt-10 space-y-4">
            {phases.map((phase, index) => (
              <ScrollReveal key={phase.title} delay={index * 0.08}>
                <article className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-[96px_1fr] md:gap-8 md:p-8">
                  <div className="font-mono-label text-primary">{phase.number}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{phase.body}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Transparent pricing. No hidden costs. Ever.
            </h2>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              I believe you should always know exactly what you&apos;re committing to before any work begins. That&apos;s why every engagement is scoped and agreed upfront — whether you&apos;re on a monthly retainer or a fixed-fee project.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {pricing.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.08}>
                <article
                  className={`relative flex h-full flex-col rounded-2xl p-6 ${
                    item.featured ? "border-2 border-primary bg-card shadow-sm" : "border border-border bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-label text-primary">{item.label}</p>
                      <h3 className="mt-3 text-xl font-bold text-foreground">{item.title}</h3>
                    </div>
                    {item.badge ? (
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-foreground">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-6 text-3xl font-black tracking-tight text-foreground">{item.price}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors ${
                      item.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8">
            <aside className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground">You may not need to pay full price.</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Many Irish SMEs qualify for Local Enterprise Office (LEO) funding that can significantly offset the cost of AI integration. I&apos;ll assess your eligibility as part of the engagement and help you through the application process — including the Trading Online Voucher (up to €2,500) and other relevant schemes.
              </p>
              <a
                href="https://www.localenterprise.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                Learn more about LEO funding →
              </a>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Where It Makes a Difference</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              AI that works for how your business actually operates.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Every business is different. Here are some of the workflow problems I commonly help SMEs solve.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((useCase, index) => (
              <ScrollReveal key={useCase.title} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="font-mono-label text-primary">{useCase.sector}</span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{useCase.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{useCase.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <SectionLabel>Why Lacuna Digital</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Designer-led. Technically built. Business-focused.
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Most AI consultants come at this from one direction — either pure technology or pure strategy. I sit at the intersection of both.
              </p>
              <p>
                I&apos;m Dave Kelly, a Senior UI/UX Designer and end-to-end software developer with over a decade of experience building digital products and services for businesses at every stage of growth. I&apos;ve worked inside large enterprises and built my own products from scratch — which means I understand both the complexity of real systems and the pragmatism that running a business demands.
              </p>
              <p>
                What that means for you: the tools I build are designed to be used. Not just functional, but intuitive. Built around how your team actually works, not how a developer imagined they might.
              </p>
              <p>
                No subcontractors. No offshore builds handed off without context. Everything is designed, built, and delivered by me — the same person who audits your business and understands your needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat} delay={index * 0.06}>
                <div className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-semibold text-foreground">
                  {stat}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Straight answers.
            </h2>
          </ScrollReveal>
          <ScrollReveal className="mt-10">
            <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6 py-2 md:px-8">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question} className="border-border">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 pb-20 pt-16 md:px-12 lg:px-24 lg:pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
          <ScrollReveal>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-5xl">
              Ready to find out where your business is losing time?
            </h2>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Start with a Discovery Call — a free 30-minute conversation where I&apos;ll talk through your current workflows, what&apos;s frustrating your team, and whether AI integration is the right move for you right now. No pitch, no pressure.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a Free Discovery Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-sm text-muted-foreground">
                Prefer email?{" "}
                <a href="mailto:info@lacunaconsulting.com" className="font-semibold text-foreground transition-colors hover:text-primary">
                  info@lacunaconsulting.com
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default AIIntegration;
