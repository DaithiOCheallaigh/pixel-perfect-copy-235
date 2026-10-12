import { describe, expect, it } from "vitest";
import { orderVisibleProjects } from "@/pages/Work";
import { projects } from "@/data/projects";

describe("portfolio work ordering", () => {
  it("orders the visible catalogue for recruiters without changing its source order", () => {
    const originalIds = projects.map((project) => project.id);
    expect(orderVisibleProjects(projects).map((project) => project.id)).toEqual([
      "marsh-design-system", "marsh-internal-tooling", "spark", "ai-reviews",
      "digital-tipping", "whitelabel", "admin-dashboard", "tipdirect-app",
      "booking-app", "website-tipdirect", "spotify",
    ]);
    expect(projects.map((project) => project.id)).toEqual(originalIds);
  });

  it("excludes coming-soon projects", () => {
    expect(orderVisibleProjects([
      { id: "spark", comingSoon: true }, { id: "spotify" },
    ])).toEqual([{ id: "spotify" }]);
  });

  it("places unknown IDs after the specified work order", () => {
    expect(orderVisibleProjects([
      { id: "unknown-a" }, { id: "spotify" }, { id: "marsh-design-system" }, { id: "unknown-b" },
    ]).map((project) => project.id)).toEqual([
      "marsh-design-system", "spotify", "unknown-a", "unknown-b",
    ]);
  });
});