import { motion } from "framer-motion";
import { ColorFilter } from "iconsax-react";

const tokens = [
  { color: "#F471B5", label: "--primary" },
  { color: "#8B5CF6", label: "--violet" },
  { color: "#1A1628", label: "--surface" },
  { color: "#07060B", label: "--bg" },
  { color: "#FFFFFF", label: "--text" },
];

const typeSizes = ["Display / 48px", "Heading / 32px", "Body / 16px"];

const TokenPalette = () => (
  <div className="mx-auto max-w-[340px] space-y-6">
    <div className="flex items-center justify-center gap-4">
      {tokens.map((t) => (
        <div key={t.label} className="flex flex-col items-center gap-1.5">
          <div className="h-8 w-8 rounded-full" style={{ background: t.color, border: "1px solid rgba(255,255,255,0.1)" }} />
          <span className="font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>{t.label}</span>
        </div>
      ))}
    </div>
    <div className="space-y-2">
      {typeSizes.map((size, i) => (
        <div key={size} className="flex items-baseline gap-3">
          <span className="font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>{size.split("/")[1]?.trim()}</span>
          <span className="font-semibold text-white" style={{ fontSize: `${16 - i * 2}px` }}>{size.split("/")[0]?.trim()}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
        <ColorFilter size={28} variant="TwoTone" color="#F471B5" />
      </motion.div>
    </div>
  </div>
);

export default TokenPalette;
