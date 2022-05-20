import { FormField, RegExpPatterns } from '../types/formTypes';
import { Content } from '../types/modal';

export const inputRegExps: RegExpPatterns = {
  user: '[A-Za-z][a-zA-Z ]+$',
  login: '^[A-Za-z][A-Za-z0-9_]{2,20}$',
  password: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
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

export const NEW_BOARD: Content = {
  modalTitle: 'New board',
  action: 'addBoard',
  fields: [{
    registerOptions: {
      required: 'This field is required',
      maxLength: {
        value: 20,
        message: 'nameErrors.maxLength',
      },
      minLength: {
        value: 1,
        // TODO ADD translation for '1' value
        message: 'nameErrors.minLength',
      },
    },
    name: 'title',
    type: 'text',
    label: 'Board title',
    placeholder: 'Input board title',
    // TODO add translation
    autoComplete: 'New board',
  }],
};

// Such way must look your 'content' for modal window with yes/no buttons
export const REMOVE_BOARD: Content = {
  modalTitle: 'Do you really want to delete board?',
  action: 'removeBoard',
};

export const EDIT_BOARD: Content = {
  modalTitle: 'Edit board',
  action: 'editBoard',
  fields: [{
    registerOptions: {
      required: 'This field is required',
      maxLength: {
        value: 20,
        message: 'nameErrors.maxLength',
      },
      minLength: {
        value: 1,
        // TODO ADD translation for '1' value
        message: 'nameErrors.minLength',
      },
    },
    name: 'title',
    type: 'text',
    label: 'Board title',
    placeholder: 'Input new board title',
    // TODO add translation
    autoComplete: 'New board',
  }],
};

export const ADD_COLUMN: Content = {
  modalTitle: 'New list',
  action: 'addColumn',
  fields: [{
    registerOptions: {
      required: 'This field is required',
      maxLength: {
        value: 20,
        message: 'nameErrors.maxLength',
      },
      minLength: {
        value: 1,
        // TODO ADD translation for '1' value
        message: 'nameErrors.minLength',
      },
    },
    name: 'title',
    type: 'text',
    label: 'Column title',
    placeholder: 'Input column title',
    // TODO add translation
    autoComplete: 'New list',
  },
  ],
};

export const REMOVE_COLUMN: Content = {
  modalTitle: 'Do you really want to delete list?',
  action: 'removeColumn',
};

export const EDIT_COLUMN_TITLE: Content = {
  modalTitle: 'Edit list title',
  action: 'editColumn',
  fields: [{
    registerOptions: {
      required: 'This field is required',
      maxLength: {
        value: 20,
        message: 'nameErrors.maxLength',
      },
      minLength: {
        value: 1,
        // TODO ADD translation for '1' value
        message: 'nameErrors.minLength',
      },
    },
    name: 'title',
    type: 'text',
    label: 'List title',
    placeholder: 'Input new list title',
    // TODO add translation
    autoComplete: 'New list',
  },
  ],
};

// TODO add password validation to modal window
export const EDIT_NAME: Content = {
  modalTitle: 'Edit user name',
  action: 'editName',
  fields: [{
    ...nameAuthInput,
    placeholder: 'Input new name',
  },
  {
    ...passwordAuthInput,
    // TODO add translation
    placeholder: 'Input your password for confirmation',
  },
  ],
};

export const EDIT_LOGIN: Content = {
  modalTitle: 'Edit login',
  action: 'editLogin',
  fields: [{
    ...loginAuthInput,
    placeholder: 'Input new login',
  },
  {
    ...passwordAuthInput,
    // TODO add translation
    placeholder: 'Input your password for confirmation',
  },
  ],
};

export const REMOVE_USER : Content = {
  modalTitle: 'Do you really want to delete your accoutn?',
  action: 'removeUser',
};
