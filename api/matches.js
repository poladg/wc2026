export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { stage } = req.query;
  
  const stageMap = {
    group: 'GROUP_STAGE',
    r32:   'LAST_32',
    r16:   'LAST_16',
    qf:    'QUARTER_FINALS',
    sf:    'SEMI_FINALS',
    final: 'FINAL'
  };

  try {
    const url = 'https://api.football-data.org/v4/competitions/WC/matches';
    const r = await fetch(url, {
      headers: { 'X-Auth-Token': 'ba22b1349e3b42c987ab1dcb5ae98fa6' }
    });
    
    if (!r.ok) {
      return res.status(r.status).json({ error: 'Upstream error: ' + r.status });
    }
    
    const data = await r.json();
    const all = data.matches || [];
    
    let matches;
    if (stage && stageMap[stage]) {
      matches = all.filter(m => m.stage === stageMap[stage]);
    } else {
      matches = all;
    }
    
    res.status(200).json({ matches });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
