import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { Column, NewColumn } from '../types/boards';

export default class ColumnService {
  static fetchColumns(boardId: string): Promise<AxiosResponse<Column[]>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}`);
  }

  // TODO check response type
  static createColumn(boardId: string, data: NewColumn): Promise<AxiosResponse<Column>> {
    return api.post(`${Endpoint.BOARDS}/${boardId}`, { title: data.title, order: data.order });
  }

  static editColumn(
    boardId: string,
    columnId: string,
    data: NewColumn,
  ): Promise<AxiosResponse<Column[]>> {
    return api.put(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}`, { order: data.order, title: data.title });
  }

  // TODO check argument type
  static deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse<Column[]>> {
    return api.delete(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}`);
  }
}
