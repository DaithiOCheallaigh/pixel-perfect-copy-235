import { SEO } from "@/components/SEO";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Globe, Calendar, Search, Bot, Users } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Global,
  Setting2,
  Monitor,
  Sms,
  Instagram,
  Location,
  ShoppingCart,
  MessageText,
  Calendar1,
  People,
  
  Cpu,
  Link1,
  Star1,
  MessageEdit,
  Clock,
  Receipt1,
  TickCircle,
} from "iconsax-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Button } from "@/components/ui/button";
import { lowestCorePackage, monthlyLabel, VAT_REGISTERED, addOns, carePlans, careTerms, entry, eur, priceLabel, segments, terms, vatFootnote, webLadder } from "@/data/pricing";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import SocialProof from "@/components/SocialProof";

/* ------------------------------------------------------------------ */
/*  Services data                                                      */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  id: string;
  icon: React.ComponentType<{ variant?: string; className?: string }>;
  title: string;
  desc: string;
  price: string;
  priceValue: number;
  link: string;
  category: "visibility" | "efficiency";
  featured?: boolean;
}

const allServices: ServiceItem[] = [
  {
    id: "website",
    icon: Monitor,
    title: "Website Creation",
    desc: "Fast, conversion-focused websites that make your business look the part.",
    price: `From ${priceLabel(webLadder[0])} · ${monthlyLabel(webLadder[0])}`,
    priceValue: webLadder[0].price ?? 0,
    link: "/services/web-design",
    category: "visibility",
  },
  {
    id: "domain-email",
    icon: Sms,
    title: "Domain & Custom Email",
    desc: "A professional email address and domain that builds instant trust.",
    price: `${eur(addOns.email.setup)} setup${VAT_REGISTERED ? " + VAT" : ""} (${addOns.email.inboxesIncluded} inboxes) · licences at cost`,
    priceValue: addOns.email.setup,
    link: "/services/start-project",
    category: "visibility",
  },
  {
    id: "social-media",
    icon: Instagram,
    title: "Social Media Setup",
    desc: "I set up your channels, create your content strategy, and post for you each month from your photos.",
    price: `${eur(addOns.socialSetup)} setup · posting ${eur(addOns.socialPosting.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""} (${addOns.socialPosting.posts} posts)`,
    priceValue: addOns.socialSetup,
    link: "/services/start-project",
    category: "visibility",
  },
  {
    id: "local-seo",
    icon: Location,
    title: "Local SEO & Google",
    desc: "Get found on Google Maps and in local searches — where your customers are looking.",
    price: `${eur(addOns.gbp)} setup${VAT_REGISTERED ? " + VAT" : ""} · or in Growth care`,
    priceValue: addOns.gbp,
    link: "/services/start-project",
    category: "visibility",
  },
  {
    id: "platform-onboarding",
    icon: ShoppingCart,
    title: "Delivery listing tune-up",
    desc: "I tune your menu, categories and photos on delivery platforms once your account is approved.",
    price: `${eur(addOns.listingTuneup)} per platform${VAT_REGISTERED ? " + VAT" : ""}, after approval`,
    priceValue: addOns.listingTuneup,
    link: "/services/start-project",
    category: "visibility",
  },
  {
    id: "ai-audit",
    icon: Cpu,
    title: entry.aiAudit.name,
    desc: "I'll map how your business currently operates — tools, workflows, gaps — then either build bespoke software to fix it or optimise what you already have.",
    price: `${eur(entry.aiAudit.price)}${VAT_REGISTERED ? " + VAT" : ""} · half credited`,
    priceValue: entry.aiAudit.price,
    link: "/services/start-project",
    category: "efficiency",
    featured: false,
  },
  {
    id: "chatbots",
    icon: MessageText,
    title: "AI-Powered Chatbots",
    desc: "An always-on assistant that qualifies leads, answers FAQs, and books appointments — 24/7.",
    price: `${eur(addOns.aiAssistant.setup)} + ${eur(addOns.aiAssistant.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""} · or in Growth + AI`,
    priceValue: addOns.aiAssistant.setup,
    link: "/services/start-project",
    category: "efficiency",
  },
  {
    id: "reservations",
    icon: Calendar1,
    title: "Reservation Systems",
    desc: "Ditch the phone bookings. I set up a reservation system that works while you sleep.",
    price: `${eur(addOns.booking)} setup${VAT_REGISTERED ? " + VAT" : ""} (salons from ${priceLabel(segments.salons.packages[0])})`,
    priceValue: addOns.booking,
    link: "/services/start-project",
    category: "efficiency",
  },
  {
    id: "crm",
    icon: People,
    title: "CRM Setup & Integration",
    desc: "Know your customers, track every interaction, and never drop a lead.",
    price: `${eur(addOns.crmStarter)} starter${VAT_REGISTERED ? " + VAT" : ""}`,
    priceValue: addOns.crmStarter,
    link: "/services/start-project",
    category: "efficiency",
  },
  {
    id: "ai-assistant",
    icon: Cpu,
    title: "AI receptionist",
    desc: "An AI receptionist for your business — answering calls, booking appointments, and following up.",
    price: `${eur(addOns.aiReceptionist.setup)} setup + ${eur(addOns.aiReceptionist.monthly)}/mo${VAT_REGISTERED ? " + VAT" : ""}`,
    priceValue: addOns.aiReceptionist.setup,
    link: "/services/start-project",
    category: "efficiency",
  },
];

