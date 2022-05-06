/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import AuthService from '../services/authService';
import { SignUpResponse, SignInResponse } from '../types/response';
import { NewUser, User } from '../types/user';
import { RootState } from './store';
import { initialState } from '../app/constants/authorization';
import { AuthState } from '../types/authTypes';

export const registration = createAsyncThunk<AxiosResponse<SignUpResponse>, NewUser, {
  state: RootState,
} >(
  'auth/registration',
  async (user: NewUser) => {
    const response = AuthService.signup(user);
    return (await response) as AxiosResponse<SignUpResponse>;
  },
);

export const login = createAsyncThunk<AxiosResponse<SignInResponse>, User, {
  state: RootState,
} >(
  'auth/login',
  async (user: User) => {
    const response = AuthService.signin(user);
    return (await response) as AxiosResponse<SignInResponse>;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.newUser = action.payload.data;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isAuth = true;
    });
  },

});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
