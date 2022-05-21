import {
  AsyncThunk, createAsyncThunk, createSlice, isAsyncThunkAction, PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import TaskService from '../api/taskService';
import { ValidationErrors } from '../types/response';
import { TypedThunkAPI } from '../types/slice';
import {
  NewTaskData, Task, TaskState, UpdateTaskData,
} from '../types/tasks';
import initialState from '../constants/task';
import { FULFILED } from '../constants/asyncThunk';

type GenericAsyncThunk = AsyncThunk<Task[], void | FormData, TypedThunkAPI>;

type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export const getTasks = createAsyncThunk<Task[], void, TypedThunkAPI >(
  'task/getTasks',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;

    try {
      const response = await TaskService.fetchTasks(boardId, columnId);
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

// TODO write getTask Thunk

export const addTask = createAsyncThunk<Task[], FormData, TypedThunkAPI>(
  'task/addTask',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;

    // TODO move out this in helpers
    const orders = getState().columnStore.columns.map((column) => column.order);
    const taskOrder = orders.length ? Math.max(...orders) + 1 : 1;
    // END TODO

    try {
      // TODO handle this response
      await TaskService.createTask(
        boardId,
        columnId,
        { ...data, order: taskOrder } as unknown as NewTaskData,
      );
      // TODO rewrite for single task fetching
      const response = await TaskService.fetchTasks(boardId, columnId);
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

export const editTask = createAsyncThunk<Task[], FormData, TypedThunkAPI>(
  'task/editTask',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;
    const taskId = getState().taskStore.currentTaskId;
    const order = getState().taskStore.currentTaskOrder;

    try {
      // TODO handle this response
      await TaskService.editTask(
        boardId,
        columnId,
        taskId,
        { ...data, order } as unknown as UpdateTaskData,
      );
      const response = await TaskService.fetchTasks(boardId, columnId);
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

export const removeTask = createAsyncThunk<Task[], void, TypedThunkAPI>(
  'task/removeTask',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;
    const taskId = getState().taskStore.currentTaskId;

    try {
      // TODO handle this response
      await TaskService.deleteTask(boardId, columnId, taskId);
      const response = await TaskService.fetchTasks(boardId, columnId);
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

const isARequestedAction = isAsyncThunkAction(getTasks, addTask, editTask, removeTask);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTaskId: (state, { payload }: PayloadAction<string>) => {
      state.currentTaskId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith(FULFILED),
      (state, action) => {
        if (isARequestedAction(action)) {
          state.tasks = action.payload;
        }
      },
    );
  },
});

export const { setCurrentTaskId } = taskSlice.actions;

export default taskSlice.reducer;

export const taskSelector = (state: { taskStore: TaskState }) => state.taskStore;
