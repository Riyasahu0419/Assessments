import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storageService } from '../../services/storageService';

interface FavoritesState {
  cityIds: string[];
  order: string[];
}

const initialState: FavoritesState = {
  cityIds: [],
  order: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      const cityId = action.payload;
      if (!state.cityIds.includes(cityId)) {
        state.cityIds.push(cityId);
        state.order.push(cityId);
        storageService.saveFavorites(state.cityIds);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const cityId = action.payload;
      state.cityIds = state.cityIds.filter((id) => id !== cityId);
      state.order = state.order.filter((id) => id !== cityId);
      storageService.saveFavorites(state.cityIds);
    },
    reorderFavorites: (state, action: PayloadAction<string[]>) => {
      state.order = action.payload;
      storageService.saveFavorites(state.cityIds);
    },
    loadFavorites: (state, action: PayloadAction<string[]>) => {
      state.cityIds = action.payload;
      state.order = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites, loadFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
