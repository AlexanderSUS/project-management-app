import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import ColumnService from '../api/columnServise';
import { ColumnState, Column } from '../types/columns';
import type { FormData } from '../types/formTypes';
import { ValidationErrors } from '../types/response';
import initialState from '../constants/columns';
import { TypedThunkAPI } from '../types/slice';

export const getColumns = createAsyncThunk<Column[], void, TypedThunkAPI >(
  'column/getColumns',
  async (_, { getState, rejectWithValue }) => {
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

export const addColumn = createAsyncThunk<Column, FormData, TypedThunkAPI>(
  'column/addColumn',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;

    // TODO move out this in helpers
    const orders = getState().columnStore.columns.map((column) => column.order);
    const columnOrder = orders.length ? Math.max(...orders) + 1 : 1;
    // END TODO

    try {
      const response = await ColumnService.createColumn(boardId, { ...data, order: columnOrder });
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

export const editColumn = createAsyncThunk<Column, FormData, TypedThunkAPI>(
  'column/editColumn',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;
    const order = getState().columnStore.currentColumnOrder;

    try {
      const response = await ColumnService.editColumn(boardId, columnId, { ...data, order });
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

export const removeColumn = createAsyncThunk<AxiosResponse, void, TypedThunkAPI>(
  'column/removeColumn',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;

    try {
      const response = await ColumnService.deleteColumn(boardId, columnId);
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
  initialState,
  reducers: {
    setCurrentColumnId: (state, { payload }: PayloadAction<string>) => {
      state.currentColumnId = payload;
    },
    setCurrentColumnOrder: (state, { payload }: PayloadAction<number>) => {
      state.currentColumnOrder = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
  },
});

export const { setCurrentColumnId, setCurrentColumnOrder } = columnSlice.actions;

export default columnSlice.reducer;

export const columnSelector = (state: { columnStore: ColumnState }) => state.columnStore;
