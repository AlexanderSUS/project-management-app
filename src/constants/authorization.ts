import { AuthState } from '../types/authTypes';
import { FormField } from '../types/formTypes';
import { loginAuthInput, passwordAuthInput, nameAuthInput } from './formfields';

// THIS IS OLD
// export const API_URL = 'https://mighty-headland-55040.herokuapp.com';

// THIS IS NEW
export const API_URL = 'https://nameless-fjord-67107.herokuapp.com';

export const TOKEN = 'token';

export const initialState: AuthState = {
  userId: '',
  userName: '',
  login: '',
};

export enum AuthTextEn {
  NAME = 'Name',
  NAME_PLACEHOLDER = 'Input your name',
  NAME_PLACEHOLDER_EDIT = 'Input your new name',
  LOGIN = 'Login',
  LOGIN_PLACEHOLDER = 'Input your login',
  LOGIN_PLACEHOLDER_EDIT = 'Input your login',
  PASSWORD = 'Password',
  PASSWORD_PLACEHOLDER = 'Input your password',
  PASSWORD_PLACEHOLDER_EDIT = 'Input your new password',
  LOG_IN = 'Log In',
  LOG_OUT = 'Log Out',
  SIGN_UP = 'Sign Up',
  EDIT_NAME = 'Edit your name',
  EDIT_LOGIN = 'Edit your login',
  DELETE_USER = 'Do you really want to delete your accoutn?',
  SUBMIT = 'Submit',
  REQUIRED = 'This field is required',
}

export enum AuthTextRu {
  NAME = 'Имя',
  NAME_PLACEHOLDER = 'Введите ваше имя',
  NAME_PLACEHOLDER_EDIT = 'Введите ваше новое имя',
  LOGIN = 'Логин',
  LOGIN_PLACEHOLDER = 'Введите ваш логин',
  LOGIN_PLACEHOLDER_EDIT = 'Введите ваш новый логин',
  PASSWORD = 'Пароль',
  PASSWORD_PLACEHOLDER = 'Введите ваш пароль',
  PASSWORD_PLACEHOLDER_EDIT = 'Введите ваш новый пароль',
  LOG_IN = 'Вход',
  LOG_OUT = 'Выход',
  SIGN_UP = 'Регистрация',
  EDIT_NAME = 'Изменить ваше имя',
  EDIT_LOGIN = 'Изменить ваш логин',
  DELETE_USER = 'Вы действительно хотите удалить Ваш аккаунт?',
  SUBMIT = 'Подтвердить',
  REQUIRED = 'Это поле обязательное',
}

export const SIGNIN_INPUTS: FormField[] = [loginAuthInput, passwordAuthInput];
export const SIGNUP_INPUTS: FormField[] = [nameAuthInput, loginAuthInput, passwordAuthInput];
