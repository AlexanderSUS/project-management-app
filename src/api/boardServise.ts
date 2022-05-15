import { AxiosResponse } from 'axios';
import api from '.';
import {
  BoardId, Boards, BoardType, NewBoard,
} from '../types/boards';

export default class BoardService {
  static fetchBoards(): Promise<AxiosResponse<Boards>> {
    return api.get('/boards');
  }

  static createBoard(data: NewBoard): Promise<AxiosResponse<BoardType>> {
    return api.post('/boards', data);
  }

  static deleteBoard(id: BoardId): Promise<AxiosResponse<Boards>> {
    return api.delete(`/boards/${id}`);
  }

  static editBoard(data: BoardType): Promise<AxiosResponse<BoardType>> {
    return api.put(`/boards/${data.id}`, data.title);
  }
}
