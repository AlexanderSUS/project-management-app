import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardService from '../api/boardServise';
import { Boards, VoidArgument, BoardState } from '../types/boards';
import { ErrorResponseData, ValidationErrors } from '../types/response';
import type { RootState } from './store';
import initialState from '../constants/boards';
import type { ModalInputData } from '../types/modal';

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
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

export const removeBoard = createAsyncThunk<Boards, VoidArgument, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'board/removeBoard',
  async (_: VoidArgument, { getState, rejectWithValue }) => {
    try {
      await BoardService.deleteBoard(getState().boardStore.currentBoardId);
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
  },
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
      state.boards = payload;
    });
    builder.addCase(addBoard.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured!! addBoard';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
    builder.addCase(removeBoard.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(removeBoard.fulfilled, (state, { payload }) => {
      if (payload instanceof Array) {
        state.boards = payload;
        state.pending = false;
        state.currentBoardId = '';
      }
    });
    builder.addCase(removeBoard.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured!! remove board';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
    builder.addCase(editBoard.pending, (state) => {
      state.pending = true;
      state.error = null;
    });
    builder.addCase(editBoard.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.boards = payload;
    });
    builder.addCase(editBoard.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured!! addBoard';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
  },
});

export const { setCurrentBoardId } = boardSlice.actions;

export default boardSlice.reducer;

export const boardSelector = (state: { boardStore: BoardState }) => state.boardStore;
