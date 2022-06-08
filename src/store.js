import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employeeReducer.js';
import authReducer from './reducers/authReducer.js';
import uiReducer from './reducers/uiReducer.js';
import stockReducer from './reducers/stockReducer.js';
import serviceReducer from './reducers/serviceReducer.js';


const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    employee: employeeReducer,
    stock: stockReducer,
    service: serviceReducer
  },
});

export default store;