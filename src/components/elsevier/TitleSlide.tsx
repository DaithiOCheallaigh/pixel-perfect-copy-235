import { ArrowRight } from "lucide-react";

const TitleSlide = ({ onBegin }: { onBegin: () => void }) => (
  <div className="min-h-screen flex flex-col">
    {/* Orange top bar */}
    <div className="h-1.5 bg-[#FF6B00] w-full" />

    {/* Header */}
    <div className="flex items-center justify-between px-8 py-6">
      <span className="text-xl font-bold tracking-[0.15em] text-white/90">ELSEVIER</span>
    </div>

    {/* Content */}
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
          Evolve Portal
          <br />
          <span className="text-[#FF6B00]">UX Audit</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
          A heuristics review from the perspective of a Student and an Educator
        </p>
        <p className="text-sm text-white/35">
          Prepared by Lacuna Digital · April 2026 · evolve.elsevier.com/cs
        </p>
        <button
          onClick={onBegin}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#FF6B00] hover:bg-[#e55f00] text-white font-semibold rounded-lg transition-colors text-lg shadow-lg shadow-[#FF6B00]/20"
        >
          Begin Audit
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Footer */}
    <div className="px-8 py-6 flex justify-end">
      <span className="text-xs text-white/25">Prepared by Lacuna Digital</span>
    </div>
  </div>
);

export default TitleSlide;
