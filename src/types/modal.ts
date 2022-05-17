import {
  addBoard, editBoard, removeBoard,
} from '../store/boardSlice';
import { addColumn, editColumn, removeColumn } from '../store/columnSlice';

type FormField = {
  name: string;
  required: boolean;
  label: string;
  defaultValue: string;
  placeholder: string;
};

// Add here your AsynkThunk parameter (name from form FormField type) for form Action
export interface ModalInputData {
  title: string;
  order: number;
}

// Add here your AsynkThunk type for confirm action
export type ModalConfirmAction = {
  removeBoard: typeof removeBoard;
  removeColumn: typeof removeColumn;
};

// Add here your AsynkThunkAction type for form action
export type ModalFormAction = {
  addBoard: typeof addBoard;
  editBoard: typeof editBoard;
  addColumn: typeof addColumn;
  editColumn: typeof editColumn;
};

export type ModalType = 'confirmation' | 'form';

export type ModalAction = keyof ModalConfirmAction | keyof ModalFormAction;

export type Content = {
  modalType: ModalType;
  modalTitle: string;
  action: ModalAction;
  fields?: FormField[];
};

export type ModalState = {
  title: string;
  modalType: ModalType;
  action: ModalAction;
  isOpen: boolean;
  fields?: FormField[];
};
