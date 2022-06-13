import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const orderSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    ordersAdd: (state, { payload }) => {
      return [...payload];
    },
  }
});

export const { ordersAdd } = orderSlice.actions;

export default orderSlice.reducer;