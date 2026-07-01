const inp: React.CSSProperties = {
  background: 'var(--s2)',
  border: '1px solid var(--bd)',
  borderRadius: 10,
  padding: '11px 13px',
  color: 'var(--tx)',
  fontSize: 14,
  fontFamily: 'inherit',
  maxWidth: 140,
};

const POOLSTATS = [
  { l: 'Utilization', v: '71%' },
  { l: 'Reserve buffer', v: '$84,200' },
  { l: '30d loss', v: '$11,900' },
  { l: 'PoR coverage', v: '100%' },
];

const LOANS = [
  { a: 'agent.aria.sol', m: '$240 · 2d', s: 'repaying' },
  { a: 'scout-7xk2.sol', m: '$80 · 6h', s: 'current' },
  { a: 'quant-bot.sol', m: '$500 · 4d', s: 'current' },
  { a: 'node-relay.sol', m: '$34 · 1d', s: 'at risk' },
];

export default function LenderApp() {
  return (
    <div>
      <h1 className="disp" style={{ fontSize: 24, margin: '0 0 16px' }}>Lender vault</h1>

      <div className="card" style={{ padding: 24, marginBottom: 14 }}>
        <div className="faint" style={{ fontSize: 13 }}>Your position</div>
        <div className="mono" style={{ fontSize: 30, fontWeight: 500, margin: '2px 0' }}>$5,000</div>
        <div className="mono" style={{ fontSize: 13, color: 'var(--gr)' }}>+$12.40 earned · 9.4% APY</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <input type="number" defaultValue={500} style={inp} />
          <button className="btn btn-primary">Deposit USDC</button>
          <button className="btn btn-ghost">Withdraw</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 14 }}>
        {POOLSTATS.map((p) => (
          <div key={p.l} style={{ background: 'var(--s1)', border: '1px solid var(--hair)', borderRadius: 12, padding: '14px 16px' }}>
            <div className="faint" style={{ fontSize: 12 }}>{p.l}</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 500, marginTop: 3 }}>{p.v}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '18px 22px' }}>
        <div className="disp" style={{ fontSize: 16, marginBottom: 8 }}>Loan book</div>
        {LOANS.map((l, i) => (
          <div
            key={l.a}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '11px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hair)', fontSize: 14 }}
          >
            <span className="mono">{l.a}</span>
            <span className="muted" style={{ fontSize: 13 }}>{l.m}</span>
            <span className="badge">{l.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
