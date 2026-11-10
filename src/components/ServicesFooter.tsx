import FooterShell from "@/components/FooterShell";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, CALENDLY_URL } from "@/data/pricing";

const linkClass = "whitespace-nowrap text-sm text-muted-foreground transition-colors md:hover:text-primary";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const groups: { heading: string; className?: string; links: React.ReactNode[] }[] = [
  {
    heading: "Lacuna Digital",
    links: [
      <Link to="/services" className={linkClass}>Services</Link>,
      <Link to="/services/web-design" className={linkClass}>Web Design</Link>,
      <Link to="/services/terms" className={linkClass}>Terms</Link>,
    ],
  },
  {
    heading: "Dave Kelly",
    className: "sm:order-3",
    links: [
      <Link to="/" className={linkClass}>Portfolio</Link>,
      <Link to="/work" className={linkClass}>Selected work</Link>,
      <a href="https://www.linkedin.com/in/davidkelly89/" {...ext} className={linkClass}>LinkedIn ↗</a>,
    ],
  },
  {
    // Spans both columns on phones so the email address never wraps.
    heading: "Contact",
    className: "col-span-2 sm:col-span-1 sm:order-2",
    links: [
      <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>{CONTACT_EMAIL}</a>,
      <a href={CALENDLY_URL} {...ext} className={linkClass}>Book a free call ↗</a>,
    ],
  },
];

const ServicesFooter = () => (
  <FooterShell wordmark="Lacuna">
    <nav aria-label="Footer" className="grid max-w-3xl grid-cols-2 gap-10 sm:grid-cols-3">
      {groups.map((g) => (
        <div key={g.heading} className={g.className}>
          <p className="font-mono-label text-muted-foreground">{g.heading}</p>
          <ul className="mt-4 space-y-2">
            {g.links.map((link, i) => <li key={i}>{link}</li>)}
          </ul>
        </div>
      ))}
    </nav>
    <div className="mt-10 border-t border-border pt-6">
      <p className="whitespace-nowrap text-sm text-muted-foreground">© 2026 Lacuna Digital — David Kelly</p>
    </div>
  </FooterShell>
);

export default ServicesFooter;
