import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const sheduleReducer = createSlice({
  name: 'shedules',
  initialState,
  reducers: {
    sheduleAdd: (state, { payload }) => {
      return { ...state, ...payload };
    },
  }
});

export const { sheduleAdd } = sheduleReducer.actions;

export default sheduleReducer.reducer;