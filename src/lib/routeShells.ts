// Pure string transform used at build time by the route-shells Vite plugin (no DOM).
import { CONTACT_EMAIL } from "@/data/pricing";
import type { RouteMeta } from "@/data/routeMeta";

export const SITE_URL = "https://www.lacunadigital.io";

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#dave-kelly`,
  name: "Dave Kelly",
  alternateName: "David Kelly",
  jobTitle: "Senior Product Designer",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/dave-kelly.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
  sameAs: ["https://www.linkedin.com/in/davidkelly89/"],
};

export const servicesBusinessLd = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/services#business`,
  name: "Lacuna Digital",
  url: `${SITE_URL}/services`,
  logo: `${SITE_URL}/favicon.png`,
  email: CONTACT_EMAIL,
  address: { "@type": "PostalAddress", addressRegion: "North County Dublin", addressCountry: "IE" },
  areaServed: { "@type": "Country", name: "Ireland" },
  founder: { "@id": `${SITE_URL}/#dave-kelly` },
};

export function renderShell(indexHtml: string, pathname: string, meta: RouteMeta): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const url = `${SITE_URL}${path}`;
  const title = `${meta.title} | Lacuna Digital`;
  const image = meta.image ?? `${SITE_URL}/og-default.png`;
  const graph = { "@context": "https://schema.org", "@graph": [PERSON, servicesBusinessLd, ...(meta.jsonLd ? [meta.jsonLd] : [])] };

  let html = indexHtml
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/[ \t]*<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>\s*\n?/gi, "")
    .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\s*\n?/gi, "")
    .replace(/[ \t]*<!--\s*Open Graph[\s\S]*?-->\s*\n?/i, "")
    .replace(/[ \t]*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*\n?/gi, "");

  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="index,follow" />`,
    `<link rel="canonical" href="${esc(url)}" data-shell="true" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Lacuna Digital" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<script type="application/ld+json" data-shell="true">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`,
  ].map((l) => `    ${l}`).join("\n");

  html = html.replace(/<\/head>/i, `${head}\n  </head>`);
  return html;
}
