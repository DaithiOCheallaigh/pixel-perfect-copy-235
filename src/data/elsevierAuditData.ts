export interface HeuristicData {
  id: number;
  name: string;
  shortName: string;
  category: string;
  definition: string;
  studentScore: number;
  educatorScore: number;
  screenshot: string;
  observed: string;
  matters: string;
  recommendation: string;
}

export const heuristics: HeuristicData[] = [
  {
    id: 1,
    name: "Landing Page UX",
    shortName: "Landing UX",
    category: "Navigation",
    definition: "First impression and goal clarity on arrival.",
    studentScore: 3,
    educatorScore: 3,
    screenshot: "01-homepage-role-selector.jpg",
    observed: "The portal presents three separate sub-sites as potential entry points with no unified homepage. The /cs/ hero is a rotating image carousel with two CTA buttons but no supporting value proposition copy.",
    matters: "First impressions are formed in under 500ms. Without a clear value proposition above the fold, high-intent users bounce before understanding what the portal offers.",
    recommendation: "Consolidate all three sub-sites behind a single role-detected landing page. Show a clear, persona-matched value proposition immediately on load.",
  },
  {
    id: 2,
    name: "Non-Verbal Communication",
    shortName: "Non-Verbal",
    category: "Visual Design",
    definition: "Visual cues, imagery, and tone.",
    studentScore: 4,
    educatorScore: 3,
    screenshot: "09-studentlife-hero.jpg",
    observed: "The StudentLife hero uses a 3D anatomical render rather than photography of real students. The Education page has almost no imagery at all — just a text-heavy link list.",
    matters: "Non-verbal cues (photography, colour, iconography) communicate trust and relevance faster than text. Generic 3D renders do not create the aspirational connection healthcare students need.",
    recommendation: "Replace 3D renders with contextual photography of real nursing students. The educator page needs at minimum one human face to establish trust.",
  },
  {
    id: 3,
    name: "Eye Tracking (Nielsen F-Pattern)",
    shortName: "Eye Tracking",
    category: "Visual Design",
    definition: "F-pattern and Z-pattern scan support.",
    studentScore: 4,
    educatorScore: 3,
    screenshot: "02-student-store-above-fold.jpg",
    observed: "The student store page has a hero, then a search bar, then the access code form — but these are not laid out along the natural F-pattern scan zones. The most critical action (redeem code) sits in the lower-left quadrant of the secondary scan band.",
    matters: "Users read web pages in an F-pattern: strong horizontal scan at the top, weaker scan lower down, then a vertical scan of the left edge. Content placed outside these zones is frequently missed.",
    recommendation: "Move the access code redemption field to the top horizontal scan zone — immediately below the hero, spanning full width.",
  },
  {
    id: 4,
    name: "The Fold",
    shortName: "The Fold",
    category: "Layout",
    definition: "Critical content visibility without scrolling.",
    studentScore: 5,
    educatorScore: 4,
    screenshot: "05-registration-empty.jpg",
    observed: "The registration page loads with two radio buttons (Student / Faculty) and then a full viewport of white space. The actual form fields only appear after role selection — and even then, they render below an unexplained white void of approximately 400px.",
    matters: "Content below the fold has significantly lower engagement. A page that appears empty on load causes users to assume it is broken and abandon.",
    recommendation: "Render the registration form fields immediately on load using the most common role (Student) as default, with a role switcher at the top. Investigate and fix the white void rendering issue.",
  },
  {
    id: 5,
    name: "Directional Cues",
    shortName: "Directional",
    category: "Navigation",
    definition: "Visual flow guiding the user journey.",
    studentScore: 4,
    educatorScore: 3,
    screenshot: "07-training-page.jpg",
    observed: "The StudentLife training page uses large decorative chevron arrows in the hero but these point left — away from the content — and have no interactive function. There is no step-based onboarding flow visible anywhere.",
    matters: "Directional cues are one of the most powerful tools for reducing time-to-action. Decorative arrows that do not correspond to a user action actively mislead.",
    recommendation: 'Replace decorative arrows with a numbered step flow: "1. Create account → 2. Redeem your code → 3. Access your content". This alone would reduce support volume significantly.',
  },
  {
    id: 6,
    name: "White Space Cues",
    shortName: "White Space",
    category: "Layout",
    definition: "Intentional use of negative space.",
    studentScore: 6,
    educatorScore: 5,
    screenshot: "10-blank-white-void.jpg",
    observed: "Multiple pages contain 500–2000px of unrendered white space between sections. This is not intentional negative space — it is broken lazy-loading. On the StudentLife homepage, the page reports a scroll height of 5,329px but the vast majority is empty.",
    matters: "Intentional white space improves readability and signals structure. Unintentional white space destroys trust — users assume the page is broken or incomplete.",
    recommendation: "Audit and fix all lazy-loading implementations site-wide. Sections should render on scroll-approach, not leave a void. This is a P0 technical fix.",
  },
  {
    id: 7,
    name: "Eye Direction Cue",
    shortName: "Eye Direction",
    category: "Visual Design",
    definition: "Human gaze directing attention to CTAs.",
    studentScore: 3,
    educatorScore: 2,
    screenshot: "09-studentlife-hero.jpg",
    observed: "No human photography is used anywhere on the StudentLife or Education landing pages in a way that directs gaze toward a CTA. The 3D anatomical render has no directional gaze. The educator page has no human imagery at all.",
    matters: "Human eye direction is one of the most evidence-backed attention-directing techniques in web UX. A person looking toward a CTA measurably increases clicks on that CTA.",
    recommendation: "Use photography of a student or nurse looking toward or gesturing at the primary CTA. This is a low-cost, high-impact change.",
  },
  {
    id: 8,
    name: "Arrow / Linear Cues",
    shortName: "Arrow Cues",
    category: "Navigation",
    definition: "Explicit directional indicators.",
    studentScore: 4,
    educatorScore: 3,
    screenshot: "03-faculty-store-nav.jpg",
    observed: "Arrow cues exist only in the carousel navigation (left/right arrows) and in external link icons (↗). There are no linear flow indicators showing users their progression through a task or journey.",
    matters: "Linear cues reduce cognitive load by showing users where they are and what comes next. Without them, every page feels like an isolated destination with no path forward.",
    recommendation: 'Add a persistent breadcrumb and progress indicator to all multi-step flows. For the registration flow specifically, a "Step 1 of 3" indicator would reduce abandonment.',
  },
  {
    id: 9,
    name: "Encapsulation Cues",
    shortName: "Encapsulation",
    category: "Visual Design",
    definition: "Grouping related content visually.",
    studentScore: 5,
    educatorScore: 4,
    screenshot: "02-student-store-above-fold.jpg",
    observed: "The student store groups some content in boxes (the welcome message, the access code form) but the HESI Secured Exams section sits in a bare column with no visual container. The educator solutions section is a raw link list with no card or border.",
    matters: "Encapsulation (cards, borders, background fills) signals that related items belong together and helps users parse information zones rapidly.",
    recommendation: "Apply consistent card-based encapsulation to all content modules. Every distinct information zone should have a visual boundary.",
  },
  {
    id: 10,
    name: "Attention Ratio",
    shortName: "Attention",
    category: "Conversion",
    definition: "Single dominant action vs competing elements.",
    studentScore: 3,
    educatorScore: 3,
    screenshot: "04-login-form.jpg",
    observed: "The login page footer contains 20+ links across four columns (My Evolve, Catalog, Get Support, Learn More). These compete equally for attention with no visual hierarchy. The student store navigation offers 5 top-level items plus icon buttons plus a role switcher.",
    matters: "The ideal attention ratio for a conversion page is 1:1 — one page, one goal. Every additional clickable element reduces conversion on the primary action.",
    recommendation: "Strip the login page footer to 3–4 links maximum. Apply visual weight hierarchy (size, colour, contrast) to ensure the primary action always dominates.",
  },
  {
    id: 11,
    name: "Paradox of Choice",
    shortName: "Choice Paradox",
    category: "Navigation",
    definition: "Cognitive overload from too many options.",
    studentScore: 2,
    educatorScore: 3,
    screenshot: "08-training-nav-19-items.jpg",
    observed: "The Training dropdown navigation on StudentLife lists 19 distinct tools in a flat alphabetical list with no grouping, no descriptions, and no visual differentiation. A first-time student has no way to know which of these 19 tools is relevant to them.",
    matters: "Barry Schwartz's paradox of choice: beyond 7 (plus or minus 2) options, decision-making quality degrades and users often choose nothing. 19 ungrouped options is three times the cognitive load limit.",
    recommendation: "Group the 19 tools into 4 categories: Assessment & Exams, Clinical Simulations, Learning & Study Resources, and Portal & Technical. Use a megamenu format with category headers.",
  },
  {
    id: 12,
    name: "Principles of Landing Pages",
    shortName: "Landing Principles",
    category: "Conversion",
    definition: "Value prop, social proof, CTA hierarchy.",
    studentScore: 4,
    educatorScore: 3,
    screenshot: "11-education-homepage.jpg",
    observed: "The education landing page has a headline and one off-site CTA. There is no visible outcome data, no testimonials, no feature list, and no demonstration of the product. The page is shorter than a typical mobile screen when the hero is collapsed.",
    matters: "Effective B2B landing pages require: a clear value proposition, supporting evidence (data or social proof), a demonstration of value, and a low-friction next step. None of these are present.",
    recommendation: 'Rebuild the educator landing page to include: 3 outcome statistics, 1 faculty testimonial, a feature comparison snapshot, and a "Request a demo" or "Talk to your rep" primary CTA above the fold.',
  },
  {
    id: 13,
    name: "Form Audit",
    shortName: "Form Audit",
    category: "Conversion",
    definition: "Friction, field count, progressive disclosure.",
    studentScore: 4,
    educatorScore: 4,
    screenshot: "06-registration-form.jpg",
    observed: 'The student registration form requires: first name, last name, email, confirm email, phone, password, confirm password, institution country, institution state, institution name, programme type, year of graduation — 12 fields before account creation. No progressive disclosure is used. The login form uses a staged reveal (email first, then password) which is good but the "Get a one-time code" option is visually de-emphasised.',
    matters: "Each additional form field reduces completion rates by approximately 11%. A 12-field registration form is likely losing 60–80% of users who start it. Healthcare students are often on mobile with limited time between lectures.",
    recommendation: "Reduce registration to 4 fields: email, password, role, institution. Collect remaining profile data progressively after first login. Add inline field validation.",
  },
  {
    id: 14,
    name: "Checkout Abandonment",
    shortName: "Checkout",
    category: "Conversion",
    definition: "Barriers in the conversion flow.",
    studentScore: 3,
    educatorScore: 4,
    screenshot: "02-student-store-above-fold.jpg",
    observed: "The access code redemption flow requires: (1) navigate to the correct portal, (2) sign in or create an account (12-field form), (3) locate the redemption field, (4) enter the code, (5) confirm access. Elsevier's own support documentation includes a dedicated video tutorial because the flow is non-obvious. The access code format hint uses monospace inline code styling that is difficult to read on mobile.",
    matters: "Every additional step in a conversion flow increases abandonment. A 5-step flow to access already-purchased content is a retention risk — students who cannot access their materials on day one are likely to seek alternatives or disengage.",
    recommendation: "Surface the access code redemption field as the #1 priority action for unauthenticated users arriving at the student store. Move it above the search bar and make it the first thing a new visitor sees.",
  },
  {
    id: 15,
    name: "Occam's Razor",
    shortName: "Occams Razor",
    category: "Architecture",
    definition: "Simplest solution principle applied to UX.",
    studentScore: 2,
    educatorScore: 2,
    screenshot: "01-homepage-role-selector.jpg",
    observed: "The Evolve ecosystem consists of: the main portal (/cs/), a WordPress student life site, a WordPress education site, external elsevier.com product pages, the HESI sub-system, VitalSource eBook integration, Canvas/LMS integrations, and a dedicated support centre. A student completing their first week of nursing school must navigate across at least 3–4 of these to access their materials.",
    matters: "Occam's Razor applied to UX: the simplest solution that achieves the goal is the best solution. Complexity accumulates over time and is rarely removed deliberately. This ecosystem has grown without pruning.",
    recommendation: "Conduct a full information architecture audit with a goal of consolidating to one authenticated portal experience. The public-facing sites (/studentlife, /education) should serve as marketing pages that funnel to the single portal — not parallel destinations.",
  },
];

export const studentScores = heuristics.map((h) => h.studentScore);
export const educatorScores = heuristics.map((h) => h.educatorScore);
export const studentAvg = +(studentScores.reduce((a, b) => a + b, 0) / studentScores.length).toFixed(1);
export const educatorAvg = +(educatorScores.reduce((a, b) => a + b, 0) / educatorScores.length).toFixed(1);

export function getScoreColor(score: number): string {
  if (score <= 3) return "#E24B4A";
  if (score <= 6) return "#EF9F27";
  return "#1D9E75";
}

export function getScoreBg(score: number): string {
  if (score <= 3) return "rgba(226,75,74,0.15)";
  if (score <= 6) return "rgba(239,159,39,0.15)";
  return "rgba(29,158,117,0.15)";
}

export function getSeverity(studentScore: number, educatorScore: number): string {
  const avg = (studentScore + educatorScore) / 2;
  if (avg <= 3) return "Critical";
  if (avg <= 5) return "Major";
  return "Moderate";
}

export function getSeverityColor(severity: string): string {
  if (severity === "Critical") return "#E24B4A";
  if (severity === "Major") return "#EF9F27";
  return "#1D9E75";
}
