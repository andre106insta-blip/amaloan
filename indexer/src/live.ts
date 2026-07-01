import { Connection, PublicKey } from '@solana/web3.js';
import type { Config } from './config';
import type { IncomeEvent } from './types';

export function makeConnection(cfg: Config): Connection {
  return new Connection(cfg.rpcUrl, 'confirmed');
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getTx(conn: Connection, sig: string, tries = 3): Promise<any> {
  for (let t = 0; t < tries; t++) {
    try {
      return await conn.getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 });
    } catch (e) {
      if (t === tries - 1) throw e;
      await sleep(500 * (t + 1)); // back off on rate limit
    }
  }
  return null;
}

// Index settled USDC income (x402) for a set of agent wallets.
// Uses single (non-batch) RPC calls + throttling to stay within free RPC tiers.
export async function fetchIncomeForWallets(
  conn: Connection,
  cfg: Config,
  agents: { agent: string; wallet: string }[],
  opts: { sigLimit?: number; delayMs?: number } = {},
): Promise<IncomeEvent[]> {
  const usdc = new PublicKey(cfg.usdcMint);
  const sigLimit = opts.sigLimit ?? 15;
  const delayMs = opts.delayMs ?? 130;
  const events: IncomeEvent[] = [];

  for (const { agent, wallet } of agents) {
    try {
      const accounts = await conn.getParsedTokenAccountsByOwner(new PublicKey(wallet), { mint: usdc });
      await sleep(delayMs);
      let agentEvents = 0;
      for (const { pubkey } of accounts.value) {
        const sigs = await conn.getSignaturesForAddress(pubkey, { limit: sigLimit });
        await sleep(delayMs);
        for (const s of sigs) {
          const tx = await getTx(conn, s.signature);
          await sleep(delayMs);
          const evt = extractIncoming(tx, pubkey.toBase58(), agent, s.signature, cfg.usdcMint);
          if (evt) {
            events.push(evt);
            agentEvents++;
          }
        }
      }
      if (agentEvents > 0) console.log(`[live]   ${agent}: ${agentEvents} USDC inflows`);
    } catch (e) {
      console.warn(`[live]   ${agent} (${wallet.slice(0, 8)}…): ${(e as Error).message}`);
    }
  }
  return events;
}

// Detect a USDC credit (incoming transfer) into a token account via balance deltas.
export function extractIncoming(tx: any, ata: string, agent: string, signature: string, usdcMint: string): IncomeEvent | null {
  if (!tx || tx.meta?.err) return null;
  const keys: string[] = (tx.transaction?.message?.accountKeys ?? []).map((k: any) =>
    typeof k === 'string' ? k : (k.pubkey?.toString?.() ?? String(k.pubkey)),
  );
  const idx = keys.indexOf(ata);
  if (idx < 0) return null;

  const pre = (tx.meta?.preTokenBalances ?? []).find((b: any) => b.accountIndex === idx && b.mint === usdcMint);
  const post = (tx.meta?.postTokenBalances ?? []).find((b: any) => b.accountIndex === idx && b.mint === usdcMint);
  const delta = (post?.uiTokenAmount?.uiAmount ?? 0) - (pre?.uiTokenAmount?.uiAmount ?? 0);
  if (delta <= 0) return null;

  return {
    agent,
    payer: keys[0] ?? 'unknown',
    amountUsd: Math.round(delta * 100) / 100,
    ts: tx.blockTime ?? Math.floor(Date.now() / 1000),
    txRef: signature.slice(0, 8),
  };
}
