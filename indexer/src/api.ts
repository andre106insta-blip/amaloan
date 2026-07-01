import { createServer } from 'node:http';
import { runIndexer } from './indexer';

const { profiles, stats } = await runIndexer();

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const url = req.url || '/';

  if (url.startsWith('/stats')) {
    res.end(JSON.stringify(stats));
    return;
  }
  if (url.startsWith('/agents/recommended')) {
    res.end(JSON.stringify(profiles.filter((p) => p.recommended)));
    return;
  }
  if (url.startsWith('/agents')) {
    res.end(JSON.stringify(profiles));
    return;
  }
  res.end(JSON.stringify({ endpoints: ['/stats', '/agents', '/agents/recommended'], stats }));
});

const PORT = Number(process.env.PORT || 8787);
server.listen(PORT, () => {
  console.log(`AMALoan indexer API → http://localhost:${PORT}`);
  console.log('  GET /stats               protocol stats');
  console.log('  GET /agents              full scored leaderboard');
  console.log('  GET /agents/recommended  safe first prospects');
});
