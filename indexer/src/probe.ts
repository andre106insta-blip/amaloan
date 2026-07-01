import { loadConfig } from './config';
import { Connection, PublicKey } from '@solana/web3.js';
import { extractIncoming } from './live';

const cfg = loadConfig();
const conn = new Connection(cfg.rpcUrl, 'confirmed');
const USDC = new PublicKey(cfg.usdcMint);
const SATI = new PublicKey('satiRkxEiwZ51cv8PRu8UMzuaqeaNU9jABo6oAFMsLe');
const mask = (s: string) => s.replace(/api-key=[^&\s]+/, 'api-key=***');
const short = (s: string) => s.slice(0, 8) + '…';

async function main() {
  console.log('RPC:', mask(cfg.rpcUrl), '| slot:', await conn.getSlot(), '\n');

  const accts = await conn.getProgramAccounts(SATI);
  const small = accts.filter((a) => a.account.data.length === 41);
  const keys = small.map((a) => new PublicKey((a.account.data as Buffer).subarray(8, 40)));
  console.log(`SATI: ${accts.length} accounts · ${keys.length} agent records (41b)`);

  console.log('\n— decode sample identity accounts —');
  const sample = keys.slice(0, 10);
  const parsed = await conn.getMultipleParsedAccounts(sample);
  const wallets: string[] = [];
  const mints: PublicKey[] = [];
  for (let i = 0; i < sample.length; i++) {
    const acc = parsed.value[i];
    const d = acc?.data as { parsed?: { type: string; info: Record<string, unknown> } } | undefined;
    if (d && 'parsed' in d && d.parsed) {
      const p = d.parsed;
      if (p.type === 'account') {
        console.log(`  ${short(sample[i].toBase58())} token-account · owner ${short(String(p.info.owner))} · mint ${short(String(p.info.mint))}`);
        wallets.push(String(p.info.owner));
      } else if (p.type === 'mint') {
        console.log(`  ${short(sample[i].toBase58())} MINT · supply ${String(p.info.supply)} · auth ${p.info.mintAuthority ? short(String(p.info.mintAuthority)) : '-'}`);
        mints.push(sample[i]);
      } else {
        console.log(`  ${short(sample[i].toBase58())} ${p.type}`);
      }
    } else {
      console.log(`  ${short(sample[i].toBase58())} unparsed · owner ${acc ? short(acc.owner.toBase58()) : '?'}`);
    }
  }
  console.log(`\n=> direct wallets: ${wallets.length} · mints needing holder lookup: ${mints.length}`);

  if (mints.length) {
    console.log('\n— resolving mint holders (agent wallets) —');
    for (const m of mints.slice(0, 6)) {
      try {
        const la = await conn.getTokenLargestAccounts(m);
        const holder = la.value[0]?.address;
        if (holder) {
          const info = await conn.getParsedAccountInfo(holder);
          const owner = (info.value?.data as { parsed?: { info?: { owner?: string } } } | undefined)?.parsed?.info?.owner;
          console.log(`  mint ${short(m.toBase58())} → wallet ${owner ? short(owner) : '?'}`);
          if (owner) wallets.push(owner);
        }
      } catch (e) {
        console.log(`  mint ${short(m.toBase58())} resolve error: ${(e as Error).message}`);
      }
    }
  }

  void extractIncoming;
  void USDC;

  console.log('\n— inspecting one identity mint metadata (full) —');
  const mint = keys[0];
  console.log('mint:', mint.toBase58());
  const info = await conn.getParsedAccountInfo(mint);
  const parsedMint = (info.value?.data as { parsed?: unknown } | Buffer | undefined as any)?.parsed;
  console.log(JSON.stringify(parsedMint, null, 2).slice(0, 4500));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
