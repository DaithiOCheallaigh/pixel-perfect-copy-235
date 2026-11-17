import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { imgDims } from "@/data/imageDimensions";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import StickyAudioBar from "@/components/blog/StickyAudioBar";
import { useAudioPlayer } from "@/components/blog/useAudioPlayer";
import { ReadAlongContent, ReadAlongText, parseActiveWord } from "@/components/blog/ReadAlongContent";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import HiringCTA from "../components/HiringCTA";
import { blogPosts } from "../data/blogPosts";
import { SEO } from "../components/SEO";
import { fitDescription } from "@/lib/seoDescription";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const postIndex = blogPosts.findIndex((p) => p.id === id);
  const post = blogPosts[postIndex];

  const player = useAudioPlayer({ src: post?.audio?.src ?? "", durationSeconds: post?.audio?.durationSeconds ?? 0, wordTimings: post?.audio?.wordTimings });
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => { setDismissed(false); }, [id]);

  useEffect(() => {
    let frame = 0;
    const update = () => setPastHero((sentinelRef.current?.getBoundingClientRect().bottom ?? 1) < 0);
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; update(); });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [id]);

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

  const audioMinutes = post.audio ? Math.ceil(post.audio.durationSeconds / 60) : 0;
  const barVisible = !!post.audio && !dismissed && (player.playing || player.current > 0 || pastHero);
  const onListen = () => { setDismissed(false); player.toggle(); };
  const activeWordKey = parseActiveWord(player.activeWord);
  const titleActiveIndex = activeWordKey?.blockKey === "t" ? activeWordKey.index : null;

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <main className={`pt-24${barVisible ? " pb-24 sm:pb-20" : ""}`}>
      <SEO
        title={post.title}
        description={fitDescription(post.excerpt, "Written by Dave Kelly, senior product designer in Dublin.")}
        image={`https://www.lacunadigital.io${post.image}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: `https://www.lacunadigital.io${post.image}`,
          datePublished: post.dateISO,
          dateModified: post.dateISO,
          author: { "@type": "Person", name: "Dave Kelly" },
          publisher: {
            "@type": "Organization",
            name: "Lacuna Digital",
            logo: { "@type": "ImageObject", url: "https://www.lacunadigital.io/favicon.png" },
          },
          mainEntityOfPage: `https://www.lacunadigital.io/blog/${post.id}`,
          ...(post.audio
            ? {
                audio: {
                  "@type": "AudioObject",
                  name: `${post.title} (audio version)`,
                  contentUrl: `https://www.lacunadigital.io${post.audio.src}`,
                  encodingFormat: post.audio.mimeType ?? "audio/mpeg",
                  duration: `PT${Math.floor(post.audio.durationSeconds / 60)}M${post.audio.durationSeconds % 60}S`,
                },
              }
            : {}),
        }}
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
              <ReadAlongText text={post.title} blockKey="t" activeIndex={titleActiveIndex} />
            </h1>

            <p className="font-mono text-sm text-muted-foreground">
              First published: <time dateTime={post.dateISO}>{post.date}</time> · {post.readTime}
            </p>
            {post.audio && (
              <>
                <button
                  type="button"
                  onClick={onListen}
                  aria-label={player.playing ? "Pause audio version" : "Play audio version"}
                  aria-pressed={player.playing}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {player.playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                  {player.playing ? "Pause" : `Listen · ${audioMinutes} min`}
                </button>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Audio version · AI narration</p>
              </>
            )}
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
              className="w-full object-cover" {...imgDims(post.image)} loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </motion.div>
        <div ref={sentinelRef} aria-hidden="true" className="h-px" />

        {/* ─── Intro lede (wider) ─── */}
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="blog-content space-y-6">
              <ReadAlongContent content={post.content} activeWord={player.activeWord} />
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
      <HiringCTA />
      {post.audio && (
        <>
          {player.audioElement}
          <StickyAudioBar player={player} title={post.title} minutes={audioMinutes} visible={barVisible} onClose={() => { player.pause(); setDismissed(true); }} />
        </>
      )}
    </main>
  );
};

export default BlogPost;
