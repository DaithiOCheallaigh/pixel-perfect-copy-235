/**
 * Type-only fallback for Intl.Segmenter, used by the licensed React Bits
 * vapor-type.tsx (kept byte-identical). Lets the file type-check even when a
 * checker runs with a pre-ES2022 lib; with ES2022 libs this merges harmlessly.
 */
declare namespace Intl {
  interface SegmenterOptions {
    granularity?: "grapheme" | "word" | "sentence";
    localeMatcher?: "lookup" | "best fit";
  }
  interface SegmentData {
    segment: string;
    index: number;
    input: string;
    isWordLike?: boolean;
  }
  interface Segments {
    containing(codeUnitIndex?: number): SegmentData | undefined;
    [Symbol.iterator](): IterableIterator<SegmentData>;
  }
  interface Segmenter {
    segment(input: string): Segments;
  }
}
// eslint-disable-next-line no-var
declare var __intlSegmenterShim: never;
