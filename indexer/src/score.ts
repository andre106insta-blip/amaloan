import type { AgentFeatures, AgentProfile } from './types';

// Credit-score weights (from the AMALoan economics model).
const W = { rep: 0.3, inc: 0.25, vol: 0.15, age: 0.1, stake: 0.2 };
const clip = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
const round1 = (x: number) => Math.round(x * 10) / 10;

// Proxy for SATI / Agent Registry reputation in mock mode (0..1000).
// In live mode this is replaced by a read from the on-chain reputation registry.
function mockReputation(f: AgentFeatures): number {
  if (f.washFlag) return 120;
  const r = 300 + f.uniquePayers * 22 + Math.min(300, f.income30d * 0.25) + f.ageDays * 1.5 + f.stabilityScore * 120;
  return Math.round(Math.max(0, Math.min(950, r)));
}

export function scoreAgent(f: AgentFeatures): AgentProfile {
  const reputation = mockReputation(f);
  const sR = clip(reputation / 1000);

  // log-saturating income sub-score: $0→$200 matters far more than $1800→$2000
  const m = f.income30d;
  const m0 = 10;
  const M = 2000;
  const sI = clip(Math.log(1 + m / m0) / Math.log(1 + M / m0));

  const sV = clip(f.stabilityScore);
  const sA = clip(f.ageDays / 90);
  const sK = 0; // posted stake unknown at prospecting time

  const creditScore = Math.round(1000 * (W.rep * sR + W.inc * sI + W.vol * sV + W.age * sA + W.stake * sK));
  const riskPremiumPct = round1(2 + 38 * (1 - creditScore / 1000));

  // Conservative credit-builder offer: a small fraction of trailing income, capped; zero if flagged.
  const creditLimitUsd = f.washFlag ? 0 : Math.round(Math.min(500, 0.15 * f.income30d));

  const recommended = !f.washFlag && f.income30d >= 100 && f.uniquePayers >= 3 && f.ageDays >= 14;

  return { ...f, reputation, creditScore, riskPremiumPct, creditLimitUsd, recommended };
}
