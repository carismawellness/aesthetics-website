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
  title: "Privacy Policy | Carisma Aesthetics Malta",
  description:
    "How Carisma Aesthetics collects, uses, and protects your personal and health data. GDPR and Malta Data Protection Act compliant privacy policy for our medical-aesthetics clinic in Malta.",
  alternates: { canonical: "https://www.carismaaesthetics.com/privacy-policy" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Privacy Policy | Carisma Aesthetics Malta",
    description:
      "How Carisma Aesthetics collects, uses, and protects your personal and health data. GDPR and Malta Data Protection Act compliant.",
    url: "https://www.carismaaesthetics.com/privacy-policy",
    siteName: "Carisma Aesthetics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Carisma Aesthetics Malta",
    description:
      "How Carisma Aesthetics collects, uses, and protects your personal and health data. GDPR and Malta Data Protection Act compliant.",
  },
};

const LAST_UPDATED = "22 June 2026";

/* ============================================================
   ⚠️ OWNER TO CONFIRM — legal-entity details
   The group entity behind Carisma Slimming is "Carisma Aesthetics
   Ltd." (company number C 106006), so the Aesthetics brand is most
   likely operated by the SAME registered company. Confirm the
   registered company name, number, address, and DPO contact for the
   Aesthetics brand, then replace the placeholders below.
   ============================================================ */
const ENTITY = {
  legalName: "Carisma Aesthetics Ltd.", // OWNER TO CONFIRM
  companyNo: "[COMPANY REGISTRATION NUMBER — OWNER TO CONFIRM]",
  regAddress:
    "[REGISTERED ADDRESS — OWNER TO CONFIRM]", // e.g. clinic / registered office, Malta
  clinicLocation: "St Julian's, Malta",
  email: "info@carismaaesthetics.com",
  phone: "+356 27802062",
  dpoContact:
    "[DATA PROTECTION OFFICER / PRIVACY CONTACT — OWNER TO CONFIRM]",
};

const TOC = [
  { id: "introduction", label: "1. Introduction" },
  { id: "data-controller", label: "2. Who We Are (Data Controller)" },
  { id: "data-collected", label: "3. Personal Data We Collect" },
  { id: "health-data", label: "4. Health & Special-Category Data" },
  { id: "legal-bases", label: "5. Legal Bases for Processing" },
  { id: "how-we-use", label: "6. How We Use Your Data" },
  { id: "cookies", label: "7. Cookies & Website Tracking" },
  { id: "data-sharing", label: "8. Sharing & Processors" },
  { id: "international", label: "9. International Transfers" },
  { id: "retention", label: "10. Data Retention" },
  { id: "security", label: "11. Security" },
  { id: "your-rights", label: "12. Your Rights" },
  { id: "marketing", label: "13. Marketing Communications" },
  { id: "children", label: "14. Children's Data" },
  { id: "breach", label: "15. Data Breaches" },
  { id: "changes", label: "16. Changes to This Policy" },
  { id: "contact", label: "17. Contact & Complaints" },
];

