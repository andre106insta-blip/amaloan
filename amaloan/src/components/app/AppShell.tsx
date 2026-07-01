'use client';

import { Link, usePathname } from '@/i18n/navigation';

const NAV = [
  { href: '/app', label: 'Overview', icon: 'ti-layout-dashboard' },
  { href: '/app/agents', label: 'Live agents', icon: 'ti-radar-2' },
  { href: '/app/lender', label: 'Lend', icon: 'ti-coins' },
  { href: '/app/agent', label: 'Borrow', icon: 'ti-robot' },
  { href: '/app/ledger', label: 'Ledger', icon: 'ti-list-details' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 218,
          flex: '0 0 auto',
          borderRight: '1px solid var(--hair)',
          padding: '18px 14px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          background: 'var(--el)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '4px 8px 20px' }}>
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: 'var(--accent-grad)',
              color: 'var(--on-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
            }}
          >
            »
          </span>
          <span className="disp" style={{ fontSize: 15 }}>AMALoan</span>
        </Link>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 11px',
                  borderRadius: 9,
                  fontSize: 14,
                  color: active ? 'var(--tx)' : 'var(--tx2)',
                  background: active ? 'var(--s1)' : 'transparent',
                }}
              >
                <i className={`ti ${n.icon}`} aria-hidden="true" />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
            padding: '14px 22px',
            borderBottom: '1px solid var(--hair)',
          }}
        >
          <span className="badge">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gr)', display: 'inline-block' }} /> Solana devnet
          </span>
          <button className="btn btn-primary btn-sm">Connect wallet</button>
        </header>
        <div style={{ padding: '24px 22px', maxWidth: 940, margin: '0 auto' }}>{children}</div>
      </div>
    </div>
  );
}
