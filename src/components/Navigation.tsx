import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { ShineBorder } from "./ui/shine-border";
import avatarImg from "@/assets/avatar.jpeg";

const Navigation = ({ visible }: { visible: boolean }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "My Work", to: "/work" },
    { label: "Skill Set", to: "/skills" },
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[100] border-b border-border/50 bg-background/80 backdrop-blur-md"
      initial={{ y: -80 }}
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link to="/" className="relative flex items-center">
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <img src={avatarImg} alt="Dave" className="h-full w-full object-cover" />
            <ShineBorder
              shineColor={["#A855F7", "#EC4899", "#F97316"]}
              duration={10}
              borderWidth={2}
              className="rounded-full"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.to) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href="https://www.linkedin.com/in/davidkelly89/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-sm bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:gap-2.5"
          >
            Connect <span>↗</span>
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span className="block h-[2px] w-6 bg-foreground" animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }} />
            <motion.span className="block h-[2px] w-6 bg-foreground" animate={{ opacity: mobileOpen ? 0 : 1 }} />
            <motion.span className="block h-[2px] w-6 bg-foreground" animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }} />
          </button>
        </div>
      </div>

      <motion.div
        className="border-t border-border md:hidden"
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <nav className="flex flex-col gap-4 px-6 py-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`text-lg font-semibold transition-colors ${isActive(link.to) ? "text-primary" : "text-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/in/davidkelly89/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary"
          >
            Connect ↗
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Navigation;
