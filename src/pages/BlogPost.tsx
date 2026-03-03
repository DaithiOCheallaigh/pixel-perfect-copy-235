import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { blogPosts } from "../data/blogPosts";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const postIndex = blogPosts.findIndex((p) => p.id === id);
  const post = blogPosts[postIndex];

  useEffect(() => {
    if (!post) return;

    const origin = window.location.origin;
    const url = `${origin}/blog/${post.id}`;
    const imageUrl = `${origin}${post.image}`;

    const metaTags: Record<string, string> = {
      "og:title": post.title,
      "og:description": post.excerpt,
      "og:image": imageUrl,
      "og:url": url,
      "og:type": "article",
      "twitter:card": "summary_large_image",
      "twitter:title": post.title,
      "twitter:description": post.excerpt,
      "twitter:image": imageUrl,
    };

    const elements: HTMLMetaElement[] = [];

    Object.entries(metaTags).forEach(([key, value]) => {
      const attr = key.startsWith("og:") ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (el) {
        el.setAttribute("content", value);
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        el.setAttribute("content", value);
        document.head.appendChild(el);
        elements.push(el);
      }
    });

    document.title = `${post.title} — Lacuna Digital`;

    return () => {
      elements.forEach((el) => el.remove());
      document.title = "Lacuna Digital — Dave Kelly | Digital Designer & UX Strategist";
    };
  }, [post]);

  if (!post) {
    return (
      <main className="pt-24">
        <section className="px-6 py-24 md:px-12 lg:px-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-foreground">Post not found</h1>
            <Link to="/blog" className="mt-4 inline-block text-primary underline">
              ← Back to Blog
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <main className="pt-24">
      <article className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <Link
              to="/blog"
              className="mb-8 inline-flex items-center gap-2 font-mono-label text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>

            <SectionLabel>Insights</SectionLabel>

            <h1 className="mb-4 text-3xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="font-mono-label mb-10 text-muted-foreground">
              {post.date} · {post.readTime}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12 overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="blog-content space-y-6">
              {post.content}
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* Next / Previous Article Navigation */}
      <nav className="border-t border-border px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {prevPost ? (
            <Link
              to={`/blog/${prevPost.id}`}
              className="group flex flex-col gap-2 rounded-xl bg-card p-6 transition-colors hover:bg-accent/50"
            >
              <span className="flex items-center gap-2 font-mono-label text-xs text-muted-foreground">
                <ArrowLeft size={12} />
                Previous Article
              </span>
              <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              to={`/blog/${nextPost.id}`}
              className="group flex flex-col items-end gap-2 rounded-xl bg-card p-6 text-right transition-colors hover:bg-accent/50"
            >
              <span className="flex items-center gap-2 font-mono-label text-xs text-muted-foreground">
                Next Article
                <ArrowRight size={12} />
              </span>
              <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>
  );
};

export default BlogPost;
