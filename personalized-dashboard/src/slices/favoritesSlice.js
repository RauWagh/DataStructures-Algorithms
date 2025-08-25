import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const initialState = loadFromStorage('favorites', {
  items: [],
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const exists = state.items.find((i) => i.id === action.payload.id && i.type === action.payload.type);
      if (!exists) {
        state.items.push(action.payload);
        saveToStorage('favorites', state);
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((i) => !(i.id === action.payload.id && i.type === action.payload.type));
      saveToStorage('favorites', state);
    },
    reorderFavorites(state, action) {
      state.items = action.payload;
      saveToStorage('favorites', state);
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
