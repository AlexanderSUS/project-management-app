import { AppStartListening } from './listenerMiddleware';
import { RootState } from './store';
import { isBoardAction, isModalBoardPageAction } from './utils';
import { getBoard, getBoards } from './boardSlice';
import { getUsers } from './taskSlice';

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

export const addModalBoardPageActionListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => (isModalBoardPageAction(action) && !state.notificationStore.isLoading),
    effect: (_, listenerApi) => {
      listenerApi.dispatch(getUsers())
        .then(() => {
          listenerApi.dispatch(getBoard());
        });
    },
  });
};
