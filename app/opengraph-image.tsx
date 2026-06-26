import { ImageResponse } from 'next/og'

// Dynamic Open Graph image (same robust approach as the Pulse site): Next serves
// this at /opengraph-image as a correctly-sized 1200×630 PNG with the right
// headers, and metadataBase turns it into an absolute URL for social scrapers.
export const runtime = 'edge'
export const alt = 'Carisma Aesthetics | Medical Aesthetic Clinic Malta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // Deep teal ground (brand --teal-deep #245052 → #1d3f43)
          background: 'linear-gradient(135deg, #245052 0%, #1d3f43 60%, #152f33 100%)',
          position: 'relative',
        }}
      >
        {/* Sage-teal glow top-left (--brand-teal #96b2b2) */}
        <div style={{
          position: 'absolute', top: '-120px', left: '-120px',
          width: '520px', height: '520px', borderRadius: '50%', display: 'flex',
          background: 'radial-gradient(circle, rgba(150,178,178,0.20) 0%, rgba(150,178,178,0) 70%)',
        }} />
        {/* Beige glow bottom-right (--brand beige #efe7d7) */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '440px', height: '440px', borderRadius: '50%', display: 'flex',
          background: 'radial-gradient(circle, rgba(239,231,215,0.22) 0%, rgba(239,231,215,0) 70%)',
        }} />

        {/* Eyebrow */}
        <div style={{
          display: 'flex', fontSize: '30px', letterSpacing: '0.42em', paddingLeft: '0.42em',
          color: '#96b2b2', textTransform: 'uppercase', fontWeight: 600,
        }}>
          Carisma
        </div>

        {/* Wordmark */}
        <div style={{
          display: 'flex', fontSize: '100px', fontWeight: 700, color: '#efe7d7',
          letterSpacing: '0.03em', marginTop: '6px',
        }}>
          Aesthetics
        </div>

        {/* Hairline */}
        <div style={{
          display: 'flex', width: '92px', height: '2px',
          background: 'rgba(150,178,178,0.85)', margin: '30px 0',
        }} />

        {/* Tagline */}
        <div style={{ display: 'flex', fontSize: '34px', color: '#e7eded', letterSpacing: '0.06em' }}>
          Glow with confidence
        </div>
        {/* Location */}
        <div style={{
          display: 'flex', fontSize: '22px', color: 'rgba(231,237,237,0.7)',
          marginTop: '16px', letterSpacing: '0.08em',
        }}>
          Medical aesthetic clinic · Malta
        </div>
      </div>
    ),
    { ...size }
  )
}
