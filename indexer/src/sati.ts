import { Connection, PublicKey } from '@solana/web3.js';

const SATI = new PublicKey('satiRkxEiwZ51cv8PRu8UMzuaqeaNU9jABo6oAFMsLe');

const gateways = (cid: string) => [
  `https://ipfs.io/ipfs/${cid}`,
  `https://${cid}.ipfs.dweb.link/`,
  `https://cloudflare-ipfs.com/ipfs/${cid}`,
];

export interface SatiAgent {
  agentId: string; // identity mint
  name: string;
  wallet: string | null; // Solana income wallet (x402 payTo) from the agent-card
  web?: string;
  x402: boolean;
  memberNumber?: number;
}

function ipfsCid(uri: string): string | null {
  if (uri.startsWith('ipfs://')) return uri.slice('ipfs://'.length).replace(/^ipfs\//, '');
  const m = uri.match(/\/ipfs\/([^/?#]+)/);
  return m ? m[1] : null;
}

async function fetchCard(uri: string, timeoutMs = 15000): Promise<any | null> {
  const cid = ipfsCid(uri);
  const urls = cid ? gateways(cid) : [uri];
  for (const u of urls) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeoutMs);
      const res = await fetch(u, { signal: ctrl.signal });
      clearTimeout(t);
      if (res.ok) return await res.json();
    } catch {
      // try next gateway
    }
  }
  return null;
}

// CAIP-10 endpoint "solana:<genesis>:<address>" → the address
function parseWallet(card: any): string | null {
  const svc = (card?.services ?? []).find((s: any) => s?.name === 'agentWallet');
  if (!svc?.endpoint) return null;
  const parts = String(svc.endpoint).split(':');
  return parts[parts.length - 1] || null;
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

async function chunkParse(conn: Connection, mints: PublicKey[]) {
  const out: any[] = [];
  for (let i = 0; i < mints.length; i += 100) {
    const res = await conn.getMultipleParsedAccounts(mints.slice(i, i + 100));
    out.push(...res.value);
  }
  return out;
}

export async function discoverAgents(conn: Connection, limit = 25): Promise<SatiAgent[]> {
  const accts = await conn.getProgramAccounts(SATI);
  const mints = accts
    .filter((a) => a.account.data.length === 41)
    .map((a) => new PublicKey((a.account.data as Buffer).subarray(8, 40)));

  const slice = mints.slice(0, limit);
  const parsed = await chunkParse(conn, slice);

  // 1) extract on-chain metadata (uri, name, member number)
  const stubs = slice.map((mint, i) => {
    const data = parsed[i]?.data as any;
    const ext = data?.parsed?.info?.extensions ?? [];
    const tm = ext.find((e: any) => e.extension === 'tokenMetadata')?.state;
    const gm = ext.find((e: any) => e.extension === 'tokenGroupMember')?.state;
    return { mint: mint.toBase58(), uri: tm?.uri as string | undefined, name: (tm?.name as string) || mint.toBase58().slice(0, 8), member: gm?.memberNumber as number | undefined };
  });

  // 2) fetch agent-cards with bounded concurrency → resolve wallets
  const agents = await mapLimit(stubs, 6, async (s): Promise<SatiAgent> => {
    const card = s.uri ? await fetchCard(s.uri) : null;
    return {
      agentId: s.mint,
      name: card?.name || s.name,
      wallet: card ? parseWallet(card) : null,
      web: card?.services?.find((x: any) => x?.name === 'web')?.endpoint,
      x402: !!card?.x402Support,
      memberNumber: s.member,
    };
  });

  return agents;
}
