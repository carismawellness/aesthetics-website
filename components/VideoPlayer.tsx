"use client";

import { useRef, useState } from "react";

/**
 * VideoPlayer — the single video primitive for the whole site.
 *
 * Requirements it enforces everywhere:
 *  - NEVER autoplays. Shows the poster (or first frame) with a play button.
 *  - Pressing play starts the video at FULL VOLUME (unmuted, volume = 1).
 *  - A sound button lets the user mute / unmute at any time.
 *  - Clicking the video toggles play / pause.
 *
 * Layout flexibility (to fit every existing usage):
 *  - default: intrinsic — width 100%, height auto (like an <img>).
 *  - `ratio="4 / 5"`: wrapper gets that aspect-ratio, video covers it.
 *  - `cover`: video fills the wrapper (give the wrapper a height via `style`).
 *  - `fill`: wrapper is absolute inset:0 to fill its positioned parent.
 */
type Props = {
  src: string;
  poster?: string;
  ratio?: string;
  cover?: boolean;
  fill?: boolean;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  objectFit?: "cover" | "contain";
  radius?: number | string;
  label?: string;
};

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#4f7373" aria-hidden style={{ marginLeft: "3px" }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function SoundOnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
function SoundOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function VideoPlayer({
  src,
  poster,
  ratio,
  cover,
  fill,
  loop = true,
  className,
  style,
  videoStyle,
  objectFit = "cover",
  radius = 16,
  label,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const coverFill = Boolean(fill || ratio || cover);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1; // every press plays at full volume
    setMuted(false);
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };
  const togglePlay = () => (playing ? pause() : play());
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.volume = 1;
    setMuted(next);
  };

  const wrapperStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, overflow: "hidden", borderRadius: radius, isolation: "isolate", ...style }
    : {
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
        isolation: "isolate",
        ...(ratio ? { aspectRatio: ratio } : {}),
        ...style,
      };

  // The shape's radius is applied to the <video> ITSELF — a playing (GPU-
  // composited) video ignores an ancestor's overflow/border-radius clip and
  // would otherwise snap to a rectangle on play. Rounding the element keeps the
  // container shape intact while object-fit:cover fills it fully.
  const vStyle: React.CSSProperties = coverFill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit, display: "block", cursor: "pointer", borderRadius: radius, ...videoStyle }
    : { width: "100%", height: "auto", objectFit, display: "block", cursor: "pointer", borderRadius: radius, ...videoStyle };

  return (
    <div className={className} style={wrapperStyle}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        preload="metadata"
        aria-label={label}
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        style={vStyle}
      />

      {/* Play button (shown until the user starts it) */}
      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label="Play video"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            background: "rgba(20,22,20,0.20)",
            padding: 0,
            transition: "background 0.2s ease",
          }}
        >
          <span
            style={{
              width: 66,
              height: 66,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.94)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
            }}
          >
            <PlayIcon />
          </span>
        </button>
      )}

      {/* Sound on/off (visible once playing) */}
      {playing && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Unmute video" : "Mute video"}
          title={muted ? "Unmute" : "Mute"}
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: "rgba(20,22,20,0.72)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            zIndex: 3,
          }}
        >
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
      )}
    </div>
  );
}
