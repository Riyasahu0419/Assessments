# Weather Analytics Dashboard - Design Document

## Overview

The Weather Analytics Dashboard is a React-based web application that provides comprehensive weather information, forecasts, and analytics for multiple cities. The application leverages modern React patterns with Hooks, Redux Toolkit for state management, and Recharts for data visualization. It integrates with WeatherAPI.com to fetch real-time weather data and provides an intuitive interface for users to monitor weather conditions, analyze trends, and manage their favorite locations.

### Key Features

- Multi-city weather monitoring with summary cards
- Detailed weather views with 5-7 day forecasts and hourly data
- Interactive charts for temperature, precipitation, and wind patterns
- City search with autocomplete functionality
- Favorites management with local storage persistence
- Temperature unit switching (Celsius/Fahrenheit)
- Real-time data updates every 60 seconds
- Intelligent caching to minimize API calls
- Responsive design for mobile and desktop
- Optional Google authentication for cross-device sync

### Technology Stack

- **Frontend Framework**: React 18+ with Hooks
- **State Management**: Redux Toolkit with async thunks
- **Data Visualization**: Recharts
- **API Integration**: WeatherAPI.com (with fallback to OpenWeatherMap)
- **Styling**: CSS Modules or Styled Components
- **Storage**: Browser Local Storage
- **Authentication**: Google OAuth 2.0 (optional)
- **Build Tool**: Vite or Create React App
- **Testing**: Jest + React Testing Library + Property-based testing library

## Architecture

### High-Level Architecture

The application follows a layered architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  (React Components, UI Logic, Event Handlers)           │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                   State Management Layer                 │
│  (Redux Store, Slices, Selectors, Middleware)           │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                    Business Logic Layer                  │
│  (API Service, Cache Manager, Data Transformers)        │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                    External Services                     │
│  (WeatherAPI.com, Local Storage, Google Auth)           │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App
├── Header
│   ├── Logo
│   ├── SettingsButton
│   └── AuthButton (optional)
├── SearchBar
│   └── AutocompleteDropdown
├── Dashboard
│   ├── FavoritesSection
│   │   └── CityCard[]
│   └── AllCitiesSection
│       └── CityCard[]
├── DetailedView (modal/overlay)
│   ├── CurrentWeatherHeader
│   ├── HourlyForecast
│   │   └── TemperatureChart
│   ├── DailyForecast
│   │   └── ForecastCard[]
│   ├── PrecipitationChart
│   ├── WindChart
│   └── AdditionalMetrics
│       ├── Pressure
│       ├── DewPoint
│       └── UVIndex
└── SettingsPanel (modal/overlay)
    └── TemperatureUnitToggle
```

### State Management Architecture

Redux Toolkit store structure:

```javascript
{
  weather: {
    cities: {
      [cityId]: {
        current: { /* current weather data */ },
        hourly: [ /* 24-48 hour forecast */ ],
        daily: [ /* 5-7 day forecast */ ],
        lastUpdated: timestamp,
        loading: boolean,
        error: string | null
      }
    },
    selectedCity: cityId | null
  },
  favorites: {
    cityIds: [cityId1, cityId2, ...],
    order: [cityId1, cityId2, ...]
  },
  settings: {
    temperatureUnit: 'celsius' | 'fahrenheit',
    refreshInterval: 60000,
    theme: 'light' | 'dark'
  },
  ui: {
    isDetailedViewOpen: boolean,
    isSettingsPanelOpen: boolean,
    searchQuery: string,
    searchResults: [],
    notifications: []
  },
  cache: {
    [cacheKey]: {
      data: any,
      timestamp: number
    }
  }
}
```

### Data Flow

1. **User Interaction** → Component dispatches Redux action
2. **Redux Action** → Async thunk checks cache
3. **Cache Check** → If valid cache exists, return cached data; otherwise proceed to API
4. **API Call** → Service layer makes HTTP request to WeatherAPI.com
5. **Response Processing** → Transform API response to application data model
6. **State Update** → Redux reducer updates store
7. **Component Re-render** → React components receive new props via selectors
8. **Persistence** → Middleware syncs critical state to local storage

### Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Spinner/
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── CityCard.jsx
│   │   ├── FavoritesSection.jsx
│   │   └── AllCitiesSection.jsx
│   ├── detailed-view/
│   │   ├── DetailedView.jsx
│   │   ├── CurrentWeatherHeader.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── DailyForecast.jsx
│   │   └── AdditionalMetrics.jsx
│   ├── charts/
│   │   ├── TemperatureChart.jsx
│   │   ├── PrecipitationChart.jsx
│   │   └── WindChart.jsx
│   ├── search/
│   │   ├── SearchBar.jsx
│   │   └── AutocompleteDropdown.jsx
│   ├── settings/
│   │   ├── SettingsPanel.jsx
│   │   └── TemperatureUnitToggle.jsx
│   └── auth/
│       └── AuthButton.jsx
├── store/
│   ├── index.js
│   ├── slices/
│   │   ├── weatherSlice.js
│   │   ├── favoritesSlice.js
│   │   ├── settingsSlice.js
│   │   └── uiSlice.js
│   ├── middleware/
│   │   └── localStorageMiddleware.js
│   └── selectors/
│       ├── weatherSelectors.js
│       └── favoritesSelectors.js
├── services/
│   ├── weatherApi.js
│   ├── cacheManager.js
│   ├── authService.js
│   └── storageService.js
├── utils/
│   ├── temperatureConverter.js
│   ├── dateFormatter.js
│   ├── weatherIconMapper.js
│   └── validators.js
├── hooks/
│   ├── useWeatherData.js
│   ├── useFavorites.js
│   └── useAutoRefresh.js
├── constants/
│   ├── apiConfig.js
│   └── appConfig.js
└── types/
    └── weather.types.js
```

## Components and Interfaces

### Core Components

#### 1. Dashboard Component

**Purpose**: Main container that orchestrates the display of city weather cards.

**Props**: None (connects to Redux store)

**State Management**:
- Subscribes to weather data from Redux
- Subscribes to favorites list from Redux
- Dispatches actions to fetch weather data

**Key Responsibilities**:
- Render favorites section and all cities section
- Trigger initial data fetch on mount
- Handle city removal
- Manage grid layout responsiveness

#### 2. CityCard Component

**Purpose**: Display weather summary for a single city.

**Props**:
```typescript
interface CityCardProps {
  cityId: string;
  cityName: string;
  temperature: number;
  weatherCondition: string;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  isFavorite: boolean;
  onCardClick: (cityId: string) => void;
  onFavoriteToggle: (cityId: string) => void;
  onRemove: (cityId: string) => void;
  lastUpdated: Date;
}
```

**Key Responsibilities**:
- Display current weather metrics
- Handle favorite toggle
- Handle card click to open detailed view
- Show loading and error states
- Display last updated timestamp

#### 3. DetailedView Component

**Purpose**: Show comprehensive weather information for a selected city.

**Props**:
```typescript
interface DetailedViewProps {
  cityId: string;
  isOpen: boolean;
  onClose: () => void;
}
```

