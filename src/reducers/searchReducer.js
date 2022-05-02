import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchResult: (state, { payload }) => {
      return payload;
    },
    clearSearchResult: (state) => {
      return [];
    },
  }
});

export const { addSearchResult, clearSearchResult } = searchSlice.actions;

export default searchSlice.reducer;