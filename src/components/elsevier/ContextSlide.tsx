const boxes = [
  { label: "evolve.elsevier.com/cs", sub: "Main Portal", color: "#FF6B00", solid: true },
  { label: "evolve.elsevier.com/studentlife", sub: "Student Life", color: "#378ADD", solid: true },
  { label: "evolve.elsevier.com/education", sub: "Educator Hub", color: "#1D9E75", solid: true },
  { label: "elsevier.com", sub: "Corporate Site", color: "#999", solid: false },
];

const arrows = [
  { from: 0, to: 1, label: "Links off-site" },
  { from: 1, to: 0, label: "Redirects to portal" },
  { from: 0, to: 2, label: "No shared navigation" },
  { from: 3, to: 0, label: "" },
];

const ContextSlide = () => (
  <div className="min-h-screen flex flex-col justify-center px-6 py-20">
    <div className="max-w-5xl mx-auto w-full space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          One product. Three entry points.
          <br />
          <span className="text-white/50">No clear path.</span>
        </h2>
      </div>

      {/* Architecture diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {boxes.map((box, i) => (
          <div
            key={i}
            className="relative rounded-xl p-6 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/8"
            style={{
              border: `2px ${box.solid ? "solid" : "dashed"} ${box.color}40`,
            }}
          >
            <div
              className="text-xs font-bold tracking-wider mb-2 uppercase"
              style={{ color: box.color }}
            >
              {box.sub}
            </div>
            <div className="text-sm text-white/70 font-mono break-all">{box.label}</div>
          </div>
        ))}
      </div>

      {/* Connection labels */}
      <div className="flex flex-wrap justify-center gap-4">
        {arrows.filter(a => a.label).map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-white/40 bg-white/5 rounded-full px-4 py-2"
          >
            <span className="w-4 h-px bg-white/30 inline-block" />
            {a.label}
            <span className="w-4 h-px bg-white/30 inline-block" />
          </div>
        ))}
      </div>

      <p className="text-center text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
        A user arriving at any entry point has no guaranteed path to their goal.
        This fragmentation is the root cause of most audit findings.
      </p>
    </div>
  </div>
);

export default ContextSlide;
