import type { IncomeEvent, AgentFeatures } from './types';

const DAY = 86400;

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const round2 = (x: number) => Math.round(x * 100) / 100;
const round3 = (x: number) => Math.round(x * 1000) / 1000;
const clip = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));

export function computeFeatures(events: IncomeEvent[], windowDays = 30): AgentFeatures[] {
  if (events.length === 0) return [];
  const now = Math.floor(Date.now() / 1000); // wall-clock

  const byAgent = new Map<string, IncomeEvent[]>();
  for (const e of events) {
    const arr = byAgent.get(e.agent);
    if (arr) arr.push(e);
    else byAgent.set(e.agent, [e]);
  }

  const out: AgentFeatures[] = [];
  for (const [agent, evs] of byAgent) {
    const sorted = [...evs].sort((a, b) => a.ts - b.ts);
    const incomeAllTimeUsd = round2(sum(sorted.map((e) => e.amountUsd)));
    if (incomeAllTimeUsd <= 0) continue;

    const recent = sorted.filter((e) => e.ts >= now - windowDays * DAY);
    const income30d = round2(sum(recent.map((e) => e.amountUsd)));

    // lifetime counterparty diversity
    const payerTotals = new Map<string, number>();
    for (const e of sorted) payerTotals.set(e.payer, (payerTotals.get(e.payer) ?? 0) + e.amountUsd);
    const uniquePayers = payerTotals.size;
    const total = sum([...payerTotals.values()]) || 1;
    const hhi = sum([...payerTotals.values()].map((v) => (v / total) ** 2));

    const ageDays = Math.max(1, Math.round((now - sorted[0].ts) / DAY));
    const activeDays = new Set(sorted.map((e) => Math.floor(e.ts / DAY))).size;
    const recurrence = clip(activeDays / Math.max(1, Math.min(ageDays, 90)));

    const weeks = new Map<number, number>();
    for (const e of sorted) {
      const w = Math.floor((now - e.ts) / (7 * DAY));
      weeks.set(w, (weeks.get(w) ?? 0) + e.amountUsd);
    }
    const wv = [...weeks.values()];
    const mean = wv.length ? sum(wv) / wv.length : 0;
    const variance = wv.length ? sum(wv.map((v) => (v - mean) ** 2)) / wv.length : 0;
    const cv = mean > 0 ? Math.sqrt(variance) / mean : 1;
    const stability = clip(1 - cv);

    const selfDeal = [...payerTotals.keys()].some((p) => p === agent);
    const washFlag = uniquePayers <= 1 || hhi > 0.85 || selfDeal;
    const washReason = selfDeal
      ? 'self-dealing'
      : uniquePayers <= 1
        ? 'single counterparty'
        : hhi > 0.85
          ? 'concentrated payers'
          : undefined;

    out.push({
      agent,
      income30d,
      incomeAllTimeUsd,
      velocityPerDay: round2(income30d / windowDays),
      txCount: sorted.length,
      uniquePayers,
      diversityHhi: round3(hhi),
      recurrenceScore: round3(recurrence),
      stabilityScore: round3(stability),
      ageDays,
      washFlag,
      washReason,
    });
  }
  return out;
}
