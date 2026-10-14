import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import CaseImage, { imageShape } from "../CaseImage";
import { imgDims } from "@/data/imageDimensions";
import { caseStudyPath, getNextProject } from "@/data/caseStudies";

export type MediaItem = { src: string; alt: string; caption?: string; wide?: boolean };

/* ---------- Text ---------- */

const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );

/** Paragraphs split on blank lines; lines starting with "- " become bullets; **bold** supported. */
export const Prose = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`space-y-4 text-[15px] leading-[1.7] text-muted-foreground ${className}`}>
    {text.split(/\n\n+/).map((block, i) => {
      const lines = block.split("\n").filter(Boolean);
      const bullets = lines.filter((l) => l.startsWith("- "));
      const intro = lines.filter((l) => !l.startsWith("- "));
      return (
        <Fragment key={i}>
          {intro.map((l, j) => <p key={j}>{renderInline(l)}</p>)}
          {bullets.length > 0 && <BulletList items={bullets.map((b) => b.slice(2))} />}
        </Fragment>
      );
    })}
  </div>
);

export const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.7] text-muted-foreground">
        <span className="mt-[0.7em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
        <span>{renderInline(item)}</span>
      </li>
    ))}
  </ul>
);

/* ---------- Media ---------- */

const ratioOf = (src: string) => {
  const d = imgDims(src);
  return d.width && d.height ? d.width / d.height : 0;
};

const isWideMedia = (item: MediaItem) => item.wide || ratioOf(item.src) > 1.6;

/**
 * Images at natural ratio. Wide images span the row; runs of narrower images share a row —
 * an equal grid when they share a ratio, otherwise a top-aligned flex row so nothing is cropped.
 */
