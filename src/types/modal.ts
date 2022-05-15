import { AsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Boards } from './boards';
import { ValidationErrors } from './response';

type FormField = {
  // id here means react hook form input name
  id: string;
  required: boolean;
  label: string;
  defaultValue: string;
  placeholder: string;
};

// Add here your AsynkThunk parameter for form Action
export interface ModalInputData {
  title: string;
}

export interface FormActionData extends ModalInputData {
  id: string;
}

// Add here your AsynkThunk type for confirm action
export type ModalConfirmAction = {
  removeBoard: AsyncThunk<Boards, string, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
};

// Add here your AsynkThunkAction type for form action
export type ModalFormAction = {
  addBoard: AsyncThunk<Boards, FormActionData, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
  editBoard: AsyncThunk<Boards, FormActionData, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
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
  dataId: string;
  action: ModalAction;
};

export type ModalState = {
  title: string;
  modalType: ModalType;
  action: ModalAction;
  isOpen: boolean;
  fields?: FormField[];
  dataId: string;
};
