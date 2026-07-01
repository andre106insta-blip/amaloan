'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(640px 320px at 50% -8%, rgba(174,192,220,0.13), transparent 70%)' }}
      />
      <div
        aria-hidden
        style={{ position: 'absolute', top: -50, left: '50%', width: 1, height: 190, transform: 'translateX(-50%)', background: 'linear-gradient(180deg, rgba(174,192,220,0.5), transparent)', pointerEvents: 'none' }}
      />
      <div className="container" style={{ padding: '86px 24px 36px', textAlign: 'center', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }}>
          <div className="kicker" style={{ marginBottom: 16 }}>{kicker}</div>
          <h1 className="h1" style={{ margin: '0 auto 18px', maxWidth: 780 }}>{title}</h1>
          <p className="lead" style={{ maxWidth: 580, margin: '0 auto' }}>{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}
