import { RegExpPatterns, AuthInput, AuthState } from '../types/authTypes';

export const API_URL = 'https://mighty-headland-55040.herokuapp.com';

export const TOKEN = 'token';

export const initialState: AuthState = {
  isLoading: false,
  error: '',
  userId: '',
  login: '',
  newUser: null,
  userData: {
    id: '',
    login: '',
    name: '',
  },
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

const inputRegEpxs: RegExpPatterns = {
  user: /[A-Za-z][a-zA-Z ]+$/,
  login: /^[A-Za-z][A-Za-z0-9_]{2,20}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

export const userAuthInput: AuthInput = {
  properties: {
    id: 'name',
    type: 'text',
    placeholder: 'Input your name',
    autoComplete: 'name',
  },
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
      value: inputRegEpxs.user,
      message: 'nameErrors.pattern',
    },
  },
  labelText: 'AuthText.name',
};

export const loginAuthInput: AuthInput = {
  properties: {
    id: 'login',
    type: 'text',
    placeholder: 'Input your username',
    autoComplete: 'username001',
  },
  registerOptions: {
    required: 'This field is required',
    pattern: {
      value: inputRegEpxs.login,
      message: 'loginErrors.pattern',
    },
  },
  labelText: 'AuthText.login',
};

const passwordAuthInput: AuthInput = {
  properties: {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    autoComplete: 'current-password',
  },
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
      value: inputRegEpxs.password,
      message: 'passwordError.pattern',
    },
  },
  labelText: 'AuthText.PASSWORD',
};

export const SIGNIN_INPUTS: AuthInput[] = [loginAuthInput, passwordAuthInput];

export const SIGNUP_INPUTS: AuthInput[] = [userAuthInput, loginAuthInput, passwordAuthInput];
