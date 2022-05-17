import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { Boards, BoardType, NewBoard } from '../types/boards';

export default class BoardService {
  static fetchBoards(): Promise<AxiosResponse<Boards>> {
    return api.get(Endpoint.BOARDS);
  }

  static createBoard(data: NewBoard): Promise<AxiosResponse<BoardType>> {
    return api.post(Endpoint.BOARDS, { title: data.title });
  }

  static deleteBoard(id: string): Promise<AxiosResponse<Boards>> {
    return api.delete(`${Endpoint.BOARDS}/${id}`);
  }

  static editBoard(data: BoardType): Promise<AxiosResponse<BoardType>> {
    return api.put(`${Endpoint.BOARDS}/${data.id}`, { title: data.title });
  }
}
