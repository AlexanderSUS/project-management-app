import { AsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { BoardType } from './boards';
import { ValidationErrors } from './response';

type FormField = {
  required: boolean;
  id: string;
  label: string;
  defaultValue: string;
};

// Add here your AsynkThunkReturnType
type BoardActionReturnValue = BoardType;

// Add here your AsynkThunkAction
export type ModalAction = {
  addBoard: AsyncThunk<BoardActionReturnValue, ModalFormData, {
    state: RootState, rejectWithValue: ValidationErrors
  }>;
};

export type ModalForm = {
  action: keyof ModalAction;
  fields: FormField[];
};

export type ModalFormData = {
  [key: string]: string;
};

export type ModalState = {
  isOpen: boolean;
  form: ModalForm | null;
};
