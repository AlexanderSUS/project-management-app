import { RootState } from '../store/store';
import { ValidationErrors } from './response';

export type TypedThunkAPI = {
  state: RootState
  rejectWithValue: ValidationErrors
};
