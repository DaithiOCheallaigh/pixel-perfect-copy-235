import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { blogPosts } from "../data/blogPosts";
import { SEO } from "../components/SEO";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const postIndex = blogPosts.findIndex((p) => p.id === id);
  const post = blogPosts[postIndex];

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
      <SEO
        title={post.title}
        description={post.excerpt}
        image={`https://www.lacunadigital.io${post.image}`}
        url={`/blog/${post.id}`}
      />
      <article className="px-6 md:px-12 lg:px-24">
        {/* ─── Header ─── */}
        <div className="mx-auto max-w-3xl pb-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/blog"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <ArrowLeft size={12} />
              Back to Writing
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                Design
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                Engineering
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-black tracking-tighter text-foreground md:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              {post.title}
            </h1>

            <p className="font-mono text-sm text-muted-foreground">
              First published: {post.date} · {post.readTime}
            </p>
          </motion.div>
        </div>

        {/* ─── Hero Image ─── */}
        <motion.div
          className="mx-auto max-w-4xl pb-16"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        </motion.div>

        {/* ─── Intro lede (wider) ─── */}
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="blog-content space-y-6">
              {post.content}
            </div>
          </motion.div>
        </div>
      </article>

      {/* ─── Separator ─── */}
      <div className="mx-auto my-16 max-w-3xl px-6">
        <hr className="border-border" />
      </div>

      {/* ─── Next / Previous Article Navigation ─── */}
      <nav className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
          {prevPost ? (
            <Link
              to={`/blog/${prevPost.id}`}
              className="group flex flex-col gap-2 rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <ArrowLeft size={10} />
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
              className="group flex flex-col items-end gap-2 rounded-2xl border border-border bg-card/50 p-6 text-right transition-all hover:border-primary/30 hover:bg-card"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Next Article
                <ArrowRight size={10} />
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
