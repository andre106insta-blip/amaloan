'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PoolCard({
  name,
  apy,
  desc,
  accent,
  delay = 0,
}: {
  name: string;
  apy: string;
  desc: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className="card"
      style={{ padding: 24, border: accent ? '1px solid rgba(174,192,220,0.4)' : undefined }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <div className="disp" style={{ fontSize: 18 }}>{name}</div>
        <div className="mono" style={{ fontSize: 30, fontWeight: 500, color: 'var(--gr)' }}>{apy}</div>
      </div>
      <p className="muted" style={{ fontSize: 14, margin: '10px 0 0', lineHeight: 1.55 }}>{desc}</p>
    </motion.div>
  );
}
