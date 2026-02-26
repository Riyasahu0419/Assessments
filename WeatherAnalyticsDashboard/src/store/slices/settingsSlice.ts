import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemperatureUnit, Theme, AppSettings } from '../../types/weather.types';
import { storageService } from '../../services/storageService';
import { APP_CONFIG } from '../../constants/appConfig';

interface SettingsState {
  temperatureUnit: TemperatureUnit;
  refreshInterval: number;
  theme: Theme;
}

const initialState: SettingsState = {
  temperatureUnit: 'celsius',
  refreshInterval: APP_CONFIG.REFRESH.INTERVAL,
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
      storageService.saveSettings({
        temperatureUnit: state.temperatureUnit,
        refreshInterval: state.refreshInterval,
        theme: state.theme,
      });
    },
    setRefreshInterval: (state, action: PayloadAction<number>) => {
      state.refreshInterval = action.payload;
      storageService.saveSettings({
        temperatureUnit: state.temperatureUnit,
        refreshInterval: state.refreshInterval,
        theme: state.theme,
      });
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      storageService.saveSettings({
        temperatureUnit: state.temperatureUnit,
        refreshInterval: state.refreshInterval,
        theme: state.theme,
      });
    },
    loadSettings: (state, action: PayloadAction<AppSettings>) => {
      state.temperatureUnit = action.payload.temperatureUnit;
      state.refreshInterval = action.payload.refreshInterval;
      state.theme = action.payload.theme || 'light';
    },
  },
});

export const { setTemperatureUnit, setRefreshInterval, setTheme, loadSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
