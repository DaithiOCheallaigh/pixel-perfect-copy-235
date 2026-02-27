import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { ShineBorder } from "../components/ui/shine-border";
import { SearchNormal1, Calendar, Bezier, TaskSquare, Code1, Chart2 } from "iconsax-react";
import { type ReactNode } from "react";
import avatarImg from "@/assets/avatar.jpeg";

const lifecycleSteps: { num: string; title: string; icon: ReactNode; items: string[] }[] = [
  {
    num: "1",
    title: "Discovery & Research",
    icon: <SearchNormal1 size={32} variant="Bulk" className="text-primary" />,
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
    icon: <Calendar size={32} variant="Bulk" className="text-primary" />,
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
    icon: <Bezier size={32} variant="Bulk" className="text-primary" />,
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
    icon: <TaskSquare size={32} variant="Bulk" className="text-primary" />,
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
    icon: <Code1 size={32} variant="Bulk" className="text-primary" />,
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
    icon: <Chart2 size={32} variant="Bulk" className="text-primary" />,
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
    {/* Personal Section */}
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-8">
              <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full">
                <img
                  src={avatarImg}
                  alt="Dave Kelly"
                  className="h-full w-full object-cover"
                />
                <ShineBorder
                  shineColor={["#A855F7", "#EC4899", "#F97316"]}
                  duration={10}
                  borderWidth={2}
                  className="rounded-full"
                />
              </div>
              <div>
                <SectionLabel>About</SectionLabel>
                <h1 className="text-3xl font-black tracking-tighter text-foreground md:text-4xl">
                  Dave Kelly
                </h1>
              </div>
            </div>
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

    {/* Product Design Lifecycle Philosophy */}
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Process</SectionLabel>
          <h2 className="mb-4 text-center text-3xl font-black tracking-tighter text-foreground md:text-5xl">
            My Product Design<br />Lifecycle Philosophy
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            As a seasoned product designer, I've developed a comprehensive approach to creating meaningful, user-centered solutions. My design philosophy seamlessly integrates research, iteration, and validation to craft products that not only meet business objectives but genuinely enhance user experiences.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {lifecycleSteps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.08}>
              <div className="rounded-sm bg-card p-6">
                <div className="mb-4">{step.icon}</div>
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
    <AvailabilityCTA />
  </main>
);

export default About;
