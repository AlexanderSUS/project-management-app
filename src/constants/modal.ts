import {
  ModalState, Content, ModalConfirmAction, ModalFormAction,
} from '../types/modal';
import { addBoard, editBoard, removeBoard } from '../store/boardSlice';
import { addColumn, editColumn, removeColumn } from '../store/columnSlice';
import { editLogin, editName, removeUser } from '../store/authSlice';

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
  modalType: 'form',
  modalTitle: 'New board',
  action: 'addBoard',
  fields: [{
    required: true,
    name: 'title',
    type: 'text',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input board title',
  }],
};

// Such way must look your 'content' for modal window with yes/no buttons
export const REMOVE_BOARD: Content = {
  modalType: 'confirmation',
  modalTitle: 'Do you really want to delete board?',
  action: 'removeBoard',
};

export const EDIT_BOARD: Content = {
  modalType: 'form',
  modalTitle: 'Edit board',
  action: 'editBoard',
  fields: [{
    required: true,
    name: 'title',
    type: 'text',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input new board title',
  }],
};

export const ADD_COLUMN: Content = {
  modalType: 'form',
  modalTitle: 'New list',
  action: 'addColumn',
  fields: [{
    required: true,
    name: 'title',
    type: 'text',
    label: 'Column title',
    defaultValue: '',
    placeholder: 'Input column title',
  },
  ],
};

export const REMOVE_COLUMN: Content = {
  modalType: 'confirmation',
  modalTitle: 'Do you really want to delete list?',
  action: 'removeColumn',
};

export const EDIT_COLUMN_TITLE: Content = {
  modalType: 'form',
  modalTitle: 'Edit list title',
  action: 'editColumn',
  fields: [{
    required: true,
    name: 'title',
    type: 'text',
    label: 'List title',
    defaultValue: '',
    placeholder: 'Input new list title',
  },
  ],
};

// TODO add password validation to modal window
export const EDIT_NAME: Content = {
  modalType: 'form',
  modalTitle: 'Edit user name',
  action: 'editName',
  fields: [{
    required: true,
    name: 'name',
    type: 'text',
    label: 'New name',
    defaultValue: '',
    placeholder: 'Input new name',
  },
  {
    required: true,
    name: 'password',
    type: 'password',
    label: 'password',
    defaultValue: '',
    placeholder: 'Input your password for confirmation',
  },
  ],
};

// TODO add password validation to modal window
export const EDIT_LOGIN: Content = {
  modalType: 'form',
  modalTitle: 'Edit login',
  action: 'editLogin',
  fields: [{
    required: true,
    name: 'login',
    type: 'text',
    label: 'New login name',
    defaultValue: '',
    placeholder: 'Input new login',
  },
  {
    required: true,
    name: 'password',
    type: 'password',
    label: 'password',
    defaultValue: '',
    placeholder: 'Input your password for confirmation',
  },
  ],
};

export const REMOVE_USER : Content = {
  modalType: 'confirmation',
  modalTitle: 'Do you really want to delete your accoutn?',
  action: 'removeUser',
};

const initialState: ModalState = {
  isOpen: false, title: '', action: 'addBoard', modalType: 'confirmation',
};

export default initialState;
