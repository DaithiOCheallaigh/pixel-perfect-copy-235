import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";

interface ToolLayoutProps {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  children: React.ReactNode;
}

const ToolLayout = ({ title, description, metaTitle, metaDescription, children }: ToolLayoutProps) => {
  useEffect(() => {
    document.title = metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", metaDescription);
  }, [metaTitle, metaDescription]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServicesNavigation visible={true} />

      <section className="px-6 pb-8 pt-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/tools"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Tools
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Try Before You Buy</SectionLabel>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-3 text-base text-muted-foreground">{description}</p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">{children}</div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default ToolLayout;
