import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuth: false,
};

// function checkUser(users, email, password) {
//   const user = users.find((item) => item.email === email);
//   if (!user) return false;
//   if (user.password === password) {
//     return true;
//   }
//   return false;
// }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn : (state, { payload }) => {
      return {
        user: payload,
        isAuth: true
      }
    },
    logOut : (state, { payload }) => {
      return {
        user: {},
        isAuth: false,
      }  
    },
  }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;