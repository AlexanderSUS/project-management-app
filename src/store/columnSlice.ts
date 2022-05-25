import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import ColumnService from '../api/columnServise';
import { ColumnState, Column, ColumnPreview } from '../types/columns';
import type { FormData } from '../types/formTypes';
import { ValidationErrors } from '../types/response';
import initialState from '../constants/columns';
import { FulfilledAction, TypedThunkAPI } from '../types/slice';
import { FULFILED } from '../constants/asyncThunk';
import isGetBoardAction from './isGetBoardAction';
import { IBoard } from '../types/boards';

export const getColumns = createAsyncThunk<ColumnPreview[], void, TypedThunkAPI >(
  'column/getColumns',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.board.id;

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

// For future use
// export const getColumn = createAsyncThunk<Column, void, TypedThunkAPI >(
//   'column/getColumn',
//   async (_, { getState, rejectWithValue }) => {
//     const boardId = getState().boardStore.board.id;
//     const { id } = getState().columnStore.column;

//     try {
//       const response = await ColumnService.getColumn(boardId, id);
//       return response.data;
//     } catch (err) {
//       const error = err as AxiosError<ValidationErrors>;
//       if (!error.response) {
//         throw err;
//       }
//       return rejectWithValue(error.response?.data);
//     }
//   },
// );

export const addColumn = createAsyncThunk<Column, FormData, TypedThunkAPI>(
  'column/addColumn',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.board.id;

    try {
      const response = await ColumnService.createColumn(boardId, data);
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
    const boardId = getState().boardStore.board.id;
    const { id, order } = getState().columnStore.column;
    const { title } = data;

    try {
      const response = await ColumnService.editColumn(boardId, id, { title, order });
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
    const boardId = getState().boardStore.board.id;
    const columnId = getState().columnStore.column.id;

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
    setColumn: (state, { payload }: PayloadAction<Column>) => {
      state.column = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columnsPreview = action.payload;
    });
    // For future use
    // builder.addCase(getColumn.fulfilled, (state, action) => {
    //   state.column = action.payload;
    // });
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith(FULFILED),
      (state, action) => {
        if (isGetBoardAction(action)) {
          const boards = action.payload as IBoard;
          state.columns = boards.columns;
        }
      },
    );
  },
});

export const { setColumn } = columnSlice.actions;

export default columnSlice.reducer;

export const columnSelector = (state: { columnStore: ColumnState }) => state.columnStore;
