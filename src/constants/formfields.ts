import { FormField, RegExpPatterns } from '../types/formTypes';
import { Content } from '../types/modal';

export const inputRegExps: RegExpPatterns = {
  user: '[A-Za-z][a-zA-Z ]+$',
  login: '^[A-Za-z][A-Za-z0-9_]{2,20}$',
  password: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
  boardsFields: '^[^\\s]+(\\s+[^\\s]+)*$',
};

export const DESCRIPTION = 'description';
export const MULTILINE_ROWS = 4;
export const DEFAULT_ROWS = 1;

const MAX_LENGTH_20 = {
  value: 20,
  message: 'nameErrors.maxLength',
};

const MAX_LENGTH_100 = {
  value: 100,
  message: 'nameErrors.maxLength100symbols',
};

const MIN_LENGTH_2 = {
  value: 2,
  message: 'nameErrors.min2symbolsLength',
};

const MIN_LENGTH_8 = {
  value: 8,
  message: 'passwordError.minLength',
};

const MIN_LENGTH_1 = {
  value: 1,
  message: 'nameErrors.minLength',
};

const AUTH_TEXT_REQUIRED = 'AuthText.REQUIRED';

const BOARD_MODAL_TEXT_REQUIRED = 'BoardModalText.REQUIRED';

const LIST_MODAL_TEXT_REQUIRED = 'ListModalText.REQUIRED';

const TASK_MODAL_TEXT_REQUIRED = 'TaskModalText.REQUIRED';

export const nameAuthInput: FormField = {
  name: 'name',
  type: 'text',
  placeholder: 'AuthText.NAME_PLACEHOLDER',
  registerOptions: {
    required: AUTH_TEXT_REQUIRED,
    minLength: MIN_LENGTH_2,
    maxLength: MAX_LENGTH_20,
    pattern: {
      value: inputRegExps.user,
      message: 'nameErrors.pattern',
    },
  },
  label: 'AuthText.NAME',
};

export const loginAuthInput: FormField = {
  name: 'login',
  type: 'text',
  placeholder: 'AuthText.LOGIN_PLACEHOLDER',
  registerOptions: {
    required: AUTH_TEXT_REQUIRED,
    pattern: {
      value: inputRegExps.login,
      message: 'loginErrors.pattern',
    },
  },
  label: 'AuthText.LOGIN',
};

export const passwordAuthInput: FormField = {
  name: 'password',
  type: 'password',
  placeholder: 'AuthText.PASSWORD_PLACEHOLDER',
  registerOptions: {
    required: AUTH_TEXT_REQUIRED,
    minLength: MIN_LENGTH_8,
    maxLength: MAX_LENGTH_20,
    pattern: {
      value: inputRegExps.password,
      message: 'passwordError.pattern',
    },
  },
  label: 'AuthText.PASSWORD',
};

export const NEW_BOARD: Content = {
  modalTitle: 'BoardModalText.BOARD_TITLE',
  action: 'addBoard',
  fields: [
    {
      registerOptions: {
        required: BOARD_MODAL_TEXT_REQUIRED,
        maxLength: MAX_LENGTH_20,
        minLength: MIN_LENGTH_1,
        pattern: {
          value: inputRegExps.boardsFields,
          message: 'boardsFieldsPatternError',
        },
      },
      name: 'title',
      type: 'text',
      label: 'BoardModalText.TITLE_LABEL',
      placeholder: 'BoardModalText.TITLE_PLACEHOLDER',
    },
    {
      registerOptions: {
        required: BOARD_MODAL_TEXT_REQUIRED,
        pattern: {
          value: inputRegExps.boardsFields,
          message: 'boardsFieldsPatternError',
        },
      },
      name: 'description',
      type: 'input',
      label: 'BoardModalText.DESCRIPTION_LABEL',
      placeholder: 'BoardModalText.DESCRIPTION_PLACEHOLDER',
    },
  ],
};

export const REMOVE_BOARD: Content = {
  modalTitle: 'BoardModalText.BOARD_TITLE_DELITE',
  action: 'removeBoard',
};

