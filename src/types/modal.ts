import { addBoard, editBoard, removeBoard } from '../store/boardSlice';

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
}

// Add here your AsynkThunk type for confirm action
export type ModalConfirmAction = {
  removeBoard: typeof removeBoard;
};

// Add here your AsynkThunkAction type for form action
export type ModalFormAction = {
  addBoard: typeof addBoard;
  editBoard: typeof editBoard;
};

export type ModalType = 'confirmation' | 'form';

export type ModalAction = keyof ModalConfirmAction | keyof ModalFormAction;

export type Content = {
  modalType: ModalType;
  modalTitle: string;
  fields?: FormField[];
};

export type ModalPayload = {
  content: Content;
  action: ModalAction;
};

export type ModalState = {
  title: string;
  modalType: ModalType;
  action: ModalAction;
  isOpen: boolean;
  fields?: FormField[];
};
