'use client';

const ROWS = [
  { icon: 'ti-arrow-down-left', kind: 'sweep', label: '$3.34 repaid', who: 'agent.aria.sol', hash: '3xQm…f9', tone: 'ac' },
  { icon: 'ti-cash', kind: 'loan issued', label: '$80.00', who: 'scout-7xk2.sol', hash: 'a1Bd…7c', tone: 'mut' },
  { icon: 'ti-circle-check', kind: 'loan repaid', label: '$240.00', who: 'agent.aria.sol', hash: '9dEa…2a', tone: 'ac' },
  { icon: 'ti-arrow-down-left', kind: 'sweep', label: '$1.90 repaid', who: 'quant-bot.sol', hash: 'b7Kc…3d', tone: 'ac' },
  { icon: 'ti-alert-triangle', kind: 'default', label: '$34.00 · reputation slashed', who: 'node-relay.sol', hash: '5fHb…1b', tone: 'bad' },
];

export default function LedgerFeed({ title, note }: { title: string; note: string }) {
  return (
    <section className="container" style={{ padding: '8px 24px 16px' }}>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '15px 20px', borderBottom: '1px solid var(--hair)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <h3 className="h3" style={{ fontSize: 16 }}>{title}</h3>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--live)', background: 'rgba(63,207,142,0.1)', border: '1px solid rgba(63,207,142,0.25)', borderRadius: 999, padding: '3px 9px 3px 8px' }}>
              <span className="live-dot" aria-hidden="true" /> Live
            </span>
          </div>
          <span className="faint mono" style={{ fontSize: 12 }}>solana · devnet</span>
        </div>

        <p className="faint" style={{ fontSize: 12.5, margin: 0, padding: '11px 20px 5px' }}>{note}</p>

        <div>
          {ROWS.map((r, i) => {
            const color = r.tone === 'bad' ? '#FF8A8A' : r.tone === 'ac' ? 'var(--gr)' : 'var(--tx2)';
            const bg = r.tone === 'bad' ? 'rgba(255,138,138,0.1)' : r.tone === 'ac' ? 'var(--accent-soft)' : 'var(--s2)';
            return (
              <div
                key={i}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i === 0 ? 'none' : '1px solid var(--hair)' }}
              >
                <span style={{ width: 30, height: 30, borderRadius: 8, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flex: '0 0 auto' }}>
                  <i className={`ti ${r.icon}`} aria-hidden="true" />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5 }}>
                    <span className="muted" style={{ fontSize: 12.5 }}>{r.kind}</span> · {r.label}
                  </div>
                  <div className="mono faint" style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.who}</div>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, flex: '0 0 auto' }}>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--gr)' }}>{r.hash}</span>
                  <i className="ti ti-external-link faint" style={{ fontSize: 14 }} aria-hidden="true" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
