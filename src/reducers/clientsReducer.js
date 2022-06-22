import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const clientSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clientsAdd: (state, { payload }) => {
      return [...payload];
    },
  }
});

export const { clientsAdd } = clientSlice.actions;

export default clientSlice.reducer;