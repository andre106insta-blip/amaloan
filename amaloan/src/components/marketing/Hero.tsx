'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import SweepVisual from './SweepVisual';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const t = useTranslations('Hero');
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(720px 400px at 80% 6%, rgba(174,192,220,0.13), transparent 64%)' }}
      />
      <div
        className="container"
        style={{ padding: '60px 24px 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 44, alignItems: 'center', position: 'relative' }}
      >
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <span className="badge"><i className="ti ti-bolt" aria-hidden="true" /> {t('badge')}</span>
          <h1 className="h1" style={{ margin: '18px 0 16px', maxWidth: 560 }}>{t('title')}</h1>
          <p className="lead" style={{ maxWidth: 440, marginBottom: 28 }}>{t('subtitle')}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/lenders" className="btn btn-primary">{t('ctaPrimary')}</Link>
            <Link href="/docs" className="btn btn-ghost">{t('ctaSecondary')}</Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.12, ease: EASE }}>
          <SweepVisual />
        </motion.div>
      </div>
    </section>
  );
}