export const MediaGroup = ({ items }: { items: MediaItem[] }) => {
  const rows: MediaItem[][] = [];
  let buffer: MediaItem[] = [];
  const flush = () => { if (buffer.length) rows.push(buffer); buffer = []; };
  items.forEach((item) => {
    if (isWideMedia(item)) { flush(); rows.push([item]); }
    else { buffer.push(item); if (buffer.length === 3) flush(); }
  });
  flush();

  return (
    <div className="space-y-4 md:space-y-6">
      {rows.map((row, i) => {
        if (row.length === 1) return <CaseImage key={i} {...row[0]} />;
        const ratios = row.map((r) => ratioOf(r.src).toFixed(2));
        const sameRatio = ratios.every((r) => r === ratios[0]);
        return sameRatio ? (
          <div key={i} className={`grid gap-4 md:gap-6 ${row.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {row.map((img) => <CaseImage key={img.src} {...img} />)}
          </div>
        ) : (
          <div key={i} className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            {row.map((img) => <CaseImage key={img.src} {...img} className="min-w-0 md:flex-1" />)}
          </div>
        );
      })}
    </div>
  );
};

/** Looping silent video in a frame at its real aspect ratio, with poster. */
export const CaseVideo = ({ src, poster, width, height, label }: { src: string; poster: string; width: number; height: number; label: string }) => {
  const tall = height > width;
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-card ${tall ? "mx-auto w-full max-w-[360px]" : ""}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <video src={src} poster={poster} autoPlay muted loop playsInline preload="none" width={width} height={height} aria-label={label} className="block h-full w-full object-contain" />
    </div>
  );
};

export const CaseEmbed = ({ src, title }: { src: string; title: string }) => (
  <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card">
    <iframe src={src} title={title} className="h-full w-full border-0" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
  </div>
);

/* ---------- Structure ---------- */

const shell = "px-6 md:px-12 lg:px-24";

/** One story stage: label, optional heading, then repeated blocks. */
export const CaseSection = ({ label, title, children }: { label: string; title?: string; children: ReactNode }) => (
  <section className={`${shell} py-16 md:py-24`}>
    <div className="mx-auto max-w-5xl">
      <ScrollReveal>
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="mb-10 max-w-3xl text-3xl font-black tracking-tight text-foreground md:text-4xl">{title}</h2>}
      </ScrollReveal>
      <div className="space-y-16 md:space-y-20">{children}</div>
    </div>
  </section>
);

/**
 * Text with optional media. Narrow media sits beside the text on desktop (alternating sides via
 * `flip`); wide media spans below. On mobile media always follows its text.
 */
export const CaseBlock = ({
  title,
  children,
  media,
  flip,
}: {
  title?: string;
  children?: ReactNode;
  media?: ReactNode | MediaItem[];
  flip?: boolean;
}) => {
  const items = Array.isArray(media) ? (media as MediaItem[]) : null;
  const hasMedia = items ? items.length > 0 : !!media;
  const side = hasMedia && items ? items.length === 1 && !isWideMedia(items[0]) : false;
  const mediaNode = items ? <MediaGroup items={items} /> : media;
  const text = (
    <div className={side ? "min-w-0" : "max-w-3xl"}>
      {title && <h3 className="mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">{title}</h3>}
      {children}
    </div>
  );

  return (
    <ScrollReveal>
      {side ? (
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
          <div className={flip ? "md:order-2" : ""}>{text}</div>
          <div className={`min-w-0 ${flip ? "md:order-1" : ""}`}>{mediaNode}</div>
        </div>
      ) : (
        <div className="space-y-8">
          {(title || children) && text}
          {hasMedia && <div>{mediaNode}</div>}
        </div>
      )}
    </ScrollReveal>
  );
};

export const CardGrid = ({ items, columns = 3 }: { items: { title: string; desc: string; eyebrow?: string; image?: string }[]; columns?: 2 | 3 }) => (
  <div className={`grid items-start gap-4 md:gap-6 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
    {items.map((item) => (
      <div key={item.title} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
        {item.eyebrow && <span className="mb-2 font-mono-label text-primary">{item.eyebrow}</span>}
        <h4 className="mb-2 text-base font-bold text-foreground">{item.title}</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
        {item.image && <CaseImage src={item.image} alt={item.title} className="mt-6" />}
      </div>
    ))}
  </div>
);

export const StatGrid = ({ stats }: { stats: { value: string; label: string; eyebrow?: string; desc?: string }[] }) => (
  <div className={`grid gap-4 md:gap-6 ${stats.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
    {stats.map((stat, i) => (
      <div key={i} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-8">
        {stat.eyebrow && <span className="font-mono-label text-muted-foreground">{stat.eyebrow}</span>}
        <div className="mt-2 break-words text-4xl font-black tracking-tighter text-primary md:text-5xl">{stat.value}</div>
        <p className="mt-3 text-sm font-semibold text-foreground">{stat.label}</p>
        {stat.desc && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.desc}</p>}
      </div>
    ))}
  </div>
);

/* ---------- Hero ---------- */

export interface HeroMeta { label: string; value: ReactNode }

export const CaseHero = ({
  client,
  title,
  summary,
  meta,
  actions,
  media,
}: {
  client?: ReactNode;
  title: string;
  summary: string;
  meta: HeroMeta[];
  actions?: ReactNode;
  media?: ReactNode;
}) => (
  <section className={`${shell} pb-8 pt-8`}>
    <div className="mx-auto max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <Link to="/work" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">← Back to Work</Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6 }}>
        {client && <div className="mb-4 font-mono-label text-muted-foreground">{client}</div>}
        <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl">{title}</h1>
        <p className="mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">{summary}</p>
        <dl className="mb-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2 md:grid-cols-3">
          {meta.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="mb-2 font-mono-label text-xs text-muted-foreground">{m.label}</dt>
              <dd className="text-sm font-semibold text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>
        {actions && <div className="mb-8 flex flex-wrap gap-3">{actions}</div>}
      </motion.div>
      {media && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
          {media}
        </motion.div>
      )}
    </div>
  </section>
);

/** Tools strip shown in the hero meta row, at natural ratio with sideways scroll if needed. */
export const ToolsStrip = ({ src, alt = "Tools used" }: { src: string; alt?: string }) => {
  const d = imgDims(src);
  const strip = imageShape(d.width, d.height) === "strip";
  return (
    <div className={strip ? "overflow-x-auto" : ""}>
      <img src={src} alt={alt} className="no-lightbox block h-8 w-auto max-w-none brightness-0 dark:brightness-100" {...d} loading="lazy" decoding="async" />
    </div>
  );
};

/* ---------- Ending ---------- */

export const Reflection = ({ text }: { text: string }) => (
  <ScrollReveal>
    <div className="rounded-2xl border border-border bg-card p-6 md:p-10">
      <span className="mb-3 block font-mono-label text-primary">Reflection</span>
      <p className="max-w-3xl text-lg leading-[1.6] text-foreground md:text-xl">{text}</p>
    </div>
  </ScrollReveal>
);

export const NextProject = ({ currentId }: { currentId: string }) => {
  const next = getNextProject(currentId);
  if (!next) return null;
  return (
    <section className={`${shell} pb-16 md:pb-24`}>
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionLabel>Next Project</SectionLabel>
          <Link
            to={caseStudyPath(next.id)}
            className="group grid items-center gap-6 overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors md:grid-cols-[240px_1fr_auto] md:p-6 md:hover:border-primary/40"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img src={next.pillImage} alt="" className="no-lightbox h-full w-full object-cover" {...imgDims(next.pillImage)} loading="lazy" decoding="async" />
            </div>
            <div className="min-w-0">
              {next.client && <span className="mb-1 block font-mono-label text-xs text-muted-foreground">{next.client}</span>}
              <span className="block text-xl font-black tracking-tight text-foreground transition-colors md:text-2xl md:group-hover:text-primary">{next.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{next.subtitle}</span>
            </div>
            <ArrowRight size={28} className="hidden shrink-0 text-muted-foreground transition-colors md:block md:group-hover:text-primary" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};
