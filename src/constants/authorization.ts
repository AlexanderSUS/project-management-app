import { AuthState } from '../types/authTypes';
import { FormField } from '../types/formTypes';
import { loginAuthInput, passwordAuthInput, nameAuthInput } from './formfields';

export const API_URL = 'https://mighty-headland-55040.herokuapp.com';

export const TOKEN = 'token';

export const initialState: AuthState = {
  isLoading: false,
  error: '',
  userId: '',
  userName: '',
  login: '',
  newUser: null,
};

export enum AuthTextEn {
  name = 'Name',
  login = 'Login',
  PASSWORD = 'Password',
  LOG_IN = 'Log In',
  LOG_OUT = 'Log Out',
  SIGN_UP = 'Sign Up',
  SUBMIT = 'Submit',
}

export enum AuthTextRu {
  name = 'Имя',
  login = 'Логин',
  PASSWORD = 'Пароль',
  LOG_IN = 'Вход',
  LOG_OUT = 'Выход',
  SIGN_UP = 'Регистрация',
  SUBMIT = 'Подтвердить',
}

export const SIGNIN_INPUTS: FormField[] = [loginAuthInput, passwordAuthInput];
export const SIGNUP_INPUTS: FormField[] = [nameAuthInput, loginAuthInput, passwordAuthInput];
