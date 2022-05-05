/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IsAuth } from '../types/authTypes';

export type AuthState = {
  isAuth: IsAuth;
};

const initialState: AuthState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
