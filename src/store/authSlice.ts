/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import AuthService from '../services/authService';
import {
  SignUpResponse, SignInResponse, ValidationErrors, ErrorResponseData,
} from '../types/response';
import { NewUser, User } from '../types/user';
import { RootState } from './store';
import { initialState, TOKEN } from '../app/constants/authorization';
import { AuthState, JwtData } from '../types/authTypes';

export const registration = createAsyncThunk<AxiosResponse<SignUpResponse>, NewUser, {
  state: RootState, rejectWithValue: ValidationErrors
} >(
  'auth/registration',
  async (user: NewUser, { rejectWithValue }) => {
    try {
      const response = await AuthService.signup(user);
      return response as AxiosResponse<SignUpResponse>;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  },

);

export const login = createAsyncThunk<AxiosResponse<SignInResponse>, User, {
  state: RootState, rejectWithValue: ValidationErrors
} >(
  'auth/login',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = AuthService.signin(user);
      return (await response) as AxiosResponse<SignInResponse>;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.login = null;
      state.userId = null;
    },
    authorize: (state, { payload }: PayloadAction<string>) => {
      const credentials = jwt_decode<JwtData>(payload);
      state.login = credentials.login;
      state.userId = credentials.userId;
    },
    clearAuthError: (state) => {
      state.error.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, { payload }) => {
      state.newUser = payload.data;
    });
    builder.addCase(registration.rejected, (state, { payload }) => {
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error.message = data.message;
      }
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      localStorage.setItem(TOKEN, payload.data.token);
      const credentials = jwt_decode<JwtData>(payload.data.token);
      state.login = credentials.login;
      state.userId = credentials.userId;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error.message = data.message;
      }
    });
  },

});

export const { logOut, authorize, clearAuthError } = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
