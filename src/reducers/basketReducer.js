import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    basketItemAdd: (state, { payload }) => {
      const finded = state.find((f) => f.id === payload.id);
      if (finded) {
        finded.number += 1;
        return;
      }
      return [...state, payload];
    },
    basketItemRemove: (state, { payload }) => {
      const filtered = state.filter((f) => f.id !== payload.id);
      return [...filtered];
    },
    basketItemIncrease: (state, { payload }) => {
      const item = state.find((item) => item.id === payload.id);
      item.number += 1;
    },
    basketItemDecrease: (state, { payload }) => {
      const item = state.find((item) => item.id === payload.id);
      item.number -= 1;
    },
  }
});

export const { basketItemAdd, basketItemIncrease, basketItemDecrease, basketItemRemove } = basketSlice.actions;

export default basketSlice.reducer;