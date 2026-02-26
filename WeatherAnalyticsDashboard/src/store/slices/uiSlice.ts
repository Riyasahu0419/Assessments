import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitySearchResult, Notification } from '../../types/weather.types';

interface UIState {
  isDetailedViewOpen: boolean;
  isSettingsPanelOpen: boolean;
  searchQuery: string;
  searchResults: CitySearchResult[];
  notifications: Notification[];
}

const initialState: UIState = {
  isDetailedViewOpen: false,
  isSettingsPanelOpen: false,
  searchQuery: '',
  searchResults: [],
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDetailedView: (state, action: PayloadAction<string>) => {
      state.isDetailedViewOpen = true;
    },
    closeDetailedView: (state) => {
      state.isDetailedViewOpen = false;
    },
    openSettingsPanel: (state) => {
      state.isSettingsPanelOpen = true;
    },
    closeSettingsPanel: (state) => {
      state.isSettingsPanelOpen = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<CitySearchResult[]>) => {
      state.searchResults = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

export const {
  openDetailedView,
  closeDetailedView,
  openSettingsPanel,
  closeSettingsPanel,
  setSearchQuery,
  setSearchResults,
  addNotification,
  removeNotification,
} = uiSlice.actions;
export default uiSlice.reducer;
