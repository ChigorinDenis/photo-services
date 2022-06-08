import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    serviceAllAdd: (state, { payload }) => {
      return [...payload];
    },
    serviceItemAdd: (state, { payload }) => {
      return [...state, payload];
    },
  }
});

export const { serviceAllAdd, serviceItemAdd } = serviceSlice.actions;

export default serviceSlice.reducer;