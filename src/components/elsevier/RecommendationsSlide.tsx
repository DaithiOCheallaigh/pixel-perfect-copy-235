const recommendations = [
  {
    tier: "Critical",
    color: "#E24B4A",
    items: [
      {
        id: 1,
        title: "Consolidate the three-site architecture",
        desc: "Unify /cs/, /studentlife/, and /education/ behind one role-detected portal. A visitor arriving at the wrong entry point has no clear path to their goal.",
      },
      {
        id: 2,
        title: "Collapse the 19-item training navigation",
        desc: "Group into 4 categories with progressive disclosure. 19 flat options exceeds cognitive load limits by 3×.",
      },
      {
        id: 3,
        title: "Redesign the access code redemption flow",
        desc: "Surface code redemption as the #1 priority action for new unauthenticated students. The current 5-step flow causes measurable day-one abandonment.",
      },
    ],
  },
  {
    tier: "Major",
    color: "#EF9F27",
    items: [
      {
        id: 4,
        title: "Add value proposition and social proof to educator landing",
        desc: "The current page has one off-site CTA and no evidence of outcomes. Rebuild with 3 stats, 1 testimonial, and a demo CTA.",
      },
      {
        id: 5,
        title: "Fix the blank white void rendering bug",
        desc: "Multiple pages show 400–2000px of empty space between sections. This is a P0 trust issue — users assume the page is broken.",
      },
      {
        id: 6,
        title: "Apply directional and encapsulation cues",
        desc: "Add numbered step flows to all onboarding journeys. Apply card-based encapsulation consistently across all content modules.",
      },
    ],
  },
  {
    tier: "Moderate",
    color: "#1D9E75",
    items: [
      {
        id: 7,
        title: "Reduce registration form from 12 to 4 fields",
        desc: "Collect profile data progressively post-login. Each removed field improves completion rates by ~11%.",
      },
      {
        id: 8,
        title: "Add eye-direction cues in hero imagery",
        desc: "Replace 3D renders with photography of students/nurses whose gaze directs attention toward the primary CTA.",
      },
    ],
  },
];

const RecommendationsSlide = () => (
  <div className="min-h-screen flex flex-col justify-center px-6 py-20">
    <div className="max-w-4xl mx-auto w-full space-y-8">
      <h2 className="text-3xl md:text-5xl font-bold text-center">8 priority recommendations</h2>

      <div className="space-y-6">
        {recommendations.map((group) => (
          <div key={group.tier} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.color }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: group.color }}>
                {group.tier}
              </span>
            </div>
            {group.items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white/5 p-5 transition-colors hover:bg-white/8"
                style={{ borderLeft: `4px solid ${group.color}` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-white/30 mt-0.5 shrink-0">
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-white/55 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RecommendationsSlide;
