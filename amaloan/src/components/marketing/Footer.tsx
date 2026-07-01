'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  const cols = [
    { head: t('product'), links: ['How it works', 'Lenders', 'Developers', 'Transparency'] },
    { head: t('company'), links: ['About', 'Team', 'Careers', 'Blog'] },
    { head: t('trust'), links: ['Security', 'Audits', 'Docs', 'Status'] },
  ];

  return (
    <footer style={{ background: 'var(--el)', borderTop: '1px solid var(--hair)', marginTop: 64 }}>
      <div className="container" style={{ padding: '48px 24px 36px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ flex: '2 1 240px', minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--accent-grad)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>»</span>
              <span className="disp">AMALoan AI</span>
            </div>
            <p className="muted" style={{ fontSize: 14, maxWidth: 260, margin: '0 0 14px', lineHeight: 1.55 }}>{t('tagline')}</p>
            <div className="mono muted" style={{ fontSize: 12.5 }}>hello@amaloan.ai</div>
            <div className="mono muted" style={{ fontSize: 12.5, marginTop: 4 }}>founders@amaloan.ai</div>
          </div>

          {cols.map((c) => (
            <div key={c.head} style={{ flex: '1 1 130px', minWidth: 120 }}>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 12, color: 'var(--tx)' }}>{c.head}</div>
              {c.links.map((l) => (
                <div key={l} className="muted" style={{ fontSize: 13.5, marginBottom: 8, cursor: 'pointer' }}>{l}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--hair)' }}>
          <p className="faint" style={{ fontSize: 12, margin: 0, maxWidth: 560 }}>{t('risk')}</p>
          <p className="faint" style={{ fontSize: 12, margin: 0 }}>{t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
