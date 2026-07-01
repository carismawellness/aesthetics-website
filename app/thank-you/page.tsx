import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Carisma Aesthetics",
  // Conversion / utility page: kept out of the index, but crawlable so the
  // GTM /thank-you conversion trigger and the Meta Pixel still fire normally.
  robots: { index: false, follow: true },
};

const paragraphs = [
  "Thank you for reaching out to Carisma Aesthetics, you've taken the first step toward results delivered with genuine care.",
  "One of our medically qualified team will be in touch shortly to answer your questions and help you plan the right treatment for your goals.",
  "In the meantime, feel free to explore our treatments or get in touch directly if there's anything you'd like to ask.",
];

export default function ThankYouPage() {
  return (
    <main
      className="w-full"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(40px,8vw,64px) 24px",
        background:
          "radial-gradient(1200px 600px at 50% -10%, var(--beige), var(--white))",
      }}
    >
      <section
        style={{
          maxWidth: "640px",
          textAlign: "center",
        }}
      >
        {/* Check badge */}
        <div
          aria-hidden="true"
          style={{
            width: 64,
            height: 64,
            borderRadius: "999px",
            background: "rgba(var(--teal-deep-rgb), 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--teal-deep)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1
          className="font-display"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(30px, 5vw, 46px)",
            lineHeight: 1.15,
            letterSpacing: "0.01em",
            margin: "0 0 14px",
          }}
        >
          Thank You, We&rsquo;ll Be In Touch Shortly
        </h1>

        <p
          className="font-display"
          style={{
            color: "var(--teal-deep)",
            fontSize: "13px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: "0 0 28px",
          }}
        >
          Your enquiry has been received
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "clamp(18px,4.5vw,36px)",
          }}
        >
          {paragraphs.map((text) => (
            <p
              key={text}
              style={{
                color: "var(--muted)",
                fontSize: "16px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/face-treatments"
            className="inline-flex items-center justify-center font-display"
            style={{
              background: "var(--teal-deep)",
              color: "var(--white)",
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "15px 32px",
              borderRadius: "999px",
              textDecoration: "none",
              minHeight: "44px",
            }}
          >
            Explore Treatments
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center font-display"
            style={{
              border: "1.5px solid var(--teal-200)",
              color: "var(--link-text)",
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "13.5px 30px",
              borderRadius: "999px",
              textDecoration: "none",
              minHeight: "44px",
            }}
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
