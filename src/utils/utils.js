import { WIND_DIRECTIONS, URLS } from "../constants/constants";

export const interpolateURL = (url, values) => {
  const { lat, long, daysCount = 10, query, icon } = values;
  return url
    .replace("{lat}", lat)
    .replace("{lon}", long)
    .replace("{API key}", process.env.REACT_APP_OPEN_WEATHER_API_KEY)
    .replace("{cnt}", daysCount)
    .replace("{query}", query)
    .replace("{icon}", icon);
};

export const getWindDirectionFromAngle = (angle) => {
  const val = Math.floor(angle / 22.5 + 0.5);
  return WIND_DIRECTIONS[val % 16];
};

export const addIconURLToData = (data) => {
  data.weather[0].iconURL = interpolateURL(URLS.ICON_URL, {
    icon: data.weather[0].icon,
  });
};
