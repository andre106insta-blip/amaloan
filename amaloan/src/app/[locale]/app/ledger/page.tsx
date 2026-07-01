import LedgerFeed from '@/components/marketing/LedgerFeed';

const METRICS = [
  { l: 'Total originated', v: '$4.21M' },
  { l: 'Total repaid', v: '$4.09M' },
  { l: 'Loss rate', v: '2.81%' },
  { l: 'PoR', v: '100%' },
];

export default function LedgerApp() {
  return (
    <div>
      <h1 className="disp" style={{ fontSize: 24, margin: '0 0 16px' }}>Ledger</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 8 }}>
        {METRICS.map((m) => (
          <div key={m.l} style={{ background: 'var(--s1)', border: '1px solid var(--hair)', borderRadius: 12, padding: '14px 16px' }}>
            <div className="faint" style={{ fontSize: 12 }}>{m.l}</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 500, marginTop: 3 }}>{m.v}</div>
          </div>
        ))}
      </div>
      <LedgerFeed title="Recent activity" note="Every event is on-chain and verifiable." />
    </div>
  );
}
