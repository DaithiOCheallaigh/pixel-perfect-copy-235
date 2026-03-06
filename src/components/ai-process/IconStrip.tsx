import { motion } from "framer-motion";
import {
  Category2,
  Cpu,
  SearchNormal1,
  Calendar,
  RowVertical,
  Colorfilter,
  Code1,
  ChartSquare,
} from "iconsax-react";

const icons = [
  { icon: Category2, label: "Universal\nMethodology", num: "01" },
  { icon: Cpu, label: "AI\nToolstack", num: "02" },
  { icon: SearchNormal1, label: "Discovery", num: "03" },
  { icon: Calendar, label: "Roadmap\n& Gantt", num: "04" },
  { icon: RowVertical, label: "Kanban\nDelivery", num: "05" },
  { icon: ColorFilter, label: "Design\nSystem", num: "06" },
  { icon: Code1, label: "Build\n& Deploy", num: "07" },
  { icon: ChartSquare, label: "Analytics\n& Iteration", num: "08" },
];

const IconStrip = ({ activeStep = 0 }: { activeStep?: number }) => {
  return (
    <section className="px-6 py-12" style={{ background: "#0E0C14" }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="flex items-start gap-4 overflow-x-auto pb-4 scrollbar-hide md:justify-center md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {icons.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === activeStep;
            return (
              <motion.div
                key={item.num}
                className="flex shrink-0 flex-col items-center gap-3"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[14px]"
                  style={{
                    background: isActive ? "rgba(236,72,153,0.15)" : "#1A1628",
                    border: `1px solid ${isActive ? "rgba(244,113,181,0.4)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <Icon size={22} variant="TwoTone" color={isActive ? "#F471B5" : "#fff"} />
                </div>
                <span
                  className="whitespace-pre-line text-center text-[10px] font-semibold uppercase tracking-wider leading-tight"
                  style={{ color: isActive ? "#F471B5" : "rgba(255,255,255,0.45)" }}
                >
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default IconStrip;
