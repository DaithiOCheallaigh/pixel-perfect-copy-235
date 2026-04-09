import {
  heuristics,
  getScoreColor,
  getSeverity,
  getSeverityColor,
  studentAvg,
  educatorAvg,
} from "@/data/elsevierAuditData";
import type { PersonaFilter } from "@/pages/proposals/ElsevierUXAudit";

const ScorecardSlide = ({ personaFilter }: { personaFilter: PersonaFilter }) => {
  const showStudent = personaFilter !== "educator";
  const showEducator = personaFilter !== "student";

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center">Complete score breakdown</h2>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-left">
                <th className="p-4 font-semibold text-white/70">#</th>
                <th className="p-4 font-semibold text-white/70">Heuristic</th>
                {showStudent && (
                  <th className="p-4 font-semibold text-[#378ADD] text-center">Student</th>
                )}
                {showEducator && (
                  <th className="p-4 font-semibold text-[#FF6B00] text-center">Educator</th>
                )}
                <th className="p-4 font-semibold text-white/70 text-center">Delta</th>
                <th className="p-4 font-semibold text-white/70 text-center">Severity</th>
              </tr>
            </thead>
            <tbody>
              {heuristics.map((h, i) => {
                const severity = getSeverity(h.studentScore, h.educatorScore);
                const delta = h.educatorScore - h.studentScore;
                const deltaStr = delta > 0 ? `+${delta}` : String(delta);
                return (
                  <tr
                    key={i}
                    className="border-t border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="p-4 text-white/30 text-xs">{h.id}</td>
                    <td className="p-4 font-medium text-white/80">{h.name}</td>
                    {showStudent && (
                      <td className="p-4 text-center">
                        <span
                          className="inline-block w-8 h-8 rounded-lg text-xs font-bold leading-8"
                          style={{
                            backgroundColor: `${getScoreColor(h.studentScore)}20`,
                            color: getScoreColor(h.studentScore),
                          }}
                        >
                          {h.studentScore}
                        </span>
                      </td>
                    )}
                    {showEducator && (
                      <td className="p-4 text-center">
                        <span
                          className="inline-block w-8 h-8 rounded-lg text-xs font-bold leading-8"
                          style={{
                            backgroundColor: `${getScoreColor(h.educatorScore)}20`,
                            color: getScoreColor(h.educatorScore),
                          }}
                        >
                          {h.educatorScore}
                        </span>
                      </td>
                    )}
                    <td className="p-4 text-center text-xs text-white/40">{deltaStr}</td>
                    <td className="p-4 text-center">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold"
                        style={{
                          backgroundColor: `${getSeverityColor(severity)}20`,
                          color: getSeverityColor(severity),
                        }}
                      >
                        {severity}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {/* Footer row */}
              <tr className="border-t-2 border-white/10 bg-white/5 font-semibold">
                <td className="p-4" />
                <td className="p-4 text-white/80">Averages</td>
                {showStudent && (
                  <td className="p-4 text-center text-[#378ADD]">{studentAvg}</td>
                )}
                {showEducator && (
                  <td className="p-4 text-center text-[#FF6B00]">{educatorAvg}</td>
                )}
                <td className="p-4 text-center text-white/40 text-xs">
                  {(educatorAvg - studentAvg).toFixed(1)}
                </td>
                <td className="p-4 text-center text-white/30">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScorecardSlide;
