import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { IBoardPreview, IBoard } from '../types/boards';
import { AppFormData } from '../types/formTypes';

export default class BoardService {
  static fetchBoards(): Promise<AxiosResponse<IBoardPreview[]>> {
    return api.get(Endpoint.BOARDS);
  }

  static getBoard(boardId: string): Promise<AxiosResponse<IBoard>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}`);
  }

  static createBoard(data: AppFormData): Promise<AxiosResponse<IBoardPreview>> {
    return api.post(Endpoint.BOARDS, data);
  }

  static deleteBoard(id: string): Promise<AxiosResponse> {
    return api.delete(`${Endpoint.BOARDS}/${id}`);
  }

  static editBoard(boardId: string, data: AppFormData): Promise<AxiosResponse<IBoard>> {
    return api.put(`${Endpoint.BOARDS}/${boardId}`, data);
  }
}
