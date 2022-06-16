import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogs: {
    employee: false,
    stock: false,
    material: false,
    order: false,
    sevice: false,
    shedule: false,
    basket: false,
  },
  dialogsData: {},
  activeTabname: 'employee',
  selectedEmployee: {}
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
    sendData: (state, { payload }) => {
      return {
        ...state,
        dialogsData: payload
      }
    },
    changeTabname: (state, { payload }) => {
      return {
        ...state,
        activeTabname: payload
      }
    },
    selectEmployee: (state, { payload }) => {
      return {
        ...state,
        selectedEmployee: payload
      }
    },
  }
});

export const { openDialog, closeDialog, changeTabname, selectEmployee, sendData } = uiSlice.actions;

export default uiSlice.reducer;