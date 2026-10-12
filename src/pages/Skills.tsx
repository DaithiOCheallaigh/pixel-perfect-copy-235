import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import HiringCTA from "../components/HiringCTA";
import { ShineBorder } from "../components/ui/shine-border";
import { PortfolioSEO as SEO } from "../components/PortfolioSEO";

const focusAreas = [
  { title: "MVPs & product-market fit", desc: "Designing Minimum Viable Products and iterating on them with data towards product-market fit." },
  { title: "Branding & Identity", desc: "Brand identity, colour systems and visual assets — for example, establishing TipDirect as a standalone brand separate from TripAdmit." },
  { title: "UX & Brand Strategy", desc: "Aligning a product's UX with its brand and its audience's needs, so the experience and the identity reinforce each other." },
  { title: "Onboarding", desc: "Designing onboarding flows that get new users to value quickly." },
  { title: "Product Launch", desc: "Taking products from UAT to launch and measurement, from the TipDirect app to airline white-label products." },
  { title: "Funnel Optimisation", desc: "Analysing and refining each step of a user journey to improve conversion, using analytics and A/B testing." },
];

const capabilities: { category: string; items: string[]; seeIt?: { label: string; to: string } }[] = [
  { category: "Product & UX", items: ["User Research", "UI/UX Design", "Information Architecture", "Journey Mapping", "Prototyping", "End-to-End Product Delivery"], seeIt: { label: "Digital Tipping", to: "/case/digital-tipping" } },
  { category: "Design Systems & Accessibility", items: ["Design Systems", "Design System Tokens", "Accessibility (WCAG)", "Responsive & Mobile-First Design"], seeIt: { label: "Marsh Design System", to: "/work/marsh-design-system" } },
  { category: "AI-Assisted Design", items: ["AI-Assisted Design", "AI Prototyping", "Claude", "Lovable", "Claude MCP to Figma"], seeIt: { label: "AI Design Process", to: "/ai-design-process" } },
  { category: "Ways of Working", items: ["Agile", "Design Sprints", "A/B Testing", "Jira", "Confluence", "Notion"], seeIt: { label: "Admin Dashboard", to: "/case/admin-dashboard" } },
  { category: "Tools", items: ["Figma", "Sketch", "Adobe", "Whimsical", "Miro"] },
];

const Skills = () => (
  <main className="pt-24">
    <SEO title="Skills" description="UI/UX design, AI-assisted workflows, design systems and product strategy — what I bring to a product team." url="/skills" />
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Skill Set</SectionLabel>
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
            Design is multifaceted
          </h1>
          <p className="mb-16 text-lg text-primary">What I bring to a product team</p>
        </ScrollReveal>

        {/* Focus areas */}
        <div className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, i) => (
            <ScrollReveal key={area.title} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-xl bg-card p-8 transition-transform duration-300 hover:-translate-y-1">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <h3 className="mb-3 text-lg font-bold text-foreground">{area.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{area.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <hr className="swiss-hr mb-24" />

        {/* Capabilities */}
        <ScrollReveal>
          <SectionLabel>Capabilities</SectionLabel>
          <h2 className="mb-12 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Full-Spectrum Expertise
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.category} delay={i * 0.08}>
              <div>
                <h3 className="mb-4 font-mono-label text-primary">{cap.category}</h3>
                <ul className="space-y-2">
                  {cap.items.map((label) => (
                    <li key={label} className="text-sm text-foreground">{label}</li>
                  ))}
                </ul>
                {cap.seeIt && (
                  <Link to={cap.seeIt.to} className="mt-3 inline-block text-xs font-semibold text-primary">See it in {cap.seeIt.label} →</Link>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
    <HiringCTA />
  </main>
);

export default Skills;
