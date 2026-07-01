'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

function Packet({ delay, reduce }: { delay: number; reduce: boolean }) {
  if (reduce) {
    return <span aria-hidden style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -3.5, marginLeft: -3.5, width: 7, height: 7, borderRadius: '50%', background: 'var(--gr)' }} />;
  }
  return (
    <motion.span
      aria-hidden
      style={{ position: 'absolute', top: '50%', marginTop: -3.5, width: 7, height: 7, borderRadius: '50%', background: 'var(--gr2)', boxShadow: '0 0 10px rgba(174,192,220,0.9)' }}
      animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay }}
    />
  );
}

export default function SweepVisual() {
  const t = useTranslations('Hero');
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="glass-steel" style={{ borderRadius: 20, padding: '18px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span className="live-dot" aria-hidden="true" />
        <span className="faint mono" style={{ fontSize: 12, letterSpacing: '0.04em' }}>{t('sweepTitle')}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div className="sweep-node">
          {t('nodeIncome')}
          <small>{t('nodeIncomeSub')}</small>
        </div>
        <div className="sweep-wire"><Packet delay={0} reduce={reduce} /></div>
        <motion.div
          className="sweep-node vault"
          animate={reduce ? undefined : { boxShadow: ['0 0 0 rgba(174,192,220,0)', '0 0 22px rgba(174,192,220,0.28)', '0 0 0 rgba(174,192,220,0)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('nodeVault')}
          <small>{t('nodeVaultSub')}</small>
        </motion.div>
        <div className="sweep-wire"><Packet delay={0.8} reduce={reduce} /></div>
        <div className="sweep-node">
          {t('nodeAgent')}
          <small>{t('nodeAgentSub')}</small>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="faint" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 7 }}>
          <span>{t('meterLabel')}</span>
          <span className="mono" style={{ color: 'var(--gr)' }}>{t('meterTag')}</span>
        </div>
        <div className="meter-track">
          <motion.div
            style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(110deg, var(--gr), var(--gr2))' }}
            initial={{ width: '8%' }}
            animate={reduce ? { width: '74%' } : { width: ['8%', '74%', '74%'] }}
            transition={reduce ? { duration: 0 } : { duration: 3.4, repeat: Infinity, ease: [0.16, 1, 0.3, 1], times: [0, 0.6, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
