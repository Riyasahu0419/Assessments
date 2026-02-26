import React, { useState, useEffect, useCallback } from 'react';
import { weatherApi } from '../../services/weatherApi';
import { CitySearchResult } from '../../types/weather.types';
import { APP_CONFIG } from '../../constants/appConfig';
import './SearchBar.css';

interface SearchBarProps {
  onCitySelect: (city: CitySearchResult) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchCities = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < APP_CONFIG.SEARCH.MIN_CHARACTERS) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cities = await weatherApi.searchCities(searchQuery);
      setResults(cities);
      setShowDropdown(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchCities(query);
    }, APP_CONFIG.SEARCH.DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [query, searchCities]);

  const handleSelect = (city: CitySearchResult) => {
    onCitySelect(city);
    setQuery('');
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
        />
        {loading && <span className="search-bar__loading">🔍</span>}
      </div>

      {showDropdown && results.length > 0 && (
        <div className="search-bar__dropdown">
          {results.map((city) => (
            <button
              key={city.id}
              className="search-bar__result"
              onClick={() => handleSelect(city)}
            >
              <span className="search-bar__result-name">{city.name}</span>
              <span className="search-bar__result-location">
                {city.region}, {city.country}
              </span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="search-bar__error">{error}</p>}
    </div>
  );
};
