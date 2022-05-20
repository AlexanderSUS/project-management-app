import { editLogin, editName, removeUser } from '../store/authSlice';
import {
  addBoard, editBoard, removeBoard,
} from '../store/boardSlice';
import { addColumn, editColumn, removeColumn } from '../store/columnSlice';
import { MyRegisterOptions } from './authTypes';

export type FormField = {
  name: string;
  registerOptions: MyRegisterOptions;
  type: string;
  label: string;
  placeholder: string;
  autoComplete: string;
};

// Add here your AsynkThunk parameter (name from form FormField type) for form Action
export interface ModalInputData {
  title: string;
  order: number;
  name: string;
  login: string;
  password: string;
}

// Add here your AsynkThunk type for confirm action
export type ModalConfirmAction = {
  removeBoard: typeof removeBoard;
  removeColumn: typeof removeColumn;
  removeUser: typeof removeUser;
};

// Add here your AsynkThunkAction type for form action
export type ModalFormAction = {
  addBoard: typeof addBoard;
  editBoard: typeof editBoard;
  addColumn: typeof addColumn;
  editColumn: typeof editColumn;
  editLogin: typeof editLogin;
  editName: typeof editName;
};

export type ModalAction = keyof ModalConfirmAction | keyof ModalFormAction;

export type Content = {
  modalTitle: string;
  action: ModalAction;
  fields?: FormField[];
};

export type ModalState = {
  title: string;
  action: ModalAction;
  isOpen: boolean;
  fields?: FormField[];
};
