import { useState, useEffect } from 'react';

import weatherService from '../services/WeatherService';

const WeatherComponent = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    weatherService.getWeatherByCity(city)
      .then(coordinates => {
        return weatherService.getWeatherByCoordinates(coordinates);
      })
      .then(w => {
        setWeather(w);
        setError(false);
      })
      .catch((e) => {
        setError(true);
        console.error(`Fetching weather error: ${e}`);
      });
  }, [city]);

  if (error)
    return <h4>Weather in {city}</h4>;

  if (!weather || !weather.current)
    return <div>Loading weather data...</div>;
  else
    return (
      <div>
        <h4>Weather in {city}</h4>
        <div>temperature {weather.current.temp}°C</div>
        <img
            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            alt={weather.current.weather[0].description}
        />
        <div>wind {weather.current.wind_speed}</div>
      </div>
  );
}


export default WeatherComponent;

