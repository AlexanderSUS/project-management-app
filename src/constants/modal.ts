import {
  ModalState, ModalConfirmAction, ModalFormAction,
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

const initialState: ModalState = {
  isOpen: false, title: '', action: 'addBoard',
};

export default initialState;
