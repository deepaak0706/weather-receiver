let latestData = null;

export default function handler(req, res) {
  // Log EVERY request
  console.log(`[${new Date().toISOString()}] ${req.method} request`);
  console.log('Body:', JSON.stringify(req.body));
  console.log('Content-Type:', req.headers['content-type']);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    console.log('✅ POST received!');
    latestData = req.body;
    console.log('Data stored:', latestData);
    return res.status(200).json({ status: 'success', data: latestData });
  }

  if (req.method === 'GET') {
    console.log('📊 GET - returning latestData:', latestData);
    return res.status(200).json({ latestData, timestamp: new Date() });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
