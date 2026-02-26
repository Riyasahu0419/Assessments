export const APP_CONFIG = {
  CACHE: {
    WEATHER_TTL: 60000, // 60 seconds
    FORECAST_TTL: 300000, // 5 minutes
    SEARCH_TTL: 300000, // 5 minutes
    MAX_ENTRIES: 10,
  },
  REFRESH: {
    INTERVAL: 60000, // 60 seconds
    RETRY_DELAY: 30000, // 30 seconds
  },
  SEARCH: {
    MIN_CHARACTERS: 3,
    DEBOUNCE_DELAY: 300, // ms
  },
  STORAGE_KEYS: {
    FAVORITES: 'weather_dashboard_favorites',
    SETTINGS: 'weather_dashboard_settings',
    CACHE: 'weather_dashboard_cache',
  },
  STORAGE_VERSION: '1.0.0',
  BREAKPOINTS: {
    MOBILE: 768,
    MIN_WIDTH: 320,
  },
};

export const ERROR_MESSAGES: Record<string, string> = {
  API_UNREACHABLE: 'Unable to connect to weather service',
  API_RATE_LIMIT: 'Too many requests. Please wait a moment.',
  API_INVALID_RESPONSE: 'Received invalid data from weather service',
  API_AUTH_FAILED: 'Weather service authentication failed',
  SEARCH_NO_RESULTS: 'No cities found',
  SEARCH_INVALID_QUERY: 'Please enter at least 3 characters',
  CACHE_READ_FAILED: 'Failed to read cached data',
  CACHE_WRITE_FAILED: 'Failed to save data to cache',
  STORAGE_QUOTA_EXCEEDED: 'Storage limit exceeded',
  STORAGE_ACCESS_DENIED: 'Cannot access local storage',
  NETWORK_OFFLINE: 'No internet connection',
  NETWORK_TIMEOUT: 'Request timed out',
};
