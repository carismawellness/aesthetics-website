/* ──────────────────────────────────────────────────────────────────────────
   ConsultationProcess — "How a free consultation works at our clinic".
   A vertical numbered step timeline for Carisma Aesthetics, mirroring the
   Carisma Slimming "How GLP-1 Works at Our Clinic" StepTimeline layout
   1:1 (dashed vertical line · dot · big "STEP N" · petal card), recoloured
   to the Aesthetics teal/blue palette. Server component, no JS.

   Palette (AA): --teal-deep #4f7373 (step number, dots, CTA), --teal-text
   #406060 (STEP label, card heading), --teal #96b2b2 (decorative line/halo),
   --teal-100 #deebeb (card gradient tint). NO green/cream/brown, NO bold body.
   Headings: Trajan Pro / Novecento Wide. Body: system font, normal weight.
   ────────────────────────────────────────────────────────────────────────── */

const SERIF = 'Trajan Pro, Georgia, serif'; // STEP label + step number
const WIDE = 'Novecento Wide, sans-serif'; // card heading
const BODY = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'; // body copy
const TEAL_DEEP = '#4f7373'; // step number (AA on white)
const TEAL_TEXT = '#406060'; // STEP label + card heading (AA on white + tints)

type TimelineStep = { title: string; desc: string };

const STEPS: TimelineStep[] = [
  {
    title: 'Book Your Free Consultation',
    desc: 'Choose a time that suits you and reserve your complimentary consultation — no obligation, no pressure, just a relaxed conversation about your skin and your goals.',
  },
  {
    title: 'Meet Your Doctor',
    desc: 'Your aesthetic doctor listens, examines your skin and discusses what you would love to change — so every recommendation is grounded in your concerns, not a one-size-fits-all menu.',
  },
  {
    title: 'Your Personalised Treatment Plan',
    desc: 'Together you map a clear plan: the right treatments, realistic results and transparent pricing — then begin when you are ready, with expert care and ongoing reviews so your confidence keeps growing.',
  },
];

const cardStyle: React.CSSProperties = {
  borderRadius: '18px 44px 18px 44px',
  background: 'linear-gradient(180deg, #ffffff 0%, #deebeb 100%)',
  boxShadow: '0 16px 38px rgba(79,115,115,0.10)',
};

function Card({ s }: { s: TimelineStep }) {
  return (
    <div style={{ ...cardStyle, padding: '20px 24px' }}>
      <h3
        style={{
          fontFamily: WIDE,
          fontSize: 14,
          color: TEAL_TEXT,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
          margin: '0 0 8px',
        }}
      >
        {s.title}
      </h3>
      <p style={{ fontFamily: BODY, fontSize: 14.5, fontWeight: 400, color: '#3a4a4a', lineHeight: 1.6, margin: 0 }}>
        {s.desc}
      </p>
    </div>
  );
}

function Timeline() {
  return (
    <>
      {/* Desktop */}
      <div className="relative mx-auto hidden md:block" style={{ maxWidth: 760 }}>
        <span
          aria-hidden
          style={{ position: 'absolute', left: 22, top: 46, bottom: 46, borderLeft: '1px dashed #96b2b2', zIndex: 0 }}
        />
        {STEPS.map((s, i) => (
          <div
            key={i}
            className="relative grid items-center"
            style={{
              gridTemplateColumns: '44px 84px minmax(0, 460px)',
              columnGap: 22,
              marginBottom: i === STEPS.length - 1 ? 0 : 36,
            }}
          >
            <div className="flex justify-center" style={{ position: 'relative', zIndex: 1 }}>
              <span
                aria-hidden
                style={{ width: 18, height: 18, borderRadius: '50%', background: '#96b2b2', boxShadow: '0 0 0 5px #deebeb' }}
              />
            </div>
            <div className="text-center">
              <div style={{ fontFamily: SERIF, fontSize: 15, color: TEAL_TEXT, letterSpacing: '0.14em' }}>
                Step
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 4vw, 44px)', color: TEAL_DEEP, lineHeight: 1.1 }}>
                {i + 1}
              </div>
            </div>
            <Card s={s} />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden mx-auto" style={{ maxWidth: 480 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ marginBottom: i === STEPS.length - 1 ? 0 : 24 }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
              <span
                aria-hidden
                style={{ width: 16, height: 16, borderRadius: '50%', background: '#96b2b2', boxShadow: '0 0 0 4px #deebeb', flexShrink: 0 }}
              />
              <span style={{ fontFamily: SERIF, color: TEAL_TEXT, letterSpacing: '0.14em', fontSize: 14 }}>
                Step <span style={{ fontSize: 24, color: TEAL_DEEP }}>{i + 1}</span>
              </span>
            </div>
            <Card s={s} />
          </div>
        ))}
      </div>
    </>
  );
}

export default function ConsultationProcess() {
  return (
    <section
      className="py-32"
      aria-labelledby="consultation-process-heading"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow + heading */}
        <div className="text-center mb-14">
          <p
            aria-hidden="true"
            style={{
              color: '#406060',
              fontFamily: 'Novecento Wide, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Free Consultation · Doctor-Led
          </p>
          <div className="mx-auto mb-5" aria-hidden="true" style={{ width: '64px', height: '1px', backgroundColor: '#4f7373' }} />
          <h2
            id="consultation-process-heading"
            style={{
              color: '#4f7373',
              fontFamily: 'Trajan Pro, Georgia, serif',
              fontWeight: 400,
              fontSize: '38px',
              lineHeight: '1.25',
              letterSpacing: '2px',
            }}
          >
            How a free consultation
            <br />
            works at our clinic
          </h2>
        </div>

        {/* Intro */}
        <p
          className="text-center mx-auto mb-4"
          style={{ maxWidth: '680px', color: '#3a4a4a', fontFamily: BODY, fontSize: '15px', fontWeight: 400, lineHeight: '1.7' }}
        >
          Every treatment at Carisma Aesthetics starts with a complimentary, no-pressure consultation with a doctor — so
          your plan is built around your skin, your goals and your comfort. Here&rsquo;s exactly what to expect.
        </p>
        <p
          className="text-center mx-auto mb-12"
          style={{
            maxWidth: '620px',
            color: '#406060',
            fontFamily: 'Novecento Wide, sans-serif',
            fontSize: '13px',
            lineHeight: '1.6',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Honest advice first — only the treatments that are genuinely right for you.
        </p>

        {/* Vertical step timeline */}
        <Timeline />

        {/* Pull-quote */}
        <div className="mx-auto mt-16" style={{ maxWidth: '620px', paddingLeft: '24px' }}>
          <blockquote style={{ borderLeft: '3px solid #4f7373', paddingLeft: '20px' }}>
            <p
              style={{
                color: '#406060',
                fontFamily: 'Trajan Pro, Georgia, serif',
                fontSize: '15px',
                lineHeight: '1.65',
                fontStyle: 'italic',
                letterSpacing: '0.3px',
                margin: 0,
              }}
            >
              Your consultation is completely free and entirely yours — a calm space to ask anything and decide in your own
              time. Glow with confidence.
            </p>
          </blockquote>
        </div>

        {/* CTA — opens the consultation popup */}
        <div className="text-center mt-10">
          <a
            href="/consultation"
            className="btn cta-glow-teal"
            style={{
              fontFamily: 'Novecento Wide, sans-serif',
              fontSize: '13px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '15px 44px',
              display: 'inline-block',
              borderRadius: '999px',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
            }}
            aria-label="Book your free consultation"
          >
            Book Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
