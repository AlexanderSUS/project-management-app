import {
  createAsyncThunk, createSlice, PayloadAction, AsyncThunk, isAsyncThunkAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import AuthService from '../api/authService';
import {
  SignUpResponse, SignInResponse, ValidationErrors, ErrorResponseData,
} from '../types/response';
import { NewUser, User, UserDataParams } from '../types/user';
import { initialState, TOKEN } from '../constants/authorization';
import { AuthState, JwtData } from '../types/authTypes';
import UserService from '../api/userServise';
import { TypedThunkAPI } from '../types/slice';
import ThunkError, { PENDING, REJECTED } from '../constants/asyncThunk';

type GenericAsyncThunk = AsyncThunk<SignInResponse | SignUpResponse, UserDataParams | string | User,
TypedThunkAPI>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

export const registration = createAsyncThunk<SignUpResponse, NewUser, TypedThunkAPI >(
  'auth/registration',
  async (user: NewUser, { rejectWithValue }) => {
    try {
      const response = await AuthService.signup(user);
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

export const logIn = createAsyncThunk<SignInResponse, User, TypedThunkAPI >(
  'auth/login',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await AuthService.signin(user);
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

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserData(userId);
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

export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async (userDataParams: UserDataParams, { rejectWithValue }) => {
    try {
      const { id, userData } = userDataParams;
      const response = await UserService.updateUserData(id, userData);
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

const isARequestedAction = isAsyncThunkAction(registration, logIn, getUserData, editProfile);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.login = '';
      state.userId = '';
    },
    authorize: (state, { payload }: PayloadAction<string>) => {
      const credentials = jwt_decode<JwtData>(payload);
      state.login = credentials.login;
      state.userId = credentials.userId;
    },
    clearAuthError: (state) => {
      state.error = '';
    },
    removeNewUserData: (state) => {
      state.newUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.newUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      localStorage.setItem(TOKEN, action.payload.token);
      const credentials = jwt_decode<JwtData>(action.payload.token);
      state.login = credentials.login;
      state.userId = credentials.userId;
      state.isLoading = false;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    });
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith(REJECTED),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.isLoading = false;
          if ((action.payload)) {
            const error = action.payload as ErrorResponseData;
            state.error = error.message;
            return;
          }
          state.error = action.error.message || ThunkError.unknownError;
        }
      },
    );
    builder.addMatcher(
      (action): action is PendingAction => action.type.endsWith(PENDING),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.isLoading = true;
        }
      },
    );
  },
});

export const {
  logOut, authorize, clearAuthError, removeNewUserData,
} = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
