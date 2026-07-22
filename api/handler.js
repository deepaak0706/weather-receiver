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
  
  console.log('🔍 FULL REQUEST DEBUG:');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Path:', req.path);
  console.log('Query:', JSON.stringify(req.query));
  console.log('Raw headers:', JSON.stringify(req.headers));
  
  if (req.method === 'GET') {
    latestData = {
      timestamp: new Date().toISOString(),
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
