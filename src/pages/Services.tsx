import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, MessageCircle, Calendar, Search, Bot, Users } from "lucide-react";
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
  Whatsapp,
  Cpu,
  Link1,
  Star1,
  MessageEdit,
  SearchNormal1,
  Clock,
  Receipt1,
  Timer1,
  TickCircle,
} from "iconsax-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { ShineBorder } from "@/components/ui/shine-border";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import SocialProof from "@/components/SocialProof";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";

/* ------------------------------------------------------------------ */
/*  Currency                                                           */
/* ------------------------------------------------------------------ */

type Currency = "EUR" | "USD" | "GBP";

const currencySymbols: Record<Currency, string> = { EUR: "€", USD: "$", GBP: "£" };
const currencyRates: Record<Currency, number> = { EUR: 1, USD: 1.08, GBP: 0.86 };

const convertPrice = (eurAmount: number, currency: Currency): string => {
  const converted = Math.round(eurAmount * currencyRates[currency]);
  return `${currencySymbols[currency]}${converted.toLocaleString()}`;
};

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
  expandedDetail?: string;
}

const allServices: ServiceItem[] = [
  {
    id: "website",
    icon: Monitor,
    title: "Website Creation",
    desc: "Fast, conversion-focused websites that make your business look the part.",
    price: "From free (microsite) to €375",
    priceValue: 375,
    link: "/web-design",
    category: "visibility",
  },
  {
    id: "domain-email",
    icon: Sms,
    title: "Domain & Custom Email",
    desc: "A professional email address and domain that builds instant trust.",
    price: "From €150 setup",
    priceValue: 150,
    link: "/start-project",
    category: "visibility",
  },
  {
    id: "social-media",
    icon: Instagram,
    title: "Social Media Setup",
    desc: "I set up your channels, create your content strategy, and keep them active.",
    price: "From €200 setup",
    priceValue: 200,
    link: "/start-project",
    category: "visibility",
  },
  {
    id: "local-seo",
    icon: Location,
    title: "Local SEO & Google",
    desc: "Get found on Google Maps and in local searches — where your customers are looking.",
    price: "Strategy free",
    priceValue: 0,
    link: "/start-project",
    category: "visibility",
  },
  {
    id: "platform-onboarding",
    icon: ShoppingCart,
    title: "Platform Onboarding",
    desc: "I get you registered and set up on the platforms your customers already use.",
    price: "From €200",
    priceValue: 200,
    link: "/start-project",
    category: "visibility",
  },
  {
    id: "ai-audit",
    icon: Cpu,
    title: "Bespoke AI Audit",
    desc: "I'll map how your business currently operates — tools, workflows, gaps — then either build bespoke software to fix it or optimise what you already have.",
    price: "From free strategy call",
    priceValue: 0,
    link: "/start-project",
    category: "efficiency",
    featured: true,
    expandedDetail: "Every business runs differently. Before I build anything, I spend time understanding how yours actually works — what tools you're using (or avoiding), where time is being lost, and what a realistic fix looks like. Sometimes that's a custom tool. Sometimes it's a smarter way to use something you already have. Either way, you get a clear picture first, with no obligation to build anything.",
  },
  {
    id: "chatbots",
    icon: MessageText,
    title: "AI-Powered Chatbots",
    desc: "An always-on assistant that qualifies leads, answers FAQs, and books appointments — 24/7.",
    price: "From free integration",
    priceValue: 0,
    link: "/ai-integration",
    category: "efficiency",
  },
  {
    id: "reservations",
    icon: Calendar1,
    title: "Reservation Systems",
    desc: "Ditch the phone bookings. I set up a reservation system that works while you sleep.",
    price: "€200 setup",
    priceValue: 200,
    link: "/start-project",
    category: "efficiency",
  },
  {
    id: "crm",
    icon: People,
    title: "CRM Setup & Integration",
    desc: "Know your customers, track every interaction, and never drop a lead.",
    price: "Free strategy",
    priceValue: 0,
    link: "/start-project",
    category: "efficiency",
  },
  {
    id: "whatsapp",
    icon: Whatsapp,
    title: "WhatsApp Business",
    desc: "Turn WhatsApp into a professional, automated business tool.",
    price: "Free registration",
    priceValue: 0,
    link: "/start-project",
    category: "efficiency",
  },
  {
    id: "ai-assistant",
    icon: Cpu,
    title: "AI Personal Assistant",
    desc: "An AI employee for your business — handling emails, scheduling, follow-ups, and more.",
    price: "€100/month",
    priceValue: 100,
    link: "/ai-integration",
    category: "efficiency",
  },
];

