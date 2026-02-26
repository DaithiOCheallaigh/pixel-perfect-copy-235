import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { ShineBorder } from "../components/ui/shine-border";

const serviceAreas = [
  {
    title: "MVP's for PMF",
    desc: "I can help you launch your product quickly with a strategically designed Minimum Viable Product, followed by data-driven iterations to achieve optimal product-market fit and user satisfaction.",
  },
  {
    title: "Branding & Identity",
    desc: "I craft unforgettable brand experiences through expert logo design, strategic colour palette development, and custom visual assets that set you apart in the digital landscape.",
  },
  {
    title: "UX & Brand Strategy",
    desc: "My UX design and brand strategy services work in harmony to create a perfect alignment between your product's core values and your target audience's needs. I craft compelling digital experiences that resonate with your users while strengthening your brand identity.",
  },
  {
    title: "Onboarding",
    desc: "Drawing on my extensive experience in designing successful onboarding processes for numerous clients, I guarantee a smooth and effortless onboarding experience for your users.",
  },
  {
    title: "Product Launch",
    desc: "I can partner with you to ensure a smooth rollout and launch of your product. My extensive experience spans a wide range of digital products and platforms.",
  },
  {
    title: "Funnel Optimization",
    desc: "Conversion Funnel Optimization: I analyze and refine every touchpoint in your product's user journey to maximize engagement and conversions. My data-driven approach ensures seamless user flows that transform visitors into loyal customers.",
  },
];

const capabilities: { category: string; items: { label: string; id: string }[] }[] = [
  {
    category: "Product",
    items: [
      { label: "User Interface Design", id: "user-interface-design" },
      { label: "User Experience Design", id: "user-experience-design" },
      { label: "Strategy", id: "design-strategy" },
      { label: "Prototypes", id: "prototypes" },
    ],
  },
  {
    category: "Branding",
    items: [
      { label: "Logo Design", id: "logo-design" },
      { label: "Brand Identity", id: "brand-identity" },
      { label: "Branding Guidelines", id: "branding-guidelines" },
      { label: "Creative Direction", id: "creative-direction" },
    ],
  },
  {
    category: "Web",
    items: [
      { label: "CMS & Content Platforms", id: "cms-content-platforms" },
      { label: "Shopify", id: "shopify" },
      { label: "AI Front-end Development", id: "ai-front-end-development" },
      { label: "Funnel Optimisation", id: "funnel-optimisation" },
    ],
  },
  {
    category: "Marketing",
    items: [
      { label: "Digital Marketing Strategy", id: "digital-marketing-strategy" },
      { label: "Social Media Management", id: "social-media-management" },
      { label: "Email Marketing Campaign", id: "email-marketing" },
      { label: "Content Marketing", id: "content-marketing" },
    ],
  },
  {
    category: "SEO",
    items: [
      { label: "Keyword Research & Analysis", id: "keyword-research" },
      { label: "Technical SEO Optimisation", id: "technical-seo" },
      { label: "Local SEO", id: "local-seo" },
      { label: "Link Building & Authority", id: "link-building" },
    ],
  },
  {
    category: "System Design",
    items: [
      { label: "Component Libraries", id: "component-libraries" },
      { label: "Style Guides", id: "style-guides" },
      { label: "Advanced Prototyping", id: "advanced-prototyping" },
      { label: "Development Alignment", id: "development-alignment" },
    ],
  },
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
              <div className="relative flex h-full flex-col rounded-sm bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
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
                  {cap.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/service/${item.id}`}
                        className="text-sm text-foreground transition-colors hover:text-primary"
                      >
                        {item.label} →
                      </Link>
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
    <AvailabilityCTA />
  </main>
);

export default Skills;
