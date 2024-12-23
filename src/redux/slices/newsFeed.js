import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleItemInArray } from "@/core/utils/helper";
import { fetchNewsData } from "../thunks/fetchNewsData";



// Initial state
const initialState = {
  keyword: "",
  preferences: { // Stores user selected preference
    categories: [],
    sources: [],
    authors: []
  },
  articles: { // News articles from api - Discover feed
    items: [],
    status: "idle",
  },
  sources: { // All sources from api
    items: [],
    status: "idle",
  },
  filters: { // Search results page filters
    categories: [],
    sources: [],
    from: "",
    to: "",
  },
  headlines: { // Top headlines from api
    items: [],
    status: "idle",
  },
  status: "idle",
  error: null,
};

// Slice
const newsFeedSlice = createSlice({
  name: "News Feed",
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      state.preferences = action.payload;
    },
    resetPreferences: (state, action) => {
      const { type } = action.payload;
      state.preferences[type] = [];
    },
    setFilters: (state, action) => {
      state.filters = {...action.payload};
    },
    resetFilters: (state, action) => {
      const { type } = action.payload;
      
      state.filters[type] = [];
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    resetAllPreferences: (state) => {
      state.preferences = { categories: [], sources: [] , authors : []};
    },
    resetAllFilters: (state) => {
      state.filters = { categories: [], sources: [],  from: "", to: "" };
    },
    resetDateRange: (state) => {
      state.filters.from = "";
      state.filters.to = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state, action) => {
        const { type } = action.meta.arg;
        state[type].status = "loading";
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        const { type } = action.meta.arg;
        state[type].status = "succeeded";
        state[type].items = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        const { type } = action.meta.arg;
        state[type].status = "failed";
        state[type].error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {
  setPreferences,
  resetPreferences,
  setFilters,
  resetFilters,
  setKeyword,
  resetAllPreferences,
  resetAllFilters,
  setDateRange,
  resetDateRange,
} = newsFeedSlice.actions;

export default newsFeedSlice.reducer;