export const EDIT_BOARD: Content = {
  modalTitle: 'BoardModalText.BOARD_TITLE_EDIT',
  action: 'editBoard',
  fields: [
    { ...NEW_BOARD.fields![0], placeholder: 'BoardModalText.TITLE_PLACEHOLDER_EDIT' },
    { ...NEW_BOARD.fields![1], placeholder: 'BoardModalText.DESCRIPTION_PLACEHOLDER_EDIT' },
  ],
};

export const ADD_COLUMN: Content = {
  modalTitle: 'ListModalText.LIST_TITLE',
  action: 'addColumn',
  fields: [
    {
      registerOptions: {
        required: LIST_MODAL_TEXT_REQUIRED,
        maxLength: MAX_LENGTH_20,
        minLength: MIN_LENGTH_1,
        pattern: {
          value: inputRegExps.boardsFields,
          message: 'boardsFieldsPatternError',
        },
      },
      name: 'title',
      type: 'text',
      label: 'ListModalText.TITLE_LABEL',
      placeholder: 'ListModalText.TITLE_PLACEHOLDER',
    },
  ],
};

export const REMOVE_COLUMN: Content = {
  modalTitle: 'ListModalText.LIST_TITLE_DELITE',
  action: 'removeColumn',
};

export const EDIT_COLUMN_TITLE: Partial<Content> = {
  modalTitle: 'ListModalText.LIST_TITLE_EDITE',
  fields: [{ ...ADD_COLUMN.fields![0], placeholder: 'ListModalText.TITLE_PLACEHOLDER_EDIT' }],
};

export const EDIT_NAME: Content = {
  modalTitle: 'AuthText.EDIT_NAME',
  action: 'editName',
  fields: [
    {
      ...nameAuthInput,
      placeholder: 'AuthText.NAME_PLACEHOLDER_EDIT',
    },
    {
      ...passwordAuthInput,
      placeholder: 'AuthText.PASSWORD_PLACEHOLDER_EDIT',
    },
  ],
};

export const EDIT_LOGIN: Content = {
  modalTitle: 'AuthText.EDIT_LOGIN',
  action: 'editLogin',
  fields: [
    {
      ...loginAuthInput,
      placeholder: 'AuthText.LOGIN_PLACEHOLDER_EDIT',
    },
    {
      ...passwordAuthInput,
      placeholder: 'AuthText.PASSWORD_PLACEHOLDER_EDIT',
    },
  ],
};

export const REMOVE_USER: Content = {
  modalTitle: 'AuthText.DELITE_USER',
  action: 'removeUser',
};

export const ADD_TASK: Content = {
  modalTitle: 'TaskModalText.TASK_TITLE',
  action: 'addTask',
  fields: [
    {
      registerOptions: {
        required: TASK_MODAL_TEXT_REQUIRED,
        maxLength: MAX_LENGTH_100,
        minLength: MIN_LENGTH_1,
        pattern: {
          value: inputRegExps.boardsFields,
          message: 'boardsFieldsPatternError',
        },
      },
      name: 'title',
      type: 'text',
      label: 'TaskModalText.TITLE_LABEL',
      placeholder: 'TaskModalText.TITLE_PLACEHOLDER',
    },
    {
      registerOptions: {
        required: TASK_MODAL_TEXT_REQUIRED,
        pattern: {
          value: inputRegExps.boardsFields,
          message: 'boardsFieldsPatternError',
        },
      },
      name: 'description',
      type: 'input',
      label: 'TaskModalText.DESCRIPTION_LABEL',
      placeholder: 'TaskModalText.DESCRIPTION_PLACEHOLDER',
    },
  ],
};

export const EDIT_TASK: Content = {
  modalTitle: 'TaskModalText.TASK_TITLE_EDITE',
  action: 'editTask',
  fields: [
    { ...ADD_TASK.fields![0], placeholder: 'TaskModalText.TITLE_PLACEHOLDER_EDIT' },
    { ...ADD_TASK.fields![1], placeholder: 'TaskModalText.DESCRIPTION_PLACEHOLDER_EDIT' },
  ],
};

export const REMOVE_TASK: Content = {
  modalTitle: 'TaskModalText.TASK_TITLE_DELITE',
  action: 'removeTask',
};

export const SHOW_TASK: Content = {
  modalTitle: 'info.task',
  action: 'noAction',
};

export const SHOW_BOARD: Content = {
  modalTitle: 'info.board',
  action: 'noAction',
};
