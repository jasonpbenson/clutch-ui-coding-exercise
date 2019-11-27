import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// components
import Button from "./Button";
import WeatherSearchResult from "./WeatherSearchResult";

// i know that api keys shouldn't be exposed to the client
// but for the purpose of this exercise i'm not worried about the security of the key so it's simply hard-coded in the api url
const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=b89af7f6244a733ea928d2f82cc627f6&zip=`;
const forecastWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?$units=imperial&appid=b89af7f6244a733ea928d2f82cc627f6&zip=`;

// custom hook to save values to local storage
// reusable but assumes value will be object to parse, rather than simple string
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(localStorage.getItem(key) || []);
    } catch (error) {
      value = defaultValue;
    }
    return value;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

const WeatherSearch = () => {
  const WeatherSearchStyles = styled.div`
  align-content: center
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  form{
    align-content: center;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  input{
    appearence: none;
    background-color: inherit;
    border: 1px solid #f2eaea;
    border-radius: 4px;
    box-sizing: border-box;
    color: #422e44;
    font-size: 1rem;
    font-weight: 500;
    margin-right: 2rem;
    padding-left: 1rem;
    width: 12rem;
    :focus{
      border: 1px solid #422e44;
      color: #422e44;
    }
    ::placeholder{
      color: #422e4490;
      font-size: 1rem;
      font-weight: 500;
    }
  }
  `;

  // store value of search input
  const [userSearch, setUserSearch] = useState("");

  // useLocalStorage hook defined above
  // store search results
  const [savedResultCurrent, setSavedResultCurrent] = useLocalStorage(
    "savedResultCurrent",
    []
  );
  const [savedResultForecast, setSavedResultForecast] = useLocalStorage(
    "savedResultForecast",
    []
  );

  //delete a search result from results array
  const deleteWeatherCard = event => {
    const { id } = event.target.parentElement;
    savedResultCurrent.splice(id, 1);
    savedResultForecast.splice(id, 1);
    setSavedResultCurrent([...savedResultCurrent]);
    setSavedResultForecast([...savedResultForecast]);
  };

  //call api and store return values
  const getWeatherByZip = event => {
    event.preventDefault();
    // store value of user input
    let zip = document.getElementById("search-input").value;
    // send get request via axios – append value of user input to api url
    // making 2 requests at different api endpoints
    axios
      .all([
        axios.get(currentWeatherUrl + zip),
        axios.get(forecastWeatherUrl + zip)
      ])
      .then(
        axios.spread((currentWeatherRes, forecastWeatherRes) => {
          // store value of response data and update state
          const currentWeatherData = currentWeatherRes.data;
          const forecastWeatherData = forecastWeatherRes.data.list
            .filter(day => {
              return day.dt_txt.includes("12:00:00");
            })
            .slice(0, 3);
          console.log("api forecast result ", forecastWeatherRes);
          setUserSearch(currentWeatherData);
          setSavedResultCurrent([...savedResultCurrent, currentWeatherData]);
          setSavedResultForecast([...savedResultForecast, forecastWeatherData]);
          console.log("api call ", savedResultCurrent);
          // reset text input
          zip = document.getElementById("search-input").value = "";
        })
      )
      .catch(error => {
        console.log(error);
        zip = document.getElementById("search-input").value = "";
      });
  };

  return (
    <WeatherSearchStyles>
      <form onSubmit={getWeatherByZip}>
        <input
          id="search-input"
          type="text"
          placeholder="Enter zip code"
        ></input>
        <Button label="Search" type="submit" />
      </form>
      <WeatherSearchResult
        savedResultCurrent={savedResultCurrent}
        savedResultForecast={savedResultForecast}
        deleteWeatherCard={deleteWeatherCard}
      />
    </WeatherSearchStyles>
  );
};

export default WeatherSearch;
