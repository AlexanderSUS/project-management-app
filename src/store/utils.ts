import { isAnyOf, isAsyncThunkAction } from '@reduxjs/toolkit';
import {
  addColumn, editColumn, removeColumn, changeColumnOrder,
} from './columnSlice';
import {
  addTask, editTask, reasignTask, removeTask, changeTaskPosition,
} from './taskSlice';
import { addBoard, editBoard, removeBoard } from './boardSlice';
import {
  editLogin, editName, logIn, logOut, registration, removeUser,
} from './authSlice';

export const isBoardAction = isAsyncThunkAction(addBoard, editBoard, removeBoard);

// TODO FIX NAME
export const isBoardEditOrAddAction = isAsyncThunkAction(editBoard);

export const isColumnAction = isAsyncThunkAction(
  addColumn,
  editColumn,
  removeColumn,
  changeColumnOrder,
);

export const isTaskAction = isAsyncThunkAction(
  addTask,
  editTask,
  removeTask,
  reasignTask,
  changeTaskPosition,
);

// TODO add better name
export const isModalBoardPageAction = isAnyOf(isColumnAction, isTaskAction, isBoardEditOrAddAction);

export const isAddAction = isAsyncThunkAction(addBoard, addColumn, addTask);

export const isEditAction = isAsyncThunkAction(editBoard, editColumn, editTask);

export const isUserRemoveAcition = isAsyncThunkAction(removeUser);

export const isLogOutAction = isAnyOf(logOut);

export const isDeleteAction = isAsyncThunkAction(removeBoard, removeColumn, removeTask, removeUser);

export const isRegistrationAction = isAsyncThunkAction(registration);

export const isLogInAction = isAsyncThunkAction(logIn);

export const isEditNameAction = isAsyncThunkAction(editName);

export const isEditLoginAction = isAsyncThunkAction(editLogin);

export const isUserEditAction = isAnyOf(isEditNameAction, isEditLoginAction);

export const isReasignAction = isAsyncThunkAction(reasignTask);

export const isTaskMoveAction = isAsyncThunkAction(changeTaskPosition);

export const isColumnMoveAction = isAsyncThunkAction(changeColumnOrder);

export const isMoveAcion = isAnyOf(isTaskMoveAction, isColumnMoveAction);
