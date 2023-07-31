import { useEffect, useState } from "react";
import "./App.scss";
import { Dashboard } from "./components/Dashboard";
import { getCoordsFromQuery, getWeatherData } from "./utils/weatherUtils";
import { METRO_CITIES_COORDS } from "./constants/constants";
import { interpolateURL } from "./utils/utils";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [metroCitiesWeather, setMetroCitiesWeather] = useState([
    {
      coord: {
        lon: 77.1025,
        lat: 28.7041,
      },
      weather: [
        {
          id: 701,
          main: "Mist",
          description: "mist",
          icon: "50n",
          iconURL: "http://openweathermap.org/img/w/11n.png",
        },
      ],
      base: "stations",
      main: {
        temp: 29.06,
        feels_like: 36.06,
        temp_min: 29.06,
        temp_max: 29.06,
        pressure: 999,
        humidity: 89,
      },
      visibility: 3200,
      wind: {
        speed: 2.06,
        deg: 260,
      },
      clouds: {
        all: 20,
      },
      dt: 1690750700,
      sys: {
        type: 1,
        id: 9165,
        country: "IN",
        sunrise: 1690762313,
        sunset: 1690811037,
      },
      timezone: 19800,
      id: 7290413,
      name: "Pitampura",
      cod: 200,
    },
    {
      coord: {
        lon: 88.3639,
        lat: 22.5726,
      },
      weather: [
        {
          id: 721,
          main: "Haze",
          description: "haze",
          icon: "50n",
          iconURL: "http://openweathermap.org/img/w/50n.png",
        },
      ],
      base: "stations",
      main: {
        temp: 28.96,
        feels_like: 35.96,
        temp_min: 28.96,
        temp_max: 28.96,
        pressure: 997,
        humidity: 94,
      },
      visibility: 3500,
      wind: {
        speed: 0,
        deg: 0,
      },
      clouds: {
        all: 75,
      },
      dt: 1690750758,
      sys: {
        type: 1,
        id: 9114,
        country: "IN",
        sunrise: 1690760235,
        sunset: 1690807710,
      },
      timezone: 19800,
      id: 1275004,
      name: "Kolkata",
      cod: 200,
    },
  ]);
  const [weather, setWeather] = useState({
    coord: {
      lon: 81.6796,
      lat: 21.2577,
    },
    weather: [
      {
        id: 200,
        main: "Thunderstorm",
        description: "thunderstorm with light rain",
        icon: "11n",
        iconURL: "http://openweathermap.org/img/w/50n.png",
      },
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10n",
      },
    ],
    base: "stations",
    main: {
      temp: 31.34,
      feels_like: 38.28,
      temp_min: 31.34,
      temp_max: 31.34,
      pressure: 1002,
      humidity: 94,
    },
    visibility: 3000,
    wind: {
      speed: 10.29,
      deg: 280,
    },
    clouds: {
      all: 75,
    },
    dt: 1690569244,
    sys: {
      type: 1,
      id: 9168,
      country: "IN",
      sunrise: 1690589117,
      sunset: 1690636442,
    },
    timezone: 19800,
    id: 1258980,
    name: "Raipur",
    cod: 200,
  });

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
    // if (METRO_CITIES_COORDS) {
    //   Promise.all(
    //     METRO_CITIES_COORDS.map((metroCity) =>
    //       getWeatherData(metroCity.lat, metroCity.lng)
    //     )
    //   ).then((data) => {
    // const metroWeather = data.map((item) => {
    //   item.weather[0].iconURL = interpolateURL(URLS.ICON_URL, {
    //     icon: item.weather[0].icon,
    //   });
    // });
    //     setMetroCitiesWeather(metroWeather);
    //   });
    // }
  }, []);

  useEffect(() => {
    // fetch weather data if user's current location is available
    // if (userLocation) {
    //   getWeatherData(userLocation.lat, userLocation.lng).then((weatherData) =>
    //     setWeather(weatherData)
    //   );
    // }
  }, [userLocation]);

  const fetchLocationWeather = (location) => {
    getWeatherData(location.lat, location.lng).then((weatherData) =>
      setWeather(weatherData)
    );
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
