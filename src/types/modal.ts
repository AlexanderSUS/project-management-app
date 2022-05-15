import { AsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import {
  BoardId, Boards, BoardType, NewBoard,
} from './boards';
import { ValidationErrors } from './response';

type FormField = {
  id: string;
  required: boolean;
  label: string;
  defaultValue: string;
  placeholder: string;
};

// Add here your AsynkThunkAction type
export type ModalAction = {
  addBoard: AsyncThunk<BoardType, NewBoard, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
  editBoard: AsyncThunk<BoardType, BoardType, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
  removeBoard: AsyncThunk<Boards, BoardId, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
};

// Add here your AsynkThunk parameter
export type ModalInputData = NewBoard | BoardType | BoardId;

export type ModalForm = {
  action: keyof ModalAction;
  fields: FormField[];
};

export type ModalPayload = {
  form: ModalForm;
  dataId?: string;
};

export type ModalState = {
  isOpen: boolean;
  form: ModalForm;
  dataId: string;
};
