import { configureStore } from '@reduxjs/toolkit';
// import taskReducer from './reducers/taskReducer.js';
import authReducer from './reducers/authReducer.js';
// import searchReducer from './reducers/searchReducer.js'

const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export default store;