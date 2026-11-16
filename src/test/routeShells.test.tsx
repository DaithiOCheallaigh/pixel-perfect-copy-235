import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { hubMeta, servicesRouteMeta } from "@/data/routeMeta";
import { renderShell } from "@/lib/routeShells";

const sitemap = fs.readFileSync(path.resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sitemapServices = [...sitemap.matchAll(/<loc>https:\/\/www\.lacunadigital\.io(\/services[^<]*)<\/loc>/g)].map((m) => m[1]).sort();

const fixture = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dave Kelly — Senior Product Designer</title>
    <meta name="description" content="Portfolio." />
    <!-- Open Graph (static baseline) -->
    <meta property="og:title" content="Dave Kelly — Senior Product Designer" />
    <meta property="og:image" content="https://www.lacunadigital.io/og-portfolio.png" />
    <meta name="twitter:image" content="https://www.lacunadigital.io/og-portfolio.png" />
    <script type="application/ld+json">{"@graph":[{"@type":"Person"}]}</script>
    <script type="module" crossorigin src="/assets/index-abc.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-abc.css">
</head>
  <body><div id="root"></div></body>
</html>`;

describe("services route shells", () => {
  it("covers exactly the /services URLs in the sitemap", () => {
    expect(sitemapServices.length).toBe(38);
    expect(Object.keys(servicesRouteMeta).sort()).toEqual(sitemapServices);
  });

  it("renders a services-branded head and keeps the bootstrap", () => {
    const html = renderShell(fixture, "/services/web-design", servicesRouteMeta["/services/web-design"]);
    const count = (re: RegExp) => (html.match(re) ?? []).length;
    expect(count(/<title>/g)).toBe(1);
    expect(count(/<meta name="description"/g)).toBe(1);
    expect(count(/rel="canonical"/g)).toBe(1);
    expect(html).toContain('<title>Business Website Design in Dublin | Lacuna Digital</title>');
    expect(html).toContain('<meta property="og:url" content="https://www.lacunadigital.io/services/web-design" />');
    expect(html).toContain('href="https://www.lacunadigital.io/services/web-design" data-shell="true"');
    expect(html).not.toContain("Dave Kelly — Senior Product Designer");
    expect(html).not.toContain("og-portfolio.png");
    expect(html).toContain('"@type":"ProfessionalService"');
    expect(html).toContain('<script type="module" crossorigin src="/assets/index-abc.js"></script>');
    expect(html).toContain('href="/assets/index-abc.css"');
    expect(html).toContain('<div id="root"></div>');
    expect(html).toContain('name="viewport"');
  });
});

describe("hub page Helmet titles match routeMeta", () => {
  it.each(Object.values(hubMeta).map((m) => [m.title, m]))("%s", (_t, meta) => {
    const context: { helmet?: HelmetServerState } = {};
    const prev = HelmetProvider.canUseDOM;
    HelmetProvider.canUseDOM = false;
    try {
      renderToString(<HelmetProvider context={context}><MemoryRouter initialEntries={["/services"]}><SEO {...meta} /></MemoryRouter></HelmetProvider>);
    } finally { HelmetProvider.canUseDOM = prev; }
    expect(context.helmet?.title.toString()).toContain(`${meta.title} | Lacuna Digital`);
  });
});
