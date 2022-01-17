import * as queryString from 'querystring';

import { LocationsType } from './constants/locations';

const WEATHER_URL = 'http://api.weatherapi.com/v1/current.json';

export const fetchWeather = (location:LocationsType) => {
  if(!process.env.REACT_APP_WEATHER_API_KEY){
    console.error("No env variable REACT_APP_WEATHER_API_KEY")
  }
  const params = queryString.stringify({
    key: process.env.REACT_APP_WEATHER_API_KEY,
    q: `${location.latitude},${location.longitude}`,
  });

  return fetch(`${WEATHER_URL}?${params}`).then((res) => res.json());
};
