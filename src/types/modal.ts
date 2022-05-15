import { AsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Boards, BoardType, NewBoard } from './boards';
import { ValidationErrors } from './response';

type FormField = {
  id: string;
  required: boolean;
  label: string;
  defaultValue: string;
  placeholder: string;
};

// Add here your AsynkThunk type for confirm action
export type ModalConfirmAction = {
  removeBoard: AsyncThunk<Boards, string, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
};

// Add here your AsynkThunkAction type for form action
export type ModalFormAction = {
  addBoard: AsyncThunk<BoardType, NewBoard, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
  editBoard: AsyncThunk<BoardType, BoardType, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
};

// Add here your AsynkThunk parameter for form Action
export type ModalInputData = NewBoard | BoardType;

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
