import { HTMLProps } from 'react';
import { RegisterOptions } from 'react-hook-form';
import type { NewUser } from './user';

export type AuthState = {
  isLoading: boolean;
  login: string;
  userId: string;
  userName: string;
  newUser: NewUser | null;
  error: string;
};

export type JwtData = {
  userId: string;
  login: string;
  iat: number;
};

// Auth form types
export type SignUpFormInput = {
  name: string;
  login: string;
  password: string;
};

export type SignInFormInput = {
  login: string;
  password: string;
};

export type RegExpPatterns = {
  [key: string]: RegExp;
};

export type AuthInput = {
  properties: HTMLProps<HTMLInputElement>;
  registerOptions: RegisterOptions;
  labelText: string;
};
