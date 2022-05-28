import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import initialState, {
  ERROR_401, ERROR_403, ERROR_409, Severity,
} from '../constants/notification';
import { NotificationState } from '../types/notification';
import { ErrorResponseData, SignInResponse } from '../types/response';
import { FULFILED, PENDING, REJECTED } from '../constants/asyncThunk';
import {
  isAddAction, isEditAction, isDeleteAction, isRegistrationAction,
  isLogInAction, isBoardAction, isColumnAction, isTaskAction,
  isEditNameAction, isUserRemoveAcition, isUserEditAction, isEditLoginAction,
} from './utils';
import { FulfilledAction, PendingAction, RejectedAction } from '../types/slice';
import { IBoard } from '../types/boards';
import { Column } from '../types/columns';
import { Task } from '../types/tasks';
import { NewUser, UserData } from '../types/user';
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
          const data = action.payload as IBoard | Column | Task;
          const log = { severity, message: 'info.successCreate', dataText: data.title };

          if (isBoardAction(action)) {
            state.log.push({ ...log, head: 'info.board' });
          }
          if (isColumnAction(action)) {
            state.log.push({ ...log, head: 'info.list' });
          }
          if (isTaskAction(action)) {
            state.log.push({ ...log, head: 'info.task' });
          }
        }
        if (isEditAction(action)) {
          const data = action.payload as IBoard | Column | Task;
          const log = { severity, message: 'info.successEdit', dataText: data.title };

          if (isBoardAction(action)) {
            state.log.push({ ...log, head: 'info.board' });
          }
          if (isColumnAction(action)) {
            state.log.push({ ...log, head: 'info.list' });
          }
          if (isTaskAction(action)) {
            state.log.push({ ...log, head: 'info.task' });
          }
        }
        if (isDeleteAction(action)) {
          const log = { severity, message: 'info.successDelete' };

          if (isBoardAction(action)) {
            state.log.push({ ...log, head: 'info.board' });
          }
          if (isColumnAction(action)) {
            state.log.push({ ...log, head: 'info.list' });
          }
          if (isTaskAction(action)) {
            state.log.push({ ...log, head: 'info.task' });
          }
          if (isUserRemoveAcition(action)) {
            state.log.push({ ...log, head: 'info.account' });
          }
        }
        if (isUserEditAction(action)) {
          const user = action.payload as UserData;

          if (isEditLoginAction(action)) {
            state.log.push({
              severity, head: 'info.editLogin', message: '', dataText: user.login,
            });
          }
          if (isEditNameAction(action)) {
            state.log.push({
              severity, head: 'info.editName', message: '', dataText: user.name,
            });
          }
        }
        if (isRegistrationAction(action)) {
          const user = action.payload as NewUser;

          state.log.push({
            severity, head: 'info.newUser', dataText: user.login, message: 'info.successCreate',
          });
        }
        if (isLogInAction(action)) {
          const { token } = action.payload as SignInResponse;
          const { login } = jwtDecode<JwtData>(token);

          state.log.push({
            head: 'info.greeting', dataText: `${login}!`, message: '', severity,
          });
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

          if (error.statusCode === ERROR_401) {
            state.log.push({ message: 'info.unauthorized', severity });
            return;
          }
          if (error.statusCode === ERROR_403) {
            state.log.push({ message: 'info.userNotFounded', severity });
            return;
          }
          if (error.statusCode === ERROR_409) {
            state.log.push({ message: 'info.alreadyExist', severity });
            return;
          }
          state.log.push({ message: error.message || 'info.unknown', severity });
          return;
        }
        state.log.push({ message: action.error.message || 'info.unknown', severity });
      },
    );
  },
});

export default notificationSlice.reducer;

export const notificationSelector = (
  state: { notificationStore: NotificationState },
) => state.notificationStore;
