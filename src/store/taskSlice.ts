import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import TaskService from '../api/taskService';
import { ValidationErrors } from '../types/response';
import { TypedThunkAPI } from '../types/slice';
import {
  NewTaskData, Task, TaskState, UpdateTaskData,
} from '../types/tasks';
import initialState from '../constants/task';
import { FormData } from '../types/formTypes';

export const getTasks = createAsyncThunk<Task[], void, TypedThunkAPI >(
  'task/getTasks',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnsIds = getState().columnStore.columns.map((column) => column.id);
    const requests = columnsIds.map((columnId) => TaskService.fetchTasks(boardId, columnId));

    try {
      const responseArray = await Promise.all(requests);
      return responseArray.map((response) => response.data).flat();
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  },
);

// TODO write getTask Thunk if neded

export const addTask = createAsyncThunk<Task, FormData, TypedThunkAPI>(
  'task/addTask',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;
    const { userId } = getState().authStore;

    try {
      const response = await TaskService.createTask(
        boardId,
        columnId,
        { ...data, userId } as unknown as NewTaskData,
      );
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

export const editTask = createAsyncThunk<Task, FormData, TypedThunkAPI>(
  'task/editTask',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;
    const taskId = getState().taskStore.currentTaskId;
    const order = getState().taskStore.currentTaskOrder;
    const { userId } = getState().authStore;

    try {
      // TODO optimze repeated variables
      const response = await TaskService.editTask(
        boardId,
        columnId,
        taskId,
        {
          ...data, order, userId, boardId, columnId,
        } as unknown as UpdateTaskData,
      );
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

export const removeTask = createAsyncThunk<Task, void, TypedThunkAPI>(
  'task/removeTask',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.currentBoardId;
    const columnId = getState().columnStore.currentColumnId;
    const taskId = getState().taskStore.currentTaskId;

    try {
      const response = await TaskService.deleteTask(boardId, columnId, taskId);
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

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTaskId: (state, { payload }: PayloadAction<string>) => {
      state.currentTaskId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const { setCurrentTaskId } = taskSlice.actions;

export default taskSlice.reducer;

export const taskSelector = (state: { taskStore: TaskState }) => state.taskStore;
