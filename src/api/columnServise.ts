import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { Column, NewColumn } from '../types/columns';
import { FormData } from '../types/formTypes';

export default class ColumnService {
  static fetchColumns(boardId: string): Promise<AxiosResponse<Column[]>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}`);
  }

  static createColumn(boardId: string, data: FormData): Promise<AxiosResponse<Column>> {
    return api.post(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}`, data);
  }

  static editColumn(
    boardId: string,
    columnId: string,
    data: NewColumn,
  ): Promise<AxiosResponse<Column>> {
    return api.put(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}`, { order: +data.order, title: data.title });
  }

  static deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse> {
    return api.delete(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}`);
  }
}
