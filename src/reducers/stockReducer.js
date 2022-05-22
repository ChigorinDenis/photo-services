import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const stockSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    stockAdd: (state, { payload }) => {
      return [...payload];
    },
  }
});

export const { stockAdd } = stockSlice.actions;

export default stockSlice.reducer;