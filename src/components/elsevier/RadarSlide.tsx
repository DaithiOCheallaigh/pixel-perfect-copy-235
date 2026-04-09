import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { heuristics, studentAvg, educatorAvg } from "@/data/elsevierAuditData";
import type { PersonaFilter } from "@/pages/proposals/ElsevierUXAudit";

const radarData = heuristics.map((h) => ({
  heuristic: h.shortName,
  student: h.studentScore,
  educator: h.educatorScore,
}));

const stats = [
  { label: "Student Average", value: `${studentAvg}/10`, color: "#378ADD" },
  { label: "Educator Average", value: `${educatorAvg}/10`, color: "#FF6B00" },
  { label: "Critical failures (1–3)", value: "6", color: "#E24B4A" },
  { label: "Shared pain points", value: "11", color: "#EF9F27" },
];

const RadarSlide = ({ personaFilter }: { personaFilter: PersonaFilter }) => (
  <div className="min-h-screen flex flex-col justify-center px-6 py-20">
    <div className="max-w-5xl mx-auto w-full space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold">Score overview — all 15 heuristics</h2>
        <p className="text-white/45">Scores out of 10. Lower is worse.</p>
      </div>

      <div className="w-full max-w-2xl mx-auto" style={{ height: 420 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="heuristic"
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }}
              axisLine={false}
            />
            {personaFilter !== "educator" && (
              <Radar
                name="Student"
                dataKey="student"
                stroke="#378ADD"
                fill="rgba(55,138,221,0.25)"
                fillOpacity={1}
                strokeWidth={2}
              />
            )}
            {personaFilter !== "student" && (
              <Radar
                name="Educator"
                dataKey="educator"
                stroke="#FF6B00"
                fill="rgba(255,107,0,0.2)"
                fillOpacity={1}
                strokeWidth={2}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#378ADD]" />
          <span className="text-white/60">Student (avg {studentAvg})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#FF6B00]" />
          <span className="text-white/60">Educator (avg {educatorAvg})</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/5 border border-white/8 p-5 text-center space-y-1"
          >
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs text-white/45">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RadarSlide;
