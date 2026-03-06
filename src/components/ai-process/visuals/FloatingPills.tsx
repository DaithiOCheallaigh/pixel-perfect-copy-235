import { motion } from "framer-motion";

const FloatingPills = () => (
  <div className="relative flex h-48 items-center justify-center gap-16">
    <motion.span
      className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
      style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.1)" }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      New Products
    </motion.span>

    {/* Connecting arc */}
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 100" fill="none" preserveAspectRatio="xMidYMid meet">
      <motion.path
        d="M 50 50 Q 100 10 150 50"
        stroke="#F471B5"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </svg>

    <motion.span
      className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
      style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.1)" }}
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      Existing Products
    </motion.span>
  </div>
);

export default FloatingPills;
