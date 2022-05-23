import { isAsyncThunkAction } from '@reduxjs/toolkit';
import { addColumn, editColumn, removeColumn } from './columnSlice';
import { addTask, editTask, removeTask } from './taskSlice';
import { addBoard, editBoard, removeBoard } from './boardSlice';
import { logIn, registration } from './authSlice';

export const isBoardAction = isAsyncThunkAction(addBoard, editBoard, removeBoard);

export const isColumnAction = isAsyncThunkAction(addColumn, editColumn, removeColumn);

export const isTaskAction = isAsyncThunkAction(addTask, editTask, removeTask);

export const isAddAction = isAsyncThunkAction(addBoard, addColumn, addTask);

export const isEditAction = isAsyncThunkAction(editBoard, editColumn, editTask);

export const isDeleteAction = isAsyncThunkAction(removeBoard, removeColumn, removeTask);

export const isRegistrationAction = isAsyncThunkAction(registration);

export const isLogInAction = isAsyncThunkAction(logIn);

// export const isGetUserDataAction = isAsyncThunkAction(getUserData);

// export const isModalFormAction = isAnyOf(isAddAction, isEditAction, isDeleteAction);

// export const isSuccessAction = isAnyOf(isLogInAction, isRegistrationAction, isModalFormAction);
