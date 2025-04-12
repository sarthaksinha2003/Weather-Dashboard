const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }
  
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric'
        }
      }
    );

    const { main, weather, wind } = response.data;
    const data = {
      temperature: main.temp,
      condition: weather[0].main,
      icon: weather[0].icon,
      humidity: main.humidity,
      windSpeed: wind.speed,
    };
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'City not found or API error occurred' });
  }
});

module.exports = router;
