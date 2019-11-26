import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import Button from "./Button";
import WeatherSearchResult from "./WeatherSearchResult";

// i know that api keys should never be stored in such a way that they are exposed to the client
// but for the purpose of this exercise the security of the api key doesn't feel super relevant
// so it's simply hard-coded in the api url
const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?&appid=b89af7f6244a733ea928d2f82cc627f6&zip=`;
const forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?&appid=b89af7f6244a733ea928d2f82cc627f6&zip=`;

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let value;
    localStorage.key !== "undefined"
      ? (value = JSON.parse(localStorage.getItem(key)))
      : (value = defaultValue);
    return value;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

const WeatherSearch = () => {
  const [userSearch, setUserSearch] = useState("");
  const [savedResultCurrent, setSavedResultCurrent] = useLocalStorage(
    "savedResultCurrent",
    []
  );
  const [savedResultForecast, setSavedResultForecast] = useLocalStorage(
    "savedResultForecast",
    []
  );

  const deleteWeatherCard = event => {
    const { id } = event.target.parentElement;
    savedResultCurrent.splice(id, 1);
    savedResultForecast.splice(id, 1);
    setSavedResultCurrent([...savedResultCurrent]);
    setSavedResultForecast([...savedResultForecast]);
  };

  const getWeatherByZip = event => {
    event.preventDefault();
    // store value of user input
    let zip = document.getElementById("search-input").value;
    // send get request via axios – append value of user input to api url
    axios
      .all([
        axios.get(currentWeatherUrl + zip),
        axios.get(forecastWeatherUrl + zip)
      ])
      .then(
        axios.spread((currentWeatherRes, forecastWeatherRes) => {
          // store value of response data and set useState object
          const currentWeatherData = currentWeatherRes.data;
          const forecastWeatherData = forecastWeatherRes.data;
          setUserSearch(currentWeatherData);
          setSavedResultCurrent([...savedResultCurrent, currentWeatherData]);
          setSavedResultForecast([...savedResultForecast, forecastWeatherData]);
          // reset text input
          zip = document.getElementById("search-input").value = "";
        })
      )
      .catch(error => {
        console.log(error);
        // reset text input
        zip = document.getElementById("search-input").value = "";
      });
  };

  return (
    <div>
      <form onSubmit={getWeatherByZip}>
        <input id="search-input" type="text"></input>
        <Button label="Search Zipcode" type="submit" />
      </form>
      <WeatherSearchResult
        savedResultCurrent={savedResultCurrent}
        savedResultForecast={savedResultForecast}
        deleteWeatherCard={deleteWeatherCard}
      />
    </div>
  );
};

export default WeatherSearch;
