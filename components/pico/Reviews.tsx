"use client";

import Image from "next/image";
import { useState } from "react";
import { A, Serif } from "./_shared";

// Reviews — "precision tattoo removal in malta"
// 4 testimonial cards, each with a before/after result image,
// a clamped italic body with expandable "Read more", and a reviewer name.

const REVIEWS = [
  {
    img: `${A}/pico-rev1.png`,
    alt: "Before and after tattoo removal result for Morina G.",
    body: "I wanted to fade an old tattoo before getting it covered, and the team made me feel completely comfortable from the first consultation. They explained how the Pico Laser works, what results I could realistically expect, and how many sessions may be needed. The treatment felt professional, precise, and much more reassuring than I expected. I could see the tattoo gradually fading after each visit, and the aftercare guidance made the whole process feel safe and well-managed.",
    name: "Morina G.",
  },
  {
    img: `${A}/pico-rev2.png`,
    alt: "Before and after tattoo removal result for Daniela A.",
    body: "I was nervous about laser tattoo removal, but the Pico Laser treatment felt much more manageable than I expected. The team checked my skin carefully, explained the process clearly, and made sure I understood what would happen during and after the treatment. I really appreciated that they didn't overpromise instant results and instead gave me a proper treatment plan. It felt calm, professional, and tailored to my skin.",
    name: "Daniela A.",
  },
  {
    img: `${A}/pico-rev3.png`,
    alt: "Before and after tattoo removal result for Claire V.",
    body: "My tattoo had been bothering me for years, but I didn't want anything rushed or aggressive. Carisma gave me a proper plan based on my skin, tattoo size, and ink depth, which made me feel confident from the beginning. The fading has been gradual, but I can clearly see the difference after each session. What I liked most was how honest and careful the team was throughout the process.",
    name: "Claire V.",
  },
  {
    img: `${A}/pico-rev4.png`,
    alt: "Before and after tattoo removal result for Rachel B.",
    body: "I had a small tattoo I wanted removed for work reasons, and I wanted the process to be handled safely. The consultation was honest, clear, and very reassuring. They explained that tattoo removal takes time and depends on the ink, skin type, and how the tattoo responds. The treatment itself was precise, and I felt comfortable knowing I was being looked after by a medically qualified team.",
    name: "Rachel B.",
  },
];

function ReviewCard({ r }: { r: (typeof REVIEWS)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const reviewId = r.name.replace(/\s/g, "-").toLowerCase();

  return (
    <article
      className="card review-card flex flex-col"
      aria-label={`Review from ${r.name}`}
      style={{
        background: "rgba(255,255,255,0.6)",
        overflow: "hidden",
      }}
    >
      {/* Before/after image */}
      <div style={{ position: "relative", aspectRatio: "2 / 1", flexShrink: 0 }}>
        <Image
          src={r.img}
          alt={r.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col" style={{ padding: "20px", flex: 1 }}>
        {/* Stars — accessible */}
        <div
          role="img"
          aria-label="Rated 5 out of 5 stars"
          className="flex"
          style={{ gap: "2px", marginBottom: "10px" }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <svg
              key={i}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#9c8344"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Review body — clamped or full */}
        <p
          id={`review-body-${reviewId}`}
          style={{
            fontSize: "13px",
            color: "var(--label)",
            lineHeight: 1.7,
            fontStyle: "italic",
            margin: 0,
            ...(expanded
              ? {}
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }),
          }}
        >
          {r.body}
        </p>

        {/* Read more / less toggle */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`review-body-${reviewId}`}
          onClick={() => setExpanded((v) => !v)}
          style={{
            display: "inline-block",
            fontSize: "13px",
            color: "#406060",
            marginTop: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            textAlign: "left",
            minHeight: "44px",
            minWidth: "44px",
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>

        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#4a4a4a",
            marginTop: "8px",
          }}
        >
          — {r.name}
        </span>
      </div>
    </article>
  );
}

export default function Reviews() {
  return (
    <section
      aria-labelledby="reviews-heading"
      style={{ padding: "70px 24px" }}
    >
      <Serif
        style={{ fontSize: "clamp(22px,3vw,30px)", letterSpacing: "0.1em" }}
      >
        Real Tattoo Removal Results from Our Malta Patients
      </Serif>
      <p id="reviews-heading" className="sr-only">
        Customer reviews for Pico laser tattoo removal
      </p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: "1160px", margin: "40px auto 0", gap: "24px" }}
        role="list"
        aria-label="Customer reviews"
      >
        {REVIEWS.map((r) => (
          <div key={r.name} role="listitem">
            <ReviewCard r={r} />
          </div>
        ))}
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </section>
  );
}
