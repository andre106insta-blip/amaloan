'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Steps({
  kicker,
  title,
  items,
}: {
  kicker?: string;
  title: string;
  items: { n: string; title: string; body: string }[];
}) {
  return (
    <section className="container" style={{ padding: '48px 24px' }}>
      {kicker && <div className="kicker" style={{ marginBottom: 8 }}>{kicker}</div>}
      <h2 className="disp" style={{ fontSize: 26, margin: '0 0 26px' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {items.map((s, i) => (
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
