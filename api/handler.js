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
  res.setHeader('Content-Type', 'text/plain');
  
  console.log('🔍 Full URL:', req.url);
  console.log('📍 Path:', req.path);
  console.log('🔗 Query params:', JSON.stringify(req.query));
  
  if (req.method === 'GET') {
    // Log raw params
    console.log('All query keys:', Object.keys(req.query));
    
    latestData = {
      timestamp: new Date().toISOString(),
      stationID: req.query.ID || req.query.id,
      password: req.query.PASSWORD || req.query.password,
      temperature: parseFloat(req.query.tempf),
      humidity: parseInt(req.query.humidity),
      windSpeed: parseFloat(req.query.windspeedmph),
      rainfall: parseFloat(req.query.dailyrainin),
      raw: req.query
    };
    
    console.log('✅ Stored:', latestData);
    return res.status(200).send('success');
  }

  return res.status(405).send('Method not allowed');
}
