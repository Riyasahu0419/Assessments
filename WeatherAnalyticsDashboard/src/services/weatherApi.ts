import { API_CONFIG } from '../constants/apiConfig';
import { ERROR_MESSAGES } from '../constants/appConfig';
import {
  CurrentWeather,
  ForecastData,
  CitySearchResult,
  HourlyForecast,
  DailyForecast,
  WeatherCondition,
} from '../types/weather.types';
import { mapWeatherIcon, mapConditionCode } from '../utils/weatherIconMapper';
import { calculateDewPoint } from '../utils/temperatureConverter';
import { rateLimiter } from './rateLimiter';
import { cacheManager } from './cacheManager';

/**
 * Weather API Service
 */
class WeatherApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
  }

  /**
   * Fetch with rate limiting and error handling
   */
  private async fetchWithRateLimit(url: string, endpoint: string): Promise<Response> {
    if (!rateLimiter.canMakeRequest()) {
      const waitTime = rateLimiter.getWaitTime();
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    rateLimiter.recordRequest(endpoint);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(ERROR_MESSAGES.API_AUTH_FAILED);
        }
        if (response.status === 429) {
          throw new Error(ERROR_MESSAGES.API_RATE_LIMIT);
        }
        throw new Error(ERROR_MESSAGES.API_UNREACHABLE);
      }
      
      return response;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(ERROR_MESSAGES.NETWORK_OFFLINE);
      }
      throw error;
    }
  }

  /**
   * Get current weather for a city
   */
  async getCurrentWeather(cityQuery: string): Promise<CurrentWeather> {
    const cacheKey = `weather_${cityQuery}`;
    const cached = cacheManager.get<CurrentWeather>(cacheKey);
    
    if (cached) return cached;

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.CURRENT}?key=${this.apiKey}&q=${encodeURIComponent(cityQuery)}&aqi=no`;
    
    const response = await this.fetchWithRateLimit(url, 'current');
    const data = await response.json();
    
    const weather = this.transformCurrentWeather(data);
    cacheManager.set(cacheKey, weather);
    
    return weather;
  }

  /**
   * Get forecast data for a city
   */
  async getForecast(cityQuery: string, days: number = 7): Promise<ForecastData> {
    const cacheKey = `forecast_${cityQuery}_${days}`;
    const cached = cacheManager.get<ForecastData>(cacheKey);
    
    if (cached) return cached;

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.FORECAST}?key=${this.apiKey}&q=${encodeURIComponent(cityQuery)}&days=${days}&aqi=no&alerts=no`;
    
    const response = await this.fetchWithRateLimit(url, 'forecast');
    const data = await response.json();
    
    const forecast = this.transformForecast(data);
    cacheManager.set(cacheKey, forecast, 300000); // 5 minutes TTL
    
    return forecast;
  }

  /**
   * Search cities with autocomplete
   */
  async searchCities(query: string): Promise<CitySearchResult[]> {
    if (query.length < 3) {
      throw new Error(ERROR_MESSAGES.SEARCH_INVALID_QUERY);
    }

    const cacheKey = `search_${query}`;
    const cached = cacheManager.get<CitySearchResult[]>(cacheKey);
    
    if (cached) return cached;

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.SEARCH}?key=${this.apiKey}&q=${encodeURIComponent(query)}`;
    
    const response = await this.fetchWithRateLimit(url, 'search');
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(ERROR_MESSAGES.SEARCH_NO_RESULTS);
    }
    
    const results = data.map((item: WeatherAPISearchResult) => ({
      id: `${item.lat},${item.lon}`,
      name: item.name,
      region: item.region,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
    }));
    
    cacheManager.set(cacheKey, results, 300000); // 5 minutes TTL
    
    return results;
  }

  /**
   * Transform API response to CurrentWeather
   */
  private transformCurrentWeather(data: WeatherAPIResponse): CurrentWeather {
    const { location, current } = data;
    
    return {
      cityId: `${location.lat},${location.lon}`,
      cityName: location.name,
      temperature: current.temp_c,
      feelsLike: current.feelslike_c,
      condition: {
        code: mapConditionCode(current.condition.code),
        description: current.condition.text,
        icon: mapWeatherIcon(current.condition.code),
      },
      humidity: current.humidity,
      pressure: current.pressure_mb,
      windSpeed: current.wind_kph,
      windDirection: current.wind_degree,
      windGust: current.gust_kph,
      uvIndex: current.uv,
      dewPoint: calculateDewPoint(current.temp_c, current.humidity),
      visibility: current.vis_km,
      cloudCover: current.cloud,
      timestamp: new Date(current.last_updated),
    };
  }

  /**
   * Transform API response to ForecastData
   */
  private transformForecast(data: WeatherAPIResponse): ForecastData {
    const hourly: HourlyForecast[] = [];
    const daily: DailyForecast[] = [];

    data.forecast.forecastday.forEach((day: WeatherAPIForecastDay) => {
      // Transform daily forecast
      daily.push({
        date: new Date(day.date),
        temperature: {
          max: day.day.maxtemp_c,
          min: day.day.mintemp_c,
          morning: day.hour[6]?.temp_c || day.day.avgtemp_c,
          day: day.hour[12]?.temp_c || day.day.maxtemp_c,
          evening: day.hour[18]?.temp_c || day.day.avgtemp_c,
          night: day.hour[0]?.temp_c || day.day.mintemp_c,
        },
        condition: {
          code: mapConditionCode(day.day.condition.code),
          description: day.day.condition.text,
          icon: mapWeatherIcon(day.day.condition.code),
        },
        precipitationProbability: day.day.daily_chance_of_rain,
        precipitationAmount: day.day.totalprecip_mm,
        windSpeed: day.day.maxwind_kph,
        windDirection: 0,
        humidity: day.day.avghumidity,
        uvIndex: day.day.uv,
        sunrise: new Date(`${day.date} ${day.astro.sunrise}`),
        sunset: new Date(`${day.date} ${day.astro.sunset}`),
      });

      // Transform hourly forecast
      day.hour.forEach((hour: WeatherAPIHour) => {
        hourly.push({
          timestamp: new Date(hour.time),
          temperature: hour.temp_c,
          feelsLike: hour.feelslike_c,
          condition: {
            code: mapConditionCode(hour.condition.code),
            description: hour.condition.text,
            icon: mapWeatherIcon(hour.condition.code),
          },
          precipitationProbability: hour.chance_of_rain,
          precipitationAmount: hour.precip_mm,
          windSpeed: hour.wind_kph,
          windDirection: hour.wind_degree,
          humidity: hour.humidity,
          pressure: hour.pressure_mb,
        });
      });
    });

    return { daily, hourly };
  }
}

// WeatherAPI.com response types
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
    gust_kph: number;
    uv: number;
    vis_km: number;
    cloud: number;
    last_updated: string;
  };
  forecast: {
    forecastday: WeatherAPIForecastDay[];
  };
}

interface WeatherAPIForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      code: number;
      icon: string;
    };
    daily_chance_of_rain: number;
    totalprecip_mm: number;
    maxwind_kph: number;
    avghumidity: number;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: WeatherAPIHour[];
}

interface WeatherAPIHour {
  time: string;
  temp_c: number;
  feelslike_c: number;
  condition: {
    text: string;
    code: number;
    icon: string;
  };
  chance_of_rain: number;
  precip_mm: number;
  wind_kph: number;
  wind_degree: number;
  humidity: number;
  pressure_mb: number;
}

interface WeatherAPISearchResult {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

// Export singleton instance
export const weatherApi = new WeatherApiService();
