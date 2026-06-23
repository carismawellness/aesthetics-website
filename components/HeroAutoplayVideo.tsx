"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   HeroAutoplayVideo — opt-in auto-loading hero video.

   Used ONLY where PageHero receives media.autoPlay === true (currently the
   home hero). Unlike the shared <VideoPlayer> (poster + click-to-play), this
   variant starts the video on its own: muted + loop + playsInline so iOS/Safari
   autoplay the muted track, and preload="auto" so bytes load immediately rather
   than waiting on a poster + click.

   Accessibility: respects prefers-reduced-motion. When the user prefers reduced
   motion we DON'T autoplay — we keep the poster (first-frame) static image and
   render no video, matching the rest of the site's restraint.

   A sound toggle lets the user unmute (the same affordance as VideoPlayer).
   ────────────────────────────────────────────────────────────────────────── */

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

export default function HeroAutoplayVideo({
  src,
  poster,
  alt,
  objectFit = "cover",
  radius = 16,
}: {
  src: string;
  poster?: string;
  alt?: string;
  objectFit?: "cover" | "contain";
  radius?: number | string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [muted, setMuted] = useState(true);

  // Detect reduced-motion preference on the client. Until we know, render the
  // poster only (no autoplay) so we never force motion on a reduced-motion user.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setReady(true);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Kick off playback once we've confirmed motion is allowed. autoPlay on the
  // element handles most browsers; this is a belt-and-braces retry for the ones
  // that gate the attribute.
  useEffect(() => {
    if (!ready || reduced) return;
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [ready, reduced]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.volume = 1;
    setMuted(next);
  };

  // Reduced motion (or before hydration): static poster, no video bytes, no motion.
  if (!ready || reduced) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster || ""}
        alt={alt || "Carisma Aesthetics Malta"}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit, display: "block", borderRadius: radius }}
      />
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: radius, isolation: "isolate" }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={alt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit, display: "block", borderRadius: radius }}
      />

      {/* Sound on/off — lets the user opt into audio (starts muted for autoplay) */}
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
    </div>
  );
}
