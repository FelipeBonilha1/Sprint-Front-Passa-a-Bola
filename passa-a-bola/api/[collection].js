import { readFileSync } from 'fs';
import path from 'path';
export const config = { runtime: 'nodejs' };

function readDB() {
  const filePath = path.join(process.cwd(), 'seed', 'db.json'); // funciona no Vercel
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const db = readDB();
    const collection = req.url.split('?')[0].replace(/^\/+/, ''); // "games", "me"…
    const data = db[collection] || [];
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao ler db.json', details: String(e) });
  }
}
