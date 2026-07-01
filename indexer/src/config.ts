try {
  // Load indexer/.env if present (Node 21.7+).
  (process as { loadEnvFile?: (path?: string) => void }).loadEnvFile?.();
} catch {
  // no .env — fall back to process env / defaults
}

export interface Config {
  mode: 'mock' | 'live';
  rpcUrl: string;
  usdcMint: string;
  watchOwners: string[];
}

export function loadConfig(): Config {
  const mode = process.env.AMALOAN_MODE === 'live' ? 'live' : 'mock';
  const rpcUrl =
    process.env.SOLANA_RPC_URL ||
    (process.env.HELIUS_API_KEY ? `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}` : 'https://api.mainnet-beta.solana.com');
  return {
    mode,
    rpcUrl,
    usdcMint: process.env.USDC_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    watchOwners: (process.env.WATCH_OWNERS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  };
}
