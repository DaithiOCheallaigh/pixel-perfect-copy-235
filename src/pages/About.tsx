import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";

const About = () => (
  <main className="pt-24">
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Photo */}
          <ScrollReveal>
            <div className="overflow-hidden rounded-sm">
              <img
                src="https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/MeWife.webp?fit=2372%2C3154&ssl=1"
                alt="Dave Kelly"
                className="w-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <ScrollReveal>
              <SectionLabel>About</SectionLabel>
              <h1 className="mb-8 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
                David Kelly
              </h1>
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
