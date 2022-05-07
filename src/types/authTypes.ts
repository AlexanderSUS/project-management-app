import { AuthErrorResponse } from './response';
import { CurrentUser, NewUser } from './user';

export type IsAuth = boolean;

export type AuthState = {
  isAuth: IsAuth;
  newUser: NewUser;
  currentUser: CurrentUser;
  error: AuthErrorResponse;
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

export type SignUpInputType = keyof SignUpFormInput;

export type SignInFormInput = {
  name: string;
  login: string;
  password: string;
};

export type SignInInputType = keyof SignUpFormInput;

export type RegExpPatterns = {
  [key: string]: RegExp;
};

type AuthIputProperties = {
  id: string;
  type: 'text' | 'password' | 'email',
  placeholder: string,
  autoComplete?: string;
};

type RegisterOpion = {
  value: number;
  message: string;
};

type RegisterPattern = {
  value: RegExp;
  message: string;
};

type RegisterOptions = {
  required: string;
  minLength?: RegisterOpion;
  maxLength?: RegisterOpion;
  pattern?: RegisterPattern;
};

export type AuthInput = {
  properties: AuthIputProperties;
  registerOptions: RegisterOptions;
  labelText: string;
};
