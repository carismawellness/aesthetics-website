'use client';

import { useState, useId } from 'react';
import Image from 'next/image';
import type { CSSProperties, MouseEvent as ReactMouseEvent, FocusEvent as ReactFocusEvent } from 'react';
import { type Testimonial } from '@/lib/bodypkg/testimonials';

// WCAG 2.2 AA-corrected (darkened within brand hues) — see BodyPackagePage palette notes
const GREEN = '#365568';      // carousel arrow controls — 3:1+ UI contrast on white
const QUOTE_TEXT = '#5e5349'; // quote / name / "Read more" — 4.5:1+ on gradient cards
const BODY = 'Roboto, sans-serif';

function TestimonialCard({ t, carouselId, index }: { t: Testimonial; carouselId: string; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const expandBtnId = `${carouselId}-expand-${index}`;
  const quoteId = `${carouselId}-quote-${index}`;

  return (
    /* blockquote gives correct semantics for testimonial text (P6/spec) */
    <figure
      className="card review-card"
      style={{ padding: '20px 10px', margin: '0 10px', boxSizing: 'border-box' }}
    >
      {/* Before/after image — meaningful alt text (P1) */}
      <Image
        src={t.image}
        alt={`${t.name} before and after treatment result`}
        width={400}
        height={400}
        loading="lazy"
        sizes="(max-width: 640px) 90vw, 33vw"
        style={{ width: '100%', borderRadius: 16, display: 'block' }}
      />

      <div style={{ background: 'linear-gradient(178deg, #f0f5f5 42%, #bdd1d1 100%)', borderRadius: 16, padding: '15px', paddingTop: 70, marginTop: -91 }}>
        {/* blockquote wraps the testimonial for proper semantics */}
        <blockquote
          id={quoteId}
          cite={undefined}
          style={{ margin: 0, padding: 0 }}
        >
          <p
            style={{
              color: QUOTE_TEXT,
              fontFamily: BODY,
              fontSize: 14,
              lineHeight: 1.6,
              margin: '0 0 5px',
              ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }),
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </blockquote>

        {/* Read more / less — 44px tap target (P2) */}
        <button
          id={expandBtnId}
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={quoteId}
          className="link-underline"
          style={{
            background: 'none',
            border: 'none',
            padding: '8px 0',
            minHeight: 44,
            cursor: 'pointer',
            fontSize: 14,
            color: QUOTE_TEXT,
            fontFamily: BODY,
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'opacity 200ms ease',
            outline: 'none',
          }}
          onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${GREEN}`; e.currentTarget.style.outlineOffset = '2px'; }}
          onBlur={(e) => { e.currentTarget.style.outline = 'none'; }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>

        {/* cite element for attribution */}
        <figcaption>
          <cite style={{ fontStyle: 'normal', display: 'block', fontSize: 16, fontWeight: 500, color: QUOTE_TEXT, marginTop: 12, fontFamily: BODY }}>
            — {t.name}
          </cite>
        </figcaption>
      </div>
    </figure>
  );
}

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  const [start, setStart] = useState(0);
  const carouselId = useId();
  const liveId = `${carouselId}-live`;
  const n = items.length;
  const per = Math.min(3, n);
  const visible = Array.from({ length: per }, (_, i) => items[(start + i) % n]);

  const arrow: CSSProperties = {
    position: 'absolute',
    top: '38%',
    transform: 'translateY(-50%)',
    // 44×44 min tap target (P2)
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: `1.5px solid ${GREEN}`,
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.85)',
    color: GREEN,
    fontSize: 24,
    lineHeight: 1,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 250ms ease, background-color 200ms ease',
    outline: 'none',
  };

  const onArrowEnter = (e: ReactMouseEvent<HTMLButtonElement> | ReactFocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)';
  };
  const onArrowLeave = (e: ReactMouseEvent<HTMLButtonElement> | ReactFocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-50%)';
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
  };
  const onArrowFocus = (e: ReactFocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
    e.currentTarget.style.outline = `2px solid ${GREEN}`;
    e.currentTarget.style.outlineOffset = '2px';
  };
  const onArrowBlur = (e: ReactFocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-50%)';
    e.currentTarget.style.outline = 'none';
  };

  const goNext = () => setStart((start + 1) % n);
  const goPrev = () => setStart((start - 1 + n) % n);

  return (
    <section
      aria-label="Customer testimonials"
      style={{ position: 'relative', padding: '0 44px', marginTop: 36 }}
    >
      {/* Live region announces slide changes to screen readers (P1 / spec) */}
      <div
        id={liveId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        {`Showing testimonials ${start + 1} to ${start + per} of ${n}`}
      </div>

      {/* Previous arrow */}
      <button
        type="button"
        aria-label={`Previous testimonials (${start === 0 ? n : start} of ${n})`}
        onClick={goPrev}
        onMouseEnter={onArrowEnter}
        onMouseLeave={onArrowLeave}
        onFocus={onArrowFocus}
        onBlur={onArrowBlur}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(0.95)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)'; }}
        style={{ ...arrow, left: 0 }}
      >
        <span aria-hidden="true">&#8249;</span>
      </button>

      {/* Carousel track — role="list" so each card is a "list item" */}
      <div
        className="fr-testi"
        role="list"
        aria-label="Testimonials carousel"
        style={{ display: 'flex' }}
      >
        {visible.map((t, i) => (
          <div
            key={`${start}-${i}`}
            role="listitem"
            style={{ flex: '1 1 0', minWidth: 0 }}
          >
            <TestimonialCard t={t} carouselId={carouselId} index={i} />
          </div>
        ))}
      </div>

      {/* Next arrow */}
      <button
        type="button"
        aria-label={`Next testimonials (${(start + per) % n + 1} of ${n})`}
        onClick={goNext}
        onMouseEnter={onArrowEnter}
        onMouseLeave={onArrowLeave}
        onFocus={onArrowFocus}
        onBlur={onArrowBlur}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(0.95)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)'; }}
        style={{ ...arrow, right: 0 }}
      >
        <span aria-hidden="true">&#8250;</span>
      </button>
    </section>
  );
}
