export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

global.weatherData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');
  
  console.log('🔥 REQUEST RECEIVED');
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers));
  console.log('URL:', req.url);
  console.log('Query:', JSON.stringify(req.query));
  console.log('Body:', JSON.stringify(req.body));
  console.log('Raw Body:', req.body);
  
  // Handle BOTH POST and GET
  if (req.method === 'POST' || req.method === 'GET') {
    const data = req.method === 'POST' ? req.body : req.query;
    
    if (data && Object.keys(data).length > 0) {
      global.weatherData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        data: data
      };
      
      console.log('✅ DATA RECEIVED AND STORED:', global.weatherData);
      return res.status(200).send('success');
    } else {
      console.log('⚠️ Empty data');
      return res.status(200).send('success');
    }
  }
  
  return res.status(405).send('Not allowed');
}
