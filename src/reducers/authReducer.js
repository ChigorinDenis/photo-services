import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 1,
      fullname: 'testname',
      email: 'test@mail.com',
      password: 'test'
    }
  ],
  isAuth: false,
};

function checkUser(users, email, password) {
  const user = users.find((item) => item.email === email);
  if (!user) return false;
  if (user.password === password) {
    return true;
  }
  return false;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn : (state, { payload }) => {
      const { email, password } = payload;
      if (checkUser(state.users, email, password)) {
        return {
          ...state,
          isAuth: true
        }
      }
      return state;  
    },
    logOut : (state, { payload }) => {
      return {
        ...state,
        isAuth: false,
      }  
    },
  }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;