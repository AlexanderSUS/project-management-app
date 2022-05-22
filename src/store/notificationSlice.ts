import {
  AsyncThunk, createSlice, isAsyncThunkAction,
} from '@reduxjs/toolkit';
import initialState from '../constants/notification';
import { FormData } from '../types/formTypes';
import { NotificationState } from '../types/notification';
import {
  RemoveUserResponse, SignInResponse, SignUpResponse, ErrorResponseData,
} from '../types/response';
import { TypedThunkAPI } from '../types/slice';
import { NewUser, User, UserData } from '../types/user';
import ThunkError, { FULFILED, PENDING, REJECTED } from '../constants/asyncThunk';
import { addColumn, editColumn } from './columnSlice';
import { addTask, editTask, removeTask } from './taskSlice';
import { addBoard, editBoard, removeBoard } from './boardSlice';
import { Boards } from '../types/boards';
import { logIn, registration, removeUser } from './authSlice';

type GenericAsyncThunk = AsyncThunk<
SignInResponse | SignUpResponse | UserData | RemoveUserResponse | Boards,
string | User | FormData | void | NewUser,
TypedThunkAPI>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const isAddAction = isAsyncThunkAction(addBoard, addColumn, addTask);
const isEditAction = isAsyncThunkAction(editBoard, editColumn, editTask);
const isDeleteAction = isAsyncThunkAction(removeBoard, removeUser, removeTask);
const isRegistrationAction = isAsyncThunkAction(registration);
const isLogInAction = isAsyncThunkAction(logIn);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    clearInfo: (state) => {
      state.info = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PendingAction => action.type.endsWith(PENDING),
      (state) => {
        state.isLoading = true;
        state.error = '';
        state.info = '';
      },
    );
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith(FULFILED),
      (state, action) => {
        state.isLoading = false;
        if (isAddAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
        if (isEditAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
        if (isDeleteAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
        if (isRegistrationAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
        if (isLogInAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
      },
    );
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith(REJECTED),
      (state, action) => {
        state.isLoading = false;
        if ((action.payload)) {
          const error = action.payload as ErrorResponseData;

          if (error.statusCode === 401) {
            state.error = ThunkError.notAuthorized;
            return;
          }
          state.error = error.message || ThunkError.unknownError;
        }
      },
    );
  },
});

export const { clearInfo, clearError } = notificationSlice.actions;

export default notificationSlice.reducer;

export const notificationSelector = (
  state: { notificationStore: NotificationState },
) => state.notificationStore;
