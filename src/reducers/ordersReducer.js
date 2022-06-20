import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const orderSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    ordersAdd: (state, { payload }) => {
      return [...payload];
    },
    statusUpdate: (state, { payload }) => {
      const { id, status, completeDate, issueDate } = payload;
      const finded = state.find((item) => item.id === id);
      finded.status = status;
      finded.completeDate = completeDate;
      finded.issueDate = issueDate;
    },
  }
});

export const { ordersAdd, statusUpdate } = orderSlice.actions;

export default orderSlice.reducer;