const visibilityServices = allServices.filter((s) => s.category === "visibility");
const efficiencyServices = allServices.filter((s) => s.category === "efficiency");

/* ------------------------------------------------------------------ */
/*  Tools teaser                                                       */
/* ------------------------------------------------------------------ */

const freeTools = [

  {
    icon: Link1,
    title: "Link-in-Bio Builder",
    desc: "Build a beautiful mobile link page for your business — free.",
    link: "/services/tools/link-in-bio",
  },
  {
    icon: Star1,
    title: "Google Review Link Generator",
    desc: "Get a direct review link and QR code to share with customers.",
    link: "/services/tools/review-link",
  },
  {
    icon: MessageEdit,
    title: "Social Caption Generator",
    desc: "AI writes captions with hashtags for any platform, in your tone.",
    link: "/services/tools/caption-generator",
  },
];

/* ------------------------------------------------------------------ */
/*  Differentiators                                                    */
/* ------------------------------------------------------------------ */

const differentiators = [
  {
    icon: Setting2,
    title: "Practical AI experience",
    body: "Not theory — I've built and deployed AI tools in real businesses, from automated review systems to internal knowledge bases.",
  },
  {
    icon: Star1,
    title: "Design-led thinking",
    body: "Every solution is built around how your team actually works. No bloated platforms or tools that gather dust.",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    body: "Fixed scope, fixed price, a launch date in writing.",
  },
  {
    icon: Receipt1,
    title: "Transparent pricing",
    body: "One price per item, published. Software licences (Google Workspace, Fresha, Flipdish etc.) are billed to you directly.",
  },
];

/* ------------------------------------------------------------------ */
/*  Selectable Service Card                                            */
/* ------------------------------------------------------------------ */

