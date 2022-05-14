import { AxiosResponse } from 'axios';
import api from '.';
import { Boards } from '../types/boards';

export default class BoardService {
  static fetchBoards(): Promise<AxiosResponse<Boards>> {
    return api.get('/boards');
  }
}