const visibilityServices = allServices.filter((s) => s.category === "visibility");
const efficiencyServices = allServices.filter((s) => s.category === "efficiency");

/* ------------------------------------------------------------------ */
/*  Industry packages (updated pricing)                                */
/* ------------------------------------------------------------------ */

const industryPackages = [
  {
    emoji: "🍕",
    title: "Food & Hospitality",
    items: [
      { name: "WhatsApp Business Profile", price: "FREE" },
      { name: "Microsite", price: "FREE" },
      { name: "Deliveroo Registration & Setup", price: "€350" },
    ],
    total: "€350 to get online and taking orders",
    link: "/services/food-hospitality",
  },
  {
    emoji: "💄",
    title: "Beauty & Wellness",
    items: [
      { name: "Domain Registration", price: "Variable" },
      { name: "Microsite", price: "FREE" },
      { name: "Online Reservation System", price: "€300" },
      { name: "WhatsApp Business Profile", price: "FREE" },
    ],
    total: "From €300 fully operational",
    link: "/services/beauty-wellness",
  },
  {
    emoji: "🚀",
    title: "Startup Bootstrap",
    items: [
      { name: "Domain & Setup", price: "Variable" },
      { name: "Microsite", price: "FREE" },
      { name: "Stripe Integration", price: "€450" },
      { name: "WhatsApp Business", price: "FREE" },
      { name: "Prototype/MVP", price: "From €3,500" },
    ],
    total: "Launch-ready from €450",
    link: "/services/startup-bootstrap",
  },
];

/* ------------------------------------------------------------------ */
/*  Pricing data                                                       */
/* ------------------------------------------------------------------ */

const aiPricing = [
  {
    name: "Discovery Audit",
    eurPrice: 0,
    prefix: "",
    label: "One-off",
    features: [
      "Full workflow audit & mapping",
      "AI Opportunity Report",
      "Prioritised recommendations",
      "Estimated time & cost savings",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: false,
  },
  {
    name: "Monthly Retainer",
    eurPrice: 500,
    suffix: " / month",
    label: "Ongoing",
    features: [
      "Ongoing build & integration",
      "Monthly strategy call",
      "Support & iteration",
      "New use cases as you grow",
      "Cancel with 30 days' notice",
    ],
    cta: "Book a Call",
    ctaHref: "/start-project",
    popular: true,
    badge: "Tax deductible",
  },
  {
    name: "Bespoke Integration",
    eurPrice: 0,
    customPrice: "Pre-agreed fixed fee",
    label: "Project-based",
    features: [
      "End-to-end AI strategy",
      "Complex tool integrations",
      "Custom APIs & connectors",
      "Fixed price agreed in writing",
      "Full scoping before any build",
    ],
    cta: "Discuss Your Project",
    ctaHref: "/start-project",
    popular: false,
  },
];

const webPricing = [
  {
    name: "Starter",
    eurPrice: 1999,
    features: [
      "Up to 5 pages",
      "Custom design to brand guidelines",
      "Mobile responsive",
      "Contact form integration",
      "Basic on-page SEO setup",
      "2 rounds of revisions",
      "Fully deployed website",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: false,
  },
  {
    name: "Business",
    eurPrice: 3999,
    features: [
      "Everything in Starter, plus:",
      "Up to 10 pages",
      "Blog or news section",
      "Analytics setup (GA / Tag Manager)",
      "Performance & accessibility optimisation",
      "Social media integration",
      "3 rounds of revisions",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: true,
  },
  {
    name: "Enterprise",
    eurPrice: 7500,
    prefix: "From ",
    features: [
      "Everything in Business, plus:",
      "Unlimited pages",
      "E-commerce or booking integration",
      "Advanced animations & interactions",
      "Custom functionality & APIs",
      "Design system documentation",
      "Priority support",
    ],
    cta: "Get Started",
    ctaHref: "/start-project",
    popular: false,
  },
];

const smePricing = [
  { service: "Microsite", price: "FREE", note: "with Lacuna hosting plan" },
  { service: "Linktree-style site", price: "€10/month", note: "" },
  { service: "Full website", price: "€375 build + €150/month", note: "" },
  { service: "Custom email setup", price: "€150 + €50/month per inbox", note: "" },
  { service: "Reservation system setup", price: "€200 + €100/month maintenance", note: "" },
  { service: "Social media setup", price: "€200 + €100/month maintenance", note: "" },
  { service: "Automated content posting", price: "€89/month", note: "" },
  { service: "AI chatbot integration", price: "Free–€100 + €20/month maintenance", note: "" },
  { service: "WhatsApp Business number", price: "€80/month", note: "" },
  { service: "AI Personal Assistant", price: "€100/month", note: "" },
  { service: "Business registration", price: "€1,500", note: "" },
  { service: "Accountant procurement", price: "€600", note: "" },
];

const pricingCategories = [
  { key: "ai" as const, label: "AI Integration" },
  { key: "web" as const, label: "Web Design" },
  { key: "sme" as const, label: "SME Services" },
];

type PricingCategory = "ai" | "web" | "sme";

/* ------------------------------------------------------------------ */
/*  Tools teaser                                                       */
/* ------------------------------------------------------------------ */

const freeTools = [
  {
    icon: Whatsapp,
    title: "WhatsApp Script Generator",
    desc: "Generate ready-to-use auto-reply scripts for your WhatsApp Business.",
    link: "/tools/whatsapp-script-generator",
  },
  {
    icon: Link1,
    title: "Link-in-Bio Builder",
    desc: "Build a beautiful mobile link page for your business — no sign-up needed.",
    link: "/tools/link-builder",
  },
  {
    icon: Star1,
    title: "Google Review Link Generator",
    desc: "Get a direct review link and QR code to share with customers.",
    link: "/tools/review-link",
  },
  {
    icon: MessageEdit,
    title: "Social Caption Generator",
    desc: "AI writes captions with hashtags for any platform, in your tone.",
    link: "/tools/caption-gen",
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
    body: "Most projects are scoped, built, and deployed within weeks — not months. You see results quickly.",
  },
  {
    icon: Receipt1,
    title: "Transparent pricing",
    body: "Fixed-price packages with no hidden fees. You know exactly what you're paying before we start.",
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
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`group relative flex h-full w-full flex-col rounded-xl border p-6 text-left transition-all ${
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
              selected ? "text-primary" : "text-border"
            }`}
          />
        </div>

        <Icon variant="TwoTone" className={`h-7 w-7 text-primary ${service.featured ? "mt-4" : ""}`} />
        <h3 className="mt-4 text-base font-bold">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>

        {/* Expanded detail on hover/click for featured card */}
        {service.expandedDetail && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowDetail(!showDetail); }}
              className="mt-2 text-xs font-medium text-primary hover:underline"
            >
              {showDetail ? "Show less" : "Learn more"}
            </button>
            <AnimatePresence>
              {showDetail && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden text-xs leading-relaxed text-muted-foreground"
                >
                  {service.expandedDetail}
                </motion.p>
              )}
            </AnimatePresence>
          </>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs font-semibold text-primary">{service.price}</p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            AI-assisted
          </span>
        </div>
      </button>
    </motion.div>
  );
};

