import { Link } from "react-router-dom";
import { CV_URL, LINKEDIN_URL, PORTFOLIO_EMAIL } from "@/data/profile";

const Footer = () => (
  <footer className="border-t border-border bg-background px-6 py-12 md:px-12">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
      <p className="shrink-0 text-sm text-muted-foreground">© 2026 Dave Kelly</p>
      <nav className="flex flex-wrap items-center justify-center gap-6">
        {[
          { label: "Work", to: "/work" },
          { label: "Skills", to: "/skills" },
          { label: "About", to: "/about" },
          { label: "Blog", to: "/blog" },
        ].map((link) => (
          <Link key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors md:hover:text-primary">{link.label}</Link>
        ))}
        <a href={`mailto:${PORTFOLIO_EMAIL}`} className="text-sm text-muted-foreground md:hover:text-primary">{PORTFOLIO_EMAIL}</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground md:hover:text-primary">LinkedIn ↗</a>
        <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground md:hover:text-primary">Download CV ↓</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
