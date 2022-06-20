import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    discountAdd: (state, { payload }) => {
      return [...payload];
    },
  }
});

export const { discountAdd } = discountSlice.actions;

export default discountSlice.reducer;