**Key Responsibilities**:
- Fetch and display 5-7 day forecast
- Display hourly forecast for 24+ hours
- Render temperature, precipitation, and wind charts
- Show additional metrics (pressure, dew point, UV index)
- Handle modal/overlay behavior
- Continue data refresh while open

#### 4. SearchBar Component

**Purpose**: Enable city search with autocomplete functionality.

**Props**:
```typescript
interface SearchBarProps {
  onCitySelect: (city: CitySearchResult) => void;
}
```

**State**:
- Search query string
- Autocomplete results
- Loading state
- Debounced search trigger

**Key Responsibilities**:
- Debounce user input (300ms)
- Trigger API search after 3+ characters
- Display autocomplete dropdown
- Handle city selection
- Show error messages for failed searches

#### 5. Chart Components

**TemperatureChart Props**:
```typescript
interface TemperatureChartProps {
  data: Array<{
    timestamp: Date;
    temperature: number;
    feelsLike?: number;
  }>;
  unit: 'celsius' | 'fahrenheit';
  timeRange: 'hourly' | 'daily';
}
```

**PrecipitationChart Props**:
```typescript
interface PrecipitationChartProps {
  data: Array<{
    timestamp: Date;
    probability: number; // 0-100
    amount: number; // mm or inches
  }>;
  unit: 'metric' | 'imperial';
}
```

**WindChart Props**:
```typescript
interface WindChartProps {
  data: Array<{
    timestamp: Date;
    speed: number;
    direction: number; // degrees
    gust?: number;
  }>;
  unit: 'metric' | 'imperial';
}
```

**Key Responsibilities**:
- Render interactive Recharts visualizations
- Display tooltips on hover
- Handle responsive sizing
- Convert units based on settings
- Support zoom functionality (optional)

#### 6. SettingsPanel Component

**Purpose**: Manage user preferences.

**Props**: None (connects to Redux store)

**Key Responsibilities**:
- Display temperature unit toggle
- Persist settings to local storage
- Trigger re-render of all temperature displays

### Service Layer Interfaces

#### WeatherAPI Service

```typescript
interface WeatherApiService {
  // Fetch current weather for a city
  getCurrentWeather(cityId: string): Promise<CurrentWeather>;
  
  // Fetch forecast data
  getForecast(cityId: string, days: number): Promise<ForecastData>;
  
  // Search cities with autocomplete
  searchCities(query: string): Promise<CitySearchResult[]>;
  
  // Get hourly forecast
  getHourlyForecast(cityId: string, hours: number): Promise<HourlyForecast[]>;
}

interface CurrentWeather {
  cityId: string;
  cityName: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionCode: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  dewPoint: number;
  timestamp: Date;
}

interface ForecastData {
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

interface DailyForecast {
  date: Date;
  tempMax: number;
  tempMin: number;
  condition: string;
  conditionCode: string;
  precipitationProbability: number;
  precipitationAmount: number;
  windSpeed: number;
  humidity: number;
}

interface HourlyForecast {
  timestamp: Date;
  temperature: number;
  feelsLike: number;
  condition: string;
  precipitationProbability: number;
  precipitationAmount: number;
  windSpeed: number;
  windDirection: number;
}

interface CitySearchResult {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}
```

#### Cache Manager

```typescript
interface CacheManager {
  // Get cached data if valid
  get<T>(key: string): T | null;
  
  // Set cache entry with timestamp
  set<T>(key: string, data: T, ttl?: number): void;
  
  // Check if cache entry is valid
  isValid(key: string): boolean;
  
  // Clear specific cache entry
  clear(key: string): void;
  
  // Clear all cache entries
  clearAll(): void;
  
  // Remove oldest entries when capacity exceeded
  evict(): void;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // time to live in milliseconds
}
```

#### Storage Service

```typescript
interface StorageService {
  // Save favorites to local storage
  saveFavorites(cityIds: string[]): void;
  
  // Load favorites from local storage
  loadFavorites(): string[];
  
  // Save settings to local storage
  saveSettings(settings: AppSettings): void;
  
  // Load settings from local storage
  loadSettings(): AppSettings;
  
  // Save cache to local storage
  saveCache(cache: Record<string, CacheEntry<any>>): void;
  
  // Load cache from local storage
  loadCache(): Record<string, CacheEntry<any>>;
}

interface AppSettings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  refreshInterval: number;
  theme?: 'light' | 'dark';
}
```

#### Authentication Service (Optional)

```typescript
interface AuthService {
  // Initialize Google OAuth
  initialize(): Promise<void>;
  
  // Sign in with Google
  signIn(): Promise<User>;
  
  // Sign out
  signOut(): Promise<void>;
  
  // Get current user
  getCurrentUser(): User | null;
  
  // Sync user data to server
  syncUserData(data: UserData): Promise<void>;
  
  // Load user data from server
  loadUserData(): Promise<UserData>;
}

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface UserData {
  favorites: string[];
  settings: AppSettings;
}
```

### Redux Store Interfaces

#### Weather Slice

```typescript
interface WeatherState {
  cities: Record<string, CityWeatherData>;
  selectedCity: string | null;
}

interface CityWeatherData {
  current: CurrentWeather | null;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  lastUpdated: number;
  loading: boolean;
  error: string | null;
}

// Actions
const weatherSlice = {
  actions: {
    fetchWeatherData: AsyncThunk<CityWeatherData, string>,
    fetchForecastData: AsyncThunk<ForecastData, string>,
    selectCity: Action<string>,
    clearCityData: Action<string>,
    updateWeatherData: Action<{ cityId: string; data: CurrentWeather }>,
  }
};
```

#### Favorites Slice

```typescript
interface FavoritesState {
  cityIds: string[];
  order: string[];
}

// Actions
const favoritesSlice = {
  actions: {
    addFavorite: Action<string>,
    removeFavorite: Action<string>,
    reorderFavorites: Action<string[]>,
    loadFavorites: Action<string[]>,
  }
};
```

#### Settings Slice

```typescript
interface SettingsState {
  temperatureUnit: 'celsius' | 'fahrenheit';
  refreshInterval: number;
  theme: 'light' | 'dark';
}

// Actions
const settingsSlice = {
  actions: {
    setTemperatureUnit: Action<'celsius' | 'fahrenheit'>,
    setRefreshInterval: Action<number>,
    setTheme: Action<'light' | 'dark'>,
    loadSettings: Action<SettingsState>,
  }
};
```

#### UI Slice

```typescript
interface UIState {
  isDetailedViewOpen: boolean;
  isSettingsPanelOpen: boolean;
  searchQuery: string;
  searchResults: CitySearchResult[];
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration: number;
}

// Actions
const uiSlice = {
  actions: {
    openDetailedView: Action<string>,
    closeDetailedView: Action<void>,
    openSettingsPanel: Action<void>,
    closeSettingsPanel: Action<void>,
    setSearchQuery: Action<string>,
    setSearchResults: Action<CitySearchResult[]>,
    addNotification: Action<Notification>,
    removeNotification: Action<string>,
  }
};
```

## Data Models

### Weather Data Model

The application transforms external API responses into a normalized internal data model:

```typescript
// Internal data model
interface WeatherData {
  cityId: string;
  cityName: string;
  location: {
    lat: number;
    lon: number;
    region: string;
    country: string;
    timezone: string;
  };
  current: {
    temperature: number; // Always stored in Celsius internally
    feelsLike: number;
    condition: WeatherCondition;
    humidity: number; // percentage
    pressure: number; // hPa
    windSpeed: number; // km/h internally
    windDirection: number; // degrees
    windGust: number;
    uvIndex: number;
    dewPoint: number;
    visibility: number; // km
    cloudCover: number; // percentage
    timestamp: Date;
  };
  forecast: {
    hourly: HourlyForecastPoint[];
    daily: DailyForecastPoint[];
  };
}

interface WeatherCondition {
  code: string; // e.g., "clear", "cloudy", "rain"
  description: string; // e.g., "Clear sky"
  icon: string; // icon identifier
}

interface HourlyForecastPoint {
  timestamp: Date;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  precipitationProbability: number; // 0-100
  precipitationAmount: number; // mm
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
}

interface DailyForecastPoint {
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
```

### API Response Transformation

The service layer transforms WeatherAPI.com responses:

```typescript
// WeatherAPI.com response structure (simplified)
interface WeatherAPIResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    condition: {
      text: string;
      code: number;
      icon: string;
    };
    humidity: number;
    pressure_mb: number;
    wind_kph: number;
    wind_degree: number;
    uv: number;
    // ... more fields
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: { text: string; code: number; icon: string };
        daily_chance_of_rain: number;
        totalprecip_mm: number;
        // ... more fields
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: { text: string; code: number; icon: string };
        chance_of_rain: number;
        precip_mm: number;
        wind_kph: number;
        wind_degree: number;
        // ... more fields
      }>;
    }>;
  };
}

// Transformation function
function transformWeatherAPIResponse(response: WeatherAPIResponse): WeatherData {
  return {
    cityId: generateCityId(response.location),
    cityName: response.location.name,
    location: {
      lat: response.location.lat,
      lon: response.location.lon,
      region: response.location.region,
      country: response.location.country,
      timezone: response.location.tz_id,
    },
    current: {
      temperature: response.current.temp_c,
      feelsLike: response.current.feelslike_c,
      condition: {
        code: mapConditionCode(response.current.condition.code),
        description: response.current.condition.text,
        icon: mapWeatherIcon(response.current.condition.code),
      },
      humidity: response.current.humidity,
      pressure: response.current.pressure_mb,
      windSpeed: response.current.wind_kph,
      windDirection: response.current.wind_degree,
      windGust: response.current.gust_kph,
      uvIndex: response.current.uv,
      dewPoint: calculateDewPoint(response.current.temp_c, response.current.humidity),
      visibility: response.current.vis_km,
      cloudCover: response.current.cloud,
      timestamp: new Date(response.current.last_updated),
    },
    forecast: {
      hourly: response.forecast.forecastday.flatMap(day =>
        day.hour.map(hour => transformHourlyForecast(hour))
      ),
      daily: response.forecast.forecastday.map(day =>
        transformDailyForecast(day)
      ),
    },
  };
}
```

### Cache Data Model

```typescript
interface CacheStore {
  weather: Record<string, CachedWeatherData>;
  search: Record<string, CachedSearchResults>;
  forecast: Record<string, CachedForecastData>;
}

interface CachedWeatherData {
  data: CurrentWeather;
  timestamp: number;
  ttl: number; // 60000ms (60 seconds)
}

interface CachedSearchResults {
  data: CitySearchResult[];
  timestamp: number;
  ttl: number; // 300000ms (5 minutes)
}

interface CachedForecastData {
  data: ForecastData;
  timestamp: number;
  ttl: number; // 300000ms (5 minutes)
}
```

### Local Storage Schema

```typescript
// localStorage keys
const STORAGE_KEYS = {
  FAVORITES: 'weather_dashboard_favorites',
  SETTINGS: 'weather_dashboard_settings',
  CACHE: 'weather_dashboard_cache',
  USER_DATA: 'weather_dashboard_user_data',
};

// Stored data structures
interface StoredFavorites {
  version: string; // schema version
  cityIds: string[];
  order: string[];
  lastModified: number;
}

interface StoredSettings {
  version: string;
  temperatureUnit: 'celsius' | 'fahrenheit';
  refreshInterval: number;
  theme: 'light' | 'dark';
  lastModified: number;
}

interface StoredCache {
  version: string;
  entries: Record<string, CacheEntry<any>>;
  lastModified: number;
}
```

## Data Models (continued)

### Rate Limiting Model

```typescript
interface RateLimiter {
  requests: RequestRecord[];
  maxRequestsPerMinute: number;
  windowSize: number; // milliseconds
}

interface RequestRecord {
  timestamp: number;
  endpoint: string;
  cityId?: string;
}

// Rate limiting logic
class APIRateLimiter {
  private requests: RequestRecord[] = [];
  private readonly maxRequests = 60; // per minute
  private readonly windowSize = 60000; // 1 minute
  
  canMakeRequest(): boolean {
    this.cleanOldRequests();
    return this.requests.length < this.maxRequests;
  }
  
  recordRequest(endpoint: string, cityId?: string): void {
    this.requests.push({
      timestamp: Date.now(),
      endpoint,
      cityId,
    });
  }
  
  private cleanOldRequests(): void {
    const cutoff = Date.now() - this.windowSize;
    this.requests = this.requests.filter(r => r.timestamp > cutoff);
  }
  
  getWaitTime(): number {
    if (this.canMakeRequest()) return 0;
    const oldestRequest = this.requests[0];
    return (oldestRequest.timestamp + this.windowSize) - Date.now();
  }
}
```

### Error Model

