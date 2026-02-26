export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1',
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY || '',
  ENDPOINTS: {
    CURRENT: '/current.json',
    FORECAST: '/forecast.json',
    SEARCH: '/search.json',
  },
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 60,
    WINDOW_SIZE: 60000, // 1 minute in ms
  },
};
