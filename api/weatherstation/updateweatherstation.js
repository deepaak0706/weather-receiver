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
  
  console.log('🎯 DIRECT HANDLER HIT');
  console.log('URL:', req.url);
  console.log('Query string:', req.url.split('?')[1]);
  console.log('Parsed Query:', JSON.stringify(req.query));
  
  if (req.method === 'GET') {
    if (req.query && Object.keys(req.query).length > 0) {
      console.log('✅ WEATHER DATA RECEIVED:', req.query);
      latestData = {
        timestamp: new Date().toISOString(),
        stationID: req.query.ID,
        password: req.query.PASSWORD,
        temperature: parseFloat(req.query.tempf),
        humidity: parseInt(req.query.humidity),
        windSpeed: parseFloat(req.query.windspeedmph),
        rainfall: parseFloat(req.query.dailyrainin),
        raw: req.query
      };
      console.log('Stored:', latestData);
      return res.status(200).send('success');
    } else {
      console.log('⚠️ No query params received');
      return res.status(200).send('success');
    }
  }

  return res.status(405).send('Method not allowed');
}

