import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ColumnService from '../api/columnServise';
import { ColumnState, VoidArgument, Column } from '../types/boards';
import { ModalInputData } from '../types/modal';
import { ValidationErrors } from '../types/response';
import type { RootState } from './store';

export const getColumns = createAsyncThunk<Column[], VoidArgument, {
  state: RootState, rejectWithValue: ValidationErrors } >(
  'column/getColumns',
  async (_: VoidArgument, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;

    try {
      const response = await ColumnService.fetchColumns(boardId);
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

export const addColumn = createAsyncThunk<Column[], ModalInputData, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'column/addColumn',
  async (data: ModalInputData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;

    try {
      await ColumnService.createColumn(boardId, data);
      const response = await ColumnService.fetchColumns(boardId);
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

export const editColumn = createAsyncThunk<Column[], ModalInputData, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'board/editBoard',
  async (data: ModalInputData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;

    try {
      await ColumnService.editColumn(boardId, columnId, data);
      const response = await ColumnService.fetchColumns(boardId);
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

export const removeBoard = createAsyncThunk<Column[], VoidArgument, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'board/removeBoard',
  async (_: VoidArgument, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;

    try {
      await ColumnService.deleteColumn(boardId, columnId);
      const response = await ColumnService.fetchColumns(boardId);
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

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    columns: [],
    currentColumnId: '',
  },
  reducers: {
    setCurrentColumnId: (state, { payload }: PayloadAction<string>) => {
      state.currentColumnId = payload;
    },
  },
});

export const { setCurrentColumnId } = columnSlice.actions;

export default columnSlice.reducer;

export const columnSelector = (state: { columnStore: ColumnState }) => state.columnStore;
