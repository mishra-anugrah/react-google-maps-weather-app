import React, { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { WeatherCard } from "./WeatherCard";
import { WeatherMarker } from "./WeatherMarker";

export const Map = (props) => {
  const { currentLocation, weather, metroCitiesWeather } = props;

  const [visibleWeatherCardIndex, setVisibleWeatherCardIndex] = useState(-1);

  const defaultCenter = { lat: 28.70406, lng: 77.102493 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCRwF3zr1MCYnmEdoUxQvRiCNuQfa3RvxI",
  });

  return (
    <div className="map">
      {isLoaded && currentLocation ? (
        <GoogleMap
          center={currentLocation ? currentLocation : defaultCenter}
          mapContainerClassName="map"
          zoom={5}
        >
          {metroCitiesWeather.map((item, index) => (
            <MarkerF
              position={{ lat: item.coord.lat, lng: item.coord.lon }}
              onClick={() => setVisibleWeatherCardIndex(index)}
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
                    setVisibleWeatherCardIndex(-1)
                  }
                  iconURL={item.weather[0].iconURL}
                />
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
