import React, { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { WeatherCard } from "./WeatherCard";
import { WeatherMarker } from "./WeatherMarker";
import { MapLoader } from "./MapLoader";

export const Map = (props) => {
  const { currentLocation, weather, metroCitiesWeather } = props;

  const [visibleWeatherCardIndex, setVisibleWeatherCardIndex] = useState(null);

  const defaultCenter = { lat: 28.70406, lng: 77.102493 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const handleWeatherCardDisplay = (index) => {
    if (
      visibleWeatherCardIndex !== null &&
      index === null &&
      visibleWeatherCardIndex > -2
    ) {
      setVisibleWeatherCardIndex(null);
    } else {
      setVisibleWeatherCardIndex(index);
    }
  };

  return (
    <div className="map">
      {isLoaded && currentLocation ? (
        <GoogleMap
          center={currentLocation ? currentLocation : defaultCenter}
          mapContainerClassName="map"
          zoom={5}
        >
          {Array.isArray(metroCitiesWeather) &&
            metroCitiesWeather.length &&
            metroCitiesWeather.map(
              (item, index) =>
                item && (
                  <MarkerF
                    position={{ lat: item.coord.lat, lng: item.coord.lon }}
                    onClick={() => handleWeatherCardDisplay(index)}
                    icon={item.weather[0].iconURL}
                    key={index}
                  >
                    <WeatherMarker
                      iconURL={item.weather[0].iconURL}
                      alt={item.weather[0].main}
                      temp={item.main.temp}
                    />

                    {visibleWeatherCardIndex === index && (
                      <WeatherCard
                        weather={item}
                        handleCardVisibilityToggle={() =>
                          handleWeatherCardDisplay(-2)
                        }
                        iconURL={item.weather[0].iconURL}
                      />
                    )}
                  </MarkerF>
                )
            )}

          {weather && (
            <MarkerF
              position={{ lat: weather.coord.lat, lng: weather.coord.lon }}
              onClick={() => handleWeatherCardDisplay(-1)}
              icon={weather.weather[0].iconURL}
            >
              <WeatherMarker
                iconURL={weather.weather[0].iconURL}
                alt={weather.weather[0].main}
                temp={weather.main.temp}
              />

              {visibleWeatherCardIndex === -1 && (
                <WeatherCard
                  weather={weather}
                  handleCardVisibilityToggle={() =>
                    handleWeatherCardDisplay(null)
                  }
                  iconURL={weather.weather[0].iconURL}
                />
              )}
            </MarkerF>
          )}
        </GoogleMap>
      ) : (
        <MapLoader />
      )}
    </div>
  );
};
