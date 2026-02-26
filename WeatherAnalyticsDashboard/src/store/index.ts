import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import favoritesReducer from './slices/favoritesSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['weather/fetchWeatherData/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'payload.current.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['weather.cities'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
