import {
  Layout,
  Image,
  Eye,
  Monitor,
  Compass,
  Maximize2,
  Scan,
  MoveRight,
  Box,
  Target,
  GitBranch,
  FileText,
  ClipboardList,
  ShoppingCart,
  Scissors,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Card {
  icon: LucideIcon;
  name: string;
  definition: string;
}

const cards: Card[] = [
  { icon: Layout, name: "Landing Page UX", definition: "First impression and goal clarity on arrival" },
  { icon: Image, name: "Non-Verbal Communication", definition: "Visual cues, imagery, and tone" },
  { icon: Eye, name: "Eye Tracking (Nielsen)", definition: "F-pattern and Z-pattern scan support" },
  { icon: Monitor, name: "The Fold", definition: "Critical content visibility without scrolling" },
  { icon: Compass, name: "Directional Cues", definition: "Visual flow guiding the user journey" },
  { icon: Maximize2, name: "White Space Cues", definition: "Intentional use of negative space" },
  { icon: Scan, name: "Eye Direction Cue", definition: "Human gaze directing attention to CTAs" },
  { icon: MoveRight, name: "Arrow / Linear Cues", definition: "Explicit directional indicators" },
  { icon: Box, name: "Encapsulation Cues", definition: "Grouping related content visually" },
  { icon: Target, name: "Attention Ratio", definition: "Single dominant action vs competing elements" },
  { icon: GitBranch, name: "Paradox of Choice", definition: "Cognitive overload from too many options" },
  { icon: FileText, name: "Principles of Landing Pages", definition: "Value prop, social proof, CTA hierarchy" },
  { icon: ClipboardList, name: "Form Audit", definition: "Friction, field count, progressive disclosure" },
  { icon: ShoppingCart, name: "Checkout Abandonment", definition: "Barriers in the conversion flow" },
  { icon: Scissors, name: "Occam's Razor", definition: "Simplest solution principle applied to UX" },
];

const MethodologySlide = () => (
  <div className="min-h-screen flex flex-col justify-center px-6 py-20">
    <div className="max-w-6xl mx-auto w-full space-y-10">
      <h2 className="text-3xl md:text-5xl font-bold text-center">
        15 heuristic dimensions evaluated
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="group rounded-xl bg-white/5 border border-white/8 p-5 hover:bg-white/8 hover:border-[#FF6B00]/30 transition-all duration-300 space-y-3"
            >
              <Icon className="w-5 h-5 text-[#FF6B00] opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-sm font-semibold leading-snug">{card.name}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{card.definition}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default MethodologySlide;
