import React, { useEffect } from 'react';
import { SearchBar } from './components/search/SearchBar';
import { Dashboard } from './components/dashboard/Dashboard';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchCompleteWeatherData } from './store/slices/weatherSlice';
import { loadFavorites } from './store/slices/favoritesSlice';
import { loadSettings, setTemperatureUnit } from './store/slices/settingsSlice';
import { storageService } from './services/storageService';
import { CitySearchResult } from './types/weather.types';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const temperatureUnit = useAppSelector((state) => state.settings.temperatureUnit);

  // Load saved data on mount
  useEffect(() => {
    const savedFavorites = storageService.loadFavorites();
    const savedSettings = storageService.loadSettings();

    dispatch(loadFavorites(savedFavorites));
    dispatch(loadSettings(savedSettings));

    // Fetch weather for saved favorites
    savedFavorites.forEach((cityId) => {
      dispatch(fetchCompleteWeatherData(cityId));
    });
  }, [dispatch]);

  const handleCitySelect = (city: CitySearchResult) => {
    dispatch(fetchCompleteWeatherData(city.id));
  };

  const handleUnitToggle = () => {
    const newUnit = temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    dispatch(setTemperatureUnit(newUnit));
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-content">
          <h1 className="app__title">🌦️ Weather Analytics Dashboard</h1>
          <button className="app__unit-toggle" onClick={handleUnitToggle}>
            {temperatureUnit === 'celsius' ? '°C' : '°F'}
          </button>
        </div>
      </header>

      <main className="app__main">
        <div className="app__search">
          <SearchBar onCitySelect={handleCitySelect} />
        </div>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
