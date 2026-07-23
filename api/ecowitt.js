let latestData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');
  
  console.log('📡 Ecowitt request received');
  console.log('Method:', req.method);
  console.log('Body:', JSON.stringify(req.body));
  
  if (req.method === 'POST') {
    global.weatherData = {
      timestamp: new Date().toISOString(),
      body: req.body,
      tempf: req.body.tempf,
      humidity: req.body.humidity
    };
    
    console.log('✅ Data stored:', global.weatherData);
    return res.status(200).send('success');
  }
  
  if (req.method === 'GET') {
    return res.status(200).json(global.weatherData || { message: 'No data yet' });
  }
  
  return res.status(405).send('Not allowed');
}
