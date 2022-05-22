import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employeeReducer.js';
import authReducer from './reducers/authReducer.js';
import uiReducer from './reducers/uiReducer.js';
import stockReducer from './reducers/stockReducer.js';


const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    employee: employeeReducer,
    stock: stockReducer
  },
});

export default store;