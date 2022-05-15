import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardService from '../api/boardServise';
import {
  Boards, VoidArgument, BoardState, BoardType,
} from '../types/boards';
import { ErrorResponseData, ValidationErrors } from '../types/response';
import type { RootState } from './store';
import initialState from '../constants/boards';
import { ModalFormData } from '../types/modal';

export const getBoards = createAsyncThunk<Boards, VoidArgument, {
  state: RootState,
  rejectWithValue: ValidationErrors } >(
  'board/getBoards',
  async (_: VoidArgument, { rejectWithValue }) => {
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

export const addBoard = createAsyncThunk<BoardType, ModalFormData, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'board/addBoard',
  async (data: ModalFormData, { rejectWithValue }) => {
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

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.pending = true;
      state.error = null;
    });
    builder.addCase(getBoards.fulfilled, (state, { payload }) => {
      if (payload instanceof Array) {
        state.boards = payload;
        state.pending = false;
      }
    });
    builder.addCase(getBoards.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured!!';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
    builder.addCase(addBoard.pending, (state) => {
      state.pending = true;
      state.error = null;
    });
    builder.addCase(addBoard.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.boards.push(payload);
    });
    builder.addCase(addBoard.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured!!';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
  },
});

export default boardSlice.reducer;

export const boardSelector = (state: { boardStore: BoardState }) => state.boardStore;
