import { createSlice } from "@reduxjs/toolkit";
import { fetchNewsData } from "../thunks/fetchNewsData";

// Utility function to toggle items in an array
const toggleItemInArray = (array, item) =>
  array.includes(item)
    ? array.filter((current) => current !== item)
    : [...array, item];

// Initial state
const initialState = {
  keyword: "",
  articles: {
    items: [],
    status: "idle",
  },
  sources: {
    items: [],
    status: "idle",
  },
  filters: {
    categories: [],
    sources: [],
    author: [],
    from: "",
    to: "",
  },
};

// Slice
const newsFeedSlice = createSlice({
  name: "News Feed",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const { type, value } = action.payload;
      state.filters[type] = toggleItemInArray(state.filters[type], value);
    },
    resetFilters: (state, action) => {
      const { type } = action.payload;
      state.filters[type] = [];
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    resetAllFilters: (state) => {
      state.filters = {
        categories: [],
        sources: [],
        author: [],
        from: "",
        to: "",
      };
    },
    setDateRange: (state, action) => {
      const { from, to } = action.payload;
      state.filters.from = from || "";
      state.filters.to = to || "";
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
  setFilters,
  resetFilters,
  setKeyword,
  resetAllFilters,
  setDateRange,
  resetDateRange,
} = newsFeedSlice.actions;

export default newsFeedSlice.reducer;
