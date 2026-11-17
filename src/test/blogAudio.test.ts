import { describe, it, expect } from "vitest";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { blogPosts } from "@/data/blogPosts";

describe("blog audio narrations", () => {
  it("every post declares a narration that exists under public/audio/blog", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
    for (const post of blogPosts) {
      const audio = post.audio;
      expect(audio, `${post.id} has no audio entry`).toBeDefined();
      expect(audio!.src).toBe(`/audio/blog/${post.id}.mp3`);
      expect(audio!.durationSeconds).toBeGreaterThan(60);
      const file = join(process.cwd(), "public", audio!.src);
      expect(existsSync(file), `${file} is missing`).toBe(true);
      // Narrations are 128 kbps CBR mono MP3 (~16,000 bytes/s); the declared duration must match the file within 10%.
      const seconds = statSync(file).size / 16000;
      expect(Math.abs(seconds - audio!.durationSeconds) / audio!.durationSeconds).toBeLessThan(0.1);
    }
  });
});
