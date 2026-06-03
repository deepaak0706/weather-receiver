let latestData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    latestData = req.body;
    console.log('✅ Data received:', latestData);
    return res.status(200).json({ status: 'success' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ latestData });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
