import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-background px-6 py-12 md:px-12">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
      <p className="text-sm text-muted-foreground">
        © 2025 Lacuna Digital — David Kelly
      </p>
      <nav className="flex flex-wrap items-center justify-center gap-6">
        {[
          { label: "My Work", to: "/work" },
          { label: "Skill Set", to: "/skills" },
          { label: "About", to: "/about" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://www.linkedin.com/in/davidkelly89/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          LinkedIn ↗
        </a>
      </nav>
    </div>
  </footer>
);

export default Footer;
