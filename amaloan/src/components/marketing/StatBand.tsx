'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { getProtocolStats } from '@/lib/data/stats';

export default function StatBand() {
  const t = useTranslations('Stats');
  const locale = useLocale();
  const s = getProtocolStats();

  const money = (n: number, l: string) => '$' + (n / 1e6).toLocaleString(l, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + 'M';
  const pct = (n: number, l: string) => n.toLocaleString(l, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  const int = (n: number, l: string) => Math.round(n).toLocaleString(l);

  const items = [
    { label: t('totalLent'), value: s.totalLent, fmt: money },
    { label: t('tvl'), value: s.tvl, fmt: money },
    { label: t('apy'), value: s.apy, fmt: pct, accent: true },
    { label: t('activeLoans'), value: s.activeLoans, fmt: int },
    { label: t('onTime'), value: s.onTime, fmt: pct },
    { label: t('totalSwept'), value: s.totalSwept, fmt: money },
  ];

  return (
    <section className="container" style={{ padding: '8px 24px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 1,
          background: 'var(--hair)',
          border: '1px solid var(--hair)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
        }}
      >
        {items.map((it) => (
          <Counter key={it.label} label={it.label} target={it.value} fmt={it.fmt} locale={locale} accent={it.accent} />
        ))}
      </div>
    </section>
  );
}

function Counter({
  label,
  target,
  fmt,
  locale,
  accent,
}: {
  label: string;
  target: number;
  fmt: (n: number, l: string) => string;
  locale: string;
  accent?: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const dur = 1500;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(target * e);
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div style={{ background: 'var(--bg)', padding: '16px 18px' }}>
      <div className="mono" style={{ fontSize: 22, fontWeight: 500, color: accent ? 'var(--gr)' : 'var(--tx)' }}>
        {fmt(val, locale)}
      </div>
      <div className="faint" style={{ fontSize: 12, marginTop: 3 }}>{label}</div>
    </div>
  );
}
