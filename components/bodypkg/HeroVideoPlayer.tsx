'use client';

import { useRef, useState } from 'react';

export default function HeroVideoPlayer({
  src,
  poster,
  ratio = '398 / 682',
  alt,
}: {
  src: string;
  poster?: string;
  ratio?: string;
  alt: string;
}) {
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
    <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', borderRadius: 18, display: 'block', backgroundColor: '#eaf0f6' }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        title={muted ? 'Tap to hear the doctor' : 'Mute'}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        onFocus={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
        onBlur={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        style={{ position: 'absolute', bottom: 12, right: 12, width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: 'rgba(20,22,20,0.72)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: 0, transition: 'transform 250ms ease' }}
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
