import { AxiosResponse } from 'axios';
import api from '.';
import { Boards, BoardType } from '../types/boards';
import { ModalFormData } from '../types/modal';

export default class BoardService {
  static fetchBoards(): Promise<AxiosResponse<Boards>> {
    return api.get('/boards');
  }

  static createBoard(data: ModalFormData): Promise<AxiosResponse<BoardType>> {
    return api.post('/boards', data);
  }
}
