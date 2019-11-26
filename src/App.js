import React from "react";
import "./App.css";

// components
import Header from "./Components/Header";
import WeatherContainer from "./Components/WeatherContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <WeatherContainer />
    </div>
  );
}

export default App;
