'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FeatureGrid({
  kicker,
  title,
  items,
}: {
  kicker?: string;
  title?: string;
  items: { icon?: string; title: string; body: string }[];
}) {
  return (
    <section className="container" style={{ padding: '40px 24px' }}>
      {kicker && <div className="kicker" style={{ marginBottom: 8 }}>{kicker}</div>}
      {title && <h2 className="disp" style={{ fontSize: 26, margin: '0 0 24px' }}>{title}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {items.map((f, i) => (
          <motion.div
            key={f.title}
            className="card"
            style={{ padding: 22 }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
          >
            {f.icon && (
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: 'var(--accent-soft)',
                  color: 'var(--gr)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  marginBottom: 13,
                }}
              >
                <i className={`ti ${f.icon}`} aria-hidden="true" />
              </div>
            )}
            <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 500 }}>{f.title}</h3>
            <p className="muted" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
