"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   HeroAutoplayVideo — LCP-safe hero media.

   Used ONLY where PageHero receives media.autoPlay === true (the home hero).

   THE RULE (do not regress this):
   The Largest Contentful Paint is ALWAYS the static poster, rendered through
   next/image with priority — a small, responsive, viewport-sized AVIF/WebP that
   loads first and competes with nothing. The video is a progressive enhancement
   layered ON TOP that:
     • never loads on mobile / coarse-pointer / reduced-motion / Save-Data /
       slow connections (poster is the whole experience there), and
     • on capable desktops, is mounted only AFTER first paint + idle, with
       preload deferred, so its bytes never contend with the LCP image.

   This is why mobile and desktop scores move together instead of see-sawing:
   LCP is decoupled from the (heavy) video entirely. A 24 MB autoplay video
   downloading on mobile Slow-4G was saturating the connection and pushing LCP
   past 15 s; the poster-first model keeps LCP ≈ FCP on every device.
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
  const [muted, setMuted] = useState(true);

  // Whether to mount the <video> at all (capable device/network), and whether it
  // has buffered enough to fade in over the poster. Default: video OFF — the
  // poster alone is shipped until we prove the device/network can afford more.
  const [mountVideo, setMountVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 820px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Respect Save-Data and slow effective connection types (2g/3g).
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const saveData = conn?.saveData === true;
    const slowNet = /(^|-)2g$|3g/.test(conn?.effectiveType ?? "");

    // Mobile, touch, reduced-motion, data-saver, or a slow link → poster only.
    if (reduce || small || coarse || saveData || slowNet) return;

    // Capable desktop: defer the video until the browser is idle (i.e. after the
    // LCP poster has painted), so video bytes never race the LCP image.
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 400));
    const handle = idle(() => setMountVideo(true));
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
  }, []);

  // Once the deferred <video> is mounted, kick playback (muted autoplay).
  useEffect(() => {
    if (!mountVideo) return;
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [mountVideo]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.volume = 1;
    setMuted(next);
  };

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: radius, isolation: "isolate" }}>
      {/* LCP element — always present, prioritized, responsive. next/image serves a
          viewport-sized AVIF/WebP, so mobile gets ~30–60 KB instead of the full poster. */}
      {poster && (
        <Image
          src={poster}
          alt={alt || "Carisma Aesthetics Malta"}
          fill
          priority
          sizes="(min-width: 900px) 480px, 100vw"
          quality={80}
          style={{ objectFit, display: "block" }}
        />
      )}

      {/* Progressive enhancement — deferred video, faded in over the poster only
          once it can play. Never mounted on mobile/reduced-motion/Save-Data/slow. */}
      {mountVideo && (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={ref}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label={alt}
            onCanPlay={() => setVideoReady(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit,
              display: "block",
              borderRadius: radius,
              opacity: videoReady ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
          />

          {videoReady && (
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
        </>
      )}
    </div>
  );
}
