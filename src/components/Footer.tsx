import { useState } from "react";
import { Link } from "react-router-dom";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const alwaysVisibleLinks = [
  { label: "My Work", to: "/work" },
  { label: "Skill Set", to: "/skills" },
  { label: "About", to: "/about" },
];

const revealableLinks = [
  { label: "Web Design", to: "/web-design" },
  { label: "AI Integration", to: "/ai-integration" },
];

const Footer = () => {
  const [footerMenuVisibility, setFooterMenuVisibility] = useState("hidden");
  const showExtraLinks = footerMenuVisibility === "shown";

  return (
    <footer className="border-t border-border bg-background px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        <p className="text-sm text-muted-foreground">
          © 2026 Lacuna Digital — David Kelly
        </p>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <RadioGroup
            value={footerMenuVisibility}
            onValueChange={setFooterMenuVisibility}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="shown" id="footer-menu-shown" />
              <label
                htmlFor="footer-menu-shown"
                className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Show service links
              </label>
            </div>
          </RadioGroup>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
            {alwaysVisibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            {showExtraLinks &&
              revealableLinks.map((link) => (
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
      </div>
    </footer>
  );
};

export default Footer;
