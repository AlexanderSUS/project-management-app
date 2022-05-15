import { modalAction } from '../constants/modal';
import { AppDispatch } from '../store/store';
import { BoardType, NewBoard, BoardId } from '../types/boards';
import { ModalForm, ModalInputData } from '../types/modal';

function modalActionReducer(
  input: ModalForm,
  data: ModalInputData,
  dispatch: AppDispatch,
  dataId: string,
) {
  if (input.action === 'addBoard') {
    dispatch(modalAction[input.action](data as NewBoard));
  }
  if (input.action === 'editBoard') {
    dispatch(modalAction[input.action]({ id: dataId, title: data } as unknown as BoardType));
  }
  if (input.action === 'removeBoard') {
    dispatch(modalAction[input.action](dataId as unknown as BoardId));
  }
}

export default modalActionReducer;
