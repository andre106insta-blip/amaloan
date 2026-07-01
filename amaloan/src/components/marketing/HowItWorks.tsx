'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');
  const steps = [
    { n: '1', title: t('s1Title'), body: t('s1Body') },
    { n: '2', title: t('s2Title'), body: t('s2Body') },
    { n: '3', title: t('s3Title'), body: t('s3Body') },
  ];

  return (
    <section className="container" style={{ padding: '56px 24px' }}>
      <div className="kicker" style={{ marginBottom: 8 }}>{t('kicker')}</div>
      <h2 className="disp" style={{ fontSize: 26, margin: '0 0 26px' }}>{t('title')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            className="card"
            style={{ padding: 20 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          >
            <div
              className="mono"
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: 'var(--accent-soft)',
                color: 'var(--gr)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                marginBottom: 12,
              }}
            >
              {s.n}
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 500 }}>{s.title}</h3>
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
