/** Joins description parts and fits them to a 160-character search snippet, cutting on a word boundary. */
export function fitDescription(...parts: (string | undefined | null)[]): string {
  const text = parts.filter(Boolean).map(p => p!.trim().replace(/\s+/g, " ")).join(" ").trim();
  if (text.length <= 160) return text;
  const cut = text.slice(0, 159);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}
