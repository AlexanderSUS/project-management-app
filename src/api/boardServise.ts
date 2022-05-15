import { AxiosResponse } from 'axios';
import api from '.';
import {
  BoardId, Boards, BoardType, DeleteSucces,
} from '../types/boards';
import { ModalFormData } from '../types/modal';

export default class BoardService {
  static fetchBoards(): Promise<AxiosResponse<Boards>> {
    return api.get('/boards');
  }

  static createBoard(data: ModalFormData): Promise<AxiosResponse<BoardType>> {
    return api.post('/boards', data);
  }

  static deleteBoard(id: BoardId): Promise<AxiosResponse<DeleteSucces>> {
    return api.delete(`/boards/${id}`);
  }
}
