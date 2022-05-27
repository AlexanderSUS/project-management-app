import { editLogin, editName, removeUser } from '../store/authSlice';
import { addBoard, editBoard, removeBoard } from '../store/boardSlice';
import { addColumn, removeColumn } from '../store/columnSlice';
import { addTask, editTask, removeTask } from '../store/taskSlice';
import { FormField } from './formTypes';

// Add here your AsynkThunk type for confirm action
export type ModalConfirmAction = {
  removeBoard: typeof removeBoard;
  removeColumn: typeof removeColumn;
  removeUser: typeof removeUser;
  removeTask: typeof removeTask;
};

// Add here your AsynkThunkAction type for form action
export type ModalFormAction = {
  addBoard: typeof addBoard;
  editBoard: typeof editBoard;
  addColumn: typeof addColumn;
  editLogin: typeof editLogin;
  editName: typeof editName;
  addTask: typeof addTask;
  editTask: typeof editTask;
};

export type ModalActions = ModalConfirmAction & ModalFormAction;

export type ModalActionKey = keyof ModalActions;

export type Content = {
  modalTitle: string;
  action: ModalActionKey;
  fields?: FormField[];
};

export type ModalState = {
  title: string;
  action: ModalActionKey;
  isOpen: boolean;
  fields?: FormField[];
  defaultValues: string[];
};
