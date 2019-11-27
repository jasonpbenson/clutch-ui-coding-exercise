import React from "react";
import "./App.css";

// components
import Header from "./Components/Header";
import WeatherSearch from "./Components/WeatherSearch";

function App() {
  return (
    <div className="App">
      <Header />
      <WeatherSearch />
    </div>
  );
}

export default App;
