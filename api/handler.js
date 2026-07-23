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
  
  console.log('📡 REQUEST RECEIVED');
  console.log('Full URL:', req.url);
  console.log('Query:', JSON.stringify(req.query));
  
  if (req.method === 'GET') {
    if (Object.keys(req.query).length > 0) {
      console.log('✅ WEATHER DATA RECEIVED:', req.query);
      latestData = req.query;
      return res.status(200).send('success');
    } else {
      console.log('⚠️ Connectivity check only (no data)');
      return res.status(200).send('success');
    }
  }

  res.status(405).send('Not allowed');
}
