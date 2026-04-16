import { useState, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";

const steps = [
  {
    num: 1,
    title: "Set Context",
    icon: "⭐",
    body: "Explain WHY decisions were made, not just WHAT was designed.",
    chips: ["Problem Statement", "Key Goals", "Assumptions", "Key Insights"],
    layout: "grid" as const,
  },
  {
    num: 2,
    title: "Add Structure",
    icon: "🗂️",
    body: "Organise Figma files logically with consistent naming conventions that mirror your component hierarchy.",
    flow: ["Main Feature", "Flow", "Errors", "Edge Cases"],
    layout: "flow" as const,
  },
  {
    num: 3,
    title: "Checklists",
    icon: "✅",
    body: "Create thorough completion checklists for designers and developers.",
    checklist: ["Happy vs Unhappy Path", "Empty States", "Loading States", "Edge Cases"],
    layout: "checklist" as const,
  },
  {
    num: 4,
    title: "Annotations",
    icon: "📝",
    body: "Annotate every design with measurements, interactions, behaviours, and state changes.",
    annotations: [
      { label: "What's New", example: "e.g. screens, components, messaging" },
      { label: "What's Changed", example: "e.g. updated content, V1 components" },
      { label: "Dev Notes", example: "e.g. this should animate" },
      { label: "Questions", example: "e.g. can we implement this?" },
    ],
    layout: "annotations" as const,
  },
  {
    num: 5,
    title: "New Components",
    icon: "🧩",
    body: "Highlight new UI components and explain how they differ from existing ones. This prevents duplication in the design system and helps developers know when to create vs. reuse.",
    layout: "plain" as const,
  },
  {
    num: 6,
    title: "Show the Flow",
    icon: "🔀",
    body: "Visualise the complete user journey with flow diagrams. Helps developers understand how screens connect and where their work fits.",
    layout: "decision" as const,
  },
  {
    num: 7,
    title: "Prototype",
    icon: "▶️",
    body: "Interactive prototypes communicate animations, transitions, and micro-interactions that static documentation can't convey. These are essential to preserving design intent.",
    layout: "plain" as const,
  },
  {
    num: 8,
    title: "Runthrough",
    icon: "💬",
    body: "Schedule a live walkthrough with the development team. A synchronous session enables immediate questions, clarifications, and alignment that no document can replace.",
    layout: "plain" as const,
  },
];

const DesignHandoffCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx < 0 || idx >= steps.length) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(idx);
        setTransitioning(false);
      }, 300);
    },
    [transitioning]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const step = steps[current];

  return (
    <div className="mt-8">
      <SectionLabel>Process</SectionLabel>
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Design Handoff Process</h2>
      <p className="mt-2 text-sm text-muted-foreground">How I set developers up for success</p>

      <div className="relative mt-8">
        {/* Card */}
        <div
          className={`rounded-xl bg-card p-6 md:p-10 transition-opacity duration-300 ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-3xl">{step.icon}</span>
            <div>
              <span className="font-mono-label text-primary">Step {step.num}</span>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">{step.title}</h3>
            </div>
          </div>

          <p className="mb-6 text-[15px] leading-[1.7] text-muted-foreground">{step.body}</p>

          {/* Layout-specific content */}
          {step.layout === "grid" && step.chips && (
            <div className="grid grid-cols-2 gap-3">
              {step.chips.map((chip) => (
                <div key={chip} className="rounded-lg bg-muted/50 px-4 py-3 text-sm font-medium text-foreground">
                  {chip}
                </div>
              ))}
            </div>
          )}

          {step.layout === "flow" && step.flow && (
            <div className="flex flex-wrap items-center gap-2">
              {step.flow.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    {label}
                  </span>
                  {i < step.flow!.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          )}

          {step.layout === "checklist" && step.checklist && (
            <div className="space-y-3">
              {step.checklist.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
                  <span className="h-4 w-4 rounded border-2 border-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          )}

          {step.layout === "annotations" && step.annotations && (
            <div className="space-y-3">
              {step.annotations.map((a) => (
                <div key={a.label} className="flex flex-col gap-1 rounded-lg bg-muted/50 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                  <span className="text-sm font-semibold text-primary min-w-[120px]">{a.label}</span>
                  <span className="text-sm text-muted-foreground">{a.example}</span>
                </div>
              ))}
            </div>
          )}

          {step.layout === "decision" && (
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">Start</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="rounded-lg border border-border px-4 py-2 text-sm text-foreground">Decision?</div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-500 font-medium">Yes →</span>
                  <div className="rounded bg-green-500/10 px-3 py-1 text-xs text-green-500">Path A</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-500 font-medium">No →</span>
                  <div className="rounded bg-amber-500/10 px-3 py-1 text-xs text-amber-500">Path B</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>

          <span className="font-mono-label text-sm text-muted-foreground">
            {current + 1} of {steps.length}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={current === steps.length - 1}
            onClick={() => goTo(current + 1)}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignHandoffCarousel;
