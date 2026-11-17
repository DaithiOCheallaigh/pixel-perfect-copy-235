import { Fragment, cloneElement, createElement, isValidElement, memo, useMemo, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Read-along word highlighting for narrated posts.
 *
 * A post's `content` is a JSX fragment and each of its top-level children is one block (bi).
 * Inside a block every whitespace-separated token of the rendered text is one word (wi), counted
 * across inline elements (so `<strong>fluidity</strong>.` is a single word) and restarted at
 * block-level tags (p, li, h2, br …). React components (the interactive demos) and <pre> blocks are
 * returned untouched, so they keep their element identity and never re-render for a word change.
 *
 * public/audio/blog/<id>.words.json stores [start, end] seconds per word in that same order:
 * { version, offsetSeconds, title: [[s, e]…], blocks: [[[s, e]…]…] } with blocks[bi][wi].
 * One walk produces both the spans (ReadAlongContent / ReadAlongText) and the token lists the
 * test compares with the JSON (contentTokens / textTokens), so the two cannot drift apart.
 */

const SKIP_TAGS = new Set(["pre", "img", "svg", "video", "audio", "iframe", "canvas", "script", "style", "noscript"]);
const BREAK_TAGS = new Set([
  "p", "div", "li", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "figure", "figcaption", "br", "hr",
  "table", "thead", "tbody", "tr", "td", "th", "section", "article", "aside", "header", "footer", "nav", "dl", "dt", "dd",
]);

export const WORD_CLASS =
  "rounded-[0.3em] box-decoration-clone px-[0.1em] -mx-[0.1em] transition-colors duration-200 motion-reduce:transition-none";
export const ACTIVE_WORD_CLASS = "bg-primary/30 text-foreground";

interface Walk {
  word: number;
  afterSpace: boolean;
  seq: number;
  tokens: string[] | null;
}

const flat = (node: ReactNode): ReactNode[] => (Array.isArray(node) ? node.flatMap(flat) : [node]);

function wrapText(text: string, st: Walk, blockKey: string, active: number | null): ReactNode[] {
  const out: ReactNode[] = [];
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      out.push(part);
      st.afterSpace = true;
      continue;
    }
    if (st.afterSpace) {
      st.word += 1;
      st.tokens?.push(part);
    } else if (st.tokens) {
      st.tokens[st.tokens.length - 1] += part;
    }
    st.afterSpace = false;
    const w = st.word;
    out.push(
      createElement(
        "span",
        { key: `w${st.seq++}`, "data-word-key": `${blockKey}:${w}`, className: cn(WORD_CLASS, active === w && ACTIVE_WORD_CLASS) },
        part,
      ),
    );
  }
  return out;
}

function wrapNode(node: ReactNode, st: Walk, blockKey: string, active: number | null): ReactNode {
  if (node == null || typeof node === "boolean") return node;
  if (typeof node === "string" || typeof node === "number") return wrapText(String(node), st, blockKey, active);
  if (Array.isArray(node)) return node.map((child) => wrapNode(child, st, blockKey, active));
  if (!isValidElement(node)) return node;
  const el = node as ReactElement<{ children?: ReactNode }>;
  if (el.type === Fragment) return cloneElement(el, undefined, ...flat(wrapNode(el.props.children, st, blockKey, active)));
  if (typeof el.type !== "string" || SKIP_TAGS.has(el.type)) {
    st.afterSpace = true;
    return el;
  }
  const breaks = BREAK_TAGS.has(el.type);
  if (breaks) st.afterSpace = true;
  if (el.props.children == null) return el;
  const kids = wrapNode(el.props.children, st, blockKey, active);
  if (breaks) st.afterSpace = true;
  return cloneElement(el, undefined, ...flat(kids));
}

const newWalk = (collect: boolean): Walk => ({ word: -1, afterSpace: true, seq: 0, tokens: collect ? [] : null });

/** Top-level children of a post's content fragment, one per read-along block. */
export function contentBlocks(content: ReactNode): ReactNode[] {
  const inner = isValidElement(content) && content.type === Fragment ? (content as ReactElement<{ children?: ReactNode }>).props.children : content;
  return (Array.isArray(inner) ? inner : [inner]).filter((n) => n != null && typeof n !== "boolean");
}

/** Whitespace tokens of one block, in the order ReadAlongContent numbers them. */
export function blockTokens(node: ReactNode): string[] {
  const st = newWalk(true);
  wrapNode(node, st, "x", null);
  return st.tokens ?? [];
}

export const textTokens = (text: string): string[] => blockTokens(text);
export const contentTokens = (content: ReactNode): string[][] => contentBlocks(content).map(blockTokens);

/** Splits an active word key such as "b:12:7" or "t:3" into its block key and word index. */
export function parseActiveWord(activeWord: string | null): { blockKey: string; index: number } | null {
  if (!activeWord) return null;
  const cut = activeWord.lastIndexOf(":");
  return cut < 0 ? null : { blockKey: activeWord.slice(0, cut), index: Number(activeWord.slice(cut + 1)) };
}

const Block = memo(function Block({ node, blockKey, active }: { node: ReactNode; blockKey: string; active: number | null }) {
  return <>{wrapNode(node, newWalk(false), blockKey, active)}</>;
});

/** Plain text (the post title) rendered as read-along words under `blockKey`. */
export const ReadAlongText = memo(function ReadAlongText({ text, blockKey, activeIndex }: { text: string; blockKey: string; activeIndex: number | null }) {
  return <>{wrapText(text, newWalk(false), blockKey, activeIndex)}</>;
});

/** A post's content fragment with every word wrapped; only the block gaining or losing the active word re-renders. */
export function ReadAlongContent({ content, activeWord }: { content: ReactNode; activeWord: string | null }) {
  const blocks = useMemo(() => contentBlocks(content), [content]);
  const active = parseActiveWord(activeWord);
  return (
    <>
      {blocks.map((node, bi) => {
        const blockKey = `b:${bi}`;
        return <Block key={bi} node={node} blockKey={blockKey} active={active?.blockKey === blockKey ? active.index : null} />;
      })}
    </>
  );
}
