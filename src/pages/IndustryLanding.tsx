import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Whatsapp,
  Monitor,
  ShoppingCart,
  Calendar1,
  Location,
  Wallet,
  MessageText,
} from "iconsax-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface IndustryItem {
  label: string;
  price: string;
  free?: boolean;
}

interface TimelineStep {
  week: string;
  title: string;
  desc: string;
}

interface IndustryData {
  slug: string;
  emoji: string;
  headline: string;
  subheading: string;
  metaTitle: string;
  metaDesc: string;
  problems: string[];
  items: IndustryItem[];
  total: string;
  totalNote: string;
  timeline: TimelineStep[];
  testimonial: string;
  testimonialAuthor: string;
}

const industries: Record<string, IndustryData> = {
  "food-hospitality": {
    slug: "food-hospitality",
    emoji: "🍕",
    headline: "Get your food business online and taking orders — in under two weeks.",
    subheading:
      "Whether you're a restaurant, café, or takeaway — I'll set up your online presence, your WhatsApp ordering system, and your Deliveroo profile. All for €200.",
    metaTitle: "Food & Hospitality Digital Setup — Lacuna Digital",
    metaDesc:
      "Get your restaurant, café, or takeaway online with a microsite, WhatsApp Business, and Deliveroo setup — from €200.",
    problems: [
      "Customers can't find you — or find you and see nothing useful",
      "You're losing orders to competitors who are already on Deliveroo",
      "Your phone is ringing with questions that could be answered automatically",
    ],
    items: [
      { label: "WhatsApp Business Profile", price: "FREE", free: true },
      { label: "Professional microsite (menu, location, hours, order link)", price: "FREE", free: true },
      { label: "Deliveroo registration & onboarding", price: "€200" },
      { label: "WhatsApp auto-reply setup for common questions", price: "FREE", free: true },
    ],
    total: "€200 one-off",
    totalNote: "+ optional €100/month management",
    timeline: [
      { week: "Week 1", title: "Discovery & Setup", desc: "Quick call, collect your menu, photos, and business details." },
      { week: "Week 2", title: "Build & Launch", desc: "Microsite live, WhatsApp configured, Deliveroo submitted." },
      { week: "Week 3", title: "Optimise", desc: "Auto-replies tested, Google listing claimed, handover complete." },
      { week: "Live", title: "You're Online", desc: "Customers can find you, message you, and order — 24/7." },
    ],
    testimonial:
      "Dave had us set up and taking orders on Deliveroo within 10 days. We went from zero online presence to getting new customers every week.",
    testimonialAuthor: "— Restaurant owner, North Dublin",
  },
  "beauty-wellness": {
    slug: "beauty-wellness",
    emoji: "💄",
    headline: "Fill your appointment book — without spending hours on the phone.",
    subheading:
      "I set up your online booking, your professional web presence, and your WhatsApp Business profile — so clients can find you and book instantly, any time of day.",
    metaTitle: "Beauty & Wellness Digital Setup — Lacuna Digital",
    metaDesc:
      "Online booking, microsite, and WhatsApp Business for salons, barbers, and wellness businesses — from €85.",
    problems: [
      "You're taking bookings by phone and DM, and things fall through the cracks",
      "Clients can't easily find your prices, availability, or location",
      "You're spending time on admin that could be spent with clients",
    ],
    items: [
      { label: "Domain registration & setup", price: "Variable" },
      { label: "Professional microsite with service menu & booking link", price: "FREE", free: true },
      { label: "Online reservation system (Fresha / Calendly integration)", price: "€85" },
      { label: "WhatsApp Business profile", price: "FREE", free: true },
    ],
    total: "From €85",
    totalNote: "+ domain cost",
    timeline: [
      { week: "Week 1", title: "Discovery & Branding", desc: "Quick call, collect your service list, pricing, and brand colours." },
      { week: "Week 2", title: "Build & Configure", desc: "Microsite designed, booking system integrated, domain connected." },
      { week: "Week 3", title: "Test & Launch", desc: "WhatsApp Business live, everything tested, handover." },
      { week: "Live", title: "Fully Operational", desc: "Clients book online 24/7. You focus on what you do best." },
    ],
    testimonial:
      "I used to spend an hour a day managing bookings by text. Now clients just book themselves online — it's been a game changer.",
    testimonialAuthor: "— Salon owner, Swords",
  },
  "startup-bootstrap": {
    slug: "startup-bootstrap",
    emoji: "🚀",
    headline: "Go from idea to online in two weeks. For less than you think.",
    subheading:
      "I've helped early-stage founders get their first product live, take payments, and start collecting leads — without burning through budget.",
    metaTitle: "Startup Bootstrap Package — Lacuna Digital",
    metaDesc:
      "Launch your startup online with a landing page, Stripe payments, and WhatsApp Business — from €300.",
    problems: [
      "You need a credible online presence before you can raise or sell",
      "You're not sure which tools to use or how to connect them",
      "Every week offline is a week of lost validation",
    ],
    items: [
      { label: "Domain registration & setup", price: "Variable" },
      { label: "Microsite (landing page + email capture)", price: "FREE", free: true },
      { label: "Stripe payment setup", price: "€50" },
      { label: "Stripe integration into your site", price: "€250" },
      { label: "WhatsApp Business profile", price: "FREE", free: true },
      { label: "Optional: MVP prototype", price: "From €2,000" },
    ],
    total: "From €300",
    totalNote: "to launch-ready",
    timeline: [
      { week: "Week 1", title: "Scope & Strategy", desc: "Define your MVP, user flow, and payment structure." },
      { week: "Week 2", title: "Build & Integrate", desc: "Landing page live, Stripe connected, WhatsApp set up." },
      { week: "Week 3", title: "Test & Refine", desc: "End-to-end test, analytics configured, soft launch." },
      { week: "Live", title: "Launch-Ready", desc: "Start selling, collecting leads, and validating." },
    ],
    testimonial:
      "Dave got us from a slide deck to a live product with payments in under three weeks. We started getting paying customers on day one.",
    testimonialAuthor: "— Founder, Dublin startup",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const IndustryLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? industries[slug] : undefined;

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", data.metaDesc);
    }
    return () => {
      document.title = "Lacuna Digital";
    };
  }, [data]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServicesNavigation visible={true} />

      {/* ── Hero ── */}
      <section className="relative px-6 pb-24 pt-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-4xl">{data.emoji}</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {data.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {data.subheading}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/start-project"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Get this package <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                See how it works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-2xl font-bold md:text-3xl">Sound familiar?</h2>
          </ScrollReveal>

          <div className="mt-10 space-y-6">
            {data.problems.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                  <span className="mt-0.5 text-lg text-primary">✗</span>
                  <p className="text-muted-foreground leading-relaxed">{p}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="text-2xl font-bold md:text-3xl">What's included</h2>
          </ScrollReveal>

          <div className="mt-10 space-y-4">
            {data.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-center justify-between rounded-lg border border-border bg-card px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${item.free ? "text-primary" : "text-foreground"}`}>
                    {item.price}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <p className="text-2xl font-bold text-foreground">
                Total: {data.total}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{data.totalNote}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section id="how-it-works" className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-2xl font-bold md:text-3xl">What it looks like in practice</h2>
          </ScrollReveal>

          <div className="relative mt-12">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 hidden h-full w-px bg-border md:block" />

            <div className="space-y-8">
              {data.timeline.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        step.week === "Live"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground"
                      }`}>
                        {step.week === "Live" ? "✓" : i + 1}
                      </div>
                    </div>
                    <div className="pb-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {step.week}
                      </p>
                      <h3 className="mt-1 text-base font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── CTA Strip ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-bold md:text-3xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-muted-foreground">
              I'll have you live in 2 weeks.
            </p>
            <Link
              to="/start-project"
              className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
            >
              Get this package <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Mobile sticky bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 p-3 backdrop-blur-md md:hidden">
        <Link
          to="/start-project"
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          💬 Get this package <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="pb-16 md:pb-0">
        <ServicesFooter />
      </div>
    </div>
  );
};

export default IndustryLanding;
