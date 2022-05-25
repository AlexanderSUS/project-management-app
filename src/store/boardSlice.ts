import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import BoardService from '../api/boardServise';
import { IBoardPreview, BoardState, IBoard } from '../types/boards';
import { ValidationErrors } from '../types/response';
import initialState, { DEFAULT_BOARD } from '../constants/boards';
import type { FormData } from '../types/formTypes';
import { TypedThunkAPI } from '../types/slice';

export const getBoards = createAsyncThunk<IBoardPreview[], void, TypedThunkAPI >(
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

export const getBoard = createAsyncThunk<IBoard, void, TypedThunkAPI>(
  'board/getBoard',
  async (_, { getState, rejectWithValue }) => {
    const { id } = getState().boardStore.board;

    try {
      const response = await BoardService.getBoard(id);
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

export const addBoard = createAsyncThunk<IBoardPreview, FormData, TypedThunkAPI>(
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
    const { id } = getState().boardStore.board;

    try {
      const response = await BoardService.deleteBoard(id);
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

export const editBoard = createAsyncThunk<IBoard, FormData, TypedThunkAPI>(
  'board/editBoard',
  async (data: FormData, { getState, rejectWithValue }) => {
    const { id } = getState().boardStore.board;

    try {
      const response = await BoardService.editBoard(id, data);
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
    setBoard: (state, { payload }: PayloadAction<IBoard>) => {
      state.board = payload;
    },
    setBoardId: (state, { payload }: PayloadAction<string>) => {
      state.board.id = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boardsPreview = action.payload;
    });
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.board = action.payload;
    });
    builder.addCase(removeBoard.fulfilled, (state) => {
      state.board = DEFAULT_BOARD;
    });
  },
});

export const { setBoard, setBoardId } = boardSlice.actions;

export default boardSlice.reducer;

export const boardSelector = (state: { boardStore: BoardState }) => state.boardStore;
