import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ProcessCardProps {
  eyebrow: string;
  heading: string;
  body: string;
  icon: ReactNode;
  visual: ReactNode;
  layout: "A" | "B";
}

const ProcessCard = ({ eyebrow, heading, body, icon, visual, layout }: ProcessCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (layout === "B") {
    return (
      <motion.div
        className="overflow-hidden rounded-[20px] p-8 md:p-10"
        style={{
          background: "#110E1B",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "inset 0 -80px 120px -80px rgba(236,72,153,0.08)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={cardVariants}
      >
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[14px]"
            style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.08)" }}>
            {icon}
          </div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#F471B5" }}>
            {eyebrow}
          </p>
          <h2 className="mb-4 text-2xl font-extrabold leading-tight text-white md:text-3xl">
            {heading}
          </h2>
          <p className="mb-8 text-sm leading-relaxed md:text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            {body}
          </p>
          {visual}
        </div>
      </motion.div>
    );
  }

  // Layout A — text left, visual right
  return (
    <motion.div
      className="overflow-hidden rounded-[20px] p-8 md:p-10"
      style={{
        background: "#110E1B",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "inset 0 -80px 120px -80px rgba(236,72,153,0.08)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={cardVariants}
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
        <div className="flex-1">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[14px]"
            style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.08)" }}>
            {icon}
          </div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#F471B5" }}>
            {eyebrow}
          </p>
          <h2 className="mb-4 text-2xl font-extrabold leading-tight text-white md:text-3xl">
            {heading}
          </h2>
          <p className="text-sm leading-relaxed md:text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            {body}
          </p>
        </div>
        <div className="w-full flex-shrink-0 md:w-[45%]">
          {visual}
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessCard;
