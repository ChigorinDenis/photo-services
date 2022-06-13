import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './reducers/employeeReducer.js';
import authReducer from './reducers/authReducer.js';
import uiReducer from './reducers/uiReducer.js';
import stockReducer from './reducers/stockReducer.js';
import serviceReducer from './reducers/serviceReducer.js';
import sheduleReducer from './reducers/sheduleReducer.js';
import basketReducer from './reducers/basketReducer.js';
import ordersReducer from './reducers/ordersReducer.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    employee: employeeReducer,
    stock: stockReducer,
    service: serviceReducer,
    shedule: sheduleReducer,
    basket: basketReducer,
    order: ordersReducer,
  },
});

export default store;