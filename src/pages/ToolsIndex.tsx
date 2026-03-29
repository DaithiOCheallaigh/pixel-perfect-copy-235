import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Whatsapp,
  Link1,
  Star1,
  MessageEdit,
} from "iconsax-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";

const tools = [
  {
    icon: Whatsapp,
    title: "WhatsApp Script Generator",
    desc: "Generate ready-to-use auto-reply scripts for your WhatsApp Business account.",
    link: "/tools/whatsapp-scripts",
  },
  {
    icon: Link1,
    title: "Link-in-Bio Builder",
    desc: "Build a beautiful mobile-optimised link page — no sign-up needed.",
    link: "/tools/link-in-bio",
  },
  {
    icon: Star1,
    title: "Google Review Link Generator",
    desc: "Get a direct review link + QR code to share with customers.",
    link: "/tools/review-link",
  },
  {
    icon: MessageEdit,
    title: "Social Caption Generator",
    desc: "AI writes captions with hashtags for any platform, in your tone.",
    link: "/tools/caption-generator",
  },
];

const ToolsIndex = () => {
  useEffect(() => {
    document.title = "Free Business Tools — Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Free tools for small businesses — WhatsApp scripts, link pages, review links, caption generators. No sign-up required."
      );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServicesNavigation visible={true} />

      <section className="px-6 pb-12 pt-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Free Tools</SectionLabel>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Free tools for your business
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              I built these so you can see what AI and good design can do for a small business — no sign-up required. If you want any of these set up properly, just get in touch.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.title} delay={i * 0.06}>
                <Link
                  to={tool.link}
                  className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.25)]"
                >
                  <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Free
                  </span>
                  <tool.icon variant="TwoTone" className="h-7 w-7 text-primary" />
                  <h3 className="mt-4 text-base font-bold">{tool.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                    Try it free <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-20 text-center">
              <p className="text-muted-foreground">
                Need something custom? I build tools like these for businesses every week.
              </p>
              <Link
                to="/start-project"
                className="group mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                Let's talk <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default ToolsIndex;
