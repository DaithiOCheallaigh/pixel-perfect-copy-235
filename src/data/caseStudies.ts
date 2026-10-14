import { projects, type Project } from "./projects";

/** Case studies with their own bespoke page component and /work route. */
const bespokePaths: Record<string, string> = {
  spark: "/work/spark",
  "marsh-design-system": "/work/marsh-design-system",
  "marsh-internal-tooling": "/work/marsh-internal-tooling",
};

export const caseStudyPath = (id: string) => bespokePaths[id] ?? `/case/${id}`;

/** Next published case study in /work order, wrapping round; coming-soon projects are skipped. */
export function getNextProject(id: string): Project | null {
  const list = projects.filter((p) => !p.comingSoon);
  const index = list.findIndex((p) => p.id === id);
  if (index < 0 || list.length < 2) return null;
  return list[(index + 1) % list.length];
}