const SelectableServiceCard = ({
  service,
  selected,
  onToggle,
  index,
}: {
  service: ServiceItem;
  selected: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Button
        variant="ghost"
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        className={`group relative flex h-full w-full items-start whitespace-normal flex-col rounded-xl border p-6 text-left transition-all ${
          selected
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
            : service.featured
              ? "border-primary/40 bg-card hover:border-primary/60 hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.2)]"
              : "border-border bg-card hover:border-primary/30 hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.15)]"
        }`}
      >
        {/* Featured badge */}
        {service.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            Start here
          </span>
        )}

        {/* Checkmark indicator */}
        <div className="absolute right-3 top-3">
          <TickCircle
            variant={selected ? "Bulk" : "TwoTone"}
            className={`h-6 w-6 transition-all ${
              selected ? "text-foreground dark:text-primary" : "text-border"
            } group-hover:text-foreground dark:group-hover:text-accent-foreground`}
          />
        </div>

        <Icon variant="TwoTone" className={`h-7 w-7 text-primary group-hover:text-foreground dark:group-hover:text-accent-foreground ${service.featured ? "mt-4" : ""}`} />
        <h3 className="mt-4 text-base font-bold group-hover:text-foreground dark:group-hover:text-accent-foreground">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground dark:group-hover:text-accent-foreground">{service.desc}</p>

        <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2">
          <p className={`text-xs font-semibold ${selected ? "text-foreground dark:text-primary" : "text-primary"} group-hover:text-foreground dark:group-hover:text-accent-foreground`}>{service.price}</p>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary group-hover:bg-accent-foreground/10 group-hover:text-foreground dark:group-hover:text-accent-foreground">
            AI-assisted
          </span>
        </div>
      </Button>
    </motion.div>
  );
};

