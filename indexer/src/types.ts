// A single settled x402 USDC payment into an agent's income vault.
export interface IncomeEvent {
  agent: string; // agent id (Solana owner address or .sol name)
  payer: string; // counterparty that paid
  amountUsd: number;
  ts: number; // unix seconds (settled)
  txRef: string; // transaction signature / reference
}

// Underwriting features derived from an agent's income stream.
export interface AgentFeatures {
  agent: string;
  income30d: number; // total settled USDC in the trailing 30 days
  incomeAllTimeUsd: number; // total settled USDC ever indexed
  velocityPerDay: number; // USD/day
  txCount: number;
  uniquePayers: number;
  diversityHhi: number; // Herfindahl 0..1 (lower = more diversified)
  recurrenceScore: number; // 0..1, share of days with income
  stabilityScore: number; // 0..1, 1 - coefficient of variation
  ageDays: number;
  washFlag: boolean; // likely fake / self-dealt income
  washReason?: string;
}

// Final scored profile (the prospecting record).
export interface AgentProfile extends AgentFeatures {
  reputation: number; // 0..1000 (SATI / Agent Registry; proxied in mock)
  creditScore: number; // 0..1000
  riskPremiumPct: number; // ρ, added on top of the pool base rate
  creditLimitUsd: number; // conservative offer (0 if flagged)
  recommended: boolean; // safe, high-quality first borrower
}

export interface ProtocolStats {
  generatedAt: string;
  mode: 'mock' | 'live';
  agentsIndexed: number;
  agentsWithIncome: number;
  recommended: number;
  flaggedWash: number;
  totalIncome30dUsd: number;
  totalIncomeAllTimeUsd: number;
  medianIncome30dUsd: number;
  addressableCreditUsd: number; // sum of conservative offers across recommended agents
}
