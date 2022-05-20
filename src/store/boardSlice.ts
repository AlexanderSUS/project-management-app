import {
  createAsyncThunk, createSlice, PayloadAction, AsyncThunk, isAsyncThunkAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardService from '../api/boardServise';
import { Boards, BoardState } from '../types/boards';
import { ErrorResponseData, ValidationErrors } from '../types/response';
import type { RootState } from './store';
import initialState from '../constants/boards';
import type { ModalInputData } from '../types/modal';

type GenericAsyncThunk = AsyncThunk<Boards, void | ModalInputData,
{ state: RootState, rejectWithvalue: ValidationErrors }>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export const getBoards = createAsyncThunk<Boards, void, {
  state: RootState,
  rejectWithValue: ValidationErrors } >(
  'board/getBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BoardService.fetchBoards();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

export const addBoard = createAsyncThunk<Boards, ModalInputData, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'board/addBoard',
  async (data: ModalInputData, { rejectWithValue }) => {
    try {
      await BoardService.createBoard({ title: data.title });
      const response = await BoardService.fetchBoards();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

export const removeBoard = createAsyncThunk<Boards, void, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'board/removeBoard',
  async (_, { getState, rejectWithValue }) => {
    try {
      await BoardService.deleteBoard(getState().boardStore.currentBoardId);
      const response = await BoardService.fetchBoards();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

export const editBoard = createAsyncThunk<Boards, ModalInputData, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'board/editBoard',
  async (data: ModalInputData, { getState, rejectWithValue }) => {
    try {
      await BoardService.editBoard({ id: getState().boardStore.currentBoardId, title: data.title });
      const response = await BoardService.fetchBoards();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

const isARequestedAction = isAsyncThunkAction(getBoards, addBoard, editBoard, removeBoard);

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoardId: (state, { payload }: PayloadAction<string>) => {
      state.currentBoardId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PendingAction => action.type.endsWith('/pending'),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.pending = true;
          state.error = '';
        }
      },
    );
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith('/rejected'),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.pending = false;
          if (action.payload) {
            const error = action.payload as ErrorResponseData;
            state.error = error.message;
            return;
          }
          state.error = 'Server error';
        }
      },
    );
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith('/fulfilled'),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.pending = false;
          state.boards = action.payload;
        }
      },
    );
  },
});

export const { setCurrentBoardId } = boardSlice.actions;

export default boardSlice.reducer;

export const boardSelector = (state: { boardStore: BoardState }) => state.boardStore;
