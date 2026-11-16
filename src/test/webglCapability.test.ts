import { describe, it, expect } from "vitest";
import { isSoftwareRenderer, shouldDegrade, canRunWebGLHero } from "@/lib/webgl-capability";

describe("isSoftwareRenderer", () => {
  it("flags software renderers", () => {
    for (const n of [
      "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)",
      "llvmpipe (LLVM 15.0.7, 256 bits)",
      "softpipe",
      "Mesa OffScreen",
      "Microsoft Basic Render Driver",
    ]) expect(isSoftwareRenderer(n)).toBe(true);
  });
  it("passes real GPUs", () => {
    expect(isSoftwareRenderer("ANGLE (Apple, Apple M2, OpenGL 4.1)")).toBe(false);
    expect(isSoftwareRenderer("ANGLE (NVIDIA GeForce RTX 3070 Direct3D11)")).toBe(false);
  });
});

describe("shouldDegrade", () => {
  it("degrades after three gaps over 150 ms", () => {
    expect(shouldDegrade([16, 200, 16, 151, 300])).toBe(true);
  });
  it("keeps running with two slow gaps or exactly 150 ms", () => {
    expect(shouldDegrade([200, 16, 400])).toBe(false);
    expect(shouldDegrade([150, 150, 150])).toBe(false);
    expect(shouldDegrade([])).toBe(false);
  });
});

describe("canRunWebGLHero", () => {
  it("returns false in jsdom (no WebGL context)", () => {
    expect(canRunWebGLHero()).toBe(false);
  });
});
