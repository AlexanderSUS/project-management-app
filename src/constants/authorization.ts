import { RegExpPatterns, AuthInput, AuthState } from '../types/authTypes';

export const API_URL = 'https://mighty-headland-55040.herokuapp.com';

export const TOKEN = 'token';

export const initialState: AuthState = {
  isLoading: false,
  error: {
    message: '',
  },
  userId: null,
  login: null,
  newUser: null,
  userData: {
    id: '',
    login: '',
    name: '',
  },
};

export enum AuthText {
  name = 'Name',
  login = 'Login',
  PASSWORD = 'Password',
  LOG_IN = 'Log In',
  LOG_OUT = 'Log Out',
  SIGN_UP = 'Sign Up',
  SIGN_IN = 'Sign In',
  SUBMIT = 'Submit',
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
      message: 'Value must be no less than 2 symbols',
    },
    maxLength: {
      value: 20,
      message: 'Value must be no more than 20 symbols',
    },
    pattern: {
      value: inputRegEpxs.user,
      message: 'name must starts with capital letter',
    },
  },
  labelText: AuthText.name,
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
      message: 'Invalid username',
    },
  },
  labelText: AuthText.login,
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
      message: 'Password must be no less than 8 symbols',
    },
    maxLength: {
      value: 20,
      message: 'Password must be no more than 20 symbols',
    },
    pattern: {
      value: inputRegEpxs.password,
      message: 'Minimum eight characters, at least one letter and one number',
    },
  },
  labelText: AuthText.PASSWORD,
};

export const SIGNIN_INPUTS: AuthInput[] = [
  loginAuthInput,
  passwordAuthInput,
];

export const SIGNUP_INPUTS: AuthInput[] = [
  userAuthInput,
  loginAuthInput,
  passwordAuthInput,
];
