import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '3b70b3999e674b128618195f287b5406';
const API_URL = 'https://newsapi.org/v2/top-headlines?country=in';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ category = 'general', page = 1 }, thunkAPI) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          category,
          page,
          apiKey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    currentCategory: 'general',
  },
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalPages = Math.ceil(action.payload.totalResults / 20);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || action.error.message;
      });
  },
});

export const { setCategory, setPage } = articlesSlice.actions;
export default articlesSlice.reducer;