```typescript
interface AppError {
  code: ErrorCode;
  message: string;
  details?: any;
  timestamp: Date;
  recoverable: boolean;
}

enum ErrorCode {
  // API Errors
  API_UNREACHABLE = 'API_UNREACHABLE',
  API_RATE_LIMIT = 'API_RATE_LIMIT',
  API_INVALID_RESPONSE = 'API_INVALID_RESPONSE',
  API_AUTH_FAILED = 'API_AUTH_FAILED',
  
  // Search Errors
  SEARCH_NO_RESULTS = 'SEARCH_NO_RESULTS',
  SEARCH_INVALID_QUERY = 'SEARCH_INVALID_QUERY',
  
  // Cache Errors
  CACHE_READ_FAILED = 'CACHE_READ_FAILED',
  CACHE_WRITE_FAILED = 'CACHE_WRITE_FAILED',
  
  // Storage Errors
  STORAGE_QUOTA_EXCEEDED = 'STORAGE_QUOTA_EXCEEDED',
  STORAGE_ACCESS_DENIED = 'STORAGE_ACCESS_DENIED',
  
  // Network Errors
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  
  // Auth Errors
  AUTH_FAILED = 'AUTH_FAILED',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
}

// Error messages mapping
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.API_UNREACHABLE]: 'Unable to connect to weather service',
  [ErrorCode.API_RATE_LIMIT]: 'Too many requests. Please wait a moment.',
  [ErrorCode.API_INVALID_RESPONSE]: 'Received invalid data from weather service',
  [ErrorCode.API_AUTH_FAILED]: 'Weather service authentication failed',
  [ErrorCode.SEARCH_NO_RESULTS]: 'No cities found',
  [ErrorCode.SEARCH_INVALID_QUERY]: 'Please enter at least 3 characters',
  [ErrorCode.CACHE_READ_FAILED]: 'Failed to read cached data',
  [ErrorCode.CACHE_WRITE_FAILED]: 'Failed to save data to cache',
  [ErrorCode.STORAGE_QUOTA_EXCEEDED]: 'Storage limit exceeded',
  [ErrorCode.STORAGE_ACCESS_DENIED]: 'Cannot access local storage',
  [ErrorCode.NETWORK_OFFLINE]: 'No internet connection',
  [ErrorCode.NETWORK_TIMEOUT]: 'Request timed out',
  [ErrorCode.AUTH_FAILED]: 'Authentication failed',
  [ErrorCode.AUTH_TOKEN_EXPIRED]: 'Session expired. Please sign in again.',
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:

**Temperature Unit Conversion**: Properties 1.3, 1.6, 5.4, 6.2, 7.1, and 8.5 all relate to unit conversion. These can be consolidated into a single comprehensive property about unit conversion consistency across the application.

**Data Display Completeness**: Properties 1.5, 2.5, 2.6, 2.7 all test that specific fields are displayed. These can be combined into a single property about required field presence.

**Chart Data Completeness**: Properties 5.1, 5.2, 6.5, 7.5 all test minimum data points in charts. These can be consolidated into properties about chart data requirements.

**Tooltip Generation**: Properties 5.3, 6.3, 7.3 all test tooltip data generation. These can be combined into a single property about tooltip data completeness.

**API Authentication**: Properties 9.1 and 9.2 both relate to API authentication and can be combined.

**API Data Fetching**: Properties 9.3 and 9.4 both test basic API fetching and can be combined.

**Cache Validity**: Properties 11.3 and 11.4 are complementary (cache hit vs cache miss) and can be combined into a single property about cache TTL behavior.

**Redux State Storage**: Properties 12.2, 12.3, 12.4 all test that data is stored in Redux and can be combined.

**Forecast Length Bounds**: Properties 2.2 and 2.3 test minimum and maximum forecast length and can be combined.

### Property 1: City Card Rendering Completeness

*For any* list of cities in the user's city list, the dashboard should render exactly one city card per city, and each card should display all required fields (temperature, weather icon, humidity, wind speed).

**Validates: Requirements 1.1, 1.4, 1.5, 1.6**

### Property 2: Temperature Unit Conversion Consistency

*For any* temperature value and any temperature unit setting (Celsius or Fahrenheit), all temperature displays throughout the application (city cards, detailed view, charts) should show the correctly converted value according to the standard conversion formula: F = C × 9/5 + 32.

**Validates: Requirements 1.3, 1.6, 5.4, 8.5**

### Property 3: Detailed View State Transition

*For any* city card, clicking it should transition the application state to display the detailed view with the selected city's ID stored in state, and closing the detailed view should return to the main dashboard view with no city selected.

**Validates: Requirements 2.1, 2.8**

### Property 4: Forecast Data Bounds

*For any* detailed view, the daily forecast data should contain between 5 and 7 days (inclusive), and the hourly forecast should contain at least 24 hours of data.

**Validates: Requirements 2.2, 2.3, 2.4**

### Property 5: Detailed View Metrics Completeness

*For any* detailed view with valid weather data, all required metrics (atmospheric pressure, dew point temperature, UV index) should be present and displayable.

**Validates: Requirements 2.5, 2.6, 2.7**

### Property 6: Search Query Validation

*For any* search query string, the search component should only trigger an API call if the string length is 3 or more characters, and should not trigger for strings with fewer than 3 characters.

**Validates: Requirements 3.2**

### Property 7: Search Results Display

*For any* API search response containing 5 or more city results, the autocomplete dropdown should display at least 5 suggestions.

**Validates: Requirements 3.4**

### Property 8: City Addition from Search

*For any* city selected from search suggestions, the city should be added to the user's city list, increasing the list length by exactly one.

**Validates: Requirements 3.5**

### Property 9: Search Error Handling

*For any* API error during city search, the search component should display an error message to the user.

**Validates: Requirements 3.6**

### Property 10: Favorites Persistence Round-Trip

*For any* list of favorite city IDs, saving to local storage and then loading from local storage should return an equivalent list with the same city IDs in the same order.

**Validates: Requirements 4.3**

### Property 11: Favorites State Management

*For any* city, marking it as a favorite should add its ID to the favorites list in Redux state, and unmarking it should remove its ID from the list.

**Validates: Requirements 4.2**

### Property 12: Favorites Display Ordering

*For any* application load with stored favorites, the dashboard should display favorite cities before non-favorite cities, with favorites in a dedicated section.

**Validates: Requirements 4.4, 4.5**

### Property 13: Chart Data Completeness

*For any* temperature chart in hourly mode, it should contain at least 24 data points; for any temperature chart in daily mode, it should contain at least 5 data points; for any precipitation chart, it should contain at least 5 days of data; for any wind chart, it should contain at least 24 hours of data.

**Validates: Requirements 5.1, 5.2, 6.5, 7.5**

### Property 14: Chart Tooltip Data Generation

*For any* data point in any chart (temperature, precipitation, or wind), hovering over it should generate tooltip data containing all relevant values for that data point (exact temperature, precipitation probability and amount, or wind speed and direction).

**Validates: Requirements 5.3, 6.3, 7.3**

### Property 15: Chart Zoom Filtering

*For any* chart with zoom functionality enabled and any selected time range, the displayed data should be filtered to only include data points within the selected range.

**Validates: Requirements 5.6**

### Property 16: Precipitation Data Formatting

*For any* precipitation probability value, it should be displayed as a percentage between 0 and 100, and any precipitation amount should be displayed in either millimeters or inches based on the unit setting.

**Validates: Requirements 6.1, 6.2**

### Property 17: Wind Data Formatting

*For any* wind speed value, it should be displayed in either kilometers per hour or miles per hour based on the unit setting, and any wind direction should be displayed as either compass directions (N, NE, E, etc.) or degrees (0-360).

**Validates: Requirements 7.1, 7.2**

### Property 18: Settings Persistence Round-Trip

*For any* temperature unit preference (Celsius or Fahrenheit), saving it to local storage and then loading from local storage should return the same preference value.

**Validates: Requirements 8.3**

### Property 19: Settings Application on Load

*For any* stored temperature unit preference in local storage, when the application loads, the settings manager should apply that preference to the application state.

**Validates: Requirements 8.4**

### Property 20: API Authentication

*For any* API request to the weather service, the request should include the configured API key in the appropriate authentication header or query parameter.

**Validates: Requirements 9.1, 9.2**

### Property 21: API Data Fetching

*For any* valid city identifier, the API service should be able to fetch both current weather data and forecast data for that city.

**Validates: Requirements 9.3, 9.4**

### Property 22: API Error Message Generation

*For any* API error response, the application should generate and display a user-friendly error message (not raw API error codes or technical details).

**Validates: Requirements 9.5**

### Property 23: Rate Limiter Request Limiting

*For any* sequence of API requests within a 60-second window, the rate limiter should allow a maximum of 60 requests and block or queue any additional requests.

**Validates: Requirements 9.6**

### Property 24: Rate Limiter Request Queuing

*For any* API request that exceeds the rate limit, the request should be added to a queue and executed after the rate limit window resets.

**Validates: Requirements 9.7**

### Property 25: Auto-Refresh Interval

*For any* dashboard with active cities, weather data should be refreshed at regular intervals not exceeding 60 seconds.

**Validates: Requirements 10.1**

### Property 26: Refresh Data Propagation

*For any* weather data refresh operation, all city cards displaying that city's data should receive and display the updated data.

**Validates: Requirements 10.2**

### Property 27: Detailed View Refresh Continuation

*For any* detailed view that is open, weather data refresh operations should continue for that city while the detailed view remains open.

**Validates: Requirements 10.3**

### Property 28: Last Updated Timestamp Display

*For any* weather data with a timestamp, the display should include a "last updated" indicator showing when the data was fetched.

**Validates: Requirements 10.4**

### Property 29: Refresh Retry Logic

*For any* failed weather data refresh operation, the system should schedule a retry attempt after 30 seconds.

**Validates: Requirements 10.5**

### Property 30: Cache Entry Structure

*For any* weather data stored in the cache, the cache entry should include both the data payload and a timestamp indicating when it was cached.

**Validates: Requirements 11.1**

### Property 31: Cache-First Request Strategy

*For any* weather data request, the system should check the cache before making an API call, and only call the API if the cache check fails or returns stale data.

**Validates: Requirements 11.2**

### Property 32: Cache TTL Validation

*For any* cached weather data entry, if the entry's age is less than 60 seconds, it should be used; if the entry's age is 60 seconds or more, fresh data should be fetched from the API.

**Validates: Requirements 11.3, 11.4**

### Property 33: Cache Capacity

*For any* cache state, it should be able to store weather data for at least 10 different cities simultaneously.

**Validates: Requirements 11.5**

### Property 34: Cache LRU Eviction

*For any* cache that has reached capacity, when a new entry is added, the oldest entry (by timestamp) should be removed first.

**Validates: Requirements 11.6**

### Property 35: Redux State Structure

*For any* application state, current weather data, favorite cities list, and temperature unit preference should all be stored in the Redux store in their respective slices.

**Validates: Requirements 12.2, 12.3, 12.4**

### Property 36: State Persistence Sync

*For any* critical state change (favorites, settings), the updated state should be persisted to local storage.

**Validates: Requirements 12.6**

### Property 37: Invalid Data Fallback

*For any* API response containing invalid or malformed weather data, the system should log the error and attempt to display cached data if available.

**Validates: Requirements 13.3**

### Property 38: Retry Operation Execution

*For any* failed operation with a retry button, clicking the retry button should re-execute the same operation that failed.

**Validates: Requirements 13.5**

### Property 39: Authenticated User Data Loading

*For any* successful user authentication, the system should load user-specific favorites and preferences from the remote server.

**Validates: Requirements 14.3**

### Property 40: User Data Remote Persistence

*For any* authenticated user's preferences and favorites, changes should be persisted to the remote server.

**Validates: Requirements 14.4**

### Property 41: Sign-Out Data Cleanup

*For any* user sign-out operation, all user-specific data (favorites, preferences) should be cleared from the local Redux state.

**Validates: Requirements 14.5**


## Error Handling

### Error Categories and Handling Strategies

#### 1. API Errors

**Network Connectivity Errors**
- **Detection**: Failed fetch requests, timeout errors, network offline events
- **User Message**: "Unable to connect to weather service"
- **Recovery Strategy**: 
  - Display cached data if available
  - Show retry button
  - Automatically retry after 30 seconds
  - Display offline indicator in UI

**Rate Limit Errors (HTTP 429)**
- **Detection**: API returns 429 status code
- **User Message**: "Too many requests. Please wait a moment."
- **Recovery Strategy**:
  - Queue the request for later execution
  - Calculate wait time from rate limiter
  - Automatically retry when rate limit window resets
  - Display countdown timer to user

**Authentication Errors (HTTP 401/403)**
- **Detection**: API returns 401 or 403 status code
- **User Message**: "Weather service authentication failed"
- **Recovery Strategy**:
  - Log error details for debugging
  - Check API key configuration
  - Prompt user to check settings
  - Provide link to API key configuration

**Invalid Response Errors**
- **Detection**: Response parsing fails, missing required fields, invalid data types
- **User Message**: "Received invalid data from weather service"
- **Recovery Strategy**:
  - Log full response for debugging
  - Fall back to cached data if available
  - Show retry button
  - Report error to error tracking service

**City Not Found (HTTP 404)**
- **Detection**: API returns 404 for city lookup
- **User Message**: "City not found. Please try a different search."
- **Recovery Strategy**:
  - Clear search input
  - Suggest alternative search terms
  - Do not add to city list

#### 2. Search Errors

**No Results Found**
- **Detection**: API returns empty results array
- **User Message**: "No cities found"
- **Recovery Strategy**:
  - Display message in autocomplete dropdown
  - Suggest checking spelling
  - Keep search input for user to modify

**Search Query Too Short**
- **Detection**: User input less than 3 characters
- **User Message**: "Please enter at least 3 characters"
- **Recovery Strategy**:
  - Display hint below search input
  - Do not trigger API call
  - Wait for more input

**Search API Timeout**
- **Detection**: Search request exceeds timeout threshold (5 seconds)
- **User Message**: "Search timed out. Please try again."
- **Recovery Strategy**:
  - Cancel pending request
  - Show retry option
  - Log timeout for monitoring

#### 3. Storage Errors

**Local Storage Quota Exceeded**
- **Detection**: localStorage.setItem() throws QuotaExceededError
- **User Message**: "Storage limit exceeded. Some preferences may not be saved."
- **Recovery Strategy**:
  - Clear old cache entries
  - Keep only essential data (favorites, settings)
  - Warn user about storage limitations
  - Suggest clearing browser data

**Local Storage Access Denied**
- **Detection**: localStorage access throws SecurityError
- **User Message**: "Cannot access local storage. Preferences will not be saved."
- **Recovery Strategy**:
  - Continue with in-memory state only
  - Warn user that preferences won't persist
  - Suggest checking browser privacy settings
  - Disable persistence features gracefully

**Corrupted Storage Data**
- **Detection**: JSON.parse() fails on stored data
- **User Message**: "Stored preferences are corrupted. Using defaults."
- **Recovery Strategy**:
  - Clear corrupted data
  - Reset to default settings
  - Log error for debugging
  - Continue with fresh state

#### 4. Cache Errors

**Cache Read Failure**
- **Detection**: Error accessing cache data structure
- **User Message**: None (internal error)
- **Recovery Strategy**:
  - Log error
  - Bypass cache and fetch from API
  - Continue normal operation

**Cache Write Failure**
- **Detection**: Error writing to cache
- **User Message**: None (internal error)
- **Recovery Strategy**:
  - Log error
  - Continue without caching
  - Monitor cache health

#### 5. Authentication Errors (Optional Feature)

**Google Sign-In Failed**
- **Detection**: Google OAuth returns error
- **User Message**: "Authentication failed. Please try again."
- **Recovery Strategy**:
  - Log error details
  - Show sign-in button again
  - Continue with unauthenticated mode
  - Provide help link

**Token Expired**
- **Detection**: API returns 401 with expired token
- **User Message**: "Session expired. Please sign in again."
- **Recovery Strategy**:
  - Clear user session
  - Show sign-in button
  - Preserve local favorites and settings
  - Attempt token refresh if available

**Sync Failed**
- **Detection**: Error syncing user data to server
- **User Message**: "Failed to sync preferences. Changes saved locally."
- **Recovery Strategy**:
  - Keep local changes
  - Retry sync in background
  - Show sync status indicator
  - Queue changes for next sync attempt

#### 6. Component Errors

**React Error Boundaries**
- **Detection**: Component throws unhandled error
- **User Message**: "Something went wrong. Please refresh the page."
- **Recovery Strategy**:
  - Catch error in Error Boundary component
  - Display fallback UI
  - Log error with component stack trace
  - Provide refresh button
  - Report to error tracking service

**Chart Rendering Errors**
- **Detection**: Recharts throws error, invalid data format
- **User Message**: "Unable to display chart"
- **Recovery Strategy**:
  - Display error message in chart container
  - Show data in table format as fallback
  - Log error with data that caused failure
  - Validate data before passing to chart

### Error Logging and Monitoring

**Error Logging Strategy**:
```typescript
interface ErrorLog {
  timestamp: Date;
  errorCode: ErrorCode;
  message: string;
  stack?: string;
  context: {
    component?: string;
    action?: string;
    userId?: string;
    cityId?: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Log errors with context
function logError(error: AppError, context: any): void {
  const errorLog: ErrorLog = {
    timestamp: new Date(),
    errorCode: error.code,
    message: error.message,
    stack: error.stack,
    context,
    severity: determineSeverity(error.code),
  };
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', errorLog);
  }
  
  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    sendToErrorTracking(errorLog);
  }
  
