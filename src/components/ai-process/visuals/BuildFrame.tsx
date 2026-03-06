import { motion } from "framer-motion";

const BuildFrame = () => (
  <div className="mx-auto w-full max-w-[240px]">
    <div
      className="overflow-hidden rounded-2xl"
      style={{ border: "1px solid rgba(255,255,255,0.1)", background: "#0E0C14" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="h-2 w-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="h-2 w-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="h-2 w-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
      </div>

      <motion.div
        className="space-y-3 p-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Header bar */}
        <motion.div
          className="h-6 w-full rounded-md"
          style={{ background: "rgba(255,255,255,0.06)" }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        />
        {/* Card */}
        <motion.div
          className="h-16 w-full rounded-lg"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        />
        {/* Button */}
        <motion.div
          className="mx-auto h-8 w-24 rounded-md"
          style={{ background: "#EC4899" }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        />
      </motion.div>
    </div>
  </div>
);

export default BuildFrame;
