import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { CV_URL, LINKEDIN_URL, LOCATION_LINE, PORTFOLIO_EMAIL } from "@/data/profile";

const links = [
  { label: "Work", to: "/work" },
  { label: "Playground", to: "/playground" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
];

const location = LOCATION_LINE.replace(/^Based in /, "");
const meta = "font-mono-label transition-colors hover:text-primary";

const Navigation = ({ visible }: { visible: boolean }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  const close = () => setOpen(false);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[100] border-b border-border bg-background/80 backdrop-blur-md"
      initial={{ y: -80 }}
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-6 md:grid md:grid-cols-4 md:px-12">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-foreground">Dave Kelly</span>
          <span className="font-mono-label text-muted-foreground">Senior Product Designer</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={isActive(l.to) ? "page" : undefined}
              className={`${meta} ${isActive(l.to) ? "text-foreground" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={`${meta} text-muted-foreground`}>LinkedIn ↗</a>
          <a href={`mailto:${PORTFOLIO_EMAIL}`} className={`${meta} text-muted-foreground`}>Email ↗</a>
        </div>

        <div className="hidden items-center justify-end gap-5 md:flex">
          <span className="font-mono-label text-muted-foreground">{location}</span>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" className={`${meta} text-foreground`}>CV ↓</a>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="font-mono-label text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <motion.div
        id="mobile-menu"
        className="border-t border-border md:hidden"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <nav aria-label="Mobile" className="flex flex-col divide-y divide-border px-6 text-lg">
          {[...links, { label: "Skills", to: "/skills" }].map((l) => (
            <Link key={l.to} to={l.to} onClick={close} className={`py-3 ${isActive(l.to) ? "text-foreground" : "text-muted-foreground"} hover:text-primary`}>
              {l.label}
            </Link>
          ))}
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" onClick={close} className="py-3 text-foreground hover:text-primary">CV ↓</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" onClick={close} className="py-3 text-muted-foreground hover:text-primary">LinkedIn ↗</a>
          <a href={`mailto:${PORTFOLIO_EMAIL}`} onClick={close} className="py-3 text-muted-foreground hover:text-primary">Email ↗</a>
          <div className="py-3"><ThemeToggle className="-ml-2" /></div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Navigation;
