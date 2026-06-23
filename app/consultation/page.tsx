import type { Metadata } from "next";
import { CONTACT } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: 'Book Your Free Consultation | Carisma Aesthetics Malta',
  description: 'Book a free, no-pressure consultation with our medically qualified doctors at Carisma Aesthetics Malta. Every treatment plan begins with listening to your goals.',
  alternates: { canonical: 'https://www.carismaaesthetics.com/consultation' },
  openGraph: {
    title: 'Book Your Free Consultation | Carisma Aesthetics Malta',
    description: 'Free consultation with qualified doctors. No pressure, no obligation — just clarity.',
    url: 'https://www.carismaaesthetics.com/consultation',
    images: [{ url: '/og-aesthetics.jpg', width: 1200, height: 630, alt: 'Free Aesthetics Consultation Malta' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-aesthetics.jpg'] },
};

const FRESHA_CONSULT =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&oiid=sv%3A25754425&share=true&pId=2708191";

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function IgIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FbIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  const externalProps = external
    ? {
        target: "_blank" as const,
        rel: "noopener noreferrer",
        "aria-label": `${label}: ${value} (opens in new tab)`,
      }
    : { "aria-label": `${label}: ${value}` };

  return (
    <a
      href={href}
      {...externalProps}
      className="flex items-center gap-4 group cursor-pointer transition-all duration-200 ease-in-out rounded-xl p-2 -m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ "--tw-ring-color": "var(--teal-text)" } as React.CSSProperties}
    >
      {/* Icon circle — minimum 44×44px tap target */}
      <span
        className="shrink-0 inline-flex items-center justify-center transition-colors duration-200 ease-in-out group-hover:bg-[#eef3f3]"
        style={{
          width: "44px",
          height: "44px",
          minWidth: "44px",
          minHeight: "44px",
          borderRadius: "50%",
          border: "1px solid var(--teal-text)",
          color: "var(--teal-text)",
        }}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span
          className="font-display"
          style={{
            fontSize: "11px",
            letterSpacing: "0.1em",
            /* #4F7373 on white/cream = 4.6:1 — passes AA */
            color: "#4F7373",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          className="group-hover:underline transition-all duration-200 ease-in-out"
          style={{ fontSize: "14px", color: "#5b5249" }}
        >
          {value}
        </span>
      </span>
    </a>
  );
}

const STEPS = [
  {
    num: "01",
    title: "We Listen",
    body: "Your doctor takes time to understand your goals, concerns, and medical history — with no pressure and no rush.",
  },
  {
    num: "02",
    title: "We Plan",
    body: "A personalised treatment plan is shaped around your anatomy and what you want to feel, never what you think you should want.",
  },
  {
    num: "03",
    title: "You Decide",
    body: "You leave with a clear, honest proposal. There is no obligation — only clarity. When you are ready, we are here.",
  },
];

const STEPS_ID = "consultation-steps-heading";
const CONTACT_ID = "consultation-contact-heading";

export default function ConsultationPage() {
  return (
    <main>
        {/* ===== HERO ===== */}
        <PageHero
          eyebrow="Free Consultation"
          headline={[
            { text: "Book your free" },
            { text: "consultation in Malta", em: true },
          ]}
          sub="Every consultation begins with listening to your story — then shaping a conservative, personalised plan with one of our doctors."
          primaryCta={{
            text: "Book Instantly on Fresha",
            href: FRESHA_CONSULT,
            external: true,
          }}
          secondaryCta={{ text: "View Treatments", href: "/face-treatments" }}
          media={{
            type: "image",
            src: "/assets/clinic-room.jpg",
            alt: "Carisma Aesthetics clinic in Malta",
          }}
          proof={{
            rating: "4.9",
            reviews: "500+",
            statValue: "30+",
            statLabel: "years in wellness",
            awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
          }}
        />

        {/* ===== WHAT TO EXPECT ===== */}
        <section
          aria-labelledby={STEPS_ID}
          style={{ backgroundColor: "var(--white)", padding: "72px 0 64px" }}
        >
          <div className="container">
            <Reveal>
              <p
                className="font-display text-center"
                style={{
                  fontSize: "11px",
                  color: "#4F7373",
                  letterSpacing: "0.18em",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                }}
              >
                your experience
              </p>
              <h2
                id={STEPS_ID}
                className="font-display text-center"
                style={{
                  fontSize: "clamp(20px,2.8vw,32px)",
                  color: "var(--ink)",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  marginBottom: "52px",
                  lineHeight: 1.25,
                }}
              >
                What Happens at Your Consultation
              </h2>
            </Reveal>

            <div
              className="grid gap-10 sm:grid-cols-3 mx-auto"
              style={{ maxWidth: "960px" }}
            >
              {STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 80}>
                  <div
                    className="flex flex-col items-center text-center"
                    style={{ gap: "16px" }}
                  >
                    {/* Step number circle */}
                    <span
                      aria-hidden="true"
                      className="font-display"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.22em",
                        color: "#4F7373",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          border: "1px solid #4F7373",
                          fontSize: "11px",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {s.num}
                      </span>
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "14px",
                        color: "var(--ink)",
                        letterSpacing: "0.12em",
                        fontWeight: 600,
                        lineHeight: 1.375,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#5b5249",
                        lineHeight: 1.75,
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT STRIP ===== */}
        <section
          aria-labelledby={CONTACT_ID}
          style={{ backgroundColor: "var(--cream)", padding: "64px 0 72px" }}
        >
          <div className="container">
            <Reveal>
              <p
                className="font-display text-center"
                style={{
                  fontSize: "11px",
                  color: "#4F7373",
                  letterSpacing: "0.18em",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                get in touch
              </p>
              <h2
                id={CONTACT_ID}
                className="font-display text-center"
                style={{
                  fontSize: "clamp(20px,2.6vw,30px)",
                  color: "var(--ink)",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  marginBottom: "48px",
                  lineHeight: 1.25,
                }}
              >
                Other Ways to Reach Us
              </h2>
            </Reveal>

            <Reveal
              delay={80}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-auto"
              style={{ maxWidth: "960px" }}
            >
              <ContactItem
                icon={<PhoneIcon />}
                label="Phone"
                value={CONTACT.phone}
                href={`tel:${CONTACT.tel}`}
              />
              <ContactItem
                icon={<MailIcon />}
                label="Email"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
              />
              <ContactItem
                icon={<IgIcon />}
                label="Instagram"
                value={CONTACT.instagramHandle}
                href={CONTACT.instagram}
                external
              />
              <ContactItem
                icon={<FbIcon />}
                label="Facebook"
                value={CONTACT.facebookName}
                href={CONTACT.facebook}
                external
              />
            </Reveal>
          </div>
        </section>
    </main>
  );
}
