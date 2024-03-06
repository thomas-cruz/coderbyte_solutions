import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function WeatherDashboard() {
  // instead of requesting data from an API, use this mock data
  const mockWeatherData = {
    'New York': { 
      temperature: '22°C', 
      humidity: '56%', 
      windSpeed: '15 km/h'
    },
    'Los Angeles': {
      temperature: '27°C',
      humidity: '45%',
      windSpeed: '10 km/h',
    },
    'London': { 
      temperature: '15°C', 
      humidity: '70%', 
      windSpeed: '20 km/h' 
    },
  };

  const defaultWeather = {
    temperature: '',
    humidity: '',
    windSpeed: ''
  };

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(defaultWeather);
  const [previousCities, setPreviousCities] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = keyword => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockWeatherData[keyword]) {
          resolve(mockWeatherData[keyword]);
        } else {
          reject(new Error("City not found."));
          setNotFound(true);
          setWeather(defaultWeather);
        }
      }, 1000)
    });
  }

  const search = async keyword => {
    setNotFound(false);

    if (!keyword || keyword === '') {
      setWeather(defaultWeather);
      setNotFound(true);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchWeatherData(keyword);
      setWeather(data);
      if (!previousCities.includes(keyword)) {
        setPreviousCities([...previousCities, keyword]);
      }
      setIsLoading(false);
      
    } catch {
      setIsLoading(false);
      throw new Error("Error fetching data");
    }
  }



  return (
    <div>
      <input
        type="text"
        id="citySearch"
        placeholder="Search for a city..."
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button
        id="searchButton"
        onClick={() => search(city)}
      >
        Search
      </button>
      {
        isLoading
        ? <div>Searching for weather data...</div>
        : (
          <div id="weatherData">
            <div>Temperature: {weather.temperature}</div>
            <div>Humidity: {weather.humidity}</div>
            <div>Wind Speed: {weather.windSpeed}</div>
            {notFound && <div>City not found.</div>}
          </div>
        )
      }
      <div id="previousSearches" style={{ marginTop: 16 }}>
        {previousCities.length > 0 && (
          <div style={{ marginBottom: 8 }}>Previous Searches</div>
        )}
        {
          previousCities.map((prevCity, index) => (
            <button
              key={index}
              onClick={() => {
                setCity(prevCity);
                search(prevCity);
              }}
              style={{ marginRight: 16 }}
            >
              {prevCity}
            </button>
          ))
        }
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeatherDashboard />);
