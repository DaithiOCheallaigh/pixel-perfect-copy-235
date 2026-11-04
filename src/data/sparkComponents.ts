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
    summary: "A collapsed rail of study tools that opens into labelled buttons.",
    purpose:
      "A narrow rail of study tools that sits beside the topic the student is reading. Eight ways to work with the same material: test, review, brief, map, explore in 3D, explain back, compare, and work a case. One click each, without leaving the page.",
    benefits: [
      { title: "Out of the way", text: "At 56px wide it leaves the reading column its full space. The content stays the focus; the tools wait at the edge." },
      { title: "Names on demand", text: "Icons stay compact. The name appears on hover or keyboard focus as a dark pill, and the chevron at the top opens the rail into a panel of labelled buttons when a student wants to read every option." },
      { title: "Opens over, not across", text: "The expanded panel floats over the edge of the page instead of pushing the reading column aside, so the text never reflows. Escape folds it back." },
      { title: "Ordered like a study loop", text: "Check what you know, understand it, then apply it. The order of the icons follows that sequence." },
      { title: "Accessible by default", text: "A proper toolbar: one tab stop, arrow keys between the chevron and the tools, a pressed state on the open tool, labels on focus as well as hover, and no motion for people who prefer reduced motion." },
    ],
    hint: "Open the chevron to see every tool by name, or hover the icons.",
    source,
  },
  {
    id: "record-flow",
    number: "02",
    title: "Record a lecture",
    summary: "One mic button, time-stamped notes and a transcript on Stop.",
    purpose:
      "Students can capture a lecture without leaving their study space. One microphone button opens a recorder where they take their own time-stamped notes. Pressing Stop generates the transcript with those notes slotted in, and MEW AI summarises it and checks the claims against Elsevier sources.",
    benefits: [
      { title: "A low-commitment way in", text: "A single icon button that sits with the other source actions. Starting is one click, with no setup screen." },
      { title: "Your notes become part of the record", text: "Each note is time-stamped as you press Enter and slotted into the transcript beside what was said, marked clearly as yours." },
      { title: "A title that writes itself", text: "A few seconds in, the lecture is named from what is being said. It stays an editable field, and anything you type is never overwritten." },
      { title: "Never unsure it's recording", text: "A live waveform, a running timer and clear Pause and Stop controls keep the state visible at all times." },
      { title: "Ends with something useful", text: "Stop generates the full transcript, with a Summary tab holding a three-point summary and the key claims checked against Elsevier sources, with a wrong claim flagged alongside the correction." },
      { title: "Consent in context", text: "The reminder that everyone being transcribed has agreed sits in the recorder itself, at the moment it matters." },
    ],
    hint: "Click the microphone, type a few notes as you go, then press Stop to generate the transcript. Use the steps above to jump to any stage.",
    source,
  },
];

/** `id` doubles as the URL slug. */
export const getSparkComponent = (slug: string | undefined) => sparkComponents.find((c) => c.id === slug);

export const nextSparkComponent = (id: SparkComponentId) => {
  const i = sparkComponents.findIndex((c) => c.id === id);
  return sparkComponents.length > 1 ? sparkComponents[(i + 1) % sparkComponents.length] : undefined;
};
