import React from "react";
import { getWindDirectionFromAngle } from "../utils/utils";
import { Air, Close, Explore, Opacity } from "@mui/icons-material";

export const WeatherCard = (props) => {
  const { weather, handleCardVisibilityToggle, iconURL } = props;

  return (
    <div className="weather-card" data-testid="weather-card">
      <Close
        className="weather-card__close"
        onClick={() => handleCardVisibilityToggle(null)}
        data-test-id="weather-card-close"
      />
      <div className="weather-card__top">
        <div className="weather-card__left">
          <div className="weather-card__temperature">{weather.main.temp}°C</div>
          <div className="weather-card__location">{weather.name}</div>
          <div className="weather-card__min-max">
            {weather.main.temp_min}°/{weather.main.temp_max}°
          </div>
        </div>

        <div className="weather-card__right">
          <div className="weather-card__icon-container flex-center">
            <img
              alt={weather.weather[0].main}
              src={iconURL}
              className="weather-card__icon"
              data-testid="weather-card-icon"
            />
          </div>
        </div>
      </div>

      <div className="weather-card__bottom">
        {weather.rain && (
          <div className="rain flex-center">
            <Opacity className="weather-param-icon" />
            <div>{weather.rain["1h"]} MM</div>
          </div>
        )}
        {weather.wind && (
          <>
            <div className="wind flex-center">
              <Air className="weather-param-icon" />
              <div>{weather.wind.speed} KMPH</div>
            </div>
            <div className="wind-direction flex-center">
              <Explore className="weather-param-icon" />
              <div>{getWindDirectionFromAngle(weather.wind.deg)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
