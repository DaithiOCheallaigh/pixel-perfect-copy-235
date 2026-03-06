import { motion } from "framer-motion";

const bars = [
  { width: "75%", delay: 0 },
  { width: "55%", delay: 0.15 },
  { width: "85%", delay: 0.3 },
  { width: "40%", delay: 0.45 },
];

const GanttChart = () => (
  <div className="mx-auto max-w-[320px] space-y-3">
    {bars.map((bar, i) => (
      <div key={i} className="flex items-center gap-3">
        <span className="w-8 text-right text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
          T{i + 1}
        </span>
        <div className="flex-1 h-6 rounded-md overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
          <motion.div
            className="h-full rounded-md"
            style={{ background: "linear-gradient(90deg, #EC4899, #8B5CF6)" }}
            initial={{ width: 0 }}
            whileInView={{ width: bar.width }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: bar.delay, ease: "easeOut" }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default GanttChart;
