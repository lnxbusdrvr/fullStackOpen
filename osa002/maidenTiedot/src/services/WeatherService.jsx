import axios from 'axios';

const googleApiKey = import.meta.env.VITE_GOOGLEMAPS_APIKEY;
const weatherApiKey = import.meta.env.VITE_WEATHER_APIKEY;

const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall';


const fetchData = (url, params) => {
  return axios.get(url, { params })
    .then(response => response.data)
    .catch(error => {
      console.error(`Fetching data error: ${error}`);
    });
};

const getWeatherByCity = (city) => {
  return fetchData(geocodeUrl, {
    address: city,
    key: googleApiKey,
  })
  .then(data => {
    const { lat, lng: lon } = data.results[0].geometry.location;
    return { lat, lon };
  })
  .catch(error => {
    console.error(`Fetching coordinates error: ${error}`);
  });
};

const getWeatherByCoordinates = ({ lat, lon }) => {
  return fetchData(weatherUrl, {
    lat,
    lon,
    units: 'metric',
    exclude: 'minutely,hourly',
    appid: weatherApiKey,
  });
};

export default { getWeatherByCity, getWeatherByCoordinates };
