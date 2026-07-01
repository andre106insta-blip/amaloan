'use client';

import { useEffect, useState } from 'react';

type Agent = {
  agent: string;
  income30d: number;
  incomeAllTimeUsd: number;
  txCount: number;
  uniquePayers: number;
  ageDays: number;
  creditScore: number;
  riskPremiumPct: number;
  creditLimitUsd: number;
  recommended: boolean;
  washFlag: boolean;
  washReason?: string;
};

type Stats = {
  generatedAt: string;
  mode: 'mock' | 'live';
  agentsIndexed: number;
  agentsWithIncome: number;
  recommended: number;
  flaggedWash: number;
  totalIncome30dUsd: number;
  totalIncomeAllTimeUsd: number;
  medianIncome30dUsd: number;
  addressableCreditUsd: number;
};

const usd = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `$${n.toFixed(n < 10 ? 2 : 0)}`;

export default function LiveAgentsPage() {
  const [agents, setAgents] = useState<Agent[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/agents.json').then((r) => r.json()),
      fetch('/data/stats.json').then((r) => r.json()),
    ])
      .then(([a, s]) => {
        setAgents(a);
        setStats(s);
      })
      .catch(() => setErr('Could not load live data. Run the indexer first.'));
  }, []);

  const band: { l: string; v: string }[] = stats
    ? [
        { l: 'Agents discovered', v: String(stats.agentsIndexed) },
        { l: 'With on-chain income', v: String(stats.agentsWithIncome) },
        { l: 'All-time x402 income', v: usd(stats.totalIncomeAllTimeUsd) },
        { l: 'Underwritable now', v: String(stats.recommended) },
      ]
    : [];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
        <h1 className="disp" style={{ fontSize: 24, margin: 0 }}>Live agents</h1>
        <span className="badge">
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gr)', display: 'inline-block' }} />
          Solana mainnet · SATI registry
        </span>
      </div>
      <p className="muted" style={{ margin: '0 0 20px', fontSize: 14 }}>
        Real autonomous agents indexed from the on-chain SATI registry and scored against their x402 USDC income.
        {stats?.generatedAt ? ` Last scan ${new Date(stats.generatedAt).toLocaleString()}.` : ''}
      </p>

      {err && (
        <div className="card" style={{ padding: 16, fontSize: 13, color: 'var(--tx2)' }}>{err}</div>
      )}

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 18 }}>
          {band.map((m) => (
            <div key={m.l} style={{ background: 'var(--s1)', border: '1px solid var(--hair)', borderRadius: 12, padding: '16px 18px' }}>
              <div className="faint" style={{ fontSize: 12 }}>{m.l}</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 500, marginTop: 4 }}>{m.v}</div>
            </div>
          ))}
        </div>
      )}

      {stats && stats.recommended === 0 && stats.agentsWithIncome > 0 && (
        <div
          className="card"
          style={{ padding: '14px 16px', marginBottom: 18, fontSize: 13, color: 'var(--tx2)', borderColor: 'var(--hair)' }}
        >
          <strong style={{ color: 'var(--tx)' }}>Honest read of the market.</strong>{' '}
          {stats.agentsIndexed} agents are registered and {stats.agentsWithIncome} have received USDC on-chain, but
          almost none have a recurring 30-day income stream yet — the agent economy is real but still pre-revenue.
          AMALoan is built to underwrite it the moment that income turns on.
        </div>
      )}

      {agents && agents.length > 0 ? (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
              <thead>
                <tr style={{ textAlign: 'left', color: 'var(--tx3)' }}>
                  {['Agent', 'All-time', '30d', 'Payers', 'Age', 'Score', 'ρ %', 'Offer', ''].map((h, i) => (
                    <th key={h + i} style={{ padding: '11px 14px', fontWeight: 500, borderBottom: '1px solid var(--hair)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agents.slice(0, 60).map((a, i) => (
                  <tr key={a.agent + i} style={{ borderBottom: '1px solid var(--hair)' }}>
                    <td style={{ padding: '10px 14px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.agent}</td>
                    <td className="mono" style={{ padding: '10px 14px' }}>{usd(a.incomeAllTimeUsd)}</td>
                    <td className="mono" style={{ padding: '10px 14px', color: a.income30d > 0 ? 'var(--tx)' : 'var(--tx3)' }}>{a.income30d > 0 ? usd(a.income30d) : '—'}</td>
                    <td className="mono" style={{ padding: '10px 14px' }}>{a.uniquePayers}</td>
                    <td className="mono" style={{ padding: '10px 14px' }}>{a.ageDays}d</td>
                    <td className="mono" style={{ padding: '10px 14px' }}>{a.creditScore}</td>
                    <td className="mono" style={{ padding: '10px 14px' }}>{a.riskPremiumPct.toFixed(0)}</td>
                    <td className="mono" style={{ padding: '10px 14px', color: a.creditLimitUsd > 0 ? 'var(--gr)' : 'var(--tx3)' }}>{a.creditLimitUsd > 0 ? usd(a.creditLimitUsd) : '—'}</td>
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      {a.washFlag ? (
                        <span className="faint" style={{ fontSize: 12 }}>flagged</span>
                      ) : a.recommended ? (
                        <span style={{ fontSize: 12, color: 'var(--gr)' }}>prospect</span>
                      ) : (
                        <span className="faint" style={{ fontSize: 12 }}>watch</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !err && <div className="card" style={{ padding: 16, fontSize: 13, color: 'var(--tx2)' }}>Loading live agents…</div>
      )}
    </div>
  );
}
