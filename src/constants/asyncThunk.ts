enum ThunkError {
  unknownError = 'Server Error',
}

export default ThunkError;

export const PENDING = '/pending';
export const REJECTED = '/rejected';
export const FULFILED = '/fulfilled';
