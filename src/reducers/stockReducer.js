import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const stockSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    stockAllAdd: (state, { payload }) => {
      return [...payload];
    },
    stockItemAdd: (state, { payload }) => {
      return [...state, payload];
    },
  }
});

export const { stockAllAdd, stockItemAdd } = stockSlice.actions;

export default stockSlice.reducer;