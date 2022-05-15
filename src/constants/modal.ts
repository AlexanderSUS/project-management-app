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

// This way must look your input for modal window
export const NEW_BOARD: Content = {
  modalType: 'form',
  modalTitle: 'Add new board',
  fields: [{
    required: true,
    id: 'title',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input board title',
  }],
};

export const REMOVE_BOARD: Content = {
  modalType: 'confirmation',
  modalTitle: 'Do you really want to delete board?',
};

export const EDIT_BOARD: Content = {
  modalType: 'form',
  modalTitle: 'Edit board',
  fields: [{
    required: true,
    id: 'title',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input new board title',
  }],
};

const initialState: ModalState = {
  isOpen: false, title: '', action: 'addBoard', modalType: 'confirmation', dataId: '',
};

export default initialState;
