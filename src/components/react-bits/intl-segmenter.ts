// Explicit browser API declarations for compiler environments with incomplete Intl libraries.
export {};

declare global {
namespace Intl {
  interface SegmenterOptions {
    localeMatcher?: "best fit" | "lookup";
    granularity?: "grapheme" | "word" | "sentence";
  }

  interface SegmentData {
    segment: string;
    index: number;
    input: string;
    isWordLike?: boolean;
  }

  interface Segments {
    [Symbol.iterator](): IterableIterator<SegmentData>;
  }

  interface Segmenter {
    segment(input: string): Segments;
  }

  const Segmenter: {
    prototype: Segmenter;
    new (locales?: string | readonly string[], options?: SegmenterOptions): Segmenter;
  };
}
}