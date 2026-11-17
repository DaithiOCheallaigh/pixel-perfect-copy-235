import { createElement, useCallback, useEffect, useRef, useState } from "react";

interface Options {
  src: string;
  durationSeconds: number;
  /** Site-relative URL of the read-along JSON (public/audio/blog/<id>.words.json); fetched on first play. */
  wordTimings?: string;
}
interface TimedWord { key: string; start: number; end: number }
interface Timings { offset: number; words: TimedWord[] }
export interface WordTimingsJson { version?: number; offsetSeconds?: number; title?: number[][]; blocks?: number[][][] }

/** Flattens words.json into one time-sorted list keyed "t:<i>" (title) and "b:<block>:<i>" (content). */
export function flattenTimings(json: WordTimingsJson): Timings {
  const words: TimedWord[] = [];
  (json.title ?? []).forEach(([start, end], i) => words.push({ key: `t:${i}`, start, end }));
  (json.blocks ?? []).forEach((block, bi) => block.forEach(([start, end], i) => words.push({ key: `b:${bi}:${i}`, start, end })));
  words.sort((a, b) => a.start - b.start);
  return { offset: json.offsetSeconds ?? 0, words };
}

/** Binary search for the word spoken at t seconds (held for 250 ms after it ends so pauses do not flicker). */
export function findActiveWord(words: TimedWord[], t: number): string | null {
  let lo = 0, hi = words.length - 1, idx = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (words[mid].start <= t) { idx = mid; lo = mid + 1; } else hi = mid - 1;
  }
  return idx >= 0 && t < words[idx].end + 0.25 ? words[idx].key : null;
}

/** One instance per BlogPost render; shared by the Listen button, StickyAudioBar and the read-along text. */
export function useAudioPlayer({ src, durationSeconds, wordTimings }: Options) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [error, setError] = useState(false);
  const [timings, setTimings] = useState<Timings | null>(null);
  const fetchedRef = useRef<string | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  const setActive = useCallback((key: string | null) => {
    if (activeRef.current !== key) { activeRef.current = key; setActiveWord(key); }
  }, []);

  // Route changes between posts keep this hook mounted: reset per narration.
  useEffect(() => {
    ref.current?.pause();
    setPlaying(false);
    setCurrent(0);
    setDuration(durationSeconds);
    setError(false);
    fetchedRef.current = null;
    setTimings(null);
    setActive(null);
  }, [src, durationSeconds, wordTimings, setActive]);

  useEffect(() => {
    const audio = ref.current;
    return () => { audio?.pause(); };
  }, []);

  const loadTimings = useCallback(() => {
    if (!wordTimings || fetchedRef.current === wordTimings) return;
    fetchedRef.current = wordTimings;
    fetch(wordTimings)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: WordTimingsJson) => { if (fetchedRef.current === wordTimings) setTimings(flattenTimings(json)); })
      .catch(() => { /* narration still plays, just without highlighting */ });
  }, [wordTimings]);

  // Drive the active word from the audio clock while playing.
  useEffect(() => {
    if (!playing || !timings) return;
    let frame = 0;
    const tick = () => {
      const audio = ref.current;
      if (audio) setActive(findActiveWord(timings.words, audio.currentTime + timings.offset));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, timings, setActive]);

  const play = useCallback(async () => {
    loadTimings();
    try { await ref.current?.play(); } catch { setError(true); }
  }, [loadTimings]);
  const pause = useCallback(() => ref.current?.pause(), []);
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);
  const seek = useCallback((t: number) => {
    setCurrent(t);
    if (ref.current) ref.current.currentTime = t;
    setActive(t > 0 && timings ? findActiveWord(timings.words, t + timings.offset) : null);
  }, [timings, setActive]);
  const toggleMute = useCallback(() => {
    setMuted((m) => { if (ref.current) ref.current.muted = !m; return !m; });
  }, []);

  const audioElement = createElement("audio", {
    ref, src, preload: "none",
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const d = e.currentTarget.duration;
      if (Number.isFinite(d) && d > 0) setDuration(d);
    },
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => setCurrent(e.currentTarget.currentTime),
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onEnded: () => { setPlaying(false); seek(0); },
    onError: () => setError(true),
  });

  return { activeWord, playing, current, duration, muted, error, toggle, play, pause, seek, toggleMute, audioElement };
}

export type AudioPlayerState = ReturnType<typeof useAudioPlayer>;

export const formatTime = (seconds: number): string => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
