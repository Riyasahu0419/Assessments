import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CurrentWeather, ForecastData, CityWeatherData } from '../../types/weather.types';
import { weatherApi } from '../../services/weatherApi';

interface WeatherState {
  cities: Record<string, CityWeatherData>;
  selectedCity: string | null;
}

const initialState: WeatherState = {
  cities: {},
  selectedCity: null,
};

// Async thunks
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (cityQuery: string) => {
    const current = await weatherApi.getCurrentWeather(cityQuery);
    return { cityId: current.cityId, current };
  }
);

export const fetchForecastData = createAsyncThunk(
  'weather/fetchForecastData',
  async (cityQuery: string) => {
    const forecast = await weatherApi.getForecast(cityQuery, 7);
    const current = await weatherApi.getCurrentWeather(cityQuery);
    return { cityId: current.cityId, forecast };
  }
);

export const fetchCompleteWeatherData = createAsyncThunk(
  'weather/fetchCompleteWeatherData',
  async (cityQuery: string) => {
    const [current, forecast] = await Promise.all([
      weatherApi.getCurrentWeather(cityQuery),
      weatherApi.getForecast(cityQuery, 7),
    ]);
    
    return {
      cityId: current.cityId,
      current,
      forecast,
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    clearCityData: (state, action: PayloadAction<string>) => {
      delete state.cities[action.payload];
    },
    updateWeatherData: (
      state,
      action: PayloadAction<{ cityId: string; data: CurrentWeather }>
    ) => {
      const { cityId, data } = action.payload;
      if (state.cities[cityId]) {
        state.cities[cityId].current = data;
        state.cities[cityId].lastUpdated = Date.now();
      }
    },
  },
  extraReducers: (builder) => {
    // fetchWeatherData
    builder.addCase(fetchWeatherData.pending, (state, action) => {
      const cityId = action.meta.arg;
      if (!state.cities[cityId]) {
        state.cities[cityId] = {
          current: null,
          hourly: [],
          daily: [],
          lastUpdated: 0,
          loading: true,
          error: null,
        };
      } else {
        state.cities[cityId].loading = true;
        state.cities[cityId].error = null;
      }
    });
    
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      const { cityId, current } = action.payload;
      state.cities[cityId] = {
        ...state.cities[cityId],
        current,
        lastUpdated: Date.now(),
        loading: false,
        error: null,
      };
    });
    
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      const cityId = action.meta.arg;
      if (state.cities[cityId]) {
        state.cities[cityId].loading = false;
        state.cities[cityId].error = action.error.message || 'Failed to fetch weather data';
      }
    });

    // fetchForecastData
    builder.addCase(fetchForecastData.fulfilled, (state, action) => {
      const { cityId, forecast } = action.payload;
      if (state.cities[cityId]) {
        state.cities[cityId].hourly = forecast.hourly;
        state.cities[cityId].daily = forecast.daily;
        state.cities[cityId].lastUpdated = Date.now();
      }
    });

    // fetchCompleteWeatherData
    builder.addCase(fetchCompleteWeatherData.pending, (state, action) => {
      const cityQuery = action.meta.arg;
      // We don't know cityId yet, so we'll handle it in fulfilled
    });
    
    builder.addCase(fetchCompleteWeatherData.fulfilled, (state, action) => {
      const { cityId, current, forecast } = action.payload;
      state.cities[cityId] = {
        current,
        hourly: forecast.hourly,
        daily: forecast.daily,
        lastUpdated: Date.now(),
        loading: false,
        error: null,
      };
    });
    
    builder.addCase(fetchCompleteWeatherData.rejected, (state, action) => {
      // Handle error - we don't have cityId, so log it
      console.error('Failed to fetch complete weather data:', action.error);
    });
  },
});

export const { selectCity, clearCityData, updateWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
