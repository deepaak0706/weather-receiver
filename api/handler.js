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
  
  // Log the EXACT URL being requested
  const fullUrl = `${req.url}`;
  console.log('📡 EXACT URL RECEIVED:', fullUrl);
  console.log('Query params:', JSON.stringify(req.query));
  console.log('Query keys:', Object.keys(req.query));
  
  if (req.method === 'GET') {
    if (Object.keys(req.query).length === 0) {
      console.log('⚠️ WARNING: No query parameters! App is only testing connectivity');
    }
    
    latestData = {
      timestamp: new Date().toISOString(),
      url: fullUrl,
      stationID: req.query.ID,
      password: req.query.PASSWORD,
      tempf: req.query.tempf,
      humidity: req.query.humidity,
      raw: req.query
    };
    
    console.log('✅ Stored:', latestData);
    return res.status(200).send('success');
  }

  return res.status(405).send('Method not allowed');
}
