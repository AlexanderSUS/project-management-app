import { ModalState, ModalForm, ModalAction } from '../types/modal';
import { addBoard, editBoard, removeBoard } from '../store/boardSlice';

// Add here your action
export const modalAction: ModalAction = {
  addBoard,
  editBoard,
  removeBoard,
};

// This way must look your input for modal window
export const NEW_BOARD: ModalForm = {
  action: 'addBoard',
  modalTitle: 'Add board',
  fields: [{
    required: true,
    id: 'title',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input board title',
  }],
};

export const REMOVE_BOARD: ModalForm = {
  action: 'removeBoard',
  modalTitle: 'Remove board',
  fields: [{
    required: true,
    id: 'title',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input board title for submit',
  }],
};

export const EDIT_BOARD: ModalForm = {
  action: 'editBoard',
  modalTitle: 'Edit board',
  fields: [{
    required: true,
    id: 'title',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input new board title',
  }],
};

const initialState: ModalState = { isOpen: false, form: NEW_BOARD };

export default initialState;
