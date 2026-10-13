import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const xml = readFileSync("public/sitemap.xml", "utf8");
const sitemap = new DOMParser().parseFromString(xml, "application/xml");
const entries = Array.from(sitemap.getElementsByTagName("url"));
const paths = entries.map(entry => new URL(entry.getElementsByTagName("loc")[0].textContent ?? "").pathname);
const idsIn = (file: string) => Array.from(readFileSync(file, "utf8").matchAll(/^    id: "([^"]+)"/gm), match => match[1]);

describe("public sitemap boundaries", () => {
  it("includes exactly one expertise URL per service ID", () => {
    expect(paths.filter(path => path.startsWith("/services/expertise/")).sort()).toEqual(
      idsIn("src/data/services.ts").map(id => `/services/expertise/${id}`).sort(),
    );
  });

  it("includes only current portfolio blog posts", () => {
    expect(paths.filter(path => path.startsWith("/blog/")).sort()).toEqual(
      idsIn("src/data/blogPosts.tsx").map(id => `/blog/${id}`).sort(),
    );
  });

  it("caps all services priorities at 0.6", () => {
    const services = entries.filter(entry => entry.getElementsByTagName("loc")[0].textContent?.includes("/services"));
    expect(services.length).toBe(39);
    for (const entry of services) {
      expect(Number(entry.getElementsByTagName("priority")[0].textContent)).toBeLessThanOrEqual(0.6);
    }
  });

  it("excludes archived free tools and retired industry pages", () => {
    for (const path of paths) expect(path).not.toMatch(/^\/services\/(tools|trades-home|restaurants-cafes)(\/|$)/);
  });

  it("excludes private, gated, coming-soon and legacy URLs", () => {
    for (const path of paths) {
      expect(path).not.toMatch(/^\/(showcases?|bio|proposal|service)(\/|$)|^\/work\/spark$|^\/case\/ticketing$|^\/(product-studio|web-design|tools|refer|terms|get-started|start-project)$/);
    }
  });

  it("omits uniform lastmod dates", () => {
    expect(entries.length).toBe(63);
    for (const entry of entries) {
      expect(entry.getElementsByTagName("lastmod")).toHaveLength(0);
    }
  });

  it("lists portfolio URLs before services URLs", () => {
    const firstService = paths.indexOf("/services");
    expect(firstService).toBe(24);
    expect(paths.slice(firstService).every(path => path.startsWith("/services"))).toBe(true);
  });

  it("uses one crawler group with the admin exclusion", () => {
    const robots = readFileSync("public/robots.txt", "utf8");
    expect(robots.match(/^User-agent:/gm)).toHaveLength(1);
    expect(robots).toContain("User-agent: *\nAllow: /\nDisallow: /showcase/admin");
  });
});