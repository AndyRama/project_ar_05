import React from 'react';

type Stat = {
  value: string
  label: string
}

type CtaLink = {
  label: string
  href: string
}

type CTABlockProps = {
  title: string
  subtitle?: string
  body?: string
  stats?: Stat[]
  cta?: CtaLink
  phone?: CtaLink
  email?: string
}

export function CTABlock({
  title,
  subtitle,
  body,
  stats = [],
  cta,
  phone,
  email,
}: CTABlockProps) {
  return (
    <section
      style={{
        margin: '40px 0 24px',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        boxShadow: '0 4px 24px rgba(234,88,12,0.18)',
      }}
    >
      {/* Corps orange */}
      <div
        style={{
          background: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
          padding: '36px 40px 28px',
          color: '#ffffff',
        }}
      >
        <h2
          style={{
            margin: '0 0 6px',
            fontSize: '1.45rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: '#ffffff',
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              margin: '0 0 14px',
              fontSize: '0.9rem',
              color: '#fed7aa',
              fontStyle: 'italic',
            }}
          >
            {subtitle}
          </p>
        )}

        {body && (
          <p
            style={{
              margin: '0 0 24px',
              fontSize: '0.95rem',
              color: '#ffedd5',
              lineHeight: 1.65,
              maxWidth: '600px',
            }}
          >
            {body}
          </p>
        )}

        {stats.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              marginBottom: '28px',
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#fed7aa',
                    marginTop: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {cta && (
          <a
            href={cta.href}
            style={{
              display: 'inline-block',
              padding: '13px 28px',
              borderRadius: '8px',
              background: '#ffffff',
              color: '#c2410c',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}
          >
            {cta.label} →
          </a>
        )}
      </div>

      {/* Barre contact */}
      <div
        style={{
          background: '#7c2d12',
          padding: '16px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        {phone && (
          <a
            href={phone.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            <span>📞</span>
            {phone.label}
          </a>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fed7aa',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            <span>✉️</span>
            {email}
          </a>
        )}

        <span
          style={{
            marginLeft: 'auto',
            color: '#fb923c',
            fontSize: '0.82rem',
            fontWeight: 500,
          }}
        >
          Unlcoaching.com
        </span>
      </div>
    </section>
  );
}