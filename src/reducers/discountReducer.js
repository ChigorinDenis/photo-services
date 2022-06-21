import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    discountAdd: (state, { payload }) => {
      return [...payload];
    },
    discountOneAdd: (state, { payload }) => {
      return [...state, payload];
    },
  }
});

export const { discountAdd, discountOneAdd } = discountSlice.actions;

export default discountSlice.reducer;