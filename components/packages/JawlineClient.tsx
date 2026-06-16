"use client";

import { useRef, useState } from "react";

/* Interactive bits of the Snatch Your Jawline funnel kept as small client
   components so the rest of the page can stay a server component. */

export function HeroVideo({ poster, src, ratio }: { poster: string; src?: string; ratio: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) {
      v.volume = 1;
      void v.play().catch(() => {});
    }
    setMuted(next);
  };

  return (
    <div className="relative" style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.16)" }}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full"
        style={{ display: "block", aspectRatio: ratio, objectFit: "cover" }}
      >
        {src && <source src={src} type="video/mp4" />}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
        className="absolute inline-flex items-center justify-center"
        style={{
          right: "14px",
          bottom: "14px",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "rgba(20,40,40,0.55)",
          backdropFilter: "blur(2px)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.55)",
          cursor: "pointer",
        }}
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
            <path d="M22 9l-6 6M16 9l6 6" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>
    </div>
  );
}

export function TestimonialCard({ t }: { t: { img: string; quote: string; name: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "10px", overflow: "hidden", boxShadow: "0 10px 26px rgba(0,0,0,0.05)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.img} alt={`${t.name}, Carisma Aesthetics client`} loading="lazy" decoding="async" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} />
      <div style={{ padding: "18px 18px 20px" }}>
        <span style={{ color: "var(--gold-deep)", fontSize: "12px", letterSpacing: "1px" }} aria-hidden>★★★★★</span>
        <p style={{ fontSize: "12.5px", color: "var(--label)", lineHeight: 1.6, marginTop: "8px", ...(open ? {} : { display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }) }}>
          {t.quote}
        </p>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} style={{ fontSize: "12px", color: "var(--teal-deep)", marginTop: "10px", background: "none", cursor: "pointer", padding: 0 }}>
          {open ? "Read less" : "Read more"}
        </button>
        <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "12px", fontWeight: 600 }}>— {t.name}</p>
      </div>
    </div>
  );
}
