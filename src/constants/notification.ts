import { NotificationState } from '../types/notification';

export enum Severity {

  info = 'info',
  success = 'success',
  error = 'error',
}

const greeteng = { message: 'info.helloUser', severity: Severity.info };

const initialState: NotificationState = {
  isLoading: false,
  log: [greeteng],
};

export default initialState;

export const ERROR_401 = 401;
export const ERROR_404 = 404;
export const ERROR_403 = 403;
export const ERROR_409 = 409;
