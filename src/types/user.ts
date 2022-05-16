import { SignUpFormInput } from './authTypes';

export interface User {
  login: string;
  password: string;
}

export interface NewUser {
  name: string;
  login: string;
  password: string;
}

export type UserData = {
  id: string;
  name: string;
  login: string;
};

export type UserDataParams = {
  id: string;
  userData: SignUpFormInput;
};
