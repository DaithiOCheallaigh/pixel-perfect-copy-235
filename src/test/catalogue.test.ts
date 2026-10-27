import { describe, it, expect } from "vitest";
import { projects } from "@/data/projects";
import { getNextProject } from "@/data/caseStudies";

const listed = projects.filter((p) => p.listed !== false && !p.comingSoon).map((p) => p.id);

describe("portfolio catalogue", () => {
  it("lists /work projects in the agreed order", () => {
    expect(listed).toEqual(["spark", "marsh-internal-tooling", "marsh-design-system", "ai-reviews", "digital-tipping", "admin-dashboard", "tipdirect-app", "whitelabel"]);
  });

  it("keeps unlisted case studies in the catalogue so their routes work", () => {
    expect(projects.find((p) => p.id === "spotify")?.listed).toBe(false);
    expect(projects.find((p) => p.id === "website-tipdirect")?.listed).toBe(false);
    for (const id of ["booking-app", "spotify", "website-tipdirect", "ticketing"]) expect(projects.find((p) => p.id === id)?.listed).toBe(false);
  });

  it("never points next-project links at unlisted projects", () => {
    for (const id of listed) expect(listed).toContain(getNextProject(id)?.id);
  });

  it("drops the unsupported 45% review claim", () => {
    expect(JSON.stringify(projects)).not.toContain("45%");
  });
});
