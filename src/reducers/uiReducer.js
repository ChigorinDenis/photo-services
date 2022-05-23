import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogs: {
    employee: false,
    stock: false
  },
  activeTabname: 'employee',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDialog: (state, { payload }) => {
      const { dialogs } = state;
      return {
        ...state,
        dialogs: {
          ...dialogs,
          [payload]: true
        }
      }
    },
    closeDialog: (state, { payload }) => {
      const { dialogs } = state;
      return {
        ...state,
        dialogs: {
          ...dialogs,
          [payload]: false
        }
      }
    },
    changeTabname: (state, { payload }) => {
      return {
        ...state,
        activeTabname: payload
      }
    },
  }
});

export const { openDialog, closeDialog, changeTabname } = uiSlice.actions;

export default uiSlice.reducer;