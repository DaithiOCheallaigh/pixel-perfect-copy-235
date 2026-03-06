import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "iconsax-react";
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

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");

  return (
    <section className="relative px-6 py-28 md:py-36" style={{ background: "#07060B" }}>
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(236,72,153,0.06), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: "rgba(244,113,181,0.4)", color: "#F471B5" }}>
            <Cpu size={14} variant="TwoTone" />
            AI-Led Design Process
          </span>
        </motion.div>

        <motion.h1
          className="mt-8 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          An end-to-end process for building better products — faster.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(255,255,255,0.55)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Combining AI tooling, structured research, and systematic design to take ideas from discovery to launch.
        </motion.p>

        {/* Tab toggle */}
        <motion.div
          className="mt-8 inline-flex rounded-full p-1"
          style={{ background: "#110E1B", border: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {(["new", "existing"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
              style={{
                background: activeTab === tab ? "#EC4899" : "transparent",
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.55)",
              }}
            >
              {tab === "new" ? "New Products" : "Existing Products"}
            </button>
          ))}
        </motion.div>

        {/* Tools strip */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Tools Used
          </span>
          {tools.map((tool) => (
            <span
              key={tool.name}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <img src={tool.logo} alt={tool.name} className="h-5 w-5 object-contain" />
              {tool.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
