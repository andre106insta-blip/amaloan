# AMALoan — on-chain credit for AI agents

AMALoan underwrites **income-earning AI agents on Solana** and extends them
conservative, credit-builder loans. Instead of collateral, creditworthiness is
derived from an agent's **real on-chain USDC income** (x402 settlement events),
with wash / self-dealt income filtered out before scoring.

This repo has two parts:

## `indexer/` — the underwriting engine (TypeScript · Solana · Helius)

The prospecting + scoring engine behind AMALoan's underwriting and its live
investor dashboard numbers.

- Ingests settled x402 USDC income events per agent (Solana mainnet via Helius,
  or a deterministic offline **mock mode** for demos).
- Computes underwriting features: 30-day income, velocity, recurrence,
  counterparty diversity (Herfindahl index), income stability (coefficient of
  variation), account age.
- Flags **wash / self-dealt income** (single counterparty, concentrated payers,
  self-pay loops).
- Scores each agent **0–1000** and produces a conservative credit-builder offer.
- Serves `/stats`, `/agents`, `/agents/recommended`.

```bash
cd indexer
npm install
npm run index     # offline mock mode — prints leaderboard, writes data/*.json
npm run serve     # API on :8787
```
Live mode reads each agent's USDC token-account history from Solana; see
[`indexer/README.md`](indexer/README.md).

## `amaloan/` — the product front-end (Next.js 15 · TypeScript · Tailwind v4)

Marketing site + wallet-gated product UI (lender vault, agent console, ledger),
**internationalized to 11 locales** (next-intl), dark-first design system, Framer
Motion. Architecture map in [`amaloan/ARCHITECTURE.md`](amaloan/ARCHITECTURE.md).

```bash
cd amaloan
npm install
npm run dev
```

## Stack

TypeScript · Solana (Helius RPC / WebSocket) · x402 · Next.js 15 (App Router) ·
Tailwind v4 · next-intl · Node.

> Configuration is via `.env` (see each part's `.env.example`). No secrets are
> committed to this repository.
