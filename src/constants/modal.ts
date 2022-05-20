import {
  ModalState, Content, ModalConfirmAction, ModalFormAction,
} from '../types/modal';
import { addBoard, editBoard, removeBoard } from '../store/boardSlice';
import { addColumn, editColumn, removeColumn } from '../store/columnSlice';
import { editLogin, editName, removeUser } from '../store/authSlice';
import { loginAuthInput, passwordAuthInput, userAuthInput } from './authorization';

// Add here your action for modal with form
export const modalFormAction: ModalFormAction = {
  addBoard,
  editBoard,
  addColumn,
  editColumn,
  editLogin,
  editName,
};

// Add here your action for modal with confrim buttons
export const modalConfirmAction: ModalConfirmAction = {
  removeBoard,
  removeColumn,
  removeUser,
};

// Such way must look your 'content' with form fields for modal window
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
    defaultValue: '',
    placeholder: 'Input board title',
    // TODO add translation
    autocomplete: 'New board',
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
    defaultValue: '',
    placeholder: 'Input new board title',
    // TODO add translation
    autocomplete: 'New board',
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
    defaultValue: '',
    placeholder: 'Input column title',
    // TODO add translation
    autocomplete: 'New list',
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
    defaultValue: '',
    placeholder: 'Input new list title',
    // TODO add translation
    autocomplete: 'New list',
  },
  ],
};

// TODO add password validation to modal window
export const EDIT_NAME: Content = {
  modalTitle: 'Edit user name',
  action: 'editName',
  fields: [{
    registerOptions: userAuthInput.registerOptions,
    name: 'name',
    type: 'text',
    label: 'New name',
    defaultValue: '',
    placeholder: 'Input new name',
    autocomplete: 'Teodor',
  },
  {
    registerOptions: passwordAuthInput.registerOptions,
    name: 'password',
    type: 'password',
    label: 'password',
    defaultValue: '',
    // TODO add translation
    placeholder: 'Input your password for confirmation',
    autocomplete: 'current-password',
  },
  ],
};

// TODO add password validation to modal window
export const EDIT_LOGIN: Content = {
  modalTitle: 'Edit login',
  action: 'editLogin',
  fields: [{
    registerOptions: loginAuthInput.registerOptions,
    name: 'login',
    type: 'text',
    label: 'New login name',
    defaultValue: '',
    placeholder: 'Input new login',
    autocomplete: 'CoolLogin777',
  },
  {
    registerOptions: passwordAuthInput.registerOptions,
    name: 'password',
    type: 'password',
    label: 'password',
    defaultValue: '',
    // TODO add translation
    placeholder: 'Input your password for confirmation',
    autocomplete: 'current-password',
  },
  ],
};

export const REMOVE_USER : Content = {
  modalTitle: 'Do you really want to delete your accoutn?',
  action: 'removeUser',
};

const initialState: ModalState = {
  isOpen: false, title: '', action: 'addBoard',
};

export default initialState;
