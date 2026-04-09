import { Printer } from "lucide-react";

const columns = [
  {
    title: "Quick wins",
    timeline: "0–4 weeks",
    color: "#FF6B00",
    items: [
      "Fix blank white void rendering bug across all three sub-sites",
      "Move access code redemption field above the fold on student store",
      "Add eye-direction photography to StudentLife hero",
      "Collapse Training nav to 4 grouped categories",
    ],
  },
  {
    title: "Medium-term",
    timeline: "1–3 months",
    color: "#378ADD",
    items: [
      "Reduce registration form to 4 fields with progressive profile completion",
      "Rebuild educator landing page with value prop, stats, testimonial, demo CTA",
      "Add numbered step onboarding flow to all first-time user journeys",
      "Apply consistent card-based encapsulation across all page templates",
    ],
  },
  {
    title: "Strategic",
    timeline: "3–6 months",
    color: "#1D9E75",
    items: [
      "Commission information architecture audit with goal of single-portal consolidation",
      "Define and implement a unified design system across all three sub-sites",
      "Instrument conversion funnel analytics from landing to content access",
      "Conduct usability testing with 5 nursing students and 5 faculty members",
    ],
  },
];

const NextStepsSlide = () => (
  <div className="min-h-screen flex flex-col justify-center px-6 py-20">
    <div className="max-w-6xl mx-auto w-full space-y-10">
      <h2 className="text-3xl md:text-5xl font-bold text-center">Recommended action plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.title}
            className="rounded-2xl bg-white/5 border border-white/8 p-6 space-y-5"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-bold" style={{ color: col.color }}>
                {col.title}
              </h3>
              <p className="text-xs text-white/40">{col.timeline}</p>
            </div>
            <div className="space-y-3">
              {col.items.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{
                      backgroundColor: `${col.color}20`,
                      color: col.color,
                    }}
                  >
                    {i + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-6 text-center space-y-2">
        <p className="text-sm text-white/60">
          Prepared by <strong className="text-white/80">Lacuna Digital</strong> — lacunadigital.io
        </p>
        <p className="text-xs text-white/35">
          For more information contact dave@lacunadigital.io
        </p>
      </div>

      {/* Print button */}
      <div className="flex justify-center">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors border border-white/10"
        >
          <Printer className="w-4 h-4" />
          Print / Export PDF
        </button>
      </div>
    </div>
  </div>
);

export default NextStepsSlide;
