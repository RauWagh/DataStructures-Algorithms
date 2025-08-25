import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async ({ categories, page = 1, query = '' }, { rejectWithValue }) => {
    try {
      let newsItems = [];
      let tmdbItems = [];
      const useMock = !NEWS_API_KEY || !TMDB_API_KEY;

      if (!useMock) {
        const newsUrl = `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(
          categories[0] || 'technology'
        )}&page=${page}&pageSize=10&apiKey=${NEWS_API_KEY}`;

        const tmdbUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}&api_key=${TMDB_API_KEY}`;

        const [newsRes, tmdbRes] = await Promise.all([
          axios.get(newsUrl),
          axios.get(tmdbUrl),
        ]);

        newsItems = (newsRes.data.articles || []).map((a, idx) => ({
          id: `${a.url}-${idx}`,
          type: 'news',
          title: a.title,
          description: a.description,
          image: a.urlToImage,
          url: a.url,
        }));

        tmdbItems = (tmdbRes.data.results || []).map((m) => ({
          id: `movie-${m.id}`,
          type: 'movie',
          title: m.title,
          description: m.overview,
          image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
          url: `https://www.themoviedb.org/movie/${m.id}`,
        }));
      } else {
        // Mock data when API keys are not provided
        newsItems = Array.from({ length: 8 }).map((_, i) => ({
          id: `mock-news-${page}-${i}`,
          type: 'news',
          title: `Mock ${categories[0] || 'technology'} News ${i + 1}`,
          description: 'Demo news description.',
          image: null,
          url: '#',
        }));
        tmdbItems = Array.from({ length: 8 }).map((_, i) => ({
          id: `mock-movie-${page}-${i}`,
          type: 'movie',
          title: `Mock Movie ${i + 1}`,
          description: 'Demo movie overview.',
          image: null,
          url: '#',
        }));
      }

      // Mock social items
      const socialItems = Array.from({ length: 5 }).map((_, i) => ({
        id: `social-${page}-${i}`,
        type: 'social',
        title: `#${categories[0] || 'tech'} post ${i + 1}`,
        description: 'Mock social media post content for demo.',
        image: null,
        url: '#',
      }));

      let items = [...newsItems, ...tmdbItems, ...socialItems];
      if (query) {
        const q = query.toLowerCase();
        items = items.filter((it) => (it.title || '').toLowerCase().includes(q) || (it.description || '').toLowerCase().includes(q));
      }
      return { page, items };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to load feed' });
    }
  }
);

const initialState = {
  items: [],
  page: 1,
  hasMore: true,
  status: 'idle',
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetFeed(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
    },
    reorderItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { page, items } = action.payload;
        if (page === 1) {
          state.items = items;
        } else {
          state.items = [...state.items, ...items];
        }
        state.page = page;
        state.hasMore = items.length > 0;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Error';
      });
  },
});

export const { resetFeed, reorderItems } = feedSlice.actions;
export default feedSlice.reducer;
