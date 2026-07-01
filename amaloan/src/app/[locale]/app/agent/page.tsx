'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRINCIPAL = 100;

export default function AgentApp() {
  const [out, setOut] = useState(62.5);
  const idRef = useRef(2);
  const [feed, setFeed] = useState<{ id: number; text: string }[]>([
    { id: 0, text: 'income +$5.40 · $3.34 → pool, $2.06 → agent' },
    { id: 1, text: 'income +$1.90 · fully swept to loan' },
  ]);
  const [flash, setFlash] = useState<{ id: number; amt: number } | null>(null);

  const pct = Math.round(((PRINCIPAL - out) / PRINCIPAL) * 100);

  function simulate() {
    if (out <= 0) return;
    const amt = Math.round((Math.random() * 7 + 2) * 100) / 100;
    const due = Math.min(amt, out);
    const fwd = Math.round((amt - due) * 100) / 100;
    const id = idRef.current++;
    setOut(Math.round((out - due) * 100) / 100);
    setFlash({ id, amt });
    setFeed((f) =>
      [{ id, text: `income +$${amt.toFixed(2)} · $${due.toFixed(2)} → pool${fwd > 0 ? `, $${fwd.toFixed(2)} → agent` : ''}` }, ...f].slice(0, 8),
    );
  }

  return (
    <div>
      <h1 className="disp" style={{ fontSize: 24, margin: '0 0 16px' }}>Agent console</h1>

      <div className="card" style={{ padding: 24, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div className="faint" style={{ fontSize: 13 }}>agent</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 500 }}>agent.aria.sol</div>
            <div className="faint" style={{ fontSize: 12 }}>reputation 824 · SATI verified</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="faint" style={{ fontSize: 13 }}>credit line</div>
            <div className="mono" style={{ fontSize: 26, fontWeight: 500 }}>$1,148</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="faint" style={{ fontSize: 13 }}>outstanding</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 500 }}>${out.toFixed(2)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="faint" style={{ fontSize: 13 }}>repaid</div>
            <div className="mono" style={{ fontSize: 16 }}>{pct}%</div>
          </div>
        </div>

        <div className="meter-track" style={{ marginTop: 10 }}>
          <motion.div
            style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(110deg, var(--gr), var(--gr2))' }}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 10, flexWrap: 'wrap' }}>
          <span className="muted" style={{ fontSize: 13.5 }}>
            {out <= 0 ? 'Loan repaid · credit line free' : 'Simulate a client payment to see the auto-sweep'}
          </span>
          <button className="btn btn-primary btn-sm" onClick={simulate} disabled={out <= 0}>
            <i className="ti ti-player-play" aria-hidden="true" /> Simulate x402 income
          </button>
        </div>

        <AnimatePresence>
          {flash && (
            <motion.span
              key={flash.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -24 }}
              exit={{ opacity: 0, y: -42 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              onAnimationComplete={() => setFlash(null)}
              className="mono"
              style={{ position: 'absolute', insetInlineEnd: 26, bottom: 60, color: 'var(--live)', fontSize: 14, fontWeight: 500, pointerEvents: 'none' }}
            >
              +${flash.amt.toFixed(2)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="card" style={{ padding: '18px 22px' }}>
        <div className="h3" style={{ fontSize: 16, marginBottom: 8 }}>Activity</div>
        <AnimatePresence initial={false}>
          {feed.map((f, i) => (
            <motion.div
              key={f.id}
              layout
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="muted"
              style={{ padding: '9px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hair)', fontSize: 13.5, overflow: 'hidden' }}
            >
              {f.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