/* PackageSummary removed — now integrated into chatbot */

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Services = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  const toggleService = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };


  const selectedServices = allServices.filter((s) => selectedIds.has(s.id));

  // Broadcast selection changes to ChatWidget
  useEffect(() => {
    const detail = selectedServices.length > 0
      ? selectedServices.map(s => ({ id: s.id, title: s.title, price: s.price, priceValue: s.priceValue }))
      : null;
    window.dispatchEvent(new CustomEvent("service-selection-change", { detail }));
  }, [selectedIds]);

  // Clear the floating selection bar when leaving the page
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent("service-selection-change", { detail: null }));
    };
  }, []);



  const renderServiceGrid = (services: ServiceItem[]) => {
    if (isMobile) {
      return (
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {services.map((s, i) => (
              <CarouselItem key={s.id} className="pl-4 basis-[85%] h-auto">
                <SelectableServiceCard
                  service={s}
                  selected={selectedIds.has(s.id)}
                  onToggle={() => toggleService(s.id)}
                  index={i}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex items-center justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((s, i) => (
          <SelectableServiceCard
            key={s.id}
            service={s}
            selected={selectedIds.has(s.id)}
            onToggle={() => toggleService(s.id)}
            index={i}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Websites, AI & Automation for Irish SMEs" description="Lacuna Digital builds fixed-quote websites, booking systems, AI tools and automations for Irish small businesses, designed and built by Dave Kelly in Dublin." />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden px-6 pt-16 md:px-12 lg:px-24">
        <DottedSurface className="pointer-events-none opacity-40" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono-label text-muted-foreground">
              LACUNA DIGITAL — SERVICES
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              Get found, get booked,{" "}
              <br />
              <span className="text-primary">get paid.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Designed by a senior product designer, built in days with AI.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Build your package <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/services/start-project"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Get a fixed quote
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="text-primary">★★★★★</span>
                5.0 on Google Reviews
              </span>
              <span className="inline-flex items-center gap-2">
                <TickCircle variant="Bold" className="h-4 w-4 text-primary" />
                Fixed price · launch date in writing
              </span>
            </div>

          </motion.div>
        </div>
      </section>

      <section className="border-b border-border px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="text-lg leading-relaxed">
              Not sure what you need? A free intro call and a fixed written quote within {entry.introCall.quoteWithin}.
            </p>
            <Button asChild className="mt-4 rounded-sm">
              <Link to="/services/start-project">Get a fixed quote <ArrowRight /></Link>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Custom AI or multi-site project? {entry.healthCheck.name} {eur(entry.healthCheck.price)}, half credited against your project.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Two Pillars ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          <ScrollReveal>
            <div className="flex flex-col border-b border-border pb-12 md:border-b-0 md:border-r md:pb-0 md:pr-12">
              <Global variant="TwoTone" className="h-10 w-10 text-primary" />
              <h2 className="mt-6 text-2xl font-bold md:text-3xl">Online Visibility</h2>
              <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                Getting your business in front of the right people, on the right platforms.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col pt-12 md:pl-12 md:pt-0">
              <Setting2 variant="TwoTone" className="h-10 w-10 text-primary" />
              <h2 className="mt-6 text-2xl font-bold md:text-3xl">Business Efficiency</h2>
              <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                Automating the workflows that drain your time and cost you money.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <SocialProof />

      {/* ── Orbital System ── */}
      <section className="relative px-6 py-16 md:px-12 lg:px-24 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-8">
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Every service connects
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
                Most businesses patch tools together and hope for the best. I use AI to build you a system where everything works together — from your first online presence to a fully automated operation.
              </p>
            </div>
          </ScrollReveal>

          <RadialOrbitalTimeline
            timelineData={[
              {
                id: 1,
                title: "Website",
                date: "Foundation",
                content: "Your digital home base. A fast, conversion-focused website that makes your business look credible and gets people to act.",
                category: "Visibility",
                icon: Globe,
                relatedIds: [3, 4],
                status: "completed" as const,
                energy: 95,
              },
              {
                id: 3,
                title: "Reservations",
                date: "Automation",
                content: "Ditch the phone bookings. An online reservation system that works while you sleep and plugs into everything else.",
                category: "Efficiency",
                icon: Calendar,
                relatedIds: [1, 5],
                status: "in-progress" as const,
                energy: 70,
              },
              {
                id: 4,
                title: "Local SEO",
                date: "Visibility",
                content: "Get found on Google Maps and local search. I make sure customers searching for what you do can actually find you.",
                category: "Visibility",
                icon: Search,
                relatedIds: [1],
                status: "completed" as const,
                energy: 85,
              },
              {
                id: 5,
                title: "AI Assistant",
                date: "Intelligence",
                content: "An AI employee for your business — handling FAQs, booking queries, and follow-ups around the clock so you don't have to.",
                category: "Efficiency",
                icon: Bot,
                relatedIds: [1, 3],
                status: "in-progress" as const,
                energy: 90,
              },
              {
                id: 6,
                title: "CRM & Leads",
                date: "Growth",
                content: "Know your customers, track every interaction, and never lose a lead. The connective tissue that ties the whole system together.",
                category: "Efficiency",
                icon: Users,
                relatedIds: [1, 5],
                status: "pending" as const,
                energy: 75,
              },
            ]}
          />

        </div>
      </section>

      {/* ── Build Your Custom Package ── */}
      <section id="services" className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Build Your Package</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Build your tailored system
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Every business is different. Select the services you need and I'll use AI to scope, build, and automate a setup that saves you real time and money — no bloat, no guesswork.
            </p>
          </ScrollReveal>

          <div className="mt-12">
            {/* Visibility */}
            <div>
              <p className="mb-4 font-mono-label text-xs tracking-wider text-muted-foreground">VISIBILITY</p>
              {renderServiceGrid(visibilityServices)}
            </div>

            {/* Efficiency */}
            <div className="mt-12">
              <p className="mb-4 font-mono-label text-xs tracking-wider text-muted-foreground">EFFICIENCY</p>
              {renderServiceGrid(efficiencyServices)}
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{vatFootnote()}</p>
        </div>
      </section>


      {/* ── Ready-Made Packages ── */}
      <section id="packages" className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Packages</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready-made packages by industry
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Pre-scoped bundles built for your sector — delivered faster using AI-assisted workflows.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {Object.values(segments).map((segment, i) => {
              const lowest = lowestCorePackage(segment.packages) ?? segment.packages[0];
              const popular = segment.packages.find((pkg) => pkg.popular) ?? lowest;
              const monthlyPackage = popular.monthly ? popular : segment.packages.find((pkg) => pkg.monthly);
              return (
                <ScrollReveal key={segment.slug} delay={i * 0.1}>
                  <article className="relative flex h-full flex-col rounded-xl border border-border bg-card p-8">
                    <span className="self-start rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      AI-assisted build
                    </span>
                    <h3 className="mt-4 text-lg font-bold">{segment.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{segment.tagline}</p>
                    <p className="mt-6 text-xl font-bold text-primary">from {priceLabel(lowest)}</p>
                    <div className="mt-6 flex-1 border-t border-border pt-4">
                      <p className="font-mono-label text-xs text-muted-foreground">Most popular</p>
                      <p className="mt-2 text-sm font-bold">{popular.name}</p>
                      <p className="mt-1 text-sm text-primary">{priceLabel(popular)}</p>
                      {monthlyPackage?.monthly && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {monthlyPackage.id !== popular.id && `${monthlyPackage.name}: `}{monthlyLabel(monthlyPackage)}
                        </p>
                      )}
                      <p className="mt-4 text-xs text-muted-foreground">Live in {popular.live}</p>
                    </div>
                    <Button asChild className="mt-6 h-auto whitespace-normal rounded-sm py-2.5">
                      <Link to={`/services/${segment.slug}`}>View packages <ArrowRight /></Link>
                    </Button>
                  </article>
                </ScrollReveal>
              );
            })}
            <ScrollReveal>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-8">
                <h3 className="text-lg font-bold">Professional services &amp; other businesses</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {webLadder.slice(0, 3).map((pkg) => `${pkg.name} ${priceLabel(pkg)}`).join(" · ")}
                </p>
                <Button asChild variant="outline" className="mt-6 h-auto whitespace-normal rounded-sm py-2.5">
                  <Link to="/services/web-design">Explore web design <ArrowRight /></Link>
                </Button>
              </article>
            </ScrollReveal>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{vatFootnote()}</p>
        </div>
      </section>

      {/* ── Why Work With Me ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Why Lacuna Digital</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why work with me
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="flex flex-col">
                  <item.icon variant="TwoTone" className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Care Plans ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Care plans</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {carePlans.map((plan, i) => (
              <ScrollReveal key={plan.id} delay={i * 0.1}>
                <article className={`relative flex h-full flex-col rounded-xl border bg-card p-8 ${plan.popular ? "border-primary" : "border-border"}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>
                  )}
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="mt-4 text-3xl font-bold">{eur(plan.monthly)}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.includes.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <TickCircle variant="Bulk" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant={plan.popular ? "default" : "outline"} className="mt-8 rounded-sm">
                    <Link to="/services/start-project">Get started <ArrowRight /></Link>
                  </Button>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-6 space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>{careTerms.minimums}. {careTerms.annualPrepay}.</p>
              <p>{careTerms.exit}</p>
              <p>{vatFootnote()}</p>
              <p>
                Payment: under {eur(addOns.brandStarter)} paid upfront; 50/50 up to {eur(segments.kitchens.packages[0].price ?? 0)} with the balance before go-live; {terms.over3000.split(" ")[0]} above. {terms.oneDiscountPerOrder && "One discount per order."}
              </p>
              <p>Need an accountant or company formation? I'll introduce you — free.</p>
            </div>
            <div className="mt-16 text-center">
              <p className="text-muted-foreground">Not sure which package is right for you?</p>
              <Button asChild className="mt-4 rounded-sm">
                <Link to="/services/start-project">Book a Discovery Call <ArrowRight /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Tools Teaser ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Try Before You Buy</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Free tools for your business
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Free tools I've built so you can see what's possible for your business.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {freeTools.map((tool, i) => (
              <ScrollReveal key={tool.title} delay={i * 0.08}>
                <Link
                  to={tool.link}
                  className="group relative flex h-full flex-col rounded-xl border border-dashed border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card"
                >
                  <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Free
                  </span>
                  <tool.icon variant="TwoTone" className="h-7 w-7 text-primary" />
                  <h3 className="mt-4 text-sm font-bold">{tool.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{tool.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2">
                    Try it free <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

          </div>
  );
};

export default Services;
