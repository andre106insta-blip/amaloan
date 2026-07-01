import { writeFileSync, existsSync } from 'node:fs';
import { runIndexer } from './indexer';

const lpad = (s: string, n: number) => (s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length));
const rpad = (s: string, n: number) => (s.length >= n ? s : ' '.repeat(n - s.length) + s);

const { cfg, events, profiles, stats } = await runIndexer();

const agentsJson = JSON.stringify(profiles, null, 2);
const statsJson = JSON.stringify(stats, null, 2);
const eventsJson = JSON.stringify(events, null, 2);

writeFileSync(new URL('../data/agents.json', import.meta.url), agentsJson);
writeFileSync(new URL('../data/stats.json', import.meta.url), statsJson);
writeFileSync(new URL('../data/events.json', import.meta.url), eventsJson);

// Mirror into the frontend's public dir so the dashboard can read live data statically.
const pub = new URL('../../amaloan/public/data/', import.meta.url);
if (existsSync(pub)) {
  writeFileSync(new URL('agents.json', pub), agentsJson);
  writeFileSync(new URL('stats.json', pub), statsJson);
  console.log('mirrored agents.json + stats.json → amaloan/public/data/');
}

console.log(`\nAMALoan x402 indexer — mode: ${cfg.mode}`);
console.log(
  `discovered ${stats.agentsIndexed} agents · ${events.length} income events · ${stats.agentsWithIncome} agents with on-chain income\n`,
);

console.log(
  lpad('AGENT', 20),
  rpad('all-time$', 10),
  rpad('30d $', 8),
  rpad('payers', 7),
  rpad('age', 5),
  rpad('score', 6),
  rpad('ρ%', 5),
  rpad('offer$', 8),
  ' status',
);
console.log('-'.repeat(92));
for (const p of profiles.slice(0, 25)) {
  const status = p.washFlag ? `flagged: ${p.washReason}` : p.recommended ? 'prospect' : '';
  console.log(
    lpad(p.agent, 20),
    rpad(p.incomeAllTimeUsd.toFixed(2), 10),
    rpad(p.income30d.toFixed(0), 8),
    rpad(String(p.uniquePayers), 7),
    rpad(String(p.ageDays), 5),
    rpad(String(p.creditScore), 6),
    rpad(p.riskPremiumPct.toFixed(0), 5),
    rpad(String(p.creditLimitUsd), 8),
    ' ' + status,
  );
}

console.log('\n— summary —');
console.log(`agents discovered (SATI):  ${stats.agentsIndexed}`);
console.log(`agents with on-chain income: ${stats.agentsWithIncome}`);
console.log(`recommended prospects:     ${stats.recommended}`);
console.log(`flagged (wash/fake):       ${stats.flaggedWash}`);
console.log(`total all-time income:     $${stats.totalIncomeAllTimeUsd.toLocaleString()}`);
console.log(`total 30d income:          $${stats.totalIncome30dUsd.toLocaleString()}`);
console.log(`median agent income:       $${stats.medianIncome30dUsd.toLocaleString()}/mo`);
console.log(`addressable credit:        $${stats.addressableCreditUsd.toLocaleString()}  (sum of first offers to prospects)`);
console.log(`\nwrote data/agents.json + data/stats.json + data/events.json\n`);
