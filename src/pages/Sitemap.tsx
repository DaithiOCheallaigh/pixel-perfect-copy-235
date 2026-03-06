import { Link } from "react-router-dom";
import { useEffect } from "react";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blogPosts";

const sectionClass = "mb-10";
const headingClass = "text-lg font-semibold text-foreground mb-3 border-b border-border pb-2";
const linkClass = "text-muted-foreground hover:text-primary transition-colors text-sm";

const corePages = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/skills", label: "Skills" },
  { path: "/blog", label: "Blog" },
  { path: "/web-design", label: "Web Design Services" },
  { path: "/ai-design-process", label: "AI Design Process" },
  { path: "/start-project", label: "Start a Project" },
];

const caseStudies = [
  { path: "/work/marsh-design-system", label: "Marsh Design System" },
  { path: "/work/marsh-internal-tooling", label: "Marsh Internal Tooling" },
];

const Sitemap = () => {
  useEffect(() => {
    document.title = "Sitemap — Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Full sitemap of Lacuna Digital — browse all pages, services, case studies, and blog posts.");
    return () => { document.title = "Lacuna Digital"; };
  }, []);

  const servicesByCategory = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Sitemap</h1>
        <p className="text-muted-foreground mb-12 text-sm">All pages on lacunadigital.io</p>

        <div className={sectionClass}>
          <h2 className={headingClass}>Pages</h2>
          <ul className="space-y-2">
            {corePages.map((p) => (
              <li key={p.path}><Link to={p.path} className={linkClass}>{p.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Case Studies</h2>
          <ul className="space-y-2">
            {caseStudies.map((p) => (
              <li key={p.path}><Link to={p.path} className={linkClass}>{p.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Services</h2>
          {Object.entries(servicesByCategory).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-foreground/70 mb-2">{category}</h3>
              <ul className="space-y-2 pl-3">
                {items.map((s) => (
                  <li key={s.id}><Link to={`/service/${s.id}`} className={linkClass}>{s.title}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={sectionClass}>
          <h2 className={headingClass}>Blog</h2>
          <ul className="space-y-2">
            {blogPosts.map((post) => (
              <li key={post.id}><Link to={`/blog/${post.id}`} className={linkClass}>{post.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Sitemap;
