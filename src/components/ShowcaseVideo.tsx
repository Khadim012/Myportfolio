"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short, muted product showcase. It loads nothing until it is near the
 * viewport, plays only while visible, and never autoplays for people who
 * prefer reduced motion. A visible button pauses or plays it.
 */
export function ShowcaseVideo({
  src,
  poster,
  width,
  height,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          if (!reduce && !userPaused.current) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full rounded-[1.75rem] border border-line bg-paper-deep shadow-[0_18px_40px_-22px_rgb(22_19_15/0.35)]"
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="absolute right-3 top-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink/85 px-4 text-sm font-medium text-paper backdrop-blur transition-colors hover:bg-ink"
      >
        {playing ? (
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
            <rect x="3" y="2" width="3.5" height="12" rx="1" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M4 2.5v11a.8.8 0 0 0 1.2.7l9-5.5a.8.8 0 0 0 0-1.4l-9-5.5A.8.8 0 0 0 4 2.5z" />
          </svg>
        )}
        {playing ? "Pause" : "Play"}
        <span className="sr-only"> app video</span>
      </button>
    </div>
  );
}
