import { AnyAction, isAsyncThunkAction } from '@reduxjs/toolkit';
import { AppStartListening } from './listenerMiddleware';
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

export const addBoardListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => (isBoardAction(action) && !!state.notificationStore.info),
    effect: (_, listenerApi) => {
      console.log('dispatch getBoards');
      listenerApi.dispatch(getBoards());
    },
  });
};

export const addColumnListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => (isColumnAction(action) && !!state.notificationStore.info),
    effect: (_, listenerApi) => {
      console.log('dispatch getColumns');
      listenerApi.dispatch(getColumns());
    },
  });
};

export const addTaskListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => (isTaskAction(action) && !!state.notificationStore.info),
    effect: (_, listenerApi) => {
      console.log('dispatch getTasks');
      listenerApi.dispatch(getTasks() as unknown as AnyAction);
    },
  });
};
