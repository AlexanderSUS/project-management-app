import { createSlice } from '@reduxjs/toolkit';
import initialState from '../constants/notification';
import { NotificationState } from '../types/notification';
import { ErrorResponseData } from '../types/response';
import ThunkError, { FULFILED, PENDING, REJECTED } from '../constants/asyncThunk';
import {
  isModalFormAction, isAddAction, isEditAction, isDeleteAction,
  isRegistrationAction, isLogInAction,
} from './utils';
import { FulfilledAction, PendingAction, RejectedAction } from '../types/slice';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    clearInfo: (state) => {
      state.info = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PendingAction => action.type.endsWith(PENDING),
      (state) => {
        state.isLoading = true;
      },
    );
    builder.addMatcher(
      (action): action is FulfilledAction => action.type.endsWith(FULFILED),
      (state, action) => {
        if (!isModalFormAction(action)) {
          state.isLoading = false;
        }
        if (isAddAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
        if (isEditAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
        if (isDeleteAction(action)) {
          state.info = action.meta.requestStatus;
        }
        if (isRegistrationAction(action)) {
          state.info = JSON.stringify(action.payload);
        }
        if (isLogInAction(action)) {
          state.info = 'Success logIn';
        }
      },
    );
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith(REJECTED),
      (state, action) => {
        state.isLoading = false;
        if ((action.payload)) {
          const error = action.payload as ErrorResponseData;

          if (error.statusCode === 401) {
            // TODO add translation
            state.error = ThunkError.notAuthorized;
            return;
          }
          // if (error.statusCode === 403) {
          //   // TODO serverer reply 'User was not founded!'
          //   // but it occuours also when password invalid
          //   // add translation
          //   state.error = error.message;
          //   return;
          // }
          state.error = error.message || ThunkError.unknownError;
          return;
        }
        state.error = action.error.message || ThunkError.unknownError;
      },
    );
  },
});

export const { clearInfo, clearError } = notificationSlice.actions;

export default notificationSlice.reducer;

export const notificationSelector = (
  state: { notificationStore: NotificationState },
) => state.notificationStore;
