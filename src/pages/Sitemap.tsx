import { Link } from "react-router-dom";
import { PortfolioSEO as SEO } from "@/components/PortfolioSEO";
import { blogPosts } from "@/data/blogPosts";
import { projects } from "@/data/projects";

const sectionClass = "mb-10";
const headingClass = "text-lg font-semibold text-foreground mb-3 border-b border-border pb-2";
const linkClass = "text-muted-foreground hover:text-primary transition-colors text-sm";

const corePages = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/skills", label: "Skills" },
  { path: "/blog", label: "Blog" },
  { path: "/ai-design-process", label: "AI Design Process" },
  { path: "/sitemap", label: "Sitemap" },
];

// Marsh pages have dedicated routes, others use /case/:id
const dedicatedRoutes: Record<string, string> = {
  "spark": "/work/spark",
  "marsh-design-system": "/work/marsh-design-system",
  "marsh-internal-tooling": "/work/marsh-internal-tooling",
};

const Sitemap = () => {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <SEO title="Sitemap" description="All pages on Dave Kelly's portfolio: case studies, process and writing." url="/sitemap" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Sitemap</h1>
        <p className="text-muted-foreground mb-12 text-sm">All pages on Dave Kelly's portfolio</p>

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
            {projects.filter((project) => !project.comingSoon).map((p) => {
              const path = dedicatedRoutes[p.id] || `/case/${p.id}`;
              return (
                <li key={p.id}><Link to={path} className={linkClass}>{p.title}</Link></li>
              );
            })}
          </ul>
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
