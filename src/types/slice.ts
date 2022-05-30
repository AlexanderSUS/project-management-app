import { AsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import {
  ValidationErrors, RemoveUserResponse, SignInResponse, SignUpResponse,
} from './response';
import { AppFormData } from './formTypes';
import { NewUser, User, UserData } from './user';
import { IBoard } from './boards';

export type TypedThunkAPI = {
  state: RootState
  rejectWithValue: ValidationErrors
};

export type GenericAsyncThunk = AsyncThunk<
SignInResponse | SignUpResponse | UserData | RemoveUserResponse | IBoard[],
string | User | AppFormData | void | NewUser,
TypedThunkAPI>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
