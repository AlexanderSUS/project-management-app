import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { Boards, BoardType } from '../types/boards';
import { FormData } from '../types/formTypes';

export default class BoardService {
  static fetchBoards(): Promise<AxiosResponse<Boards>> {
    return api.get(Endpoint.BOARDS);
  }

  static getBoard(boardId: string): Promise<AxiosResponse<BoardType>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}`);
  }

  static createBoard(data: FormData): Promise<AxiosResponse<BoardType>> {
    return api.post(Endpoint.BOARDS, data);
  }

  static deleteBoard(id: string): Promise<AxiosResponse> {
    return api.delete(`${Endpoint.BOARDS}/${id}`);
  }

  static editBoard(boardId: string, data: FormData): Promise<AxiosResponse<BoardType>> {
    return api.put(`${Endpoint.BOARDS}/${boardId}`, data);
  }
}
