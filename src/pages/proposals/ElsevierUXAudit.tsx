import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TitleSlide from "@/components/elsevier/TitleSlide";
import ContextSlide from "@/components/elsevier/ContextSlide";
import MethodologySlide from "@/components/elsevier/MethodologySlide";
import PersonaSlide from "@/components/elsevier/PersonaSlide";
import FindingsSlide from "@/components/elsevier/FindingsSlide";
import RadarSlide from "@/components/elsevier/RadarSlide";
import RecommendationsSlide from "@/components/elsevier/RecommendationsSlide";
import ScorecardSlide from "@/components/elsevier/ScorecardSlide";
import NextStepsSlide from "@/components/elsevier/NextStepsSlide";

export type PersonaFilter = "both" | "student" | "educator";

const TOTAL_SLIDES = 9;

const PersonaToggle = ({
  filter,
  setFilter,
}: {
  filter: PersonaFilter;
  setFilter: (f: PersonaFilter) => void;
}) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
    {(["both", "student", "educator"] as const).map((f) => (
      <button
        key={f}
        onClick={() => setFilter(f)}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
          filter === f
            ? "bg-[#FF6B00] text-white shadow-lg"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        {f === "both" ? "Both" : f === "student" ? "Student" : "Educator"}
      </button>
    ))}
  </div>
);

const ElsevierUXAudit = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [personaFilter, setPersonaFilter] = useState<PersonaFilter>("both");
  const [findingsIndex, setFindingsIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goToSlide = useCallback(
    (n: number) => {
      if (n < 0 || n >= TOTAL_SLIDES || transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(n);
        setTransitioning(false);
      }, 150);
    },
    [transitioning]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (currentSlide === 4 && findingsIndex < 14) {
          setFindingsIndex((i) => i + 1);
        } else {
          goToSlide(currentSlide + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentSlide === 4 && findingsIndex > 0) {
          setFindingsIndex((i) => i - 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlide, findingsIndex, goToSlide]);

  const handlePrev = () => {
    if (currentSlide === 4 && findingsIndex > 0) {
      setFindingsIndex((i) => i - 1);
    } else {
      goToSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide === 4 && findingsIndex < 14) {
      setFindingsIndex((i) => i + 1);
    } else {
      goToSlide(currentSlide + 1);
    }
  };

  const slides = [
    <TitleSlide key={0} onBegin={() => goToSlide(1)} />,
    <ContextSlide key={1} />,
    <MethodologySlide key={2} />,
    <PersonaSlide key={3} onSelectPersona={setPersonaFilter} />,
    <FindingsSlide
      key={4}
      index={findingsIndex}
      setIndex={setFindingsIndex}
      personaFilter={personaFilter}
    />,
    <RadarSlide key={5} personaFilter={personaFilter} />,
    <RecommendationsSlide key={6} />,
    <ScorecardSlide key={7} personaFilter={personaFilter} />,
    <NextStepsSlide key={8} />,
  ];

  const showPersonaToggle = currentSlide >= 4 && currentSlide <= 7;

  return (
    <div
      className="min-h-screen bg-[#2D2D2D] text-white selection:bg-[#FF6B00]/30"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Slide counter */}
      <div className="fixed top-4 right-6 z-50 text-sm text-white/50 font-medium tracking-wide">
        Slide {currentSlide + 1} of {TOTAL_SLIDES}
      </div>

      {/* Persona toggle */}
      {showPersonaToggle && (
        <PersonaToggle filter={personaFilter} setFilter={setPersonaFilter} />
      )}

      {/* Slide */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {slides[currentSlide]}
      </div>

      {/* Nav buttons */}
      {currentSlide > 0 && (
        <button
          onClick={handlePrev}
          className="fixed left-4 bottom-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/5"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {currentSlide < TOTAL_SLIDES - 1 && (
        <button
          onClick={handleNext}
          className="fixed right-4 bottom-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/5"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ElsevierUXAudit;