  // Store in local error log for debugging
  storeLocalErrorLog(errorLog);
}
```

**Error Notification System**:
```typescript
// Display user-friendly notifications
function showErrorNotification(error: AppError): void {
  const notification: Notification = {
    id: generateId(),
    type: 'error',
    message: ERROR_MESSAGES[error.code],
    duration: 5000, // 5 seconds minimum
  };
  
  // Add retry button for recoverable errors
  if (error.recoverable) {
    notification.action = {
      label: 'Retry',
      handler: () => retryFailedOperation(error),
    };
  }
  
  dispatch(addNotification(notification));
}
```

### Error Recovery Patterns

**Graceful Degradation**:
- If API is unavailable, show cached data with staleness indicator
- If charts fail to render, show data in table format
- If authentication fails, continue with local-only mode
- If storage is unavailable, use in-memory state only

**Retry Mechanisms**:
- Exponential backoff for API retries: 1s, 2s, 4s, 8s, 16s (max)
- User-triggered retry via button
- Automatic retry for transient errors
- Queue requests during rate limiting

**Fallback Strategies**:
- Cached data when API fails
- Default settings when storage fails
- Local-only mode when authentication fails
- Table view when charts fail

## Testing Strategy

### Overview

The Weather Analytics Dashboard will employ a comprehensive testing strategy combining unit tests, integration tests, and property-based tests to ensure correctness, reliability, and maintainability.

### Testing Pyramid

```
                    /\
                   /  \
                  / E2E \
                 /  Tests \
                /----------\
               /            \
              /  Integration \
             /     Tests      \
            /------------------\
           /                    \
          /    Property-Based    \
         /       & Unit Tests     \
        /________________________\