const linkStyle: React.CSSProperties = {
  color: lp.tealText,
  textDecoration: "underline",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      <LegalHero
        eyebrow="Privacy Policy"
        title="Your Privacy Matters"
        tagline="We are committed to protecting your personal and health data and being fully transparent about how we collect, use, and safeguard it — in line with the GDPR and Maltese law."
        lastUpdated={LAST_UPDATED}
      />

      <LegalTOC items={TOC} />

      <SectionBlock id="introduction" number="01" title="Introduction">
        <P>
          {ENTITY.legalName} (&ldquo;Carisma Aesthetics&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a
          medical-aesthetics clinic based in {ENTITY.clinicLocation}. We provide doctor-led aesthetic
          treatments and related services. This Privacy Policy explains what personal data we collect about
          you, why and how we use it, who we share it with, how long we keep it, and the rights you have over
          it.
        </P>
        <P>
          We process personal data in accordance with the EU General Data Protection Regulation (Regulation
          (EU) 2016/679, the &ldquo;GDPR&rdquo;), the Maltese Data Protection Act (Chapter 586 of the Laws of
          Malta) and its subsidiary legislation, and guidance issued by the Information and Data Protection
          Commissioner (IDPC) of Malta. As a clinic handling health information, we apply heightened standards
          to your medical and special-category data.
        </P>
        <P>
          By using our website, booking a consultation, or receiving treatment from us, you acknowledge that
          you have read and understood this Policy. If you do not agree with it, please do not provide us with
          your personal data.
        </P>
      </SectionBlock>

      <SectionBlock id="data-controller" number="02" title="Who We Are (Data Controller)" alt>
        <P>
          The data controller responsible for your personal data is:
        </P>
        <P>
          <strong>{ENTITY.legalName}</strong>
          <br />
          Company Registration Number: {ENTITY.companyNo}
          <br />
          Registered Address: {ENTITY.regAddress}
          <br />
          Clinic Location: {ENTITY.clinicLocation}
          <br />
          Email:{" "}
          <a href={`mailto:${ENTITY.email}`} style={linkStyle}>
            {ENTITY.email}
          </a>
          <br />
          Phone:{" "}
          <a href={`tel:${ENTITY.phone.replace(/\s/g, "")}`} style={linkStyle}>
            {ENTITY.phone}
          </a>
        </P>
        <P>
          For all privacy-related queries, requests, or complaints, our designated privacy contact is:{" "}
          {ENTITY.dpoContact}. You can reach this contact using the email address above, marking your message
          for the attention of the Data Protection contact.
        </P>
      </SectionBlock>

      <SectionBlock id="data-collected" number="03" title="Personal Data We Collect">
        <P>Depending on how you interact with us, we may collect and process the following categories of personal data:</P>
        <SubHeading>Identity &amp; contact data</SubHeading>
        <BulletList
          items={[
            "Full name, title, date of birth, and gender",
            "Postal address, email address, and telephone/mobile number",
            "Emergency contact details, where you provide them",
            "Identification details where required to verify identity or age",
          ]}
        />
        <SubHeading>Booking, treatment &amp; financial data</SubHeading>
        <BulletList
          items={[
            "Appointment history, treatments received, and consultation notes",
            "Consent forms and pre/post-treatment instructions",
            "Billing name and address, amounts paid, and payment references (we do not store full card numbers — these are handled by our payment provider)",
            "Records of correspondence and enquiries (email, phone, WhatsApp, social media, and contact-form messages)",
          ]}
        />
        <SubHeading>Health &amp; clinical data (special-category)</SubHeading>
        <BulletList
          items={[
            "Medical history, allergies, current medication, and relevant lifestyle information",
            "Clinical assessment, suitability screening, and treatment records",
            "Before-and-after photographs and video taken for clinical documentation and monitoring",
            "Adverse-event, complication, and aftercare records",
          ]}
        />
        <SubHeading>Technical &amp; website data</SubHeading>
        <BulletList
          items={[
            "IP address, device, browser, and operating-system information",
            "Pages visited, referring URLs, and interactions on our website",
            "Cookie and similar tracking-technology data (see Section 7)",
            "Email open and click data, for subscribers to our communications",
          ]}
        />
        <P>
          Where we ask you to provide personal data to meet a legal or contractual requirement (for example,
          a medical history before treatment), failure to provide it may mean we are unable to treat you
          safely or at all.
        </P>
      </SectionBlock>

      <SectionBlock id="health-data" number="04" title="Health & Special-Category Data" alt>
        <P>
          Some of the data we collect — in particular your medical history, the treatments you receive, and
          clinical photographs — is &ldquo;special-category&rdquo; data under Article 9 of the GDPR. We treat
          this data with additional care.
        </P>
        <P>We rely on the following conditions to process special-category (health) data:</P>
        <BulletList
          items={[
            <>Article 9(2)(h) GDPR — processing necessary for the provision of healthcare and treatment, and the management of healthcare services, by or under the responsibility of a health professional bound by a duty of confidentiality;</>,
            <>Article 9(2)(a) GDPR — your explicit consent, for example for the use of clinical photographs beyond direct treatment documentation (such as marketing), which you may withdraw at any time;</>,
            <>Article 9(2)(c) GDPR — where necessary to protect your vital interests or those of another person, in a medical emergency where you are unable to consent.</>,
          ]}
        />
        <P>
          Clinical photographs and videos are taken only with your knowledge. We will always obtain your
          separate, explicit, written consent before using any image that could identify you for marketing,
          social media, training, or promotional purposes, and you may refuse or withdraw that consent without
          affecting your treatment.
        </P>
      </SectionBlock>

      <SectionBlock id="legal-bases" number="05" title="Legal Bases for Processing">
        <P>We process your personal data on one or more of the following legal bases under Article 6 of the GDPR:</P>
        <BulletList
          items={[
            <><strong>Consent (Art. 6(1)(a))</strong> — for marketing communications, non-essential cookies, and optional uses of your data such as testimonials.</>,
            <><strong>Contract (Art. 6(1)(b))</strong> — to take steps at your request before entering into a contract (e.g. a consultation) and to provide the treatments and services you book.</>,
            <><strong>Legal obligation (Art. 6(1)(c))</strong> — to comply with healthcare, tax, accounting, consumer-protection, and other legal duties.</>,
            <><strong>Vital interests (Art. 6(1)(d))</strong> — to protect someone&rsquo;s life or health in an emergency.</>,
            <><strong>Legitimate interests (Art. 6(1)(f))</strong> — to run, secure, and improve our clinic and website, prevent fraud, and respond to enquiries, where these interests are not overridden by your rights. Where we rely on legitimate interests, you may object (see Section 12).</>,
          ]}
        />
        <P>
          For special-category (health) data, we additionally rely on the Article 9 conditions set out in
          Section 4.
        </P>
      </SectionBlock>

      <SectionBlock id="how-we-use" number="06" title="How We Use Your Data" alt>
        <BulletList
          items={[
            "Assessing your suitability for treatment and providing safe, appropriate aesthetic care",
            "Managing bookings, consultations, reminders, aftercare, and follow-up",
            "Maintaining accurate clinical records and documenting outcomes",
            "Processing payments, deposits, refunds, and invoicing",
            "Responding to your enquiries, requests, and complaints",
            "Sending you service messages (e.g. appointment confirmations and changes)",
            "Sending marketing communications where you have consented (see Section 13)",
            "Operating, securing, and improving our website and services",
            "Meeting our legal, regulatory, accounting, and insurance obligations",
            "Establishing, exercising, or defending legal claims",
          ]}
        />
      </SectionBlock>

      <SectionBlock id="cookies" number="07" title="Cookies & Website Tracking">
        <P>
          Our website uses cookies and similar technologies. Strictly necessary cookies are required for the
          site to function and do not need consent. Analytics, performance, and marketing cookies (for example
          from Google or Meta) are only set where you give consent through our cookie banner.
        </P>
        <P>
          You can withdraw or change your cookie preferences at any time via the cookie settings on our
          website, and you can block or delete cookies through your browser settings. Disabling some cookies
          may affect how the website works. For detailed information on the specific cookies we use, please
          refer to the cookie banner and settings on our website.
        </P>
      </SectionBlock>

      <SectionBlock id="data-sharing" number="08" title="Sharing & Processors" alt>
        <P>
          We do not sell your personal data. We share it only where necessary and with appropriate safeguards,
          including with:
        </P>
        <BulletList
          items={[
            "Our clinicians and authorised staff, who are bound by confidentiality, to deliver your care",
            "Trusted service providers (data processors) acting on our instructions — for example IT, hosting, booking/CRM, payment processing, email and communications, and analytics providers",
            "Professional advisers such as accountants, insurers, and lawyers, where necessary",
            "Public authorities, regulators, or courts where we are legally required to disclose data",
            "A successor entity in the event of a business sale or reorganisation, subject to this Policy",
          ]}
        />
        <P>
          All processors are bound by written contracts that require them to keep your data secure and to
          process it only on our documented instructions, as required by Article 28 of the GDPR.
        </P>
      </SectionBlock>

      <SectionBlock id="international" number="09" title="International Transfers">
        <P>
          We aim to keep your personal data within the European Economic Area (EEA). Some of our service
          providers may process data outside the EEA. Where this happens, we ensure an adequate level of
          protection by relying on a European Commission adequacy decision, or on appropriate safeguards such
          as the European Commission&rsquo;s Standard Contractual Clauses, together with any additional measures
          required. You may request a copy of the relevant safeguards using the contact details in Section 17.
        </P>
      </SectionBlock>

      <SectionBlock id="retention" number="10" title="Data Retention" alt>
        <P>
          We keep your personal data only for as long as necessary for the purposes set out in this Policy and
          to meet our legal obligations.
        </P>
        <BulletList
          items={[
            "Clinical and medical records are retained for the period required by applicable Maltese healthcare and professional standards, and to allow us to defend potential claims.",
            "Financial and accounting records are retained as required by Maltese tax and company law (generally a minimum of 10 years for VAT/accounting purposes).",
            "Marketing data is retained until you unsubscribe or withdraw consent, after which we keep a suppression record so we do not contact you again.",
            "Website and analytics data is retained for limited periods in line with the relevant cookie or tool settings.",
          ]}
        />
        <P>
          When data is no longer needed, we securely delete or anonymise it. The specific retention periods we
          apply are available on request.
        </P>
      </SectionBlock>

      <SectionBlock id="security" number="11" title="Security">
        <P>
          We implement appropriate technical and organisational measures to protect your personal data against
          unauthorised access, loss, alteration, disclosure, or destruction. These include access controls,
          staff confidentiality obligations and training, secure storage of clinical records, encryption in
          transit where appropriate, and the use of reputable, security-conscious service providers. No method
          of transmission or storage is completely secure, but we work continually to protect your data.
        </P>
      </SectionBlock>

      <SectionBlock id="your-rights" number="12" title="Your Rights" alt>
        <P>Under the GDPR and Maltese data-protection law, you have the right to:</P>
        <BulletList
          items={[
            "Be informed about how we use your data (this Policy)",
            "Access a copy of the personal data we hold about you",
            "Have inaccurate or incomplete data corrected (rectification)",
            "Have your data erased in certain circumstances (the 'right to be forgotten')",
            "Restrict our processing of your data in certain circumstances",
            "Object to processing based on our legitimate interests, and to direct marketing at any time",
            "Data portability — to receive certain data in a structured, machine-readable format",
            "Withdraw consent at any time, where we rely on consent (without affecting prior processing)",
          ]}
        />
        <P>
          Some rights are subject to exemptions — for example, we may be required to retain clinical records
          for legal and safety reasons even if you request erasure. To exercise any right, contact us using the
          details in Section 17. We will respond within one month, as required by law. We do not charge a fee
          unless your request is manifestly unfounded or excessive.
        </P>
      </SectionBlock>

      <SectionBlock id="marketing" number="13" title="Marketing Communications">
        <P>
          We will only send you marketing communications (such as offers, news, and treatment information)
          where you have given consent, or where otherwise permitted by law. Every marketing email contains an
          easy way to unsubscribe, and you can opt out at any time by contacting us. Opting out of marketing
          does not stop essential service messages relating to your appointments or care.
        </P>
      </SectionBlock>

      <SectionBlock id="children" number="14" title="Children's Data" alt>
        <P>
          Our services and website are intended for adults. We do not knowingly market to or collect data from
          children. Where a treatment may, by exception, be appropriate for a person under 18, it will only be
          provided following a clinical assessment and with the consent of a parent or legal guardian, in line
          with applicable law and professional standards. If you believe a child has provided us with personal
          data without appropriate consent, please contact us and we will take appropriate steps.
        </P>
      </SectionBlock>

      <SectionBlock id="breach" number="15" title="Data Breaches">
        <P>
          We have procedures to detect, report, and investigate personal-data breaches. Where a breach is
          likely to result in a risk to your rights and freedoms, we will notify the Information and Data
          Protection Commissioner (IDPC) without undue delay and, where required, within 72 hours. Where the
          breach is likely to result in a high risk to you, we will also notify you directly.
        </P>
      </SectionBlock>

      <SectionBlock id="changes" number="16" title="Changes to This Policy" alt>
        <P>
          We may update this Policy from time to time to reflect changes in our practices or the law. The
          &ldquo;Last Updated&rdquo; date at the top of this page shows when it was last revised. Where changes
          are significant, we will take reasonable steps to bring them to your attention. We encourage you to
          review this page periodically.
        </P>
      </SectionBlock>

      <SectionBlock id="contact" number="17" title="Contact & Complaints">
        <P>
          If you have any questions about this Policy, wish to exercise your rights, or want to make a
          complaint about how we handle your data, please contact us:
        </P>
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
          <p style={{ ...bodyStyle, marginBottom: "6px" }}>
            Phone:{" "}
            <a href={`tel:${ENTITY.phone.replace(/\s/g, "")}`} style={linkStyle}>
              {ENTITY.phone}
            </a>
          </p>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>
            Privacy contact: {ENTITY.dpoContact}
          </p>
        </LegalContactCard>
        <P>
          You also have the right to lodge a complaint with the supervisory authority in Malta — the
          Information and Data Protection Commissioner (IDPC), Floriana, Malta —{" "}
          <a href="https://idpc.org.mt" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            idpc.org.mt
          </a>
          . We would, however, appreciate the chance to address your concerns first.
        </P>
      </SectionBlock>
    </main>
  );
}
