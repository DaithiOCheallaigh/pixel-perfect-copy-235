export type RouteDef = {
  id: string;            // unique; App.tsx maps it to an element
  path?: string;
  index?: boolean;
  redirectTo?: string;   // when set, App.tsx renders <LegacyRedirect to={redirectTo} />
  children?: RouteDef[];
};

// Every redirectTo entry is PERMANENT. Printed QR codes, CRM emails and the dave-chat bot use the old paths. Never remove them.
export const routeTable: RouteDef[] = [
  // Client-private pages: no chrome, URLs and components unchanged
  { id: "proposal-tpi", path: "/proposal/tpi" },
  { id: "proposal-elsevier", path: "/proposal/elsevier" },
  { id: "proposal-unknown", path: "/proposal/*" },
  { id: "showcases-index", path: "/showcases" },
  { id: "showcase-root", path: "/showcase" },
  { id: "showcase-admin", path: "/showcase/admin" },
  { id: "showcase-page", path: "/showcase/:slug" },
  { id: "showcase-unknown", path: "/showcase/:slug/*" },
  { id: "bio-page", path: "/bio/:slug" },
  { id: "bio-unknown", path: "/bio/*" },

  // SERVICES: Lacuna Digital
  { id: "services-layout", path: "/services", children: [
    { id: "services-home", index: true },
    { id: "product-studio", path: "product-studio" },
    { id: "web-design", path: "web-design" },
    { id: "start-project", path: "start-project" },
    { id: "get-started", path: "get-started" },
    { id: "terms", path: "terms" },
    { id: "refer", path: "refer" },
    { id: "tools-index", path: "tools" },
    { id: "tool-link-in-bio", path: "tools/link-in-bio" },
    { id: "tool-review-link", path: "tools/review-link" },
    { id: "tool-caption-generator", path: "tools/caption-generator" },
    { id: "tools-unknown", path: "tools/*", redirectTo: "/services/tools" },
    { id: "service-detail", path: "expertise/:id" },
    { id: "segment", path: ":slug" },
    { id: "services-not-found", path: "*" },
  ]},

  // LEGACY -> SERVICES (permanent). Each points straight at its final URL.
  { id: "legacy-product-studio", path: "/product-studio", redirectTo: "/services/product-studio" },
  { id: "legacy-ai-integration", path: "/ai-integration", redirectTo: "/services/product-studio" },
  { id: "legacy-web-design", path: "/web-design", redirectTo: "/services/web-design" },
  { id: "legacy-start-project", path: "/start-project", redirectTo: "/services/start-project" },
  { id: "legacy-get-started", path: "/get-started", redirectTo: "/services/get-started" },
  { id: "legacy-terms", path: "/terms", redirectTo: "/services/terms" },
  { id: "legacy-refer", path: "/refer", redirectTo: "/services/refer" },
  { id: "legacy-tools", path: "/tools", redirectTo: "/services/tools" },
  { id: "legacy-tools-splat", path: "/tools/*", redirectTo: "/services/tools/*" },
  { id: "legacy-service-detail", path: "/service/:id", redirectTo: "/services/expertise/:id" },
  { id: "legacy-service", path: "/service", redirectTo: "/services" },
  { id: "legacy-contact", path: "/contact", redirectTo: "/about#contact" },


  // PORTFOLIO: Dave Kelly
  { id: "portfolio-layout", children: [
    { id: "home", path: "/" },
    { id: "work", path: "/work" },
    { id: "spark-work", path: "/work/spark" },
    { id: "spark-case", path: "/case/spark" },
    { id: "case-study", path: "/case/:id" },
    { id: "marsh-internal-tooling", path: "/work/marsh-internal-tooling" },
    { id: "marsh-design-system", path: "/work/marsh-design-system" },
    { id: "playground", path: "/playground" },
    { id: "about", path: "/about" },
    { id: "skills", path: "/skills" },
    { id: "blog", path: "/blog" },
    { id: "blog-post", path: "/blog/:id" },
    { id: "ai-design-process", path: "/ai-design-process" },
    { id: "sitemap", path: "/sitemap" },
    { id: "not-found", path: "*" },
  ]},
];
