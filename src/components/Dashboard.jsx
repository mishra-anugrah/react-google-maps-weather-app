import React from "react";
import { Map } from "./Map";
import { SearchBar } from "./SearchBar";

export const Dashboard = (props) => {
  const {
    userLocation,
    weather,
    handleFetchLocationWeather,
    handleSearchPlaceChange,
    metroCitiesWeather,
  } = props;

  return (
    <div className="dashboard">
      <SearchBar
        handleFetchLocationWeather={handleFetchLocationWeather}
        handleSearchPlaceChange={handleSearchPlaceChange}
      />

      <Map
        currentLocation={userLocation}
        weather={weather}
        metroCitiesWeather={metroCitiesWeather}
      />
    </div>
  );
};
