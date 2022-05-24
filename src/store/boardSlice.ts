import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import BoardService from '../api/boardServise';
import { Boards, BoardState, BoardType } from '../types/boards';
import { ValidationErrors } from '../types/response';
import initialState, { DEFAULT_BOARD } from '../constants/boards';
import type { FormData } from '../types/formTypes';
import { TypedThunkAPI } from '../types/slice';

export const getBoards = createAsyncThunk<Boards, void, TypedThunkAPI >(
  'board/getBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BoardService.fetchBoards();
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

export const getBoard = createAsyncThunk<BoardType, void, TypedThunkAPI>(
  'board/getBoard',
  async (_, { getState, rejectWithValue }) => {
    const { currentBoardId } = getState().boardStore;

    try {
      const response = await BoardService.getBoard(currentBoardId);
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

export const addBoard = createAsyncThunk<BoardType, FormData, TypedThunkAPI>(
  'board/addBoard',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await BoardService.createBoard(data);
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

export const removeBoard = createAsyncThunk<AxiosResponse, void, TypedThunkAPI>(
  'board/removeBoard',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await BoardService.deleteBoard(getState().boardStore.currentBoardId);
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

export const editBoard = createAsyncThunk<BoardType, FormData, TypedThunkAPI>(
  'board/editBoard',
  async (data: FormData, { getState, rejectWithValue }) => {
    const { currentBoardId } = getState().boardStore;

    try {
      const response = await BoardService.editBoard(currentBoardId, data);
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

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoardId: (state, { payload }: PayloadAction<string>) => {
      state.currentBoardId = payload;
    },
    clearCurrentBoardId: (state) => {
      state.currentBoardId = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.board = action.payload;
      state.currentBoardId = action.payload.id;
    });
    builder.addCase(removeBoard.fulfilled, (state) => {
      state.board = DEFAULT_BOARD;
    });
  },
});

export const { setCurrentBoardId, clearCurrentBoardId } = boardSlice.actions;

export default boardSlice.reducer;

export const boardSelector = (state: { boardStore: BoardState }) => state.boardStore;
