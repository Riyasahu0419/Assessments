import { CurrentWeather, ForecastData, CitySearchResult } from '../types/weather.types';

/**
 * Validate weather data structure
 */
export function validateWeatherData(data: unknown): data is CurrentWeather {
  if (!data || typeof data !== 'object') return false;
  
  const weather = data as Partial<CurrentWeather>;
  
  return !!(
    weather.cityId &&
    weather.cityName &&
    typeof weather.temperature === 'number' &&
    typeof weather.humidity === 'number' &&
    typeof weather.windSpeed === 'number' &&
    weather.condition
  );
}

/**
 * Validate forecast data completeness
 */
export function validateForecastData(data: unknown): data is ForecastData {
  if (!data || typeof data !== 'object') return false;
  
  const forecast = data as Partial<ForecastData>;
  
  return !!(
    Array.isArray(forecast.daily) &&
    forecast.daily.length >= 5 &&
    forecast.daily.length <= 7 &&
    Array.isArray(forecast.hourly) &&
    forecast.hourly.length >= 24
  );
}

/**
 * Validate city search results
 */
export function validateCitySearchResults(data: unknown): data is CitySearchResult[] {
  if (!Array.isArray(data)) return false;
  
  return data.every(
    (item) =>
      item &&
      typeof item === 'object' &&
      'id' in item &&
      'name' in item &&
      'country' in item
  );
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): boolean {
  return query.trim().length >= 3;
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
