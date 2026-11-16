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

import { governorStep, initialGovernorState, governorResetLast, type GovernorState } from "@/lib/webgl-capability";
const run = (s: GovernorState, frames: [number, boolean, boolean?][]) =>
  frames.reduce((st, [t, c, h]) => governorStep(st, { t, hasCanvas: c, hidden: !!h }), s);

describe("governorStep", () => {
  it("stops without degrading when no canvas appears for 15 s", () => {
    const s = run(initialGovernorState(), [[0, false], [5000, false], [9000, false], [15000, false]]);
    expect(s.phase).toBe("done");
    expect(s.degraded).toBe(false);
  });
  it("ignores slow gaps while waiting and during warm-up", () => {
    const s = run(initialGovernorState(), [[0, false], [600, false], [1200, true], [1700, true], [2300, true], [2900, true]]);
    expect(s.phase).toBe("measure");
    expect(s.gaps).toEqual([]);
  });
  it("degrades on three slow gaps while measuring", () => {
    let s = run(initialGovernorState(), [[0, true], [1, true], [2, true], [3, true]]);
    s = run(s, [[100, true], [300, true], [500, true], [700, true]]);
    expect(s.degraded).toBe(true);
  });
  it("finishes healthy after 3 s of fast frames", () => {
    let s = run(initialGovernorState(), [[0, true], [1, true], [2, true], [3, true]]);
    for (let t = 100; t <= 3200; t += 16) s = governorStep(s, { t, hasCanvas: true, hidden: false });
    expect(s.phase).toBe("done");
    expect(s.degraded).toBe(false);
  });
  it("does not count the gap across a hidden tab", () => {
    let s = run(initialGovernorState(), [[0, true], [1, true], [2, true], [3, true], [100, true]]);
    s = governorResetLast(s);
    s = run(s, [[2000, true], [2016, true]]);
    expect(s.gaps).toEqual([16]);
  });
});
