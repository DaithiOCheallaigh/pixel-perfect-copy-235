import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { ShineBorder } from "../components/ui/shine-border";

const blogPosts = [
  {
    id: "navigating-design-2025",
    title: "Navigating Design in 2025: Challenges and Opportunities in a Transformed Industry",
    date: "October 22, 2025",
    readTime: "5 min read",
    image: "/images/blog/navigating-design-2025.webp",
    excerpt: "The design industry stands at a fascinating crossroads in 2025. Exploring the perfect storm of 5 challenges and 8 strategies for designers to thrive.",
  },
  {
    id: "strategic-ux",
    title: "Why Your Digital Product Needs More Than Just \"Good Design\"",
    date: "October 22, 2025",
    readTime: "5 min read",
    image: "/images/blog/strategic-ux.webp",
    excerpt: "Great design isn't decoration — it's problem-solving with pixels. \"What problem are we solving?\" not \"What colours do you like?\"",
  },
  {
    id: "design-trends-2025",
    title: "Design Trends to Watch in 2025: Shaping the Future of Digital Aesthetics",
    date: "November 21, 2024",
    readTime: "8 min read",
    image: "/images/blog/design-trends-2025.webp",
    excerpt: "As we approach 2025, design evolves at an unprecedented pace. Exploring 9 key trends from immersive 3D experiences to ethical and inclusive design.",
  },
  {
    id: "partner-for-agencies",
    title: "Why Lacuna Digital is the Perfect Partner for Agencies",
    date: "November 21, 2024",
    readTime: "6 min read",
    image: "/images/blog/partner-for-agencies.webp",
    excerpt: "8 reasons Lacuna Digital is ideal for agency partnerships — from comprehensive digital expertise to dedicated support and continuous innovation.",
  },
  {
    id: "benefits-digital-agency",
    title: "The Benefits of Using A Digital Agency",
    date: "November 19, 2024",
    readTime: "6 min read",
    image: "/images/blog/benefits-digital-agency.webp",
    excerpt: "Lacuna Digital is an end-to-end digital agency offering comprehensive solutions, local expertise with a global perspective, and scalable solutions for growing businesses.",
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
