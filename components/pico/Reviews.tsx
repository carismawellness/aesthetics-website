import { A, Serif } from "./_shared";

// Reviews — "precision tattoo removal in malta"
// 4 testimonial cards, each with a before/after before|after result image,
// a 4-line clamped italic body, a teal "Read more" label and a dash-prefixed
// gold reviewer name. Sits on the page's shared marble/cream wrapper.

const REVIEWS = [
  {
    img: `${A}/pico-rev1.png`,
    alt: "Before and after tattoo removal result for Morina G.",
    body:
      "I wanted to fade an old tattoo before getting it covered, and the team made me feel completely comfortable from the first consultation. They explained how the Pico Laser works, what results I could realistically expect, and how many sessions may be needed. The treatment felt professional, precise, and much more reassuring than I expected. I could see the tattoo gradually fading after each visit, and the aftercare guidance made the whole process feel safe and well-managed.",
    name: "Morina G.",
  },
  {
    img: `${A}/pico-rev2.png`,
    alt: "Before and after tattoo removal result for Daniela A.",
    body:
      "I was nervous about laser tattoo removal, but the Pico Laser treatment felt much more manageable than I expected. The team checked my skin carefully, explained the process clearly, and made sure I understood what would happen during and after the treatment. I really appreciated that they didn't overpromise instant results and instead gave me a proper treatment plan. It felt calm, professional, and tailored to my skin.",
    name: "Daniela A.",
  },
  {
    img: `${A}/pico-rev3.png`,
    alt: "Before and after tattoo removal result for Claire V.",
    body:
      "My tattoo had been bothering me for years, but I didn't want anything rushed or aggressive. Carisma gave me a proper plan based on my skin, tattoo size, and ink depth, which made me feel confident from the beginning. The fading has been gradual, but I can clearly see the difference after each session. What I liked most was how honest and careful the team was throughout the process.",
    name: "Claire V.",
  },
  {
    img: `${A}/pico-rev4.png`,
    alt: "Before and after tattoo removal result for Rachel B.",
    body:
      "I had a small tattoo I wanted removed for work reasons, and I wanted the process to be handled safely. The consultation was honest, clear, and very reassuring. They explained that tattoo removal takes time and depends on the ink, skin type, and how the tattoo responds. The treatment itself was precise, and I felt comfortable knowing I was being looked after by a medically qualified team.",
    name: "Rachel B.",
  },
];

export default function Reviews() {
  return (
    <section style={{ padding: "70px 24px" }}>
      <Serif style={{ fontSize: "clamp(22px,3vw,30px)", letterSpacing: "0.1em" }}>
        precision tattoo removal in malta
      </Serif>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: "1160px", margin: "40px auto 0", gap: "24px" }}
      >
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="flex flex-col"
            style={{
              borderRadius: "14px",
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(120,160,165,0.5)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <img
              src={r.img}
              alt={r.alt}
              style={{
                display: "block",
                width: "100%",
                aspectRatio: "2 / 1",
                objectFit: "cover",
              }}
            />

            <div className="flex flex-col" style={{ padding: "20px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--label)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {r.body}
              </p>

              <span
                style={{
                  fontSize: "13px",
                  color: "#8a847b",
                  marginTop: "10px",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                Read more
              </span>

              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#4a4a4a",
                  marginTop: "14px",
                }}
              >
                - {r.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
