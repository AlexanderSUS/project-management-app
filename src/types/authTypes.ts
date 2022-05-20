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
  [key: string]: string;
};

export type AuthInputFeldProps = {
  id: string;
  type: string;
  placeholder: string;
  autoComplete: string;
};

export type MyRegisterOptions = {
  required: string,
  minLength?: {
    value: number,
    message: string,
  },
  maxLength?: {
    value: number,
    message: string,
  },
  pattern?: {
    value: string,
    message: string,
  },

};
