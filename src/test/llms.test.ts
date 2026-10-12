import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildPortfolioLlms, buildServicesLlms } from "../../scripts/generate-llms";

describe("split AI discovery documents", () => {
  it("keeps the static portfolio document aligned with its generator", () => {
    expect(readFileSync("public/llms.txt", "utf8")).toBe(buildPortfolioLlms());
  });

  it("keeps the static services document aligned with its generator", () => {
    expect(readFileSync("public/llms-services.txt", "utf8")).toBe(buildServicesLlms());
  });

  it("excludes commercial content from portfolio discovery", () => {
    expect(buildPortfolioLlms()).not.toMatch(/€|\/services|\/service\/|product-studio|start-project|get-started|\/tools|\/refer|\/terms|lacunaconsulting|calendly|book a free call/i);
  });

  it("excludes commercial branding from portfolio discovery", () => {
    expect(buildPortfolioLlms()).not.toMatch(/Lacuna Digital/);
  });

  it("includes the Elsevier case study", () => {
    expect(buildPortfolioLlms()).toContain("MedEd Workspace (Elsevier)");
  });

  it("does not shadow the services route with a physical directory", () => {
    expect(existsSync("public/services")).toBe(false);
  });
});