import React, { useState, useEffect } from "react";
import styled from "styled-components";

// components
import Button from "./Button";

const WeatherSearchResult = props => {
  const SearchResultContainer = styled.ul`
    list-style: none;
  `;
  const WeatherCard = styled.li`
    border: 2px solid #000;
  `;
  const [weatherView, setWeatherView] = useState("currentWeather");

  useEffect(() => {
    console.log(weatherView);
  }, [weatherView]);

  const toggleWeatherView = () => {
    weatherView === "currentWeather"
      ? setWeatherView("forecastWeather")
      : setWeatherView("currentWeather");

    console.log("clicked");
  };

  console.log(props);

  let searchResult;
  props.savedResultCurrent.length === 0 || props.savedResultForecast === 0
    ? (searchResult = <h1>Enter a valid zip code to</h1>)
    : (searchResult = props.savedResultCurrent.map(location => {
        return (
          <WeatherCard key={location.weather[0].id}>
            <Button label="Delete" onClick={props.deleteWeatherCard} />
            <h1>{location.name}</h1>
            <img
              src={`http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}
              alt="current weather icon"
            />
            <h2>{location.weather[0].main}</h2>
            <p>{location.weather[0].description}</p>
            <Button
              label={
                weatherView === "currentWeather"
                  ? "View Weather Forecast"
                  : "View Current Weather"
              }
              onClick={toggleWeatherView}
            />
          </WeatherCard>
        );
      }));

  return <SearchResultContainer>{searchResult} </SearchResultContainer>;
};

export default WeatherSearchResult;
