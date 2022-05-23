import { AppStartListening } from './listenerMiddleware';
import { RootState } from './store';
import { isBoardAction, isColumnAction, isTaskAction } from './utils';
import { getBoards } from './boardSlice';
import { getColumns } from './columnSlice';
import { getTasks } from './taskSlice';

export const addBoardListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => (isBoardAction(action) && !!state.notificationStore.info),
    effect: (_, listenerApi) => {
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
      listenerApi.dispatch(getTasks());
    },
  });
};
