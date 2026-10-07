import { CSSProperties, useEffect, useRef, useState } from "react";

interface CaseStudyVideoProps {
  src: string;
  ariaLabel: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Silent, looping product video for case-study pages.
 * Only decodes while ≥40% on screen; falls back to native controls
 * when the visitor prefers reduced motion.
 */
const CaseStudyVideo = ({ src, ariaLabel, className = "", style }: CaseStudyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.4] }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      className={`aspect-video overflow-hidden rounded-xl border border-border bg-black ${className}`}
      style={style}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        controls={reducedMotion}
        className="block h-auto w-full"
      />
    </div>
  );
};

export default CaseStudyVideo;
