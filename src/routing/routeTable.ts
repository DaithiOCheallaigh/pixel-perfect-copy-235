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

  // BLOG: Lacuna Digital writing, served with the services chrome at its original URLs
  { id: "blog-layout", children: [
    { id: "blog", path: "/blog" },
    { id: "blog-post", path: "/blog/:id" },
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

  // LEGACY WORDPRESS URLS (pre-2026 site; Google still has them indexed) -> current pages. Permanent, never remove.
  { id: "wp-blog-strategic-ux", path: "/2025/10/22/strategic-ux-design-business-growth", redirectTo: "/blog/strategic-ux" },
  { id: "wp-blog-more-than-good-design", path: "/2025/10/22/why-your-digital-product-needs-more-than-just-good-design", redirectTo: "/blog/strategic-ux" },
  { id: "wp-service-component-library", path: "/service-component-library", redirectTo: "/services/expertise/component-libraries" },
  { id: "wp-service-local-seo", path: "/service-local-seo", redirectTo: "/services/expertise/local-seo" },
  { id: "wp-service-webflow-shopify", path: "/service-webflow-shopify", redirectTo: "/services/expertise/shopify" },
  { id: "wp-social-media-management", path: "/social-media-management-dublin", redirectTo: "/services/expertise/social-media-management" },
  { id: "wp-ui-prototypes", path: "/ui-prototypes-dublin", redirectTo: "/services/expertise/prototypes" },
  { id: "wp-cms-management", path: "/content-management-system-management", redirectTo: "/services/expertise/cms-content-platforms" },
  { id: "wp-digital-tipping", path: "/digital-tipping", redirectTo: "/case/digital-tipping" },
  { id: "wp-website-tipdirect", path: "/website-tipdirect", redirectTo: "/case/website-tipdirect" },
  { id: "wp-about-2", path: "/about-2", redirectTo: "/about" },
  { id: "wp-process", path: "/process", redirectTo: "/services" },
  { id: "wp-privacy", path: "/privacy", redirectTo: "/services/terms" },

  // PORTFOLIO: Dave Kelly
  { id: "portfolio-layout", children: [
    { id: "home", path: "/" },
    { id: "work", path: "/work" },
    { id: "spark-work", path: "/work/spark" },
    { id: "spark-components", path: "/work/spark/components" },
    { id: "spark-component", path: "/work/spark/components/:slug" },
    { id: "spark-case", path: "/case/spark" },
    { id: "case-study", path: "/case/:id" },
    { id: "marsh-internal-tooling", path: "/work/marsh-internal-tooling" },
    { id: "marsh-design-system", path: "/work/marsh-design-system" },
    { id: "about", path: "/about" },
    { id: "skills", path: "/skills" },
    { id: "ai-design-process", path: "/ai-design-process" },
    { id: "sitemap", path: "/sitemap" },
    { id: "not-found", path: "*" },
  ]},
];
