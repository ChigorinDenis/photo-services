import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      return [...state, payload];
    },
    updateTasks: (state, { payload }) => {
      return payload;
    },
  }
});

export const { addTask, updateTasks } = taskSlice.actions;

export default taskSlice.reducer;