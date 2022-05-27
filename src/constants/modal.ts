import {
  ModalState, ModalConfirmAction, ModalFormAction,
} from '../types/modal';
import { addBoard, editBoard, removeBoard } from '../store/boardSlice';
import { addColumn, removeColumn } from '../store/columnSlice';
import { editLogin, editName, removeUser } from '../store/authSlice';
import { addTask, editTask, removeTask } from '../store/taskSlice';

// Add here your action for modal with form
export const modalFormAction: ModalFormAction = {
  addBoard,
  editBoard,
  addColumn,
  editLogin,
  editName,
  addTask,
  editTask,
};

// Add here your action for modal with confrim buttons
export const modalConfirmAction: ModalConfirmAction = {
  removeBoard,
  removeColumn,
  removeUser,
  removeTask,
};

const initialState: ModalState = {
  isOpen: false,
  title: '',
  action: 'addBoard',
  defaultValues: [],
};

export default initialState;
