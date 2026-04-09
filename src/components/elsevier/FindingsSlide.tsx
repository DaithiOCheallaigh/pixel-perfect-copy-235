import { heuristics, getScoreColor, getScoreBg } from "@/data/elsevierAuditData";
import type { PersonaFilter } from "@/pages/proposals/ElsevierUXAudit";

interface Props {
  index: number;
  setIndex: (i: number) => void;
  personaFilter: PersonaFilter;
}

const ScorePill = ({
  label,
  score,
  dimmed,
}: {
  label: string;
  score: number;
  dimmed: boolean;
}) => (
  <div
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity duration-300 ${
      dimmed ? "opacity-25" : "opacity-100"
    }`}
    style={{ backgroundColor: getScoreBg(score), color: getScoreColor(score) }}
  >
    {label}: {score}/10
  </div>
);

const FindingsSlide = ({ index, setIndex, personaFilter }: Props) => {
  const h = heuristics[index];

  return (
    <div className="min-h-screen flex flex-col px-6 py-20">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="mb-8 space-y-2">
          <div className="flex gap-1">
            {heuristics.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                  i === index
                    ? "bg-[#FF6B00]"
                    : i < index
                    ? "bg-[#FF6B00]/40"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-white/30 font-medium">
            <span>1. {heuristics[0].shortName}</span>
            <span>{index + 1} of 15</span>
            <span>15. {heuristics[14].shortName}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-medium text-[#FF6B00] tracking-wider uppercase">
                {h.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">{h.name}</h2>
              <p className="text-sm italic text-white/40">{h.definition}</p>
            </div>

            {/* Scores */}
            <div className="flex gap-3 flex-wrap">
              <ScorePill
                label="Student"
                score={h.studentScore}
                dimmed={personaFilter === "educator"}
              />
              <ScorePill
                label="Educator"
                score={h.educatorScore}
                dimmed={personaFilter === "student"}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  What we observed
                </h4>
                <p className="text-sm text-white/70 leading-relaxed">{h.observed}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Why it matters
                </h4>
                <p className="text-sm text-white/70 leading-relaxed">{h.matters}</p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="rounded-lg bg-white/5 border-l-4 border-[#FF6B00] p-4">
              <h4 className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider mb-1.5">
                Recommendation
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">{h.recommendation}</p>
            </div>
          </div>

          {/* Right: Screenshot placeholder */}
          <div className="relative">
            <div className="rounded-xl bg-[#1a1a1a] border border-white/10 aspect-[4/3] flex flex-col items-center justify-center gap-3 overflow-hidden">
              <img
                src={`/screenshots/${h.screenshot}`}
                alt={h.name}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="hidden absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/30">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-lg">
                  📷
                </div>
                <span className="text-xs font-mono">{h.screenshot}</span>
              </div>
              {/* Annotation overlay */}
              <div className="absolute top-3 right-3 max-w-[200px] rounded-lg border-2 border-dashed border-[#E24B4A]/60 bg-[#E24B4A]/10 backdrop-blur-sm p-3">
                <p className="text-[10px] text-[#E24B4A] font-medium leading-snug">
                  Key issue: {h.observed.split(".")[0]}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Internal nav */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => index > 0 && setIndex(index - 1)}
            disabled={index === 0}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-sm transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => index < 14 && setIndex(index + 1)}
            disabled={index === 14}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-sm transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindingsSlide;
