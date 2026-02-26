// Core weather data types
export interface WeatherCondition {
  code: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  cityId: string;
  cityName: string;
  temperature: number; // Celsius internally
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  pressure: number;
  windSpeed: number; // km/h internally
  windDirection: number;
  windGust: number;
  uvIndex: number;
  dewPoint: number;
  visibility: number;
  cloudCover: number;
  timestamp: Date;
}

export interface HourlyForecast {
  timestamp: Date;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  precipitationProbability: number;
  precipitationAmount: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
}

export interface DailyForecast {
  date: Date;
  temperature: {
    max: number;
    min: number;
    morning: number;
    day: number;
    evening: number;
    night: number;
  };
  condition: WeatherCondition;
  precipitationProbability: number;
  precipitationAmount: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  uvIndex: number;
  sunrise: Date;
  sunset: Date;
}

export interface ForecastData {
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

export interface CitySearchResult {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CityWeatherData {
  current: CurrentWeather | null;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  lastUpdated: number;
  loading: boolean;
  error: string | null;
}

// Cache types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Settings types
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type Theme = 'light' | 'dark';

export interface AppSettings {
  temperatureUnit: TemperatureUnit;
  refreshInterval: number;
  theme?: Theme;
}

// Storage types
export interface StoredFavorites {
  version: string;
  cityIds: string[];
  order: string[];
  lastModified: number;
}

export interface StoredSettings {
  version: string;
  temperatureUnit: TemperatureUnit;
  refreshInterval: number;
  theme: Theme;
  lastModified: number;
}

// Error types
export enum ErrorCode {
  API_UNREACHABLE = 'API_UNREACHABLE',
  API_RATE_LIMIT = 'API_RATE_LIMIT',
  API_INVALID_RESPONSE = 'API_INVALID_RESPONSE',
  API_AUTH_FAILED = 'API_AUTH_FAILED',
  SEARCH_NO_RESULTS = 'SEARCH_NO_RESULTS',
  SEARCH_INVALID_QUERY = 'SEARCH_INVALID_QUERY',
  CACHE_READ_FAILED = 'CACHE_READ_FAILED',
  CACHE_WRITE_FAILED = 'CACHE_WRITE_FAILED',
  STORAGE_QUOTA_EXCEEDED = 'STORAGE_QUOTA_EXCEEDED',
  STORAGE_ACCESS_DENIED = 'STORAGE_ACCESS_DENIED',
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
}

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: unknown;
  timestamp: Date;
  recoverable: boolean;
}

// Notification types
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration: number;
}
