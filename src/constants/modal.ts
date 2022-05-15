import { ModalState, ModalForm, ModalAction } from '../types/modal';
import { addBoard } from '../store/boardSlice';

// Add here your action
export const modalAction: ModalAction = { addBoard };

export const NEW_BOARD: ModalForm = {
  action: 'addBoard',
  fields: [{
    required: true,
    id: 'new-board',
    label: 'Board title',
    defaultValue: '',
    placeholder: 'Input task title',
  }],
};

const initialState: ModalState = { isOpen: false, form: null };

export default initialState;
