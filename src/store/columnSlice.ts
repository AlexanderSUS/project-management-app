import {
  AsyncThunk, createAsyncThunk, createSlice, isAsyncThunkAction, PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ColumnService from '../api/columnServise';
import { ColumnState, Column } from '../types/columns';
import type { ModalInputData } from '../types/modal';
import { ErrorResponseData, ValidationErrors } from '../types/response';
import initialState from '../constants/columns';
import { TypedThunkAPI } from '../types/slice';
import ThunkError, { FULFILED, PENDING, REJECTED } from '../constants/asyncThunk';

type GenericAsyncThunk = AsyncThunk<Column[], void | ModalInputData,
TypedThunkAPI>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

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
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

export const addColumn = createAsyncThunk<Column[], ModalInputData, TypedThunkAPI>(
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
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

export const editColumn = createAsyncThunk<Column[], ModalInputData, TypedThunkAPI>(
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
        return rejectWithValue(error);
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

export const removeColumn = createAsyncThunk<Column[], void, TypedThunkAPI>(
  'column/removeColumn',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;

    try {
      await ColumnService.deleteColumn(boardId, columnId);
      const response = await ColumnService.fetchColumns(boardId);
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

const isARequestedAction = isAsyncThunkAction(getColumns, addColumn, editColumn, removeColumn);

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
    builder.addMatcher(
      (action): action is PendingAction => action.type.endsWith(PENDING),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.pending = false;
          state.error = '';
        }
      },
    );
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith(REJECTED),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.pending = false;

          if ((action.payload)) {
            const error = action.payload as ErrorResponseData;

            if (error.statusCode === 401) {
              state.error = ThunkError.notAuthorized;
              // TODO find solution for log out user
              return;
            }
            state.error = error.message;
            return;
          }
          state.error = action.error.message || ThunkError.unknownError;
        }
      },
    );
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith(FULFILED),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.pending = false;
          state.columns = action.payload;
        }
      },
    );
  },
});

export const { setCurrentColumnId, setCurrentColumnOrder } = columnSlice.actions;

export default columnSlice.reducer;

export const columnSelector = (state: { columnStore: ColumnState }) => state.columnStore;
