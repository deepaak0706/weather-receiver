let latestData = null;

// Make it accessible from both files
global.weatherData = null;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Latest weather data',
      data: global.weatherData || 'No data received yet',
      timestamp: new Date().toISOString()
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
