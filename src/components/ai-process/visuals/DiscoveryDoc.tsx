import { motion } from "framer-motion";
import { SearchNormal1 } from "iconsax-react";

const DiscoveryDoc = () => (
  <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-xl p-5"
    style={{ background: "#1A1628", border: "1px solid rgba(255,255,255,0.08)" }}>
    {/* Watermark icon */}
    <SearchNormal1 size={64} variant="TwoTone" className="absolute right-3 top-3 opacity-[0.06]" color="#fff" />

    <div className="space-y-3">
      <div className="relative h-3 w-3/4 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-full" style={{ background: "#F471B5" }} />
      </div>
      <div className="h-3 w-full rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="h-3 w-5/6 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>

    {/* Scan line */}
    <motion.div
      className="absolute left-0 h-px w-full"
      style={{ background: "linear-gradient(90deg, transparent, #F471B5, transparent)" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default DiscoveryDoc;
