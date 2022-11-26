import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { Column, ColumnPreview, EditColumnData } from '../types/columns';
import { AppFormData } from '../types/formTypes';

export default class ColumnService {
  static fetchColumns(boardId: string): Promise<AxiosResponse<ColumnPreview[]>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}`);
  }

  static getColumn(boardId: string, columnId: string): Promise<AxiosResponse<Column>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}`);
  }

  static createColumn(boardId: string, data: AppFormData): Promise<AxiosResponse<Column>> {
    return api.post(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}`, data);
  }

  static editColumn(
    boardId: string,
    columnId: string,
    data: EditColumnData,
  ): Promise<AxiosResponse<Column>> {
    return api.put(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}`, data);
  }

  static deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse> {
    return api.delete(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}`);
  }
}
