export const WIND_DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

export const METRO_CITIES_COORDS = [
  { lat: 28.70406, lng: 77.102493 },
  { lat: 22.572645, lng: 88.363892 },
  // { lat: 19.075983, lng: 72.877655 },
  // { lat: 13.08268, lng: 80.270721 },
];

export const URLS = {
  GET_LOCATION_WEATHER:
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API key}",
  GET_PRECIPITATION_MAP:
    "https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key}",
  GEO_LOCATION:
    "http://api.openweathermap.org/geo/1.0/direct?q={query}&limit=1&appid={API key}",
  ICON_URL: "http://openweathermap.org/img/w/{icon}.png",
};
