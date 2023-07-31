import { useEffect, useState } from "react";
import "./App.scss";
import { Dashboard } from "./components/Dashboard";
import { getCoordsFromQuery, getWeatherData } from "./api/weatherApi";
import { METRO_CITIES_COORDS, URLS } from "./constants/constants";
import { addIconURLToData } from "./utils/utils";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [metroCitiesWeather, setMetroCitiesWeather] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setUserLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else console.log("Geo location not supported");

    // Fetch data for metro cities:
    if (METRO_CITIES_COORDS) {
      Promise.all(
        METRO_CITIES_COORDS.map((metroCity) =>
          getWeatherData(metroCity.lat, metroCity.lng)
        )
      ).then((data) => {
        const metroWeather = data.map((item) => {
          addIconURLToData(item);
        });
        setMetroCitiesWeather(data);
      });
    }
  }, []);

  useEffect(() => {
    // fetch weather data if user's current location is available
    if (userLocation) {
      fetchLocationWeather({ lat: userLocation.lat, lng: userLocation.lng });
    }
  }, [userLocation]);

  const fetchLocationWeather = (location) => {
    getWeatherData(location.lat, location.lng).then((weatherData) => {
      addIconURLToData(weatherData);
      setWeather(weatherData);
    });
  };

  const handleFetchLocationWeather = (
    location,
    isGeoLocationConversionNeeded
  ) => {
    if (isGeoLocationConversionNeeded) {
      getCoordsFromQuery(location).then((data) => {
        const location = {
          lat: data[0].lat,
          lng: data[0].lon,
        };

        setUserLocation(location);
        fetchLocationWeather(location);
      });
    }
  };

  return (
    <div className="App">
      <Dashboard
        userLocation={userLocation}
        weather={weather}
        handleFetchLocationWeather={handleFetchLocationWeather}
        metroCitiesWeather={metroCitiesWeather}
      />
    </div>
  );
}

export default App;
