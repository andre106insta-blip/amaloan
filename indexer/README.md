# AMALoan x402 indexer

Finds income-earning AI agents on Solana, scores their creditworthiness, flags
fake/wash income, and ranks the safest first borrowers — the "prospecting" engine
behind AMALoan's underwriting and the live numbers for the dashboard / investors.

## What it does
- Ingests settled x402 USDC income events per agent.
- Computes underwriting features: 30-day income, velocity, recurrence, counterparty
  diversity (Herfindahl), stability (coefficient of variation), account age.
- Flags wash / self-dealt income (single counterparty, concentrated payers, self-pay).
- Scores each agent (0–1000) and produces a conservative credit-builder offer.
- Outputs a ranked leaderboard + protocol stats.

## Run

```bash
npm install
npm run index     # mock mode — runs offline, prints the leaderboard, writes data/*.json
npm run serve     # serves /stats, /agents, /agents/recommended on :8787
```

## Live mode (Solana mainnet)

```bash
cp .env.example .env
# set HELIUS_API_KEY (or SOLANA_RPC_URL), set WATCH_OWNERS (agent addresses)
AMALOAN_MODE=live npm run index
```

In production `WATCH_OWNERS` is populated automatically from the Solana Agent
Registry / SATI; `src/live.ts` then reads each agent's USDC token-account history
and attributes incoming transfers as income.

## Files
- `src/mockSource.ts` — deterministic synthetic income (offline demo)
- `src/live.ts` — real Solana/Helius income fetcher
- `src/features.ts` — feature engineering
- `src/score.ts` — credit score + offer (AMALoan economics model)
- `src/indexer.ts` — orchestration + stats
- `src/cli.ts` / `src/api.ts` — leaderboard / HTTP API
- `data/agents.json`, `data/stats.json` — output (consumable by the frontend)
