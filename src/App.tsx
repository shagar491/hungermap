// src/App.tsx
import React, { useState, useEffect } from "react";
import Map from "./views/Page/Map";
import "./styles/Main.scss";
import Header from "./views/Page/Header";
import Menu from "./views/Page/Menu";
import Dashboard from "./views/Page/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { changeCountry } from "./store";
import { africa_shape } from "./views/Graphs/africa";
import { RootState, Country } from "./types/appTypes";

function App() {
  const dispatch = useDispatch();
  const country = useSelector((state: RootState) => state.country);
  const africaMap = africa_shape.features.map(
    (feature) => feature.properties.admin
  );

  const handleCountryChange = (selectedCountry: string) => {
    dispatch(changeCountry(selectedCountry));
  };

  useEffect(() => {}, [country]);

  return (
    <div className="app">
      <header className="app__header">
        <Header />
      </header>
      <main className="app__content">
        <nav className="app__menu">
          <Menu />
        </nav>
        <main className="app__dashboard"></main>
        <main className="app__map">
          <Map africaMap={africaMap} onClick={handleCountryChange} />
        </main>
      </main>
    </div>
  );
}

export default App;
