import { isAnyOf, isAsyncThunkAction } from '@reduxjs/toolkit';
import { addColumn, editColumn, removeColumn } from './columnSlice';
import {
  addTask, editTask, reasignTask, removeTask,
} from './taskSlice';
import { addBoard, editBoard, removeBoard } from './boardSlice';
import {
  editLogin, editName, logIn, registration, removeUser,
} from './authSlice';

export const isBoardAction = isAsyncThunkAction(addBoard, editBoard, removeBoard);

export const isBoardEditOrAddAction = isAsyncThunkAction(editBoard);

export const isColumnAction = isAsyncThunkAction(addColumn, editColumn, removeColumn);

export const isTaskAction = isAsyncThunkAction(addTask, editTask, removeTask, reasignTask);

// TODO add better name
export const isModalBoardPageAction = isAnyOf(isColumnAction, isTaskAction, isBoardEditOrAddAction);

export const isUserAction = isAsyncThunkAction(editName, editLogin, removeUser);

export const isAddAction = isAsyncThunkAction(addBoard, addColumn, addTask);

export const isEditAction = isAsyncThunkAction(editBoard, editColumn, editTask);

export const isUserRemoveAcition = isAsyncThunkAction(removeUser);

export const isDeleteAction = isAsyncThunkAction(removeBoard, removeColumn, removeTask, removeUser);

export const isRegistrationAction = isAsyncThunkAction(registration);

export const isLogInAction = isAsyncThunkAction(logIn);

export const isEditNameAction = isAsyncThunkAction(editName);

export const isEditLoginAction = isAsyncThunkAction(editLogin);

export const isUserEditAction = isAnyOf(isEditNameAction, isEditLoginAction);
