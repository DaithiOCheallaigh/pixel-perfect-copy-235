import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { ShineBorder } from "../components/ui/shine-border";

const blogPosts = [
  {
    id: "design-trends-2025",
    title: "Design Trends to Watch in 2025",
    date: "November 21, 2024",
    readTime: "8 min read",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/01/Dicovery.webp?fit=300%2C158&ssl=1",
    excerpt: "As we approach 2025, design evolves at an unprecedented pace. Exploring 9 key trends from immersive 3D experiences to ethical and inclusive design.",
  },
  {
    id: "benefits-digital-agency",
    title: "The Benefits of Using A Digital Agency",
    date: "November 19, 2024",
    readTime: "6 min read",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/01/Selection.webp?fit=300%2C158&ssl=1",
    excerpt: "Lacuna Digital is an end-to-end digital agency offering comprehensive solutions, local expertise with a global perspective, and scalable solutions for growing businesses.",
  },
  {
    id: "partner-for-agencies",
    title: "Why Lacuna Digital is the Perfect Partner for Agencies",
    date: "November 21, 2024",
    readTime: "6 min read",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/01/Implmentation.webp?fit=300%2C158&ssl=1",
    excerpt: "8 reasons Lacuna Digital is ideal for agency partnerships — from comprehensive digital expertise to dedicated support and continuous innovation.",
  },
  {
    id: "strategic-ux",
    title: "Why Your Digital Product Needs More Than Just \"Good Design\"",
    date: "October 22, 2025",
    readTime: "5 min read",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/MobileAI.webp?fit=800%2C764&ssl=1",
    excerpt: "Personal essay on design as problem-solving, not decoration. \"What problem are we solving?\" not \"What colours do you like?\"",
  },
  {
    id: "navigating-design-2025",
    title: "Navigating Design in 2025: Challenges & Solutions",
    date: "October 22, 2025",
    readTime: "5 min read",
    image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tech.webp?fit=800%2C800&ssl=1",
    excerpt: "Deep-dive on the state of the design industry in 2025. The perfect storm of 5 challenges and 8 strategies for designers to thrive.",
  },
];

const Blog = () => (
  <main className="pt-24">
    <section className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Insights</SectionLabel>
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
            Blog
          </h1>
          <p className="mb-16 max-w-xl text-lg text-muted-foreground">
            Thoughts on design, strategy, and the evolving digital landscape.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.08}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <span className="font-mono-label mb-2 text-muted-foreground">
                    {post.date} · {post.readTime}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{post.title}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
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

export default Blog;
