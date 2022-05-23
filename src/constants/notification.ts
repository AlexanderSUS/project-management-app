import { NotificationState } from '../types/notification';

export enum Severity {

  info = 'info',
  success = 'success',
  error = 'error',
}

const greeteng = { message: 'Hello user!', severity: Severity.info };

const initialState: NotificationState = {
  isLoading: false,
  log: [greeteng],
};

export default initialState;
