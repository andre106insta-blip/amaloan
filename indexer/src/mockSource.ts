import type { IncomeEvent } from './types';

// Deterministic PRNG so the dataset is reproducible (no Math.random nondeterminism).
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 86400;
// Fixed "now" so the trailing-30d windows are stable.
const NOW = Math.floor(Date.UTC(2026, 5, 19) / 1000);

interface Archetype {
  kind: string;
  payers: number;
  daily: number; // ~USD/day
  vol: number; // amount volatility 0..1
  ageDays: number;
  recurr: number; // probability of income on a given day
  wash: boolean;
}

const ARCHETYPES: Archetype[] = [
  { kind: 'prime', payers: 18, daily: 55, vol: 0.18, ageDays: 140, recurr: 0.95, wash: false },
  { kind: 'prime', payers: 12, daily: 42, vol: 0.22, ageDays: 96, recurr: 0.9, wash: false },
  { kind: 'growing', payers: 7, daily: 18, vol: 0.35, ageDays: 55, recurr: 0.7, wash: false },
  { kind: 'growing', payers: 5, daily: 11, vol: 0.4, ageDays: 40, recurr: 0.62, wash: false },
  { kind: 'new', payers: 3, daily: 4, vol: 0.6, ageDays: 9, recurr: 0.45, wash: false },
  { kind: 'new', payers: 2, daily: 2, vol: 0.7, ageDays: 5, recurr: 0.35, wash: false },
  { kind: 'wash', payers: 1, daily: 60, vol: 0.1, ageDays: 12, recurr: 0.92, wash: true },
];

function sig(rand: () => number): string {
  const c = '0123456789abcdef';
  let s = '';
  for (let i = 0; i < 8; i++) s += c[Math.floor(rand() * 16)];
  return s;
}

export function mockEvents(count = 44): IncomeEvent[] {
  const rand = mulberry32(42);
  const events: IncomeEvent[] = [];

  for (let i = 0; i < count; i++) {
    const arc = ARCHETYPES[i % ARCHETYPES.length];
    const agent = `agent-${(i + 1).toString(36).padStart(3, '0')}.sol`;
    const age = Math.max(2, Math.round(arc.ageDays * (0.7 + rand() * 0.6)));
    const days = Math.min(age, 60);
    const payers = arc.wash ? [agent] : Array.from({ length: arc.payers }, (_, p) => `payer-${i}-${p}.sol`);

    for (let d = 0; d < days; d++) {
      if (rand() > arc.recurr) continue;
      const nPayments = 1 + Math.floor(rand() * 3);
      for (let k = 0; k < nPayments; k++) {
        const base = arc.daily / Math.max(1, nPayments);
        const amt = Math.max(0.05, base * (1 - arc.vol + rand() * arc.vol * 2));
        const ts = NOW - (days - 1 - d) * DAY - Math.floor(rand() * DAY);
        const payer = payers[Math.floor(rand() * payers.length)];
        events.push({ agent, payer, amountUsd: Math.round(amt * 100) / 100, ts, txRef: sig(rand) });
      }
    }
  }
  return events;
}
