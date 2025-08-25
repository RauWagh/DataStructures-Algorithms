import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from '../slices/preferencesSlice';
import favoritesReducer from '../slices/favoritesSlice';
import feedReducer from '../slices/feedSlice';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    favorites: favoritesReducer,
    feed: feedReducer,
  },
});

export default store;
