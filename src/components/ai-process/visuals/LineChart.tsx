import { motion } from "framer-motion";

const LineChart = () => (
  <div className="mx-auto max-w-[320px]">
    <svg viewBox="0 0 320 160" fill="none" className="w-full">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" y1={i * 40} x2="320" y2={i * 40} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {/* Chart line */}
      <motion.path
        d="M 0 140 C 40 130, 80 120, 120 100 C 160 80, 200 50, 240 35 C 270 25, 300 20, 320 15"
        stroke="#F471B5"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {/* Glow underneath */}
      <motion.path
        d="M 0 140 C 40 130, 80 120, 120 100 C 160 80, 200 50, 240 35 C 270 25, 300 20, 320 15 L 320 160 L 0 160 Z"
        fill="url(#chartGlow)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <defs>
        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F471B5" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F471B5" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default LineChart;
