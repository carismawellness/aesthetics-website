import type { Metadata } from "next";
import {
  LegalHero,
  LegalTOC,
  SectionBlock,
  P,
  SubHeading,
  BulletList,
  LegalContactCard,
  bodyStyle,
  lp,
} from "@/components/LegalPage";

export const metadata: Metadata = {
  title: { absolute: "Terms & Conditions | Carisma Aesthetics Malta" },
  description:
    "Terms & Conditions for Carisma Aesthetics, a doctor-led medical-aesthetics clinic in Malta. Bookings, deposits, cancellations, consent to treatment, medical disclaimers, and governing law.",
  alternates: { canonical: "https://www.carismaaesthetics.com/terms-conditions" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Terms & Conditions | Carisma Aesthetics Malta",
    description:
      "Terms & Conditions for Carisma Aesthetics, a doctor-led medical-aesthetics clinic in Malta. Bookings, deposits, cancellations, consent, and governing law.",
    url: "https://www.carismaaesthetics.com/terms-conditions",
    siteName: "Carisma Aesthetics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Carisma Aesthetics Malta",
    description:
      "Terms & Conditions for Carisma Aesthetics, a doctor-led medical-aesthetics clinic in Malta.",
  },
};

const LAST_UPDATED = "22 June 2026";

/* ============================================================
   ⚠️ OWNER TO CONFIRM — legal-entity details
   (Same entity as the Privacy Policy. Confirm the registered
   company name, number, and address for the Aesthetics brand.)
   ============================================================ */
const ENTITY = {
  legalName: "Carisma Aesthetics Ltd.",
  companyNo: "C 106006",
  vatNo: "MT30347620",
  regAddress: "114, Triq il-Mizura, Swieqi SWQ 2064, Malta",
  clinicLocation: "St Julian's, Malta",
  email: "info@carismaaesthetics.com",
  phone: "+356 27802062",
};

const TOC = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "about", label: "2. About the Clinic" },
  { id: "definitions", label: "3. Definitions" },
  { id: "services", label: "4. Services" },
  { id: "consultation", label: "5. Consultation & Suitability" },
  { id: "consent", label: "6. Consent to Treatment" },
  { id: "medical-disclaimer", label: "7. Medical Disclaimer" },
  { id: "results", label: "8. Results & Expectations" },
  { id: "bookings", label: "9. Bookings & Deposits" },
  { id: "fees", label: "10. Fees & Payment" },
  { id: "cancellation", label: "11. Cancellation & No-Shows" },
  { id: "refunds", label: "12. Refunds & Consumer Rights" },
  { id: "aftercare", label: "13. Aftercare & Follow-Up" },
  { id: "emergencies", label: "14. Medical Emergencies" },
  { id: "conduct", label: "15. Patient Conduct" },
  { id: "photography", label: "16. Photography & Records" },
  { id: "termination", label: "17. Refusal or Termination of Services" },
  { id: "liability", label: "18. Limitation of Liability" },
  { id: "privacy", label: "19. Privacy & Data Protection" },
  { id: "ip", label: "20. Intellectual Property" },
  { id: "website", label: "21. Website Use" },
  { id: "force-majeure", label: "22. Force Majeure" },
  { id: "complaints", label: "23. Complaints" },
  { id: "governing-law", label: "24. Governing Law & Disputes" },
  { id: "general", label: "25. General" },
  { id: "updates", label: "26. Updates to These Terms" },
  { id: "contact", label: "27. Contact" },
];

const linkStyle: React.CSSProperties = {
  color: lp.tealText,
  textDecoration: "underline",
};