/* PackageSummary removed — now integrated into chatbot */

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<PricingCategory>("ai");
  const [currency, setCurrency] = useState<Currency>("EUR");
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

  useEffect(() => {
    document.title = "Services — Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "I help small businesses get found online and run smarter — websites, AI tools, automations, and more."
      );
    }
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
      <ServicesNavigation visible={true} />

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
              Your digital ops team.
              <br />
              <span className="text-primary">One person. Powered by AI.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I help small businesses get found online and run smarter — by building the tools they need and automating the workflows that slow them down.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Build your package <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/start-project"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Book a free call
              </Link>
            </div>
          </motion.div>
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
                relatedIds: [2, 4],
                status: "completed" as const,
                energy: 95,
              },
              {
                id: 2,
                title: "WhatsApp Business",
                date: "Communication",
                content: "Turn WhatsApp into a professional, automated business tool. Respond instantly, qualify leads, and never miss an enquiry.",
                category: "Efficiency",
                icon: MessageCircle,
                relatedIds: [1, 5],
                status: "completed" as const,
                energy: 80,
              },
              {
                id: 3,
                title: "Reservations",
                date: "Automation",
                content: "Ditch the phone bookings. An online reservation system that works while you sleep and plugs into everything else.",
                category: "Efficiency",
                icon: Calendar,
                relatedIds: [2, 5],
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
                relatedIds: [2, 3],
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
                relatedIds: [1, 2, 5],
                status: "pending" as const,
                energy: 75,
              },
            ]}
          />

          <div className="flex justify-center mt-4">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
            >
              Build your package <ArrowRight className="h-4 w-4" />
            </a>
          </div>
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
        </div>
      </section>

      {/* ── Floating package bar ── */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-20 left-1/2 z-[150] -translate-x-1/2"
          >
            <button
              onClick={() => {
                const packageData = selectedServices.map(s => ({ id: s.id, title: s.title, price: s.price, priceValue: s.priceValue }));
                sessionStorage.setItem("lacuna-package-selections", JSON.stringify(packageData));
                window.dispatchEvent(new CustomEvent("open-chat-with-package"));
              }}
              className="flex items-center gap-3 rounded-full border border-primary/30 bg-[#0a0a0b]/95 px-6 py-3 shadow-2xl shadow-primary/20 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-primary/30"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {selectedServices.length}
              </div>
              <span className="text-sm font-semibold text-foreground">
                {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"} selected
              </span>
              <span className="text-sm text-primary">→</span>
              <span className="text-sm font-semibold text-primary">
                Start my free consultation
              </span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ready-Made Packages ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
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
            {industryPackages.map((pkg, i) => (
              <ScrollReveal key={pkg.title} delay={i * 0.1}>
                <div className="relative flex h-full flex-col rounded-xl border border-border bg-card p-8">
                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pkg.emoji}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      AI-assisted build
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{pkg.title}</h3>
                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className={`font-semibold ${item.price === "FREE" ? "text-primary" : "text-foreground"}`}>
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-bold text-primary">{pkg.total}</p>
                  </div>
                  <Link
                    to={pkg.link}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
                  >
                    Get this package <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
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

      {/* ── Social Proof ── */}
      <SocialProof />

      {/* ── Pricing ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Clear, upfront pricing
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              No hidden fees, no hourly billing surprises. Pick a package that fits your needs, or get in touch for something custom.
            </p>
          </ScrollReveal>

          {/* Category slider + Currency switcher */}
          <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="relative inline-flex rounded-lg border border-border bg-card p-1">
              {pricingCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative z-10 rounded-md px-5 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === cat.key
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeCategory === cat.key && (
                    <motion.span
                      layoutId="pricing-tab"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            {activeCategory !== "sme" && (
              <div className="inline-flex rounded-lg border border-border bg-card p-1">
                {(["EUR", "USD", "GBP"] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                      currency === c
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI / Web pricing cards */}
          {activeCategory !== "sme" && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 grid gap-6 md:grid-cols-3"
            >
              {(activeCategory === "ai" ? aiPricing : webPricing).map((tier) => {
                const priceDisplay =
                  "customPrice" in tier && (tier as any).customPrice
                    ? (tier as any).customPrice
                    : tier.eurPrice === 0
                      ? "Free"
                      : `${(tier as any).prefix || ""}${convertPrice(tier.eurPrice, currency)}${(tier as any).suffix || ""}`;

                return (
                  <div
                    key={tier.name}
                    className={`relative flex h-full flex-col rounded-xl border p-8 ${
                      tier.popular ? "border-primary bg-card" : "border-border bg-card"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Most Popular
                      </span>
                    )}
                    {"badge" in tier && (tier as any).badge && !tier.popular && (
                      <span className="absolute -top-3 left-6 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {(tier as any).badge}
                      </span>
                    )}
                    <h3 className="text-lg font-bold">{tier.name}</h3>
                    {"label" in tier && (
                      <p className="mt-1 text-xs font-medium text-muted-foreground">{(tier as any).label}</p>
                    )}
                    <p className="mt-4 text-3xl font-bold">{priceDisplay}</p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-0.5 text-primary">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={tier.ctaHref}
                      className={`mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-all ${
                        tier.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border text-foreground hover:bg-accent"
                      }`}
                    >
                      {tier.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* SME Services table */}
          {activeCategory === "sme" && (
            <motion.div
              key="sme"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 overflow-hidden rounded-xl border border-border"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="px-6 py-4 text-left font-semibold">Service</th>
                    <th className="px-6 py-4 text-right font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {smePricing.map((row, i) => (
                    <tr
                      key={row.service}
                      className={`border-b border-border transition-colors hover:bg-primary/5 ${
                        i % 2 === 0 ? "bg-card" : "bg-background"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">{row.service}</span>
                        {row.note && (
                          <span className="ml-2 text-xs text-muted-foreground">({row.note})</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-foreground">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-card px-6 py-3">
                <p className="text-xs text-muted-foreground">
                  All prices ex-VAT. Hosting and third-party tool costs are passed through at cost.
                </p>
              </div>
            </motion.div>
          )}

          <ScrollReveal delay={0.3}>
            <p className="mt-6 text-xs text-muted-foreground">
              All prices are exclusive of VAT (23%).
            </p>
            <div className="mt-16 text-center">
              <p className="text-muted-foreground">
                Not sure which package is right for you?
              </p>
              <Link
                to="/start-project"
                className="group mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Book a Discovery Call <ArrowRight className="h-4 w-4" />
              </Link>
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

      <ServicesFooter />
    </div>
  );
};

export default Services;
