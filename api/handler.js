let latestData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // Ecowitt sends form-encoded data, not JSON
    console.log('✅ POST received!');
    console.log('Headers:', req.headers['content-type']);
    console.log('Body:', JSON.stringify(req.body));
    
    // Store the weather data
    latestData = req.body;
    
    // Extract key weather fields
    const weatherData = {
      timestamp: new Date().toISOString(),
      temperature: req.body.tempf,
      humidity: req.body.humidity,
      windSpeed: req.body.windspeedmph,
      windDir: req.body.winddir,
      rainfall: req.body.dailyrainin,
      passkey: req.body.PASSKEY,
      stationType: req.body.stationtype,
      rawData: req.body
    };
    
    console.log('📊 Parsed weather data:', weatherData);
    
    // Ecowitt expects a simple text response
    return res.status(200).send('success');
  }

  if (req.method === 'GET') {
    console.log('GET check - returning latest data');
    return res.status(200).json({ latestData });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
