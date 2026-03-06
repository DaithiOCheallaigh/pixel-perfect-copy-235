import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import claudeLogo from "@/assets/logos/claude.png";
import notionLogo from "@/assets/logos/notion.png";
import lovableLogo from "@/assets/logos/lovable.png";
import figmaLogo from "@/assets/logos/figma.svg";

const nodes = [
  { name: "Claude", logo: claudeLogo, x: 100, y: 30 },
  { name: "Notion", logo: notionLogo, x: 260, y: 30 },
  { name: "Figma", logo: figmaLogo, x: 100, y: 170 },
  { name: "Lovable", logo: lovableLogo, x: 260, y: 170 },
];

const center = { x: 180, y: 100 };

const SyncSection = () => (
  <section className="px-6 py-24 md:px-12" style={{ background: "#07060B" }}>
    <div className="mx-auto max-w-4xl text-center">
      <motion.h2
        className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        AI Systems, Working in Sync
      </motion.h2>
      <motion.p
        className="mb-12 text-base md:text-lg"
        style={{ color: "rgba(255,255,255,0.55)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Every tool connected. Every step informed. One unified process.
      </motion.p>

      {/* Node graph */}
      <motion.div
        className="mx-auto max-w-[360px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <svg viewBox="0 0 360 200" className="w-full" fill="none">
          {/* Lines from center to each node */}
          {nodes.map((node, i) => (
            <motion.line
              key={node.name}
              x1={center.x}
              y1={center.y}
              x2={node.x}
              y2={node.y}
              stroke="#F471B5"
              strokeWidth="1"
              strokeDasharray="4 4"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 0.3, transition: { duration: 0.8, delay: i * 0.2 } },
              }}
            />
          ))}

          {/* Center node */}
          <circle cx={center.x} cy={center.y} r="20" fill="#1A1628" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x={center.x} y={center.y + 4} textAnchor="middle" fill="#F471B5" fontSize="8" fontWeight="bold">
            Process
          </text>
        </svg>

        {/* Tool nodes overlaid */}
        <div className="relative -mt-[55%] h-0 pb-[55%]">
          {nodes.map((node, i) => (
            <motion.div
              key={node.name}
              className="absolute flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: "#1A1628",
                border: "1px solid rgba(255,255,255,0.08)",
                left: `${(node.x / 360) * 100}%`,
                top: `${(node.y / 200) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            >
              <img src={node.logo} alt={node.name} className="h-6 w-6 object-contain" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project links */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="mb-4 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
          Projects built using this process
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/work/marsh-internal-tooling"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:text-[#F471B5]"
            style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Marsh Internal Tooling →
          </Link>
          <Link
            to="/work/marsh-design-system"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:text-[#F471B5]"
            style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Marsh Design System Rebrand →
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SyncSection;
