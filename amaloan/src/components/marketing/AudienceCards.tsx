'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const COL: Record<string, string> = {
  kw: 'var(--gr2)',
  fn: 'var(--gr)',
  st: '#9DBBA6',
  nm: '#D6C28A',
  cm: 'var(--tx3)',
  pu: 'var(--tx2)',
  tx: 'var(--tx)',
};

const CODE: { t: string; c: string }[][] = [
  [{ t: 'import', c: 'kw' }, { t: ' { ', c: 'pu' }, { t: 'Float', c: 'fn' }, { t: ' } ', c: 'pu' }, { t: 'from', c: 'kw' }, { t: ' "@amaloan/sdk"', c: 'st' }, { t: ';', c: 'pu' }],
  [],
  [{ t: '// give your agent a credit line', c: 'cm' }],
  [{ t: 'const', c: 'kw' }, { t: ' loan ', c: 'tx' }, { t: '= ', c: 'pu' }, { t: 'await', c: 'kw' }, { t: ' Float', c: 'tx' }, { t: '.', c: 'pu' }, { t: 'borrow', c: 'fn' }, { t: '({', c: 'pu' }],
  [{ t: '  amount: ', c: 'tx' }, { t: '50', c: 'nm' }, { t: ',', c: 'pu' }, { t: '      // USDC', c: 'cm' }],
  [{ t: '  term: ', c: 'tx' }, { t: '"2d"', c: 'st' }, { t: ',', c: 'pu' }],
  [{ t: '});', c: 'pu' }],
];

export default function AudienceCards() {
  const d = useTranslations('Developers');
  const l = useTranslations('Lenders');

  return (
    <section className="container" style={{ padding: '12px 24px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {/* Developer — IDE window */}
        <motion.div
          className="card"
          style={{ padding: 0, overflow: 'hidden' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div style={{ padding: '22px 24px 14px' }}>
            <div className="kicker" style={{ marginBottom: 8 }}>{d('kicker')}</div>
            <div className="h3">{d('title')}</div>
            <p className="muted" style={{ fontSize: 13.5, margin: '6px 0 0', lineHeight: 1.5 }}>{d('body')}</p>
          </div>
          <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--hair)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 16px', borderBottom: '1px solid var(--hair)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--bd)' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--bd)' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--bd)' }} />
              <span className="mono faint" style={{ fontSize: 12, marginInlineStart: 6 }}>agent.ts</span>
              <span className="mono" style={{ fontSize: 10.5, color: 'var(--gr)', marginInlineStart: 'auto', border: '1px solid var(--bd)', borderRadius: 5, padding: '1px 6px' }}>TS</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.85, padding: '14px 16px', overflowX: 'auto' }}>
              {CODE.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  <span style={{ color: 'var(--tx3)', width: 16, textAlign: 'right', flex: '0 0 auto', userSelect: 'none' }}>{i + 1}</span>
                  <span style={{ whiteSpace: 'pre' }}>
                    {line.map((tk, j) => (
                      <span key={j} style={{ color: COL[tk.c] }}>{tk.t}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lender — premium asset card */}
        <motion.div
          className="card"
          style={{ padding: 24, display: 'flex', flexDirection: 'column' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="kicker">{l('kicker')}</div>
            <span className="badge" style={{ fontSize: 11 }}><i className="ti ti-rosette-discount-check" aria-hidden="true" /> {l('audited')}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
            <div className="mono" style={{ fontSize: 44, fontWeight: 500, color: 'var(--gr2)', lineHeight: 1 }}>9.4%</div>
            <div className="faint" style={{ fontSize: 13 }}>net APY</div>
          </div>

          <svg viewBox="0 0 240 56" preserveAspectRatio="none" style={{ width: '100%', height: 56, margin: '14px 0' }} aria-hidden="true">
            <defs>
              <linearGradient id="amg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(174,192,220,0.32)" />
                <stop offset="100%" stopColor="rgba(174,192,220,0)" />
              </linearGradient>
            </defs>
            <path d="M0,46 C40,40 60,30 90,30 C120,30 140,18 175,15 C200,12 220,8 240,6 L240,56 L0,56 Z" fill="url(#amg)" />
            <path d="M0,46 C40,40 60,30 90,30 C120,30 140,18 175,15 C200,12 220,8 240,6" fill="none" stroke="var(--gr)" strokeWidth="2" />
          </svg>

          <p className="muted" style={{ fontSize: 13.5, margin: '0 0 14px', lineHeight: 1.5 }}>{l('body')}</p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
            <span style={{ fontSize: 12, color: 'var(--tx2)', background: 'var(--s2)', border: '1px solid var(--bd)', borderRadius: 999, padding: '5px 12px' }}>{l('nonCustodial')}</span>
            <span style={{ fontSize: 12, color: 'var(--tx2)', background: 'var(--s2)', border: '1px solid var(--bd)', borderRadius: 999, padding: '5px 12px' }}>{l('por')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
