import { Link } from "react-router-dom";
import { CONTACT_EMAIL, CALENDLY_URL } from "@/data/pricing";

const ServicesFooter = () => (
  <footer className="border-t border-border bg-background px-6 py-12 md:px-12">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
      <p className="text-sm text-muted-foreground">
        © 2026 Lacuna Digital — David Kelly
      </p>
      <nav className="flex flex-wrap items-center justify-center gap-6">
        <Link to="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">
          Services
        </Link>
        <Link to="/web-design" className="text-sm text-muted-foreground transition-colors hover:text-primary">
          Web Design
        </Link>
        <Link to="/product-studio" className="text-sm text-muted-foreground transition-colors hover:text-primary">
          Product Studio
        </Link>
        <Link to="/terms" className="text-sm text-muted-foreground md:hover:text-primary">Terms</Link>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-muted-foreground md:hover:text-primary">{CONTACT_EMAIL}</a>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground md:hover:text-primary">Book a free call ↗</a>
        <a
          href="https://www.lacunadigital.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Learn more about Dave ↗
        </a>
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

export default ServicesFooter;
