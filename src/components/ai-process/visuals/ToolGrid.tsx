import { motion } from "framer-motion";
import claudeLogo from "@/assets/logos/claude.png";
import notionLogo from "@/assets/logos/notion.png";
import lovableLogo from "@/assets/logos/lovable.png";
import figmaLogo from "@/assets/logos/figma.svg";

const tools = [
  { name: "Claude", logo: claudeLogo },
  { name: "Notion", logo: notionLogo },
  { name: "Lovable", logo: lovableLogo },
  { name: "Figma", logo: figmaLogo },
];

const ToolGrid = () => (
  <motion.div
    className="mx-auto grid max-w-[280px] grid-cols-2 gap-4"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
  >
    {tools.map((tool) => (
      <motion.div
        key={tool.name}
        className="flex flex-col items-center gap-2 rounded-[14px] p-4"
        style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.08)" }}
        variants={{
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        }}
      >
        <img src={tool.logo} alt={tool.name} className="h-7 w-7 object-contain" />
        <span className="text-xs font-medium text-white">{tool.name}</span>
      </motion.div>
    ))}
  </motion.div>
);

export default ToolGrid;
