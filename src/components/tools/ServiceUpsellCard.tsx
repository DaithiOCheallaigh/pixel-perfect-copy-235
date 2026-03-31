import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceUpsellCardProps {
  title: string;
  description: string;
  linkTo: string;
  linkLabel?: string;
  external?: boolean;
}

const ServiceUpsellCard = ({ title, description, linkTo, linkLabel = "Learn more", external = false }: ServiceUpsellCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6"
  >
    <h3 className="text-base font-bold text-foreground">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    {external ? (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
      >
        {linkLabel} <ArrowRight className="h-4 w-4" />
      </a>
    ) : (
      <Link
        to={linkTo}
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
      >
        {linkLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </motion.div>
);

export default ServiceUpsellCard;
