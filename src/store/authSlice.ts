/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import AuthService from '../services/authService';
import {
  SignUpResponse, SignInResponse, ValidationErrors, ErrorResponseData,
} from '../types/response';
import { NewUser, User } from '../types/user';
import { RootState } from './store';
import { initialState } from '../app/constants/authorization';
import { AuthState, JwtData } from '../types/authTypes';

export const registration = createAsyncThunk<SignUpResponse, NewUser, {
  state: RootState, rejectWithValue: ValidationErrors
} >(
  'auth/registration',
  async (user: NewUser, { rejectWithValue }) => {
    try {
      const response = await AuthService.signup<SignUpResponse>(user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  },

);

export const login = createAsyncThunk<SignInResponse, User, {
  state: RootState, rejectWithValue: ValidationErrors
} >(
  'auth/login',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await AuthService.signin<SignInResponse>(user);
      return response.data;
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
    builder.addCase(registration.fulfilled, (state, action) => {
      state.newUser = action.payload;
    });
    builder.addCase(registration.rejected, (state, { payload }) => {
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error.message = data.message;
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const credentials = jwt_decode<JwtData>(action.payload.token);
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
