import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    employeesAdd: (state, { payload }) => {
      return [...payload];
    },
    employeeAdd: (state, { payload }) => {
      return [...state, payload];
    },
  }
});

export const { employeesAdd, employeeAdd } = employeeSlice.actions;

export default employeeSlice.reducer;