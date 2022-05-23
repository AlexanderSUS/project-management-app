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
        value: 40,
        // TODO ADD translation for '40' value
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
  fields: [
    { ...NEW_BOARD.fields![0], placeholder: 'Input new board title' },
  ],
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
  fields: [{ ...ADD_COLUMN.fields![0], placeholder: 'Input new list title' },
  ],
};

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

export const ADD_TASK: Content = {
  modalTitle: 'Add task',
  action: 'addTask',
  fields: [{
    registerOptions: {
      required: 'This field is required',
      maxLength: {
        value: 100,
        message: 'No more than 100 symbols',
      },
      minLength: {
        value: 1,
        // TODO ADD translation for '1' value
        message: 'nameErrors.minLength',
      },
    },
    name: 'title',
    type: 'text',
    label: 'Task title',
    placeholder: 'Input task title',
  },
  {
    registerOptions: { },
    name: 'description',
    type: 'text',
    label: 'description',
    placeholder: 'Input task description',
  },
  ],
};

export const EDIT_TASK: Content = {
  modalTitle: 'Edit task',
  action: 'editTask',
  fields: [
    { ...ADD_TASK.fields![0], placeholder: 'Input new task title' },
    { ...ADD_TASK.fields![1], placeholder: 'Input new description' },
  ],
};

export const REMOVE_TASK: Content = {
  modalTitle: 'Do you really want to delete task?',
  action: 'removeTask',
};
