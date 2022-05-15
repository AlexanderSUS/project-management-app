import { ModalState, ModalForm, ModalAction } from '../types/modal';
import { addBoard } from '../store/boardSlice';

// Add here your action
export const modalAction: ModalAction = { addBoard };

// THis way must look your input for modal window
export const NEW_BOARD: ModalForm = {
  action: 'addBoard',
  fields: [{
    required: true,
    id: 'title',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input task title',
  }],
};

const initialState: ModalState = { isOpen: false, form: null };

export default initialState;
