import { describe, expect, it } from "vitest";
import { fitDescription } from "@/lib/seoDescription";

describe("fitDescription", () => {
  it("never exceeds 160 characters", () => {
    expect(fitDescription("word ".repeat(80)).length).toBeLessThanOrEqual(160);
  });
  it("keeps short text unchanged", () => {
    expect(fitDescription("Short text.", "More.")).toBe("Short text. More.");
  });
});
