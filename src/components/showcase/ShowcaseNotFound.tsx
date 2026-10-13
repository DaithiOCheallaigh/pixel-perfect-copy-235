import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";

const ShowcaseNotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <SEO title="Page not found" description="This showcase link isn't available. It may have expired or been mistyped, so please check the address you were sent or contact Lacuna Digital directly." noindex />
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-6xl font-bold text-foreground/10 mb-4">404</p>
      <h1 className="text-lg font-medium text-foreground mb-2">
        Page not found
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        This page doesn't exist or is no longer available.
      </p>
      <a
        href="https://www.lacunadigital.io/services"
        className="text-sm text-primary underline hover:text-primary/80 transition-colors"
      >
        Visit Lacuna Digital
      </a>
    </motion.div>
  </div>
);

export default ShowcaseNotFound;
