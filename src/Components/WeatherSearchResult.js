import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";

// components
import Button from "./Button";

const WeatherSearchResult = props => {
  const SearchResultContainer = styled.div`
    color: #422e44;
    display: flex;
    flex-flow: row-reverse;
    flex-wrap: wrap-reverse;
    justify-content: center;
    margin: 2rem auto;
    padding: 0;
    width: 90%;
  `;

  const WeatherCard = styled.div`
    align-items: center;
    background-color: #f2eaea90;
    border-radius: 4px;
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    height: 24rem;
    justify-content: flex-start;
    margin-right: 1rem;
    margin-top: 1.5rem;
    min-width: 14rem;
    text-align: center;
    width: 25%;
    .delete-button {
      align-self: flex-end;
      background-color: #422e44;
      border: none;
      border-radius: 50%;
      color: #f2eaea;
      font-size: 1.2rem;
      font-weight: 600;
      height: 2rem;
      margin-right: 0.5rem;
      margin-top: 0.5rem;
      text-decoration: none;
      transition: background-color 0.25s;
      width: 2rem;
      :hover {
        background-color: #208774;
        cursor: pointer;
      }
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.2rem;
      width: fit-content;
    }
    h2 {
      font-size: 1rem;
      margin: 0.3rem;
      width: fit-content;
    }
    h3 {
      margin: 0.1rem;
    }
    img {
      width: 6rem;
    }
    .data-container {
      align-items: center;
      display: flex;
      flex-flow: column;
      justify-content: center;
      height: 32%;
      width: 90%;
      div{
        align-items: center;
        display: flex;
        padding: .2rem 0 0 0;
        text-align: right;
        img{
          width: 2rem;
        }
        p{
          margin: 0;
        }

      }
      }
    }
    }
    .toggle-button-container {
      padding: 0.5rem;
    }
  `;

  const [weatherView, setWeatherView] = useState("currentWeather");

  const toggleWeatherView = () => {
    weatherView === "currentWeather"
      ? setWeatherView("forecastWeather")
      : setWeatherView("currentWeather");
  };

  console.log(props);

  let searchResult;
  props.savedResultCurrent.length === 0 || props.savedResultCurrent.length === 0
    ? (searchResult = (
        <p>
          No Results to display… Try Entering a zip code into the field above
        </p>
      ))
    : (searchResult = props.savedResultCurrent.map((location, i) => {
        return (
          <WeatherCard key={i}>
            <button className="delete-button" onClick={props.deleteWeatherCard}>
              X
            </button>
            <h1>{location.name}</h1>
            <h2>
              {weatherView === "currentWeather" ? "current" : "3-day forecast"}
            </h2>

            <div className="data-container">
              {weatherView === "currentWeather" ? (
                <>
                  <img
                    src={`http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}
                    alt="current weather icon"
                  />
                  <h3>{location.weather[0].description}</h3>
                  <h3>{Math.floor(location.main.temp)}º</h3>
                </>
              ) : (
                props.savedResultForecast[i].map((week, j) => {
                  return (
                    <div key={j}>
                      <img
                        src={`http://openweathermap.org/img/wn/${week.weather[0].icon}@2x.png`}
                        alt="forecast weather icon"
                      />
                      <p>
                        {week.weather[0].description},{" "}
                        {Math.floor(week.main.temp * 1.8 - 459.67)}º
                      </p>
                    </div>
                  );
                })
              )}
            </div>
            <div className="toggle-button-container">
              <p>
                {weatherView === "currentWeather"
                  ? "switch to weather forecast"
                  : "switch to current weather"}
              </p>
              <Button
                label={
                  weatherView === "currentWeather" ? "Forecast" : "Current"
                }
                onClick={toggleWeatherView}
              />
            </div>
          </WeatherCard>
        );
      }));

  return <SearchResultContainer>{searchResult}</SearchResultContainer>;
};

export default WeatherSearchResult;
