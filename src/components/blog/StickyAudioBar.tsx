import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTime, type AudioPlayerState } from "./useAudioPlayer";

interface Props {
  player: AudioPlayerState;
  title: string;
  minutes: number;
  visible: boolean;
  onClose: () => void;
}

const iconBtn =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const StickyAudioBar = ({ player, title, minutes, visible, onClose }: Props) => {
  const { playing, current, duration, muted, error, toggle, seek, toggleMute } = player;
  const started = playing || current > 0;
  const status = error
    ? "Audio unavailable right now"
    : started
      ? `Audio version · ${formatTime(current)} / ${formatTime(duration)}`
      : `AI narration · ${minutes} min`;

  const seekBar = (
    <input
      type="range" min={0} max={Math.round(duration)} step={1} value={Math.round(current)}
      aria-label="Seek" tabIndex={visible ? 0 : -1}
      onChange={(e) => seek(Number(e.target.value))}
      className="min-h-11 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-moz-range-progress]:h-1 [&::-moz-range-progress]:bg-primary [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-primary/30 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-primary/30 [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
    />
  );

  return (
    <div
      data-testid="sticky-audio-bar"
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/50 bg-background/80 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur-md transition-transform duration-300",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <div className="mx-auto max-w-3xl px-6 py-2">
        <div className="flex items-center gap-3">
          <button
            type="button" onClick={toggle} tabIndex={visible ? 0 : -1}
            aria-label={playing ? "Pause audio version" : "Play audio version"} aria-pressed={playing}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
              {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />}
            </span>
          </button>
          <div className="min-w-0 flex-1 sm:w-56 sm:flex-none">
            <p className="truncate text-sm font-semibold text-foreground">{title}</p>
            <p className="truncate font-mono text-xs text-muted-foreground">{status}</p>
          </div>
          <div className="hidden flex-1 sm:block">{seekBar}</div>
          <button type="button" onClick={toggleMute} tabIndex={visible ? 0 : -1} aria-label={muted ? "Unmute" : "Mute"} className={cn(iconBtn, "hidden sm:flex")}>
            {muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
          </button>
          <button type="button" onClick={onClose} tabIndex={visible ? 0 : -1} aria-label="Hide player" className={iconBtn}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="sm:hidden">{seekBar}</div>
      </div>
    </div>
  );
};

export default StickyAudioBar;
