import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import HiringCTA from "../components/HiringCTA";
import { SEO } from "../components/SEO";

const focusAreas = [
  {
    title: "End-to-end product design",
    desc: "Discovery, flows, UI and iteration for web and native apps. Recent: a two-sided learning product for Elsevier and three enterprise tools for Marsh.",
  },
  {
    title: "Design systems",
    desc: "Token-based component libraries designed in Figma and documented in Storybook. Built CORE for Marsh and extended Elsevier's Leyden system.",
  },
  {
    title: "Prototyping & AI-assisted workflow",
    desc: "Claude, Lovable and Figma MCP to go from concept to a clickable, testable prototype in hours, then back into dev-ready Figma files.",
  },
  {
    title: "Research & validation",
    desc: "User interviews, card sorting, usability testing and Mixpanel analytics to decide what to build and check it worked.",
  },
  {
    title: "Design-to-engineering handoff",
    desc: "Spec-driven design working directly with front-end component libraries, so engineers get components they can drop straight in.",
  },
  {
    title: "Enterprise ways of working",
    desc: "Design critiques, multi-squad delivery, Confluence and Jira documentation, and designing patterns that hold up across a product portfolio.",
  },
];

const capabilities: { category: string; items: string[] }[] = [
  { category: "Product", items: ["UX research", "Interaction design", "UI design", "Information architecture"] },
  { category: "Design systems", items: ["Design tokens", "Component libraries", "Storybook documentation", "Accessibility"] },
  { category: "Prototyping", items: ["Figma", "Lovable", "Claude", "Figma MCP"] },
  { category: "Delivery", items: ["Spec-driven design", "Developer handoff", "Mixpanel analytics", "Design QA"] },
  { category: "Platforms", items: ["Web SaaS", "iOS & Android", "Enterprise internal tools", "Healthcare education"] },
];

const Skills = () => (
  <main className="pt-24">
    <SEO title="Skills" description="Dave Kelly's product design skill set: UX research, UI and interaction design, design systems, prototyping, AI-assisted workflows and front-end collaboration." />
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Skills</SectionLabel>
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
            What I do
          </h1>
          <p className="mb-16 text-lg text-primary">Product design from research to shipped code.</p>
        </ScrollReveal>

        {/* Focus areas */}
        <div className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, i) => (
            <ScrollReveal key={area.title} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-xl border border-border bg-card p-8">
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
            Capabilities
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.category} delay={i * 0.08}>
              <div>
                <h3 className="mb-4 font-mono-label text-primary">{cap.category}</h3>
                <ul className="space-y-2">
                  {cap.items.map((item) => (
                    <li key={item}>
                      <span className="text-sm text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
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
