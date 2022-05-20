enum ThunkError {
  notAuthorized = 'Your session has expired. Please log in',
  unknownError = 'Server Error',
}

export default ThunkError;

export const PENDING = '/pending';
export const REJECTED = '/rejected';
export const FULFILED = '/fulfilled';
