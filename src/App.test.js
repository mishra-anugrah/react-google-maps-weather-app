import { fireEvent, render } from "@testing-library/react";
import { WeatherCard } from "./components/WeatherCard";
import { weather } from "./constants/mockData";
import "@testing-library/jest-dom";
import {
  addIconURLToData,
  getWindDirectionFromAngle,
  interpolateURL,
} from "./utils/utils";
import { SearchBar } from "./components/SearchBar";

describe("Weather Card Tests", () => {
  const handleCardVisibilityToggle = jest.fn();

  test("should render Weather Card", () => {
    const { queryByTestId, getByText } = render(
      <WeatherCard
        weather={weather}
        handleCardVisibilityToggle={handleCardVisibilityToggle}
        iconURL=""
      />
    );

    // should render Weather Card
    expect(queryByTestId("weather-card")).toBeInTheDocument();

    // should show the weather details correctly
    expect(getByText("31.34°C")).toBeInTheDocument();
    expect(queryByTestId("weather-card-icon")).toBeInTheDocument();

    // should call visibility handler with null when clicked on close button
    const closeButton = queryByTestId("CloseIcon");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(handleCardVisibilityToggle).toHaveBeenCalledWith(null);
  });
});

describe("Utils tests", () => {
  test("interpolateURL should interpolate lat, long, api key, count, query and icon values", () => {
    const url = "abc.com/q={lat}/{lon}/{query}/{icon}/{cnt}";

    const response = interpolateURL(url, {
      lat: 12,
      long: 20,
      query: "Pune",
      icon: "icon-abc",
      daysCount: 5,
    });

    expect(response).toBe("abc.com/q=12/20/Pune/icon-abc/5");
  });

  test("getWindDirectionFromAngle", () => {
    const response = getWindDirectionFromAngle(60);
    expect(response).toBe("ENE");
  });

  test("addIconURLToData", () => {
    const data = { weather: [{ icon: "50n" }] };
    addIconURLToData(data);

    expect(data).toMatchObject({
      weather: [
        { icon: "50n", iconURL: "http://openweathermap.org/img/w/50n.png" },
      ],
    });
  });
});

describe("searchBar", () => {
  test("SearchBar", () => {
    const handleFetchLocationWeather = jest.fn();
    const { queryByTestId } = render(
      <SearchBar handleFetchLocationWeather={handleFetchLocationWeather} />
    );

    //Should render correctly
    expect(queryByTestId("search-bar")).toBeInTheDocument();

    // should call handleFetchLocationWeather on click of search button
    const searchButton = queryByTestId("SearchOutlinedIcon");
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);
    expect(handleFetchLocationWeather).toHaveBeenCalledWith("", true);

    const searchInputContainer = queryByTestId("search-bar-input");
    const searchInput = searchInputContainer.querySelector("input");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "Pune" } });

    fireEvent.click(searchButton);
    expect(handleFetchLocationWeather).toHaveBeenNthCalledWith(2, "Pune", true);
  });
});
