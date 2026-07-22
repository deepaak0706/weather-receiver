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
  
  if (req.method === 'GET') {
    console.log('🌧️ WUNDERGROUND DATA RECEIVED!');
    console.log('Data:', JSON.stringify(req.query));
    
    latestData = {
      timestamp: new Date().toISOString(),
      stationID: req.query.ID,
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
