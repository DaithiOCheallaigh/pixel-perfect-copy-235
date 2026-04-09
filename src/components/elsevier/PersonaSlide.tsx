import { GraduationCap, BookOpen } from "lucide-react";
import type { PersonaFilter } from "@/pages/proposals/ElsevierUXAudit";

interface Props {
  onSelectPersona: (f: PersonaFilter) => void;
}

const PersonaSlide = ({ onSelectPersona }: Props) => (
  <div className="min-h-screen flex flex-col justify-center px-6 py-20">
    <div className="max-w-5xl mx-auto w-full space-y-10">
      <h2 className="text-3xl md:text-5xl font-bold text-center">Choose a perspective</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student */}
        <button
          onClick={() => onSelectPersona("student")}
          className="group text-left rounded-2xl border-2 border-[#378ADD]/30 hover:border-[#378ADD] bg-white/5 hover:bg-[#378ADD]/10 p-8 md:p-10 transition-all duration-300 space-y-5"
        >
          <GraduationCap className="w-10 h-10 text-[#378ADD]" />
          <h3 className="text-2xl font-bold">Student</h3>
          <p className="text-sm text-white/55 leading-relaxed">
            First-year healthcare student, access code in hand, arriving at the portal for the first
            time to access their course materials.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#378ADD]/15 text-[#378ADD] rounded-full px-4 py-1.5 text-sm font-semibold">
            Avg score: 3.9 / 10
          </div>
          <div className="text-sm font-medium text-[#378ADD] group-hover:underline">
            View Student Findings →
          </div>
        </button>

        {/* Educator */}
        <button
          onClick={() => onSelectPersona("educator")}
          className="group text-left rounded-2xl border-2 border-[#FF6B00]/30 hover:border-[#FF6B00] bg-white/5 hover:bg-[#FF6B00]/10 p-8 md:p-10 transition-all duration-300 space-y-5"
        >
          <BookOpen className="w-10 h-10 text-[#FF6B00]" />
          <h3 className="text-2xl font-bold">Educator</h3>
          <p className="text-sm text-white/55 leading-relaxed">
            Nurse faculty member, evaluating Elsevier tools for adoption into their nursing
            programme and setting up student access.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/15 text-[#FF6B00] rounded-full px-4 py-1.5 text-sm font-semibold">
            Avg score: 3.3 / 10
          </div>
          <div className="text-sm font-medium text-[#FF6B00] group-hover:underline">
            View Educator Findings →
          </div>
        </button>
      </div>
    </div>
  </div>
);

export default PersonaSlide;
