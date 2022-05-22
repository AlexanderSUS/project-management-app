import {
  createAsyncThunk, createSlice, AsyncThunk,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import AuthService from '../api/authService';
import {
  SignUpResponse, SignInResponse, ValidationErrors, ErrorResponseData, RemoveUserResponse,
} from '../types/response';
import { initialState, TOKEN } from '../constants/authorization';
import { AuthState, JwtData, SignUpFormInput } from '../types/authTypes';
import UserService from '../api/userServise';
import { TypedThunkAPI } from '../types/slice';
import { REJECTED } from '../constants/asyncThunk';
import type { FormData } from '../types/formTypes';
import { NewUser, User, UserData } from '../types/user';

type GenericAsyncThunk = AsyncThunk<
SignInResponse | SignUpResponse | UserData | RemoveUserResponse,
string | User | FormData | void | NewUser,
TypedThunkAPI>;

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

export const getUserData = createAsyncThunk<UserData, string, TypedThunkAPI>(
  'auth/getUserData',
  async (jwt: string, { rejectWithValue }) => {
    const { userId } = jwt_decode<JwtData>(jwt);

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

export const editName = createAsyncThunk<UserData, FormData, TypedThunkAPI>(
  'auth/editName',
  async (data: FormData, { getState, rejectWithValue }) => {
    const { userId, login } = getState().authStore;
    const { name, password } = data;
    const userData: SignUpFormInput = { login, name, password };

    try {
      const response = await UserService.updateUserData(userId, userData);
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

export const editLogin = createAsyncThunk<UserData, FormData, TypedThunkAPI>(
  'auth/editLogin',
  async (data: FormData, { getState, rejectWithValue }) => {
    const { userId, userName } = getState().authStore;
    const { login, password } = data;
    const userData: SignUpFormInput = { login, name: userName, password };

    try {
      const response = await UserService.updateUserData(userId, userData);
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

export const removeUser = createAsyncThunk<RemoveUserResponse, void, TypedThunkAPI>(
  'auth/removeUser',
  async (_, { getState, rejectWithValue }) => {
    const { userId } = getState().authStore;

    try {
      const response = await UserService.removeUser(userId);
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

// const isARequestedAction = isAsyncThunkAction(
//   registration,
//   logIn,
//   getUserData,
//   editName,
//   editLogin,
//   removeUser,
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.login = '';
      state.userId = '';
      state.userName = '';
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
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      localStorage.setItem(TOKEN, action.payload.token);
      const credentials = jwt_decode<JwtData>(action.payload.token);
      state.login = credentials.login;
      state.userId = credentials.userId;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userName = action.payload.name;
      state.login = action.payload.login;
      state.userId = action.payload.id;
    });
    // TOD Inmplement message from response
    builder.addCase(removeUser.fulfilled, (state) => {
      state.userId = '';
      state.login = '';
      state.userName = '';
    });
    builder.addCase(editLogin.fulfilled, (state, action) => {
      state.login = action.payload.login;
    });
    builder.addCase(editName.fulfilled, (state, action) => {
      state.userName = action.payload.name;
    });
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith(REJECTED),
      (state, action) => {
        state.isLoading = false;
        if ((action.payload)) {
          const error = action.payload as ErrorResponseData;
          if (error.statusCode === 401) {
            state.userId = '';
            state.login = '';
            state.userName = '';
          }
        }
      },
    );
  },
});

export const {
  logOut, clearAuthError, removeNewUserData,
} = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
