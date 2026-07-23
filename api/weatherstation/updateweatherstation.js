export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.method === 'GET') {
    // Store everything in global object
    global.weatherData = {
      timestamp: new Date().toISOString(),
      url: req.url,
      query: req.query,
      stationID: req.query.ID,
      password: req.query.PASSWORD,
      tempf: req.query.tempf,
      humidity: req.query.humidity,
      windspeedmph: req.query.windspeedmph,
      dailyrainin: req.query.dailyrainin
    };
    
    return res.status(200).send('success');
  }
  
  return res.status(405).send('Method not allowed');
}
