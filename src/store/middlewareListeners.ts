import { AppStartListening } from './listenerMiddleware';
import { RootState } from './store';
import { isBoardAction, isColumnOrTaskAction } from './utils';
import { getBoard, getBoards } from './boardSlice';

export const addBoardListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => (isBoardAction(action) && !state.notificationStore.isLoading),
    effect: (_, listenerApi) => {
      listenerApi.dispatch(getBoards());
    },
  });
};

export const addColumnsAndTasksListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => (isColumnOrTaskAction(action) && !state.notificationStore.isLoading),
    effect: (_, listenerApi) => {
      listenerApi.dispatch(getBoard());
    },
  });
};
