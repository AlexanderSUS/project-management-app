import {
  ModalState, Content, ModalConfirmAction, ModalFormAction,
} from '../types/modal';
import { addBoard, editBoard, removeBoard } from '../store/boardSlice';
import { addColumn, editColumn, removeColumn } from '../store/columnSlice';

// Add here your action for modal with form
export const modalFormAction: ModalFormAction = {
  addBoard,
  editBoard,
  addColumn,
  editColumn,
};

// Add here your action from modal with confrim buttons
export const modalConfirmAction: ModalConfirmAction = {
  removeBoard,
  removeColumn,
};

// Such way must look your 'content' with form fields for modal window
export const NEW_BOARD: Content = {
  modalType: 'form',
  modalTitle: 'New board',
  action: 'addBoard',
  fields: [{
    required: true,
    name: 'title',
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
    label: 'List title',
    defaultValue: '',
    placeholder: 'Input new list title',
  },
  ],
};

const initialState: ModalState = {
  isOpen: false, title: '', action: 'addBoard', modalType: 'confirmation',
};

export default initialState;
