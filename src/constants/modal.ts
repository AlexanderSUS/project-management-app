import {
  ModalState, Content, ModalConfirmAction, ModalFormAction,
} from '../types/modal';
import { addBoard, editBoard, removeBoard } from '../store/boardSlice';

// Add here your action for modal with form
export const modalFormAction: ModalFormAction = {
  addBoard,
  editBoard,
};

// Add here your action from modal with confrim buttons
export const modalConfirmAction: ModalConfirmAction = {
  removeBoard,
};

// Such way must look your 'content' with form fields for modal window
export const NEW_BOARD: Content = {
  modalType: 'form',
  modalTitle: 'Add new board',
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

const initialState: ModalState = {
  isOpen: false, title: '', action: 'addBoard', modalType: 'confirmation',
};

export default initialState;
