import { createElement, useCallback, useEffect, useRef, useState } from "react";

interface Options {
  src: string;
  durationSeconds: number;
}

/** One instance per BlogPost render; shared by the Listen button and StickyAudioBar. */
export function useAudioPlayer({ src, durationSeconds }: Options) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [error, setError] = useState(false);

  // Route changes between posts keep this hook mounted: reset per narration.
  useEffect(() => {
    ref.current?.pause();
    setPlaying(false);
    setCurrent(0);
    setDuration(durationSeconds);
    setError(false);
  }, [src, durationSeconds]);

  useEffect(() => {
    const audio = ref.current;
    return () => { audio?.pause(); };
  }, []);

  const play = useCallback(async () => {
    try { await ref.current?.play(); } catch { setError(true); }
  }, []);
  const pause = useCallback(() => ref.current?.pause(), []);
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);
  const seek = useCallback((t: number) => {
    setCurrent(t);
    if (ref.current) ref.current.currentTime = t;
  }, []);
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

  return { playing, current, duration, muted, error, toggle, play, pause, seek, toggleMute, audioElement };
}

export type AudioPlayerState = ReturnType<typeof useAudioPlayer>;

export const formatTime = (seconds: number): string => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
