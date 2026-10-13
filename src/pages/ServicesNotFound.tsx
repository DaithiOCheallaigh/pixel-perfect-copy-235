import { Link, useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";

const ServicesNotFound = () => {
  const { pathname } = useLocation();
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-background px-6 pt-32 text-center text-foreground">
      <SEO title="Page not found" description="This Lacuna Digital page doesn't exist or has moved. Browse the services overview for websites, booking systems, AI tools and automation for small businesses." noindex />
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link to="/services" className="text-sm text-primary">← Back to Services</Link>
    </main>
  );
};

export default ServicesNotFound;