```

### 1. Property-Based Testing

Property-based testing will be the primary method for validating correctness properties defined in this design document. We will use **fast-check** (JavaScript/TypeScript property-based testing library).

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Custom generators for domain-specific data types

**Property Test Structure**:
```typescript
import fc from 'fast-check';

describe('Weather Analytics Dashboard Properties', () => {
  describe('Feature: weather-analytics-dashboard, Property 2: Temperature Unit Conversion', () => {
    it('should convert temperatures correctly between Celsius and Fahrenheit', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -100, max: 100 }), // temperature in Celsius
          fc.constantFrom('celsius', 'fahrenheit'), // target unit
          (tempC, targetUnit) => {
            const converted = convertTemperature(tempC, 'celsius', targetUnit);
            
            if (targetUnit === 'celsius') {
              expect(converted).toBeCloseTo(tempC, 2);
            } else {
              const expectedF = (tempC * 9/5) + 32;
              expect(converted).toBeCloseTo(expectedF, 2);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Feature: weather-analytics-dashboard, Property 10: Favorites Persistence Round-Trip', () => {
    it('should preserve favorites list through save/load cycle', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string(), { minLength: 0, maxLength: 20 }), // city IDs
          (cityIds) => {
            const uniqueCityIds = [...new Set(cityIds)]; // ensure uniqueness
            
            // Save to storage
            saveFavorites(uniqueCityIds);
            
            // Load from storage
            const loaded = loadFavorites();
            
            // Should be equivalent
            expect(loaded).toEqual(uniqueCityIds);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Feature: weather-analytics-dashboard, Property 23: Rate Limiter Request Limiting', () => {
    it('should limit requests to 60 per minute', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 61, max: 200 }), // number of requests
          (numRequests) => {
            const rateLimiter = new APIRateLimiter();
            let allowedCount = 0;
            let blockedCount = 0;
            
            for (let i = 0; i < numRequests; i++) {
              if (rateLimiter.canMakeRequest()) {
                rateLimiter.recordRequest('weather', 'test-city');
                allowedCount++;
              } else {
                blockedCount++;
              }
            }
            
            // Should allow exactly 60 requests
            expect(allowedCount).toBe(60);
            expect(blockedCount).toBe(numRequests - 60);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Feature: weather-analytics-dashboard, Property 32: Cache TTL Validation', () => {
    it('should use cached data within TTL and fetch fresh data after TTL', () => {
      fc.assert(
        fc.property(
          fc.record({
            data: fc.anything(),
            age: fc.integer({ min: 0, max: 120000 }), // 0-120 seconds
          }),
          ({ data, age }) => {
            const cache = new CacheManager();
            const key = 'test-key';
            const ttl = 60000; // 60 seconds
            
            // Set cache entry with backdated timestamp
            cache.set(key, data, ttl);
            const entry = cache['cache'][key];
            entry.timestamp = Date.now() - age;
            
            // Check validity
            const isValid = cache.isValid(key);
            
            if (age < ttl) {
              expect(isValid).toBe(true);
              expect(cache.get(key)).toEqual(data);
            } else {
              expect(isValid).toBe(false);
              expect(cache.get(key)).toBeNull();
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
```

**Custom Generators**:
```typescript
// Generator for weather data
const weatherDataArbitrary = fc.record({
  temperature: fc.float({ min: -50, max: 50 }),
  humidity: fc.integer({ min: 0, max: 100 }),
  windSpeed: fc.float({ min: 0, max: 200 }),
  pressure: fc.float({ min: 900, max: 1100 }),
  condition: fc.constantFrom('clear', 'cloudy', 'rain', 'snow', 'fog'),
});

// Generator for city data
const cityArbitrary = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  lat: fc.float({ min: -90, max: 90 }),
  lon: fc.float({ min: -180, max: 180 }),
});

// Generator for forecast data
const forecastArbitrary = fc.record({
  daily: fc.array(weatherDataArbitrary, { minLength: 5, maxLength: 7 }),
  hourly: fc.array(weatherDataArbitrary, { minLength: 24, maxLength: 48 }),
});
```

### 2. Unit Testing

Unit tests will focus on specific examples, edge cases, and error conditions that complement property-based tests.

**Testing Framework**: Jest + React Testing Library

**Unit Test Coverage**:

**Utility Functions**:
```typescript
describe('Temperature Converter', () => {
  it('should convert 0°C to 32°F', () => {
    expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBe(32);
  });

  it('should convert 100°C to 212°F', () => {
    expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBe(212);
  });

  it('should return same value when converting to same unit', () => {
    expect(convertTemperature(25, 'celsius', 'celsius')).toBe(25);
  });
});

describe('Weather Icon Mapper', () => {
  it('should map clear sky condition to sun icon', () => {
    expect(mapWeatherIcon('clear')).toBe('sun');
  });

  it('should map unknown condition to default icon', () => {
    expect(mapWeatherIcon('unknown')).toBe('cloud');
  });
});

describe('Date Formatter', () => {
  it('should format timestamp as readable date', () => {
    const date = new Date('2024-01-15T12:00:00Z');
    expect(formatDate(date)).toBe('Jan 15, 2024');
  });

  it('should format time with AM/PM', () => {
    const date = new Date('2024-01-15T14:30:00Z');
    expect(formatTime(date)).toContain('PM');
  });
});
```

**Component Tests**:
```typescript
describe('CityCard Component', () => {
  it('should render city name', () => {
    const props = createMockCityCardProps();
    render(<CityCard {...props} />);
    expect(screen.getByText(props.cityName)).toBeInTheDocument();
  });

  it('should call onCardClick when clicked', () => {
    const onCardClick = jest.fn();
    const props = { ...createMockCityCardProps(), onCardClick };
    render(<CityCard {...props} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onCardClick).toHaveBeenCalledWith(props.cityId);
  });

  it('should display favorite icon when isFavorite is true', () => {
    const props = { ...createMockCityCardProps(), isFavorite: true };
    render(<CityCard {...props} />);
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });

  it('should show loading spinner when loading', () => {
    const props = { ...createMockCityCardProps(), loading: true };
    render(<CityCard {...props} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should display error message when error exists', () => {
    const props = { ...createMockCityCardProps(), error: 'Failed to load' };
    render(<CityCard {...props} />);
    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
  });
});

describe('SearchBar Component', () => {
  it('should not trigger search for queries less than 3 characters', async () => {
    const onCitySelect = jest.fn();
    render(<SearchBar onCitySelect={onCitySelect} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ab' } });
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('should display autocomplete results for valid query', async () => {
    const mockResults = [
      { id: '1', name: 'London', country: 'UK' },
      { id: '2', name: 'Paris', country: 'France' },
    ];
    
    jest.spyOn(weatherApi, 'searchCities').mockResolvedValue(mockResults);
    
    render(<SearchBar onCitySelect={jest.fn()} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'lon' } });
    
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });
  });
});
```

**Redux Slice Tests**:
```typescript
describe('Weather Slice', () => {
  it('should add city weather data to state', () => {
    const initialState = weatherSlice.getInitialState();
    const weatherData = createMockWeatherData();
    
    const newState = weatherSlice.reducer(
      initialState,
      updateWeatherData({ cityId: 'london', data: weatherData })
    );
    
    expect(newState.cities['london'].current).toEqual(weatherData);
  });

  it('should set loading state when fetching weather', () => {
    const initialState = weatherSlice.getInitialState();
    
    const newState = weatherSlice.reducer(
      initialState,
      fetchWeatherData.pending('requestId', 'london')
    );
    
    expect(newState.cities['london'].loading).toBe(true);
  });

  it('should set error state when fetch fails', () => {
    const initialState = weatherSlice.getInitialState();
    const error = new Error('API Error');
    
    const newState = weatherSlice.reducer(
      initialState,
      fetchWeatherData.rejected(error, 'requestId', 'london')
    );
    
    expect(newState.cities['london'].error).toBe('API Error');
    expect(newState.cities['london'].loading).toBe(false);
  });
});

describe('Favorites Slice', () => {
  it('should add city to favorites', () => {
    const initialState = { cityIds: [], order: [] };
    
    const newState = favoritesSlice.reducer(
      initialState,
      addFavorite('london')
    );
    
    expect(newState.cityIds).toContain('london');
  });

  it('should not add duplicate favorites', () => {
    const initialState = { cityIds: ['london'], order: ['london'] };
    
    const newState = favoritesSlice.reducer(
      initialState,
      addFavorite('london')
    );
    
    expect(newState.cityIds).toEqual(['london']);
  });

  it('should remove city from favorites', () => {
    const initialState = { cityIds: ['london', 'paris'], order: ['london', 'paris'] };
    
    const newState = favoritesSlice.reducer(
      initialState,
      removeFavorite('london')
    );
    
    expect(newState.cityIds).not.toContain('london');
    expect(newState.cityIds).toContain('paris');
  });
});
```

**Service Layer Tests**:
```typescript
describe('Weather API Service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch current weather with API key', async () => {
    const mockResponse = createMockAPIResponse();
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    
    await weatherApi.getCurrentWeather('london');
    
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('key=test-api-key'),
      expect.any(Object)
    );
  });

  it('should transform API response to internal format', async () => {
    const mockResponse = createMockAPIResponse();
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    
    const result = await weatherApi.getCurrentWeather('london');
    
    expect(result).toHaveProperty('temperature');
    expect(result).toHaveProperty('humidity');
    expect(result).toHaveProperty('windSpeed');
  });

  it('should throw error for invalid API response', async () => {
    fetchMock.mockResponseOnce('invalid json');
    
    await expect(weatherApi.getCurrentWeather('london')).rejects.toThrow();
  });

  it('should handle 404 city not found', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    
    await expect(weatherApi.getCurrentWeather('invalid')).rejects.toThrow('City not found');
  });
});

describe('Cache Manager', () => {
  it('should store and retrieve data', () => {
    const cache = new CacheManager();
    const data = { temperature: 20 };
    
    cache.set('test-key', data);
    expect(cache.get('test-key')).toEqual(data);
  });

  it('should return null for expired data', () => {
    jest.useFakeTimers();
    const cache = new CacheManager();
    const data = { temperature: 20 };
    
    cache.set('test-key', data, 1000); // 1 second TTL
    jest.advanceTimersByTime(1001);
    
    expect(cache.get('test-key')).toBeNull();
    jest.useRealTimers();
  });

  it('should evict oldest entry when capacity exceeded', () => {
    const cache = new CacheManager(2); // capacity of 2
    
    cache.set('key1', 'data1');
    cache.set('key2', 'data2');
    cache.set('key3', 'data3'); // should evict key1
    
    expect(cache.get('key1')).toBeNull();
    expect(cache.get('key2')).toBe('data2');
    expect(cache.get('key3')).toBe('data3');
  });
});
```

### 3. Integration Testing

Integration tests verify that multiple components work together correctly.

**Integration Test Scenarios**:

```typescript
describe('Weather Dashboard Integration', () => {
  it('should load favorites from storage on mount', () => {
    // Setup: Store favorites in localStorage
    localStorage.setItem('weather_dashboard_favorites', JSON.stringify({
      version: '1.0',
      cityIds: ['london', 'paris'],
      order: ['london', 'paris'],
      lastModified: Date.now(),
    }));
    
    // Render app
    render(<App />);
    
    // Verify: Favorites section displays cities
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should add city from search and update display', async () => {
    const mockSearchResults = [{ id: 'tokyo', name: 'Tokyo', country: 'Japan' }];
    jest.spyOn(weatherApi, 'searchCities').mockResolvedValue(mockSearchResults);
    
    const mockWeatherData = createMockWeatherData();
    jest.spyOn(weatherApi, 'getCurrentWeather').mockResolvedValue(mockWeatherData);
    
    render(<App />);
    
    // Search for city
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'tokyo' } });
    
    // Select from results
    await waitFor(() => screen.getByText('Tokyo'));
    fireEvent.click(screen.getByText('Tokyo'));
    
    // Verify: City card appears
    await waitFor(() => {
      expect(screen.getByText('Tokyo')).toBeInTheDocument();
    });
  });

  it('should toggle favorite and persist to storage', async () => {
    render(<App />);
    
    // Add a city first
    // ... (setup code)
    
    // Toggle favorite
    const favoriteButton = screen.getByLabelText(/add to favorites/i);
    fireEvent.click(favoriteButton);
    
    // Verify: localStorage updated
    const stored = JSON.parse(localStorage.getItem('weather_dashboard_favorites'));
    expect(stored.cityIds).toContain('london');
  });

  it('should switch temperature units and update all displays', () => {
    render(<App />);
    
    // Initial temperature in Celsius
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
    
    // Open settings and switch to Fahrenheit
    fireEvent.click(screen.getByLabelText(/settings/i));
    fireEvent.click(screen.getByLabelText(/fahrenheit/i));
    
    // Verify: All temperatures updated
    expect(screen.getByText(/68°F/)).toBeInTheDocument();
  });
});
```

### 4. End-to-End Testing (Optional)

For critical user flows, E2E tests using Playwright or Cypress can be added:

**E2E Test Scenarios**:
- Complete user journey: search → add city → view details → add to favorites
- Error recovery: API failure → retry → success
- Cross-device: responsive behavior on mobile and desktop
- Authentication flow: sign in → sync data → sign out

### 5. Test Coverage Goals

**Coverage Targets**:
- Unit test coverage: 80%+ for utility functions and services
- Component test coverage: 70%+ for React components
- Property-based test coverage: 100% of correctness properties
- Integration test coverage: All critical user flows

**Coverage Exclusions**:
- Third-party library code
- Configuration files
- Type definitions
- Development-only code

### 6. Testing Tools and Libraries

**Core Testing Stack**:
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing
- **fast-check**: Property-based testing
- **MSW (Mock Service Worker)**: API mocking
- **@testing-library/user-event**: User interaction simulation

**Additional Tools**:
- **jest-localstorage-mock**: Mock localStorage
- **fake-timers**: Time-based testing
- **@testing-library/jest-dom**: Custom matchers
- **Playwright** (optional): E2E testing

### 7. Continuous Integration

**CI Pipeline**:
1. Run linter (ESLint)
2. Run type checker (TypeScript)
3. Run unit tests with coverage
4. Run property-based tests (100 iterations)
5. Run integration tests
6. Generate coverage report
7. Fail build if coverage below threshold

**Test Execution Strategy**:
- Run fast unit tests on every commit
- Run property-based tests (with more iterations) on PR
- Run integration tests on PR
- Run E2E tests on main branch only

### 8. Test Data Management

**Mock Data Factories**:
```typescript
// Factory for creating test data
export const createMockWeatherData = (overrides?: Partial<CurrentWeather>): CurrentWeather => ({
  cityId: 'test-city',
  cityName: 'Test City',
  temperature: 20,
  feelsLike: 18,
  condition: { code: 'clear', description: 'Clear sky', icon: 'sun' },
  humidity: 65,
  pressure: 1013,
  windSpeed: 15,
  windDirection: 180,
  uvIndex: 5,
  dewPoint: 12,
  timestamp: new Date(),
  ...overrides,
});

export const createMockCityCardProps = (overrides?: Partial<CityCardProps>): CityCardProps => ({
  cityId: 'test-city',
  cityName: 'Test City',
  temperature: 20,
  weatherCondition: 'Clear',
  weatherIcon: 'sun',
  humidity: 65,
  windSpeed: 15,
  isFavorite: false,
  onCardClick: jest.fn(),
  onFavoriteToggle: jest.fn(),
  onRemove: jest.fn(),
  lastUpdated: new Date(),
  ...overrides,
});
```

### 9. Performance Testing

While not part of functional correctness, performance benchmarks should be established:

**Performance Metrics**:
- Initial page load: < 2 seconds
- City card render time: < 100ms
- Chart render time: < 200ms
- Search autocomplete response: < 300ms (after debounce)
- Temperature unit switch: < 500ms for all updates

**Performance Testing Tools**:
- Lighthouse for page load metrics
- React DevTools Profiler for component render times
- Custom performance marks for critical operations

### 10. Test Maintenance

**Best Practices**:
- Keep tests simple and focused
- Use descriptive test names
- Avoid test interdependencies
- Mock external dependencies
- Use factories for test data
- Keep property tests deterministic (use seeds)
- Review and update tests with code changes
- Remove obsolete tests promptly

**Test Documentation**:
- Document complex test scenarios
- Explain non-obvious assertions
- Link tests to requirements
- Maintain test data documentation
