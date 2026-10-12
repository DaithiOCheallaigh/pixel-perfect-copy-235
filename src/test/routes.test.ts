import { describe, expect, it } from "vitest";
import { matchRoutes, type RouteObject } from "react-router-dom";
import { routeTable, type RouteDef } from "@/routing/routeTable";
import { resolveLegacyTarget } from "@/routing/resolveLegacyTarget";

const routes = routeTable as unknown as RouteObject[];

function leaf(url: string) {
  const u = new URL(url, "http://x");
  const matches = matchRoutes(routes, u.pathname) ?? [];
  const last = matches[matches.length - 1];
  const route = last?.route as unknown as RouteDef;
  return { id: route?.id, route, params: last?.params ?? {}, search: u.search, hash: u.hash, count: matches.length };
}
function follow(url: string) {
  const l = leaf(url);
  if (!l.route?.redirectTo) throw new Error(`${url} is not a redirect`);
  return resolveLegacyTarget(l.route.redirectTo, l.params, l.search, l.hash);
}

const redirects: [string, string][] = [
  ["/product-studio", "/services/product-studio"],
  ["/ai-integration", "/services/product-studio"],
  ["/web-design#pricing", "/services/web-design#pricing"],
  ["/start-project?utm_source=qr", "/services/start-project?utm_source=qr"],
  ["/get-started", "/services/get-started"],
  ["/terms", "/services/terms"],
  ["/refer?ref=abc", "/services/refer?ref=abc"],
  ["/tools", "/services/tools"],
  ["/tools/review-link", "/services/tools/review-link"],
  ["/tools/caption-generator/", "/services/tools/caption-generator"],
  ["/service/user-experience-design", "/services/expertise/user-experience-design"],
  ["/service", "/services"],
  ["/contact", "/about#contact"],
  ["/services/tools/nope", "/services/tools"],
];

describe("route table", () => {
  it.each(redirects)("redirects %s to %s", (from, to) => {
    expect(follow(from)).toBe(to);
  });
  it.each(redirects.filter(([from]) => from !== "/services/tools/nope"))("%s lands without a chain", (_from, to) => {
    expect(leaf(to).route?.redirectTo).toBeUndefined();
  });
  it.each(["product-studio", "web-design", "start-project", "get-started", "terms", "refer"])("/services/%s matches its own page", (id) => {
    expect(leaf(`/services/${id}`).id).toBe(id);
  });
  it("matches the tools pages and service details", () => {
    expect(leaf("/services/tools").id).toBe("tools-index");
    expect(leaf("/services/tools/link-in-bio").id).toBe("tool-link-in-bio");
    expect(leaf("/services/expertise/x").id).toBe("service-detail");
  });
  it("matches segments and services not-found", () => {
    expect(leaf("/services/kitchens-joinery").id).toBe("segment");
    expect(leaf("/services/a/b").id).toBe("services-not-found");
  });
  it.each([
    ["/bio/abc", "bio-page"], ["/bio", "bio-unknown"], ["/bio/a/b", "bio-unknown"],
    ["/proposal/tpi", "proposal-tpi"], ["/proposal/elsevier", "proposal-elsevier"], ["/proposal/x", "proposal-unknown"],
    ["/showcases", "showcases-index"], ["/showcase", "showcase-root"], ["/showcase/admin", "showcase-admin"],
    ["/showcase/dc-woodworks", "showcase-page"], ["/showcase/a/b", "showcase-unknown"],
  ])("keeps client page %s top-level as %s", (url, id) => {
    const l = leaf(url);
    expect(l.id).toBe(id);
    expect(l.count).toBe(1);
  });
  it.each([
    ["/work/spark", "spark-work"], ["/case/spark", "spark-case"], ["/case/ai-reviews", "case-study"],
    ["/", "home"], ["/nope", "not-found"],
  ])("matches portfolio %s as %s", (url, id) => {
    expect(leaf(url).id).toBe(id);
  });
});
