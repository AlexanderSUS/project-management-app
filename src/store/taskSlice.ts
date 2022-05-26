import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import TaskService from '../api/taskService';
import { ValidationErrors } from '../types/response';
import { FulfilledAction, TypedThunkAPI } from '../types/slice';
import {
  EditTaskData, NewTaskData, Task, TaskState,
} from '../types/tasks';
import initialState from '../constants/task';
import { FormData } from '../types/formTypes';
import { FULFILED } from '../constants/asyncThunk';
import isGetBoardAction from './isGetBoardAction';
import { IBoard } from '../types/boards';
import { UserData } from '../types/user';
import UserService from '../api/userServise';

export const getTasks = createAsyncThunk<Task[], void, TypedThunkAPI >(
  'task/getTasks',
  async (_, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.board.id;
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

export const addTask = createAsyncThunk<Task, FormData, TypedThunkAPI>(
  'task/addTask',
  async (data: FormData, { getState, rejectWithValue }) => {
    const boardId = getState().boardStore.board.id;
    const columnId = getState().columnStore.column.id;
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
    const { task } = getState().taskStore;
    const copyTask: Partial<Task> = { ...task };

    delete copyTask.id;
    delete copyTask.files;

    try {
      const response = await TaskService.editTask(
        task.id,
        { ...copyTask, ...data } as EditTaskData,
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

export const changeTaskPosition = createAsyncThunk<Task, void, TypedThunkAPI>(
  'task/changeOrder',
  async (_, { getState, rejectWithValue }) => {
    const { task } = getState().taskStore;
    const { id: columnId } = getState().columnStore.column;
    const copyTask: Partial<Task> = { ...task };

    delete copyTask.id;
    delete copyTask.files;

    try {
      const response = await TaskService.changeTaskPosition(
        columnId,
        task.id,
        copyTask as EditTaskData,
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

// TODO ADD CASE FOR NOTIFICATION
export const reasignTask = createAsyncThunk<Task, void, TypedThunkAPI>(
  'task/reasignTask',
  async (_, { getState, rejectWithValue }) => {
    const { task } = getState().taskStore;
    const { id: boardId } = getState().boardStore.board;
    const coppyTask: Partial<Task> = { ...task, boardId };

    delete coppyTask.id;
    delete coppyTask.files;

    try {
      const response = await TaskService.editTask(task.id, coppyTask as EditTaskData);
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
    const { id: boardId } = getState().boardStore.board;
    const { task } = getState().taskStore;

    try {
      const response = await TaskService.deleteTask({ ...task, boardId });
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

export const getUsers = createAsyncThunk<UserData[], void, TypedThunkAPI >(
  'task/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.fetchUsers();
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
    setTask: (state, { payload }: PayloadAction<Task>) => {
      state.task = payload;
    },
    setTaskOrder: (state, { payload }: PayloadAction<number>) => {
      state.task.order = payload;
    },
    setTaskUserId: (state, { payload } : PayloadAction<string>) => {
      state.task.userId = payload;
    },
    setTaskColumnId: (state, { payload }: PayloadAction<string>) => {
      state.task.columnId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith(FULFILED),
      (state, action) => {
        if (isGetBoardAction(action)) {
          const board = action.payload as IBoard;
          const tasksPreview = board.columns.map((column) => column.tasks).flat();
          state.tasksPreview = tasksPreview;
        }
      },
    );
  },
});

export const {
  setTaskOrder, setTask, setTaskUserId, setTaskColumnId,
} = taskSlice.actions;

export default taskSlice.reducer;

export const taskSelector = (state: { taskStore: TaskState }) => state.taskStore;
