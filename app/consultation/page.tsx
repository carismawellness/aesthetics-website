import { CONTACT } from "@/lib/site";
import ConsultationForm from "@/components/ConsultationForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Book Your Free Consultation | Carisma Aesthetics Malta",
  description:
    "Book a free, no-pressure consultation with one of our medically qualified doctors at Carisma Aesthetics, Malta. Every plan begins with listening to your story.",
};

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-4 group"
    >
      <span
        className="shrink-0 inline-flex items-center justify-center"
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "1px solid var(--teal)",
          color: "var(--teal)",
        }}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span
          className="font-display"
          style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--label)", textTransform: "uppercase" }}
        >
          {label}
        </span>
        <span style={{ fontSize: "14px", color: "#5b5249" }} className="group-hover:underline">
          {value}
        </span>
      </span>
    </a>
  );
}

export default function ConsultationPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{ backgroundColor: "var(--cream)", padding: "72px 0 60px" }}>
        <div className="container text-center">
          <Reveal>
            <p
              className="font-display"
              style={{
                fontSize: "11px",
                color: "var(--teal)",
                letterSpacing: "0.18em",
                marginBottom: "16px",
              }}
            >
              free consultation
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(26px,4vw,42px)",
                color: "var(--ink)",
                letterSpacing: "0.08em",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Book Your Free<br />Consultation
            </h1>
            <div
              style={{
                width: "56px",
                height: "2px",
                background: "var(--teal)",
                margin: "22px auto",
              }}
            />
            <p
              className="font-serif mx-auto"
              style={{
                fontSize: "17px",
                color: "var(--label)",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.7,
                maxWidth: "640px",
              }}
            >
              Every consultation begins with listening to your story — then shaping a conservative,
              personalised plan with one of our doctors.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section style={{ backgroundColor: "var(--beige)", padding: "60px 0 80px" }}>
        <div className="container">
          <Reveal className="mx-auto" style={{ maxWidth: "960px" }}>
            <ConsultationForm />
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT STRIP ===== */}
      <section style={{ backgroundColor: "var(--white)", padding: "64px 0 72px" }}>
        <div className="container">
          <Reveal>
            <p
              className="font-display text-center"
              style={{
                fontSize: "11px",
                color: "var(--teal)",
                letterSpacing: "0.18em",
                marginBottom: "12px",
              }}
            >
              get in touch
            </p>
            <h2
              className="font-display text-center"
              style={{
                fontSize: "clamp(20px,2.6vw,30px)",
                color: "var(--ink)",
                letterSpacing: "0.08em",
                fontWeight: 600,
                marginBottom: "48px",
              }}
            >
              Other Ways to Reach Us
            </h2>
          </Reveal>

          <Reveal delay={80} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-auto" style={{ maxWidth: "960px" }}>
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
    </>
  );
}
