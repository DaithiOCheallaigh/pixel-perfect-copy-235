export type SparkComponentId = "tool-rail" | "record-flow";

export interface SparkComponentEntry {
  id: SparkComponentId;
  number: string;
  title: string;
  /** One-line card description on the index. */
  summary: string;
  purpose: string;
  benefits: { title: string; text: string }[];
  hint: string;
  source: string;
}

const source = "From the Alpha prototype, built on Elsevier's Leyden design system";

export const sparkComponents: SparkComponentEntry[] = [
  {
    id: "tool-rail",
    number: "01",
    title: "Study tools rail",
    summary: "A collapsed rail of study tools. Names appear on hover.",
    purpose:
      "A narrow rail of study tools that sits beside the topic the student is reading. Eight ways to work with the same material: test, review, brief, map, explore in 3D, explain back, compare, and work a case. One click each, without leaving the page.",
    benefits: [
      { title: "Out of the way", text: "At 56px wide it leaves the reading column its full space. The content stays the focus; the tools wait at the edge." },
      { title: "Names on demand", text: "Icons stay compact. The name appears on hover or keyboard focus as a dark pill, so students learn the vocabulary without a permanent column of labels." },
      { title: "Ordered like a study loop", text: "Check what you know, understand it, then apply it. The order of the icons follows that sequence." },
      { title: "Accessible by default", text: "Every icon is a real button with an accessible name, the label shows on focus as well as hover, and motion is removed for people who prefer reduced motion." },
    ],
    hint: "Hover, tap or tab through the icons.",
    source,
  },
  {
    id: "record-flow",
    number: "02",
    title: "Record a lecture",
    summary: "One mic button, a live recorder and a streaming transcript.",
    purpose:
      "Students can capture a lecture without leaving their study space. One microphone button opens a recorder where they take their own notes while a live transcript builds alongside. Afterwards MEW AI summarises the notes and the transcript and checks the claims against Elsevier sources.",
    benefits: [
      { title: "A low-commitment way in", text: "A single icon button that sits with the other source actions. Starting is one click, with no setup screen." },
      { title: "Notes and transcript, side by side", text: "Students keep typing their own notes while the transcript runs. A tab switch shows either one. Nothing is lost by choosing." },
      { title: "Never unsure it's recording", text: "A live waveform, a running timer and clear Pause and Stop controls keep the state visible at all times." },
      { title: "Consent in context", text: "The reminder that everyone being transcribed has agreed sits in the recorder itself, at the moment it matters." },
    ],
    hint: "Click the microphone, then try the tabs, Pause and Stop. Use the steps above to jump to any stage.",
    source,
  },
];

/** `id` doubles as the URL slug. */
export const getSparkComponent = (slug: string | undefined) => sparkComponents.find((c) => c.id === slug);

export const nextSparkComponent = (id: SparkComponentId) => {
  const i = sparkComponents.findIndex((c) => c.id === id);
  return sparkComponents.length > 1 ? sparkComponents[(i + 1) % sparkComponents.length] : undefined;
};
