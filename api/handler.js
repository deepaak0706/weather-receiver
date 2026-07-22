let latestData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'text/plain');
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', JSON.stringify(req.body));
  console.log('Headers:', req.headers['content-type']);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    console.log('✅ POST RECEIVED!');
    latestData = req.body;
    console.log('📊 Weather data:', latestData);
    
    // Return plain text - Ecowitt expects just "success"
    return res.status(200).send('success');
  }

  if (req.method === 'GET') {
    console.log('GET check received');
    // Return plain text for GET too
    return res.status(200).send('success');
  }

  return res.status(405).send('Method not allowed');
}
