import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";

const serviceAreas = [
  {
    title: "MVP's for PMF",
    desc: "Launch quickly with a strategically designed MVP; data-driven iterations to achieve optimal product-market fit and user satisfaction.",
  },
  {
    title: "Branding & Identity",
    desc: "Unforgettable brand experiences through logo design, strategic colour palette development, and custom visual assets.",
  },
  {
    title: "UX & Brand Strategy",
    desc: "UX design and brand strategy in harmony; alignment between product values and audience needs; compelling digital experiences.",
  },
  {
    title: "Onboarding",
    desc: "Smooth and effortless onboarding experience for users; extensive experience across numerous clients.",
  },
  {
    title: "Product Launch",
    desc: "Smooth rollout and launch; experience spans a wide range of digital products.",
  },
  {
    title: "Funnel Optimisation",
    desc: "Analyze and refine every touchpoint; maximize engagement and conversions; data-driven approach.",
  },
];

const capabilities = [
  { category: "Product", items: ["User Interface Design", "User Experience Design", "Strategy", "Prototypes"] },
  { category: "Branding", items: ["Logo Design", "Brand Identity", "Branding Guidelines", "Creative Direction"] },
  { category: "Web", items: ["CMS & Content Platforms", "Shopify", "AI Front-end Development", "Funnel Optimisation"] },
  { category: "Marketing", items: ["Digital Marketing Strategy", "Social Media Management", "Email Marketing", "Content Marketing"] },
  { category: "SEO", items: ["Keyword Research & Analysis", "Technical SEO Optimisation", "Local SEO", "Link Building & Authority"] },
  { category: "System Design", items: ["Component Libraries", "Style Guides", "Advanced Prototyping", "Development Alignment"] },
];

const Skills = () => (
  <main className="pt-24">
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Skill Set</SectionLabel>
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
            Design is multifaceted
          </h1>
          <p className="mb-16 text-lg text-primary">A vision for growth</p>
        </ScrollReveal>

        {/* Service areas */}
        <div className="mb-24 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area, i) => (
            <ScrollReveal key={area.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-sm bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
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
                  {cap.items.map((item) => (
                    <li key={item} className="text-sm text-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
    <AvailabilityCTA />
  </main>
);

export default Skills;
