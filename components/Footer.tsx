import Link from "next/link";
import { CONTACT } from "@/lib/site";
import Reveal from "@/components/Reveal";
import DoctorsSection from "@/components/home/DoctorsSection";
import Reviews from "@/components/home/Reviews";
import AwardSection from "@/components/home/AwardSection";

function Ig({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Fb({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function Phone({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function Mail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function Search({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.1em",
  color: "#9b8d83",
  textTransform: "uppercase",
};
const valueStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#5b5249",
};

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="flex items-center gap-4 group">
      <span
        className="shrink-0 inline-flex items-center justify-center"
        style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1px solid var(--teal)", color: "var(--teal)" }}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-display" style={labelStyle}>{label}</span>
        <span style={valueStyle} className="group-hover:underline">{value}</span>
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer>
      {/* Google reviews — static recreation of the live widget (real content) */}
      <Reviews />

      {/* Doctors introduction (exact homepage design) */}
      <DoctorsSection />

      {/* Award blurb — "#1 Voted Med-Aesthetics Clinic in Malta" (live shows it after the doctors on every page) */}
      <AwardSection />

      {/* Discover banners */}
      <section className="container" style={{ padding: "60px 20px" }}>
        <Reveal className="grid gap-6 grid-cols-1 mx-auto" style={{ maxWidth: "920px", minWidth: 0 }}>
          <a href="https://www.carismaspa.com" target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden rounded-lg group" style={{ minWidth: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/banner-spa.png" alt="Discover our spas" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            <span className="font-display" style={{ position: "absolute", right: "22px", bottom: "20px", background: "rgba(255,255,255,0.92)", color: "var(--ink)", fontSize: "11px", letterSpacing: "0.12em", padding: "10px 18px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Discover our Spa <span aria-hidden>→</span>
            </span>
          </a>
          <a href="https://www.carismaslimming.com" target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden rounded-lg group" style={{ minWidth: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/banner-slimming.png" alt="Discover Body Slimming" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            <span className="font-display" style={{ position: "absolute", right: "22px", bottom: "20px", background: "rgba(255,255,255,0.92)", color: "var(--ink)", fontSize: "11px", letterSpacing: "0.12em", padding: "10px 18px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Discover Body Slimming <span aria-hidden>→</span>
            </span>
          </a>
        </Reveal>
      </section>

      {/* Search bar */}
      <section style={{ backgroundColor: "var(--white)", padding: "0 0 48px" }}>
        <div className="container">
          <form className="mx-auto relative" style={{ maxWidth: "560px" }}>
            <span style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "#9b8d83" }}>
              <Search />
            </span>
            <input
              type="search"
              aria-label="Search"
              placeholder="WHAT ARE YOU LOOKING FOR?"
              className="font-display"
              style={{
                width: "100%",
                padding: "14px 18px 14px 46px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#5b5249",
                background: "var(--white)",
              }}
            />
          </form>
        </div>
      </section>

      {/* Contact row — two columns (Phone/Email | Instagram/Facebook) */}
      <section style={{ backgroundColor: "var(--white)", padding: "32px 0 28px" }}>
        <div className="container">
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2" style={{ maxWidth: "900px" }}>
            <div className="space-y-7">
              <ContactItem icon={<Phone />} label="Phone" value={CONTACT.phone} href={`tel:${CONTACT.tel}`} />
              <ContactItem icon={<Mail />} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            </div>
            <div className="space-y-7">
              <ContactItem icon={<Ig />} label="Instagram" value={CONTACT.instagramHandle} href={CONTACT.instagram} />
              <ContactItem icon={<Fb />} label="Facebook" value={CONTACT.facebookName} href={CONTACT.facebook} />
            </div>
          </div>
        </div>
      </section>

      {/* Light rounded bottom bar — copyright + legal links */}
      <section style={{ backgroundColor: "var(--white)", padding: "0 0 40px" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(180deg,#eef3f3,#e6eded)", borderRadius: "12px", padding: "18px 28px" }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3" style={{ fontSize: "12px", letterSpacing: "0.06em", color: "var(--label)" }}>
              <span>© 2026 - Carisma AESTHETICS All Rights reserved.</span>
              <div className="flex items-center gap-8">
                <Link href="/privacy-policy" className="hover:text-ink transition-colors" style={{ textDecoration: "underline" }}>PRIVACY Policy</Link>
                <Link href="/terms-conditions" className="hover:text-ink transition-colors" style={{ textDecoration: "underline" }}>TERMS &amp; CONDITION</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
