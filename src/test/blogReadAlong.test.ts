import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { blogPosts } from "@/data/blogPosts";
import { contentTokens, textTokens } from "@/components/blog/ReadAlongContent";
import { findActiveWord, flattenTimings, type WordTimingsJson } from "@/components/blog/useAudioPlayer";

describe("blog read-along word timings", () => {
  it("every narrated post has a words.json whose shape matches the rendered text", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
    for (const post of blogPosts) {
      const audio = post.audio;
      expect(audio?.wordTimings, `${post.id} has no wordTimings`).toBe(`/audio/blog/${post.id}.words.json`);
      const json = JSON.parse(readFileSync(join(process.cwd(), "public", audio!.wordTimings!), "utf8")) as WordTimingsJson;
      expect(json.version).toBe(1);
      expect(json.offsetSeconds).toBe(0);
      // One [start, end] per whitespace token, in the order ReadAlongContent numbers them.
      expect(json.title!.length, `${post.id} title`).toBe(textTokens(post.title).length);
      const blocks = contentTokens(post.content);
      expect(json.blocks!.length, `${post.id} block count`).toBe(blocks.length);
      blocks.forEach((tokens, bi) => expect(json.blocks![bi].length, `${post.id} block ${bi}`).toBe(tokens.length));
      // Timings are ordered, non-empty and inside the narration.
      const { words } = flattenTimings(json);
      expect(words.length).toBe(json.title!.length + blocks.reduce((n, b) => n + b.length, 0));
      let last = 0;
      for (const w of words) {
        expect(w.end).toBeGreaterThanOrEqual(w.start);
        expect(w.start).toBeGreaterThanOrEqual(last - 0.001);
        last = w.start;
      }
      expect(words[words.length - 1].end).toBeLessThanOrEqual(audio!.durationSeconds + 1);
      expect(findActiveWord(words, words[0].start)).toBe(words[0].key);
    }
  });
});
