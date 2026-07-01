import { loadConfig, type Config } from './config';
import { mockEvents } from './mockSource';
import { makeConnection, fetchIncomeForWallets } from './live';
import { discoverAgents } from './sati';
import { computeFeatures } from './features';
import { scoreAgent } from './score';
import type { AgentProfile, ProtocolStats, IncomeEvent } from './types';

export interface IndexResult {
  cfg: Config;
  events: IncomeEvent[];
  profiles: AgentProfile[];
  stats: ProtocolStats;
  discovered: number;
}

export async function runIndexer(): Promise<IndexResult> {
  const cfg = loadConfig();
  const windowDays = Number(process.env.INCOME_WINDOW_DAYS || 30);

  let events: IncomeEvent[];
  let discovered = 0;
  if (cfg.mode === 'live') {
    const r = await liveEvents(cfg);
    events = r.events;
    discovered = r.discovered;
  } else {
    events = mockEvents();
    discovered = new Set(events.map((e) => e.agent)).size;
  }

  const profiles = computeFeatures(events, windowDays)
    .map(scoreAgent)
    .sort((a, b) => b.incomeAllTimeUsd - a.incomeAllTimeUsd || b.creditScore - a.creditScore);
  const stats = aggregate(cfg, profiles, discovered);
  return { cfg, events, profiles, stats, discovered };
}

async function liveEvents(cfg: Config): Promise<{ events: IncomeEvent[]; discovered: number }> {
  const conn = makeConnection(cfg);
  const limit = Number(process.env.SATI_LIMIT || 25);

  let agents: { agent: string; wallet: string }[];
  let discovered = 0;
  if (cfg.watchOwners.length) {
    agents = cfg.watchOwners.map((w) => ({ agent: w.slice(0, 8), wallet: w }));
    discovered = agents.length;
    console.log(`[live] indexing ${agents.length} configured wallets`);
  } else {
    const found = await discoverAgents(conn, limit);
    const withWallet = found.filter((a) => a.wallet);
    discovered = found.length;
    console.log(
      `[live] SATI: discovered ${found.length} agents · ${withWallet.length} with a wallet · ${found.filter((a) => a.x402).length} declare x402`,
    );
    agents = withWallet.map((a) => ({ agent: a.name, wallet: a.wallet as string }));
  }

  const events = await fetchIncomeForWallets(conn, cfg, agents);
  return { events, discovered };
}

function aggregate(cfg: Config, profiles: AgentProfile[], discovered: number): ProtocolStats {
  const recommended = profiles.filter((p) => p.recommended);
  const incomes = profiles.map((p) => p.income30d).sort((a, b) => a - b);
  const median = incomes.length ? incomes[Math.floor(incomes.length / 2)] : 0;
  return {
    generatedAt: new Date().toISOString(),
    mode: cfg.mode,
    agentsIndexed: discovered,
    agentsWithIncome: profiles.length,
    recommended: recommended.length,
    flaggedWash: profiles.filter((p) => p.washFlag).length,
    totalIncome30dUsd: Math.round(profiles.reduce((s, p) => s + p.income30d, 0)),
    totalIncomeAllTimeUsd: Math.round(profiles.reduce((s, p) => s + p.incomeAllTimeUsd, 0)),
    medianIncome30dUsd: Math.round(median),
    addressableCreditUsd: recommended.reduce((s, p) => s + p.creditLimitUsd, 0),
  };
}
