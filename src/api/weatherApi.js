import { URLS } from "../constants/constants";
import { interpolateURL } from "..//utils/utils";

export const getWeatherData = (lat, long) => {
  const url = interpolateURL(URLS.GET_LOCATION_WEATHER, { lat, long });

  return fetch(url)
    .then((res) => res.json())
    .then((data) => Promise.resolve(data))
    .catch((err) => {
      console.error("error fetching weather data. ", err);
    });
};

export const getCoordsFromQuery = (query) => {
  const url = interpolateURL(URLS.GEO_LOCATION, { query });

  return fetch(url)
    .then((response) => response.json())
    .then((data) => Promise.resolve(data))
    .catch((error) => console.error(error));
};
