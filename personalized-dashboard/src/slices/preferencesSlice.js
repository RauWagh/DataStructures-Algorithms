import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const initialState = loadFromStorage('preferences', {
  categories: ['technology', 'sports', 'finance'],
  darkMode: false,
  searchQuery: '',
});

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
      saveToStorage('preferences', state);
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      saveToStorage('preferences', state);
    },
    setDarkMode(state, action) {
      state.darkMode = action.payload;
      saveToStorage('preferences', state);
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      saveToStorage('preferences', state);
    },
  },
});

export const { setCategories, toggleDarkMode, setDarkMode, setSearchQuery } = preferencesSlice.actions;
export default preferencesSlice.reducer;
