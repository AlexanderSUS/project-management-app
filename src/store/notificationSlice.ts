import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import initialState, { Severity } from '../constants/notification';
import { NotificationState } from '../types/notification';
import { ErrorResponseData, SignInResponse } from '../types/response';
import ThunkError, { FULFILED, PENDING, REJECTED } from '../constants/asyncThunk';
import {
  isAddAction, isEditAction, isDeleteAction,
  isRegistrationAction, isLogInAction, isBoardAction, isColumnAction, isTaskAction,
} from './utils';
import { FulfilledAction, PendingAction, RejectedAction } from '../types/slice';
import { BoardType } from '../types/boards';
import { Column } from '../types/columns';
import { Task } from '../types/tasks';
import { NewUser } from '../types/user';
import { JwtData } from '../types/authTypes';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
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
        const severity = Severity.success;

        state.isLoading = false;

        // TODO refactor all this
        if (isAddAction(action)) {
          const data = action.payload as unknown as BoardType | Column | Task;

          if (isBoardAction(action)) {
            state.log.push({ message: `Board "${data.title}" was succesfuly created`, severity });
          }
          if (isColumnAction(action)) {
            state.log.push({ message: `List "${data.title}" was succesfuly created`, severity });
          }
          if (isTaskAction(action)) {
            state.log.push({ message: `Task "${data.title}" was succesfuly created`, severity });
          }
        }
        if (isEditAction(action)) {
          const data = action.payload as unknown as BoardType | Column | Task;

          if (isBoardAction(action)) {
            state.log.push({ message: `Board "${data.title}" was succesfuly edited`, severity });
          }
          if (isColumnAction(action)) {
            state.log.push({ message: `List "${data.title}" was succesfuly edited`, severity });
          }
          if (isTaskAction(action)) {
            state.log.push({ message: `Task "${data.title}" was succesfuly edited`, severity });
          }
        }
        if (isDeleteAction(action)) {
          if (isBoardAction(action)) {
            state.log.push({ message: 'Board was removed', severity });
          }
          if (isColumnAction(action)) {
            state.log.push({ message: 'Column was removed', severity });
          }
          if (isTaskAction(action)) {
            state.log.push({ message: 'Task was removed', severity });
          }
        }
        if (isRegistrationAction(action)) {
          const user = action.payload as NewUser;

          state.log.push({ message: `New user ${user.login} was succesfuly created`, severity });
        }
        if (isLogInAction(action)) {
          const { token } = action.payload as SignInResponse;
          const { login } = jwtDecode<JwtData>(token);
          state.log.push({ message: `Hello ${login}!`, severity });
        }
      },
    );
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith(REJECTED),
      (state, action) => {
        const severity = Severity.error;
        state.isLoading = false;
        if ((action.payload)) {
          const error = action.payload as ErrorResponseData;
          // TODO move out status codes
          if (error.statusCode === 401) {
            // TODO add translation to THunkError
            state.log.push({ message: ThunkError.notAuthorized, severity });
            return;
          }
          if (error.statusCode === 403) {
            // TODO serverer reply 'User was not founded!'
            // but it occuours also when password invalid
            // add translation
            state.log.push({ message: error.message, severity });
            return;
          }
          if (error.statusCode === 409) {
            // TODO the same as above
            // "message":"User login already exists!"
            state.log.push({ message: error.message, severity });
          }
          return;
        }
        state.log.push({ message: action.error.message || ThunkError.unknownError, severity });
      },
    );
  },
});

export default notificationSlice.reducer;

export const notificationSelector = (
  state: { notificationStore: NotificationState },
) => state.notificationStore;
