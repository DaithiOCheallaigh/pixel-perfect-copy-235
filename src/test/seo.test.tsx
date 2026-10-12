import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { SEO } from "@/components/SEO";

function headFor(pathname: string, props: React.ComponentProps<typeof SEO>) {
  const context: { helmet?: HelmetServerState } = {};
  const previous = HelmetProvider.canUseDOM;
  HelmetProvider.canUseDOM = false;
  try {
    renderToString(<HelmetProvider context={context}><MemoryRouter initialEntries={[pathname]}><SEO {...props} /></MemoryRouter></HelmetProvider>);
    return context.helmet;
  } finally {
    HelmetProvider.canUseDOM = previous;
  }
}

describe("section-aware SEO rules", () => {
  it.each(["/services", "/services/kitchens-joinery"])("uses services identity and schema at %s", (path) => {
    const head = headFor(path, { title: "Services", description: "Test" });
    expect(head?.title.toString()).toContain("Services | Lacuna Digital");
    expect(head?.script.toString()).toContain('"@type":"ProfessionalService"');
    expect(head?.meta.toString()).toContain("https://www.lacunadigital.io/og-default.png");
  });

  it("does not classify a similarly prefixed portfolio path as services", () => {
    const head = headFor("/services-other", { title: "Home", description: "Test" });
    expect(head?.title.toString()).toContain("Dave Kelly — Senior Product Designer");
    expect(head?.script.toString()).not.toContain("ProfessionalService");
    expect(head?.meta.toString()).toContain("https://www.lacunadigital.io/og-portfolio.png");
  });

  it("defaults canonical URLs to the current pathname", () => {
    expect(headFor("/work/marsh-design-system", { title: "Case Study", description: "Test" })?.link.toString()).toContain("https://www.lacunadigital.io/work/marsh-design-system");
  });

  it("respects an explicitly provided canonical path", () => {
    expect(headFor("/case/spark", { title: "Case Study", description: "Test", url: "/work/spark" })?.link.toString()).toContain("https://www.lacunadigital.io/work/spark");
  });

  it("keeps caller-provided structured data instead of adding fallback business data", () => {
    const head = headFor("/services", { title: "Services", description: "Test", jsonLd: { "@type": "Article" } });
    expect(head?.script.toString()).toContain('"@type":"Article"');
    expect(head?.script.toString()).not.toContain("ProfessionalService");
  });

  it("marks private pages noindex and leaves public pages without a robots override", () => {
    expect(headFor("/nope", { title: "Page not found", description: "Test", noindex: true })?.meta.toString()).toContain('content="noindex,nofollow"');
    expect(headFor("/work", { title: "Work", description: "Test" })?.meta.toString()).not.toContain('name="robots"');
  });
});