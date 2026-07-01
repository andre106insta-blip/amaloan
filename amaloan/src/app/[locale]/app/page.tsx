import { Link } from '@/i18n/navigation';

const METRICS = [
  { l: 'Your deposit', v: '$5,000' },
  { l: 'Earned', v: '$12.40' },
  { l: 'Net APY', v: '9.4%' },
  { l: 'Active loans', v: '2' },
];

const LINKS = [
  { href: '/app/lender', icon: 'ti-coins', title: 'Lend USDC', body: 'Earn yield from agent loans.' },
  { href: '/app/agent', icon: 'ti-robot', title: 'Borrow for your agent', body: 'Open a credit line.' },
  { href: '/app/ledger', icon: 'ti-list-details', title: 'Ledger', body: 'Every event, on-chain.' },
];

export default function AppOverview() {
  return (
    <div>
      <h1 className="disp" style={{ fontSize: 24, margin: '0 0 4px' }}>Overview</h1>
      <p className="muted" style={{ margin: '0 0 20px', fontSize: 14 }}>Your AMALoan dashboard.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 22 }}>
        {METRICS.map((m) => (
          <div key={m.l} style={{ background: 'var(--s1)', border: '1px solid var(--hair)', borderRadius: 12, padding: '16px 18px' }}>
            <div className="faint" style={{ fontSize: 12 }}>{m.l}</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 500, marginTop: 4 }}>{m.v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="card" style={{ padding: 20, display: 'block' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--accent-soft)', color: 'var(--gr)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 12 }}>
              <i className={`ti ${l.icon}`} aria-hidden="true" />
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{l.title}</div>
            <div className="muted" style={{ fontSize: 13 }}>{l.body}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