export default function TermsConditionsPage() {
  return (
    <main className="w-full">
      <LegalHero
        eyebrow="Terms & Conditions"
        title="Terms & Conditions"
        tagline="The terms that govern your relationship with Carisma Aesthetics — please read them carefully before booking a consultation or treatment."
        lastUpdated={LAST_UPDATED}
      />

      <LegalTOC items={TOC} />

      <SectionBlock id="acceptance" number="01" title="Acceptance of Terms">
        <P>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of our website and the services
          provided by {ENTITY.legalName}, trading as Carisma Aesthetics (&ldquo;Carisma Aesthetics&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Clinic&rdquo;). By booking a consultation or
          treatment, attending the Clinic, or using our website, you confirm that you have read, understood,
          and agree to these Terms. If you do not agree, please do not use our services.
        </P>
      </SectionBlock>

      <SectionBlock id="about" number="02" title="About the Clinic" alt>
        <P>
          Carisma Aesthetics is a doctor-led medical-aesthetics clinic based in {ENTITY.clinicLocation}. Our
          treatments are delivered or supervised by appropriately qualified and, where required, licensed
          healthcare professionals.
        </P>
        <P>
          <strong>{ENTITY.legalName}</strong>
          <br />
          Company Registration Number: {ENTITY.companyNo}
          <br />
          VAT Number: {ENTITY.vatNo}
          <br />
          Registered Address: {ENTITY.regAddress}
          <br />
          Email:{" "}
          <a href={`mailto:${ENTITY.email}`} style={linkStyle}>
            {ENTITY.email}
          </a>{" "}
          · Phone:{" "}
          <a href={`tel:${ENTITY.phone.replace(/\s/g, "")}`} style={linkStyle}>
            {ENTITY.phone}
          </a>
        </P>
      </SectionBlock>

      <SectionBlock id="definitions" number="03" title="Definitions">
        <BulletList
          items={[
            <><strong>&ldquo;Treatment&rdquo;</strong> — any aesthetic or medical-aesthetic procedure, service, or product provided by the Clinic.</>,
            <><strong>&ldquo;Patient&rdquo;</strong> or <strong>&ldquo;you&rdquo;</strong> — any person who books, attends, or receives a consultation or Treatment.</>,
            <><strong>&ldquo;Consultation&rdquo;</strong> — the clinical assessment carried out before Treatment to determine suitability.</>,
            <><strong>&ldquo;Deposit&rdquo;</strong> — any amount paid in advance to secure an appointment or Treatment.</>,
          ]}
        />
      </SectionBlock>

      <SectionBlock id="services" number="04" title="Services" alt>
        <P>
          We offer a range of medical-aesthetic treatments, which may include (without limitation) anti-wrinkle
          (botulinum toxin) injections, dermal and lip fillers, collagen stimulators, fat-dissolving
          injections, mesotherapy, PRP (platelet-rich plasma), thread lifts, microneedling, chemical peels,
          skin boosters, medical-grade laser and energy-based treatments, and related skincare services.
        </P>
        <P>
          Treatments are offered subject to clinical suitability. The Clinic reserves the right to recommend,
          modify, decline, or discontinue any Treatment where, in the clinician&rsquo;s professional judgement,
          it is not in your best interests or not clinically appropriate. Availability of specific treatments
          may change.
        </P>
      </SectionBlock>

      <SectionBlock id="consultation" number="05" title="Consultation & Suitability">
        <P>
          A consultation is required before treatment. During it we review your medical history, medication,
          allergies, expectations, and relevant lifestyle factors, and carry out a clinical assessment. You
          must provide full, accurate, and honest information. Withholding or misrepresenting information may
          make a Treatment unsafe and may invalidate any liability on our part.
        </P>
        <P>
          Treatment may be declined or postponed where it is not clinically suitable for you — for example due
          to pregnancy or breastfeeding, certain medical conditions or medications, recent procedures, or
          unrealistic expectations.
        </P>
      </SectionBlock>

      <SectionBlock id="consent" number="06" title="Consent to Treatment" alt>
        <P>
          Before any Treatment, you will be asked to give your informed, written consent. We will explain the
          nature of the Treatment, its expected benefits, the material risks and possible side effects, the
          available alternatives (including no treatment), and the likely costs. You should ask any questions
          you have before consenting.
        </P>
        <P>
          You may withdraw consent at any time before or during a Treatment, although it may not always be
          clinically possible to reverse a procedure once it has begun. Consent given for one Treatment does
          not extend to any other Treatment.
        </P>
      </SectionBlock>

      <SectionBlock id="medical-disclaimer" number="07" title="Medical Disclaimer">
        <P>
          Information provided on our website, in marketing materials, and during consultations is for general
          information and does not replace individual medical advice. Content on our website is not a diagnosis
          and should not be relied upon as such.
        </P>
        <P>
          All medical-aesthetic treatments carry risks and possible side effects, which may include (among
          others) redness, swelling, bruising, tenderness, infection, asymmetry, pigmentation changes, and, in
          rare cases, more serious complications. These will be discussed with you during your consultation.
          By proceeding, you acknowledge that you understand and accept the risks explained to you.
        </P>
      </SectionBlock>

      <SectionBlock id="results" number="08" title="Results & Expectations" alt>
        <P>
          Aesthetic outcomes vary from person to person and depend on factors including your individual
          physiology, skin type, lifestyle, adherence to aftercare, and the natural ageing process.{" "}
          <strong>
            We do not and cannot guarantee any specific result, outcome, or degree of improvement.
          </strong>
        </P>
        <P>
          Some treatments require a course of sessions or maintenance to achieve and sustain results, and
          results are typically not permanent. Before-and-after images, testimonials, and marketing materials
          are illustrative only and do not constitute a promise of the same outcome for you.
        </P>
      </SectionBlock>

      <SectionBlock id="bookings" number="09" title="Bookings & Deposits">
        <P>
          Appointments can be booked via our website, by phone, by message, or in person. A booking is
          confirmed only once we have accepted it and any required Deposit has been paid.
        </P>
        <P>
          We may require a Deposit to secure certain appointments or treatments. Unless stated otherwise, the
          Deposit is applied to the cost of your Treatment. Deposits are handled in accordance with the
          cancellation terms in Section 11.
        </P>
      </SectionBlock>

      <SectionBlock id="fees" number="10" title="Fees & Payment" alt>
        <P>
          Fees are as quoted at the time of booking or consultation and may change from time to time. Unless
          agreed otherwise, payment is due at or before the time of Treatment. We accept the payment methods
          made available at the Clinic. Prices are in euro (€) and include applicable taxes unless stated
          otherwise. Promotional offers are subject to their own specific terms and availability.
        </P>
      </SectionBlock>

      <SectionBlock id="cancellation" number="11" title="Cancellation & No-Shows">
        <P>
          We ask for at least 24 hours&rsquo; notice if you need to cancel or reschedule an appointment, so
          that we can offer the slot to another patient.
        </P>
        <BulletList
          items={[
            "Cancellations or changes with at least 24 hours' notice: any Deposit is transferred to your rescheduled appointment.",
            "Late cancellations (less than 24 hours' notice) or no-shows: we may retain the Deposit and/or charge a cancellation fee to cover the reserved time.",
            "Repeated late cancellations or no-shows may result in us requiring full prepayment for future bookings.",
          ]}
        />
        <P>
          The specific Deposit and cancellation amounts that apply will be made clear to you at the time of
          booking.
        </P>
      </SectionBlock>

      <SectionBlock id="refunds" number="12" title="Refunds & Consumer Rights" alt>
        <P>
          Because our services are personalised and performed at a scheduled time, fees for treatments already
          provided are generally non-refundable. Nothing in these Terms affects your statutory rights as a
          consumer under Maltese law, including under the Consumer Affairs Act (Chapter 378 of the Laws of
          Malta) and applicable EU consumer-protection legislation.
        </P>
        <P>
          Where a statutory right of cancellation (cooling-off period) applies to a distance or off-premises
          contract, you may lose that right once a service has been fully performed with your prior express
          consent and acknowledgement that you would lose it. If you are unhappy with a Treatment, please raise
          it with us promptly so we can review it (see Section 23).
        </P>
      </SectionBlock>

      <SectionBlock id="aftercare" number="13" title="Aftercare & Follow-Up">
        <P>
          You will be given aftercare instructions following Treatment. Your results and safety depend in part
          on following these instructions. Please contact us promptly if you experience any unexpected
          reaction or are concerned about your recovery, so we can advise you and arrange a review if needed.
        </P>
      </SectionBlock>

      <SectionBlock id="emergencies" number="14" title="Medical Emergencies" alt>
        <P>
          In the event of a medical emergency, you should seek immediate medical attention by calling 112 (the
          European emergency number) or attending the nearest hospital. The Clinic may provide first aid and
          arrange appropriate assistance where necessary, but is not a substitute for emergency services.
        </P>
      </SectionBlock>

      <SectionBlock id="conduct" number="15" title="Patient Conduct">
        <P>
          We expect all patients to behave respectfully towards our staff and other patients. We do not
          tolerate abusive, threatening, discriminatory, or disruptive behaviour, or attendance under the
          influence of alcohol or unprescribed drugs. We may refuse or stop Treatment, and ask you to leave,
          where such behaviour occurs.
        </P>
      </SectionBlock>

      <SectionBlock id="photography" number="16" title="Photography & Records" alt>
        <P>
          We may take clinical photographs and video before, during, and after Treatment for documentation,
          monitoring, and your safety. These form part of your clinical record. We will only use identifiable
          images for marketing, social media, training, or promotional purposes with your separate, explicit,
          written consent, which you can refuse or withdraw at any time without affecting your care. See our{" "}
          <a href="/privacy-policy" style={linkStyle}>
            Privacy Policy
          </a>{" "}
          for how we handle your data.
        </P>
      </SectionBlock>

      <SectionBlock id="termination" number="17" title="Refusal or Termination of Services">
        <P>
          We reserve the right to refuse, postpone, or discontinue services where it is clinically
          inappropriate, where required information has not been provided, in the event of non-payment, or
          where our conduct policy is breached. Where we decline treatment on clinical grounds, we will explain
          our reasons and, where appropriate, discuss alternatives.
        </P>
      </SectionBlock>

      <SectionBlock id="liability" number="18" title="Limitation of Liability" alt>
        <P>
          We carry out treatments with reasonable skill and care in line with professional standards. Nothing
          in these Terms excludes or limits our liability for death or personal injury caused by our
          negligence, for fraud, or for any liability that cannot be excluded or limited under Maltese law.
        </P>
        <P>
          Subject to the above, and to the extent permitted by law, we are not liable for: outcomes that fall
          within the range of normal, disclosed risks and side effects; results that differ from your
          expectations where the Treatment was performed competently; consequences arising from your failure to
          disclose relevant information or follow aftercare instructions; or indirect or consequential losses.
          Where we are found liable, our total liability is limited to the amount you paid for the relevant
          Treatment, except in respect of the liabilities that cannot be excluded as set out above.
        </P>
      </SectionBlock>

      <SectionBlock id="privacy" number="19" title="Privacy & Data Protection">
        <P>
          We process personal and health data in accordance with the GDPR, the Maltese Data Protection Act
          (Chapter 586), and our{" "}
          <a href="/privacy-policy" style={linkStyle}>
            Privacy Policy
          </a>
          , which forms part of these Terms. Please read it to understand how we collect, use, and protect your
          data and the rights you have.
        </P>
      </SectionBlock>

      <SectionBlock id="ip" number="20" title="Intellectual Property" alt>
        <P>
          All content on our website and in our materials — including text, images, logos, branding, and
          design — is owned by or licensed to Carisma Aesthetics and is protected by intellectual-property
          laws. You may not copy, reproduce, or reuse it without our prior written permission.
        </P>
      </SectionBlock>

      <SectionBlock id="website" number="21" title="Website Use">
        <P>
          Our website is provided for general information. While we take care to keep it accurate and
          up to date, we do not warrant that it is error-free or always available, and content may change
          without notice. Your use of the website is at your own risk and subject to these Terms and our
          Privacy Policy.
        </P>
      </SectionBlock>

      <SectionBlock id="force-majeure" number="22" title="Force Majeure" alt>
        <P>
          We are not liable for any failure or delay in performing our obligations caused by events beyond our
          reasonable control, including but not limited to illness of practitioners, equipment failure,
          utility outages, severe weather, public-health measures, or acts of government. We will make
          reasonable efforts to reschedule affected appointments.
        </P>
      </SectionBlock>

      <SectionBlock id="complaints" number="23" title="Complaints">
        <P>
          If you are unhappy with any aspect of your experience or Treatment, please tell us as soon as
          possible so we can put things right. You can raise a concern using the contact details in Section 27.
          We take complaints seriously and aim to acknowledge and respond to them promptly and fairly.
        </P>
      </SectionBlock>

      <SectionBlock id="governing-law" number="24" title="Governing Law & Disputes" alt>
        <P>
          These Terms, and any dispute or claim arising out of or in connection with them or our services
          (including non-contractual disputes), are governed by and construed in accordance with the laws of
          Malta. The courts of Malta have exclusive jurisdiction, without prejudice to any mandatory consumer
          rights that allow you to bring proceedings in your country of residence.
        </P>
      </SectionBlock>

      <SectionBlock id="general" number="25" title="General">
        <BulletList
          items={[
            "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force.",
            "Our failure to enforce any provision does not waive our right to do so later.",
            "These Terms, together with our Privacy Policy and any treatment-specific consent forms, constitute the entire agreement between you and us.",
            "You may not transfer your rights or obligations under these Terms without our consent.",
          ]}
        />
      </SectionBlock>

      <SectionBlock id="updates" number="26" title="Updates to These Terms" alt>
        <P>
          We may update these Terms from time to time. The &ldquo;Last Updated&rdquo; date at the top of this
          page reflects the latest version. The Terms in force at the time you book apply to that booking. We
          encourage you to review this page periodically.
        </P>
      </SectionBlock>

      <SectionBlock id="contact" number="27" title="Contact">
        <P>If you have any questions about these Terms, please contact us:</P>
        <LegalContactCard heading="Get in touch">
          <p style={{ ...bodyStyle, marginBottom: "6px" }}>
            <strong>{ENTITY.legalName}</strong>
          </p>
          <p style={{ ...bodyStyle, marginBottom: "6px" }}>
            Email:{" "}
            <a href={`mailto:${ENTITY.email}`} style={linkStyle}>
              {ENTITY.email}
            </a>
          </p>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>
            Phone:{" "}
            <a href={`tel:${ENTITY.phone.replace(/\s/g, "")}`} style={linkStyle}>
              {ENTITY.phone}
            </a>
          </p>
        </LegalContactCard>
      </SectionBlock>
    </main>
  );
}
