import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";

const lifecycleSteps = [
  {
    num: "1",
    title: "Discovery & Research",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/1.Discovery-and-Research.png?fit=256%2C232&ssl=1",
    items: [
      "Market analysis and competitor research",
      "User interviews and surveys",
      "Stakeholder interviews",
      "Problem definition and opportunity identification",
    ],
  },
  {
    num: "2",
    title: "Strategy & Planning",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/2.Strategy-Planning.png?fit=233%2C228&ssl=1",
    items: [
      "Define project goals and success metrics",
      "Create user personas and journey maps",
      "Establish technical requirements",
      "Set project timeline and milestones",
    ],
  },
  {
    num: "3",
    title: "Design & Ideation",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/3.Design-and-Ideation.png?fit=227%2C218&ssl=1",
    items: [
      "Sketching and wireframing",
      "Information architecture development",
      "Interactive prototyping",
      "Visual design and branding integration",
    ],
  },
  {
    num: "4",
    title: "Testing & Validation",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/4.Testing-Validation.png?fit=231%2C226&ssl=1",
    items: [
      "Usability testing",
      "A/B testing",
      "Stakeholder feedback collection",
      "Design iteration based on feedback",
    ],
  },
  {
    num: "5",
    title: "Implementation",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/5.Implementation.png?fit=226%2C227&ssl=1",
    items: [
      "Developer handoff",
      "Design specifications documentation",
      "Quality assurance",
      "Launch preparation",
    ],
  },
  {
    num: "6",
    title: "Post-Launch Analysis",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/6.Post_Launch-Analysis.png?fit=230%2C231&ssl=1",
    items: [
      "User behaviour monitoring",
      "Performance metrics tracking",
      "Feedback collection and analysis",
      "Continuous improvement planning",
    ],
  },
];

const About = () => (
  <main className="pt-24">
    {/* Product Design Lifecycle Philosophy */}
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>About</SectionLabel>
          <h1 className="mb-4 text-center text-4xl font-black tracking-tighter text-foreground md:text-6xl">
            My Product Design<br />Lifecycle Philosophy
          </h1>
          <p className="mx-auto mb-16 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            As a seasoned product designer, I've developed a comprehensive approach to creating meaningful, user-centered solutions. My design philosophy seamlessly integrates research, iteration, and validation to craft products that not only meet business objectives but genuinely enhance user experiences. Let me walk you through my methodology and showcase how I bring ideas to life.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {lifecycleSteps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.08}>
              <div className="rounded-sm bg-card p-6">
                <img
                  src={step.image}
                  alt={step.title}
                  className="mb-4 h-16 w-16 object-contain"
                  loading="lazy"
                />
                <h3 className="mb-3 text-lg font-bold text-foreground">
                  {step.num}. {step.title}
                </h3>
                <ul className="space-y-1">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              Explore projects which use this methodology <span>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />

    {/* Personal Section */}
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2">
          <ScrollReveal>
            <div className="overflow-hidden rounded-sm">
              <img
                src="https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/MeWife.webp?fit=2372%2C3154&ssl=1"
                alt="Dave Kelly"
                className="w-full object-cover"
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <SectionLabel>Mission Statement</SectionLabel>
              <h2 className="mb-8 text-3xl font-black tracking-tighter text-foreground md:text-4xl">
                David Kelly
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
                <p>
                  Throughout my career, I've had the privilege of being at the forefront of delivering high-quality,
                  comprehensive design solutions. With a keen eye for detail and a deep understanding of user
                  experience, I consistently produce innovative and effective designs across various digital platforms.
                </p>
                <p>
                  I bring both creativity and technical expertise to create tailored solutions that not only meet but
                  exceed expectations. From web design to mobile applications, my commitment to excellence has earned
                  me a reputation as a trusted partner in the digital design landscape.
                </p>
                <p>
                  I look forward to hearing about your digital aspirations and beginning the process of bringing them
                  to life, together.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Interests / Facts / Hobbies */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Interests",
              items: [
                "👾 Nanotechnology and the nanoscale fascinate me. I think the applications will be endless",
                "🧑‍💻 Augmented reality, I would love to see us move more into the AR space",
                "🤖 I am really enjoying augmenting my workflows with AI",
              ],
            },
            {
              title: "Fun Facts",
              items: [
                "📺 I once found myself in the audience of the Oprah TV show",
                "🌍 I have travelled to over 30 countries and would love to see more",
                "🇲🇽 There is a Mexican side to my Irish family, it's a fun mix of cultures",
              ],
            },
            {
              title: "Hobbies",
              items: [
                "🍕 I love pizza and like nothing more than creating a dough from scratch to put into my pizza oven",
                "🐚 A walk on the beach near my home is my happy place",
                "🎺 I love listening to music, John Coltrane will regularly be on when I want to get into my design flow",
              ],
            },
          ].map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.1}>
              <div className="rounded-sm bg-card p-6">
                <h3 className="mb-4 text-lg font-bold text-foreground">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-sm leading-relaxed text-muted-foreground">{item}</li>
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

export default About;
