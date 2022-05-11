import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import AuthService from '../services/authService';
import {
  SignUpResponse, SignInResponse, ValidationErrors, ErrorResponseData,
} from '../types/response';
import { NewUser, User } from '../types/user';
import type { RootState } from './store';
import { initialState, TOKEN } from '../constants/authorization';
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
    removeNewUserData: (state) => {
      state.newUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.newUser = action.payload;
      state.loading = false;
    });
    builder.addCase(registration.rejected, (state, { payload }) => {
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error.message = data.message;
        state.loading = false;
      }
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem(TOKEN, action.payload.token);
      const credentials = jwt_decode<JwtData>(action.payload.token);
      state.login = credentials.login;
      state.userId = credentials.userId;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error.message = data.message;
        state.loading = false;
      }
    });
  },

});

export const {
  logOut, authorize, clearAuthError, removeNewUserData,
} = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
