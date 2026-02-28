import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { ShineBorder } from "../components/ui/shine-border";
import { blogPosts } from "../data/blogPosts";

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
              <Link to={`/blog/${post.id}`} className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card">
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
              </Link>
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
