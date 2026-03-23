import { motion } from "framer-motion";

const ShowcaseNotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
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
        href="https://lacunadigital.io"
        className="text-sm text-primary underline hover:text-primary/80 transition-colors"
      >
        Visit Lacuna Digital
      </a>
    </motion.div>
  </div>
);

export default ShowcaseNotFound;
