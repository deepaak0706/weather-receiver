export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

let latestData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  console.log(`[${new Date().toISOString()}] ${req.method} request`);
  
  // For any request, first check if it's Ecowitt protocol
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET = connectivity test
  if (req.method === 'GET') {
    console.log('✅ Connectivity test received - endpoint is ready');
    return res.status(200).send('success');
  }

  // POST = actual weather data
  if (req.method === 'POST') {
    console.log('🎯 WEATHER DATA RECEIVED!');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body type:', typeof req.body);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    // Parse Ecowitt form data
    latestData = {
      timestamp: new Date().toISOString(),
      passkey: req.body.PASSKEY,
      stationType: req.body.stationtype,
      temperature: parseFloat(req.body.tempf),
      humidity: parseInt(req.body.humidity),
      windSpeed: parseFloat(req.body.windspeedmph),
      windDir: parseInt(req.body.winddir),
      rainfall: parseFloat(req.body.dailyrainin),
      pressure: parseFloat(req.body.baromrelin),
      raw: req.body
    };
    
    console.log('✅ Parsed data:', latestData);
    return res.status(200).send('success');
  }

  return res.status(405).send('Method not allowed');
}
