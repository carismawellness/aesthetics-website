import { CONTACT } from "@/lib/site";
import ConsultationForm from "@/components/ConsultationForm";

export const metadata = {
  title: "Book Your Free Consultation | Carisma Aesthetics Malta",
};

export default function ConsultationPage() {
  return (
    <>
      <section style={{ backgroundColor: "var(--cream)", padding: "64px 0 50px" }}>
        <div className="container text-center">
          <h1 className="font-display" style={{ fontSize: "clamp(28px,5vw,44px)", color: "var(--ink)", letterSpacing: "0.08em" }}>
            Book Your Free Consultation
          </h1>
          <p className="font-serif mx-auto" style={{ fontSize: "19px", color: "var(--ink-soft)", textTransform: "none", fontStyle: "italic", marginTop: "16px", maxWidth: "680px" }}>
            Every consultation begins with listening to your story — then shaping a conservative, personalised plan with one of our doctors.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 0" }}>
        <div className="container grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Form */}
          <div>
            <h2 className="font-serif" style={{ fontSize: "26px", color: "var(--ink)", textTransform: "none", fontWeight: 500, marginBottom: "20px" }}>Personalised Form</h2>
            <ConsultationForm showMessage submitLabel="book your Consultation" />
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display" style={{ fontSize: "20px", color: "var(--ink)", marginBottom: "24px" }}>Get in touch</h2>
            <div className="space-y-6">
              <div>
                <div className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.14em", marginBottom: "6px" }}>Phone</div>
                <a href={`tel:${CONTACT.tel}`} style={{ fontSize: "16px", color: "var(--ink-soft)" }}>{CONTACT.phone}</a>
              </div>
              <div>
                <div className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.14em", marginBottom: "6px" }}>Email</div>
                <a href={`mailto:${CONTACT.email}`} style={{ fontSize: "16px", color: "var(--ink-soft)" }}>{CONTACT.email}</a>
              </div>
              <div>
                <div className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.14em", marginBottom: "6px" }}>Follow</div>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: "16px", color: "var(--ink-soft)", display: "block" }}>{CONTACT.instagramHandle}</a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize: "16px", color: "var(--ink-soft)" }}>{CONTACT.facebookName}</a>
              </div>
            </div>
            <div className="rounded-lg mt-8 flex items-center justify-center" style={{ aspectRatio: "16/9", backgroundColor: "var(--cream)", border: "1px solid var(--line)", color: "var(--muted)", fontSize: "13px" }}>
              Map — clinic location pending
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
