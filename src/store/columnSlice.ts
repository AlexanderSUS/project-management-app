import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ColumnService from '../api/columnServise';
import { ColumnState, Column } from '../types/columns';
import { VoidArgument } from '../types/boards';
import { ModalInputData } from '../types/modal';
import { ErrorResponseData, ValidationErrors } from '../types/response';
import type { RootState } from './store';
import initialState from '../constants/columns';

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

    // TODO move out this in helpers
    const orders = getState().columnStore.columns.map((column) => column.order);
    const columnOrder = orders.length ? Math.max(...orders) + 1 : 1;
    // END TODO

    try {
      await ColumnService.createColumn(boardId, { title: data.title, order: columnOrder });
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
  'column/editColumn',
  async (data: ModalInputData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;
    const order = getState().columnStore.currentColumnOrder;

    try {
      await ColumnService.editColumn(boardId, columnId, { order, title: data.title });
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

export const removeColumn = createAsyncThunk<Column[], VoidArgument, {
  state: RootState, rejectWithValue: ValidationErrors }>(
  'column/removeColumn',
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
    builder.addCase(getColumns.pending, (state) => {
      state.pending = true;
      state.error = '';
    });
    builder.addCase(getColumns.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured! Cant fetch listst';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
    builder.addCase(getColumns.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.columns = payload;
      state.pending = false;
    });
    builder.addCase(addColumn.pending, (state) => {
      state.pending = true;
      state.error = '';
    });
    builder.addCase(addColumn.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured! Cant fetch listst';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
    builder.addCase(addColumn.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.columns = payload;
      state.pending = false;
    });
    builder.addCase(editColumn.pending, (state) => {
      state.pending = true;
      state.error = '';
    });
    builder.addCase(editColumn.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured! Cant fetch listst';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
    builder.addCase(editColumn.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.columns = payload;
    });
    builder.addCase(removeColumn.pending, (state) => {
      state.pending = true;
      state.error = '';
    });
    builder.addCase(removeColumn.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = 'OOops! Some error occoured! Cant fetch listst';
      if (payload) {
        const data = payload as ErrorResponseData;
        state.error = data.message;
      }
    });
    builder.addCase(removeColumn.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.columns = payload;
    });
  },
});

export const { setCurrentColumnId, setCurrentColumnOrder } = columnSlice.actions;

export default columnSlice.reducer;

export const columnSelector = (state: { columnStore: ColumnState }) => state.columnStore;
