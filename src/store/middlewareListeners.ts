import { AppStartListening } from './listenerMiddleware';
import { RootState } from './store';
import {
  isBoardAction, isLogOutAction, isOnBoardAction, isUserRemoveAcition,
} from './utils';
import { getBoard, getBoards } from './boardSlice';
import { getUsers } from './taskSlice';
import { TOKEN } from '../constants/authorization';

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
    ) => (isOnBoardAction(action) && !state.notificationStore.isLoading),
    effect: (_, listenerApi) => {
      listenerApi.dispatch(getUsers())
        .then(() => {
          listenerApi.dispatch(getBoard());
        });
    },
  });
};

export const addRemoveUserdListener = (startAppListening: AppStartListening) => {
  startAppListening({
    predicate: (
      action,
      state: RootState,
    ) => ((isUserRemoveAcition(action) && !state.notificationStore.isLoading)
      || isLogOutAction(action)
    ),
    effect: () => {
      localStorage.removeItem(TOKEN);
    },
  });
};
