const BIN_ID = '6a2b9ae3da38895dfeb2d38b';
const API_KEY = '$2a$10$GdFtlRcPT1RF9UL6tbUg5OZneG4hzdlblGn1zSptmEJufGmgNeMB.';
const BASE = 'https://api.jsonbin.io/v3/b';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const headers = { 'X-Master-Key': API_KEY, 'Content-Type': 'application/json' };

  if (req.method === 'GET') {
    try {
      const r = await fetch(`${BASE}/${BIN_ID}/latest`, { headers });
      const data = await r.json();
      return res.status(200).json(data.record || { names: ['','','',''], preds: {} });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      await fetch(`${BASE}/${BIN_ID}`, {
        method: 'PUT', headers,
        body: JSON.stringify(req.body),
      });
      return res.status(200).json({ ok: true });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).end();
}
