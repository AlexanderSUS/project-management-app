import {
  createAsyncThunk, createSlice, isAsyncThunkAction, PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import BoardService from '../api/boardServise';
import { IBoardPreview, BoardState, IBoard } from '../types/boards';
import { ValidationErrors } from '../types/response';
import initialState, { DEFAULT_BOARD } from '../constants/boards';
import type { AppFormData } from '../types/formTypes';
import { FulfilledAction, TypedThunkAPI } from '../types/slice';
import { FULFILED } from '../constants/asyncThunk';

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

export const getBoardsById = createAsyncThunk<IBoard[], void, TypedThunkAPI >(
  'board/getBoardsById',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { boardsPreview } = getState().boardStore;
      const allBoardIds = boardsPreview.map((prev) => prev.id);

      const allBoardsRequest = allBoardIds.map((boardId) => BoardService.getBoard(boardId));
      const allBoardsResponse = await Promise.all(allBoardsRequest);
      const allBoards = allBoardsResponse.map((res) => res.data);

      return allBoards;
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

export const addBoard = createAsyncThunk<IBoardPreview, AppFormData, TypedThunkAPI>(
  'board/addBoard',
  async (data: AppFormData, { rejectWithValue }) => {
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

export const editBoard = createAsyncThunk<IBoard, AppFormData, TypedThunkAPI>(
  'board/editBoard',
  async (data: AppFormData, { getState, rejectWithValue }) => {
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

export const isGetBoardAction = isAsyncThunkAction(getBoard);
export const isGetBoardsByIdAction = isAsyncThunkAction(getBoardsById);

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
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith(FULFILED),
      (state, action) => {
        if (isGetBoardsByIdAction(action)) {
          const boards = action.payload as IBoard[];
          state.boards = boards;
        }
      },
    );
  },
});

export const { setBoard, setBoardId } = boardSlice.actions;

export default boardSlice.reducer;

export const boardSelector = (state: { boardStore: BoardState }) => state.boardStore;
