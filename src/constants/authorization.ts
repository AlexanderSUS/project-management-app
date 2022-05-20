import { RegExpPatterns, AuthState } from '../types/authTypes';
import { FormField } from '../types/modal';

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

export const inputRegExps: RegExpPatterns = {
  user: '[A-Za-z][a-zA-Z ]+$',
  login: '^[A-Za-z][A-Za-z0-9_]{2,20}$',
  password: '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$',
};

export const nameAuthInput: FormField = {
  name: 'name',
  type: 'text',
  placeholder: 'Input your name',
  autoComplete: 'name',
  registerOptions: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'nameErrors.minLength',
    },
    maxLength: {
      value: 20,
      message: 'nameErrors.maxLength',
    },
    pattern: {
      value: inputRegExps.user,
      message: 'nameErrors.pattern',
    },
  },
  label: 'AuthText.name',
};

export const loginAuthInput: FormField = {
  name: 'login',
  type: 'text',
  placeholder: 'Input your username',
  autoComplete: 'username001',
  registerOptions: {
    required: 'This field is required',
    pattern: {
      value: inputRegExps.login,
      message: 'loginErrors.pattern',
    },
  },
  label: 'AuthText.login',
};

export const passwordAuthInput: FormField = {
  name: 'password',
  type: 'password',
  placeholder: 'Enter your password',
  autoComplete: 'current-password',
  registerOptions: {
    required: 'This field is required',
    minLength: {
      value: 8,
      message: 'passwordError.minLength',
    },
    maxLength: {
      value: 20,
      message: 'passwordError.maxLength',
    },
    pattern: {
      value: inputRegExps.password,
      message: 'passwordError.pattern',
    },
  },
  label: 'AuthText.PASSWORD',
};

export const SIGNIN_INPUTS: FormField[] = [loginAuthInput, passwordAuthInput];
export const SIGNUP_INPUTS: FormField[] = [nameAuthInput, loginAuthInput, passwordAuthInput];
