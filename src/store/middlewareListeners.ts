import { AnyAction, isAsyncThunkAction } from '@reduxjs/toolkit';
import { startAppListening } from './listenerMiddleware';
import { RootState } from './store';
import {
  addBoard, editBoard, getBoards, removeBoard,
} from './boardSlice';
import {
  addColumn, editColumn, getColumns, removeColumn,
} from './columnSlice';
import {
  addTask, editTask, getTasks, removeTask,
} from './taskSlice';

const isBoardAction = isAsyncThunkAction(addBoard, editBoard, removeBoard);
const isColumnAction = isAsyncThunkAction(addColumn, editColumn, removeColumn);
const isTaskAction = isAsyncThunkAction(addTask, editTask, removeTask);

startAppListening({
  predicate: (
    action,
    state: RootState,
  ) => (isBoardAction(action) && !!state.notificationStore.info),
  effect: (_, listenerApi) => {
    listenerApi.dispatch(getBoards() as unknown as AnyAction);
  },
});

startAppListening({
  predicate: (
    action,
    state: RootState,
  ) => (isColumnAction(action) && !!state.notificationStore.info),
  effect: (_, listenerApi) => {
    listenerApi.dispatch(getColumns() as unknown as AnyAction);
  },
});

startAppListening({
  predicate: (
    action,
    state: RootState,
  ) => (isTaskAction(action) && !!state.notificationStore.info),
  effect: (_, listenerApi) => {
    listenerApi.dispatch(getTasks() as unknown as AnyAction);
  },
});
