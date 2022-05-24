import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { Task, NewTaskData, UpdateTaskData } from '../types/tasks';

export default class TaskService {
  static fetchTasks(
    boardId: string,
    columnId: string,
  ): Promise<AxiosResponse<Task[]>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}${Endpoint.TASKS}`);
  }

  static createTask(
    boardId: string,
    columnId: string,
    data: NewTaskData,
  ): Promise<AxiosResponse<Task>> {
    return api.post(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}${Endpoint.TASKS}`, data);
  }

  static getTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Promise<AxiosResponse<Task>> {
    return api.get(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}${Endpoint.TASKS}/${taskId}`);
  }

  static editTask(
    boardId: string,
    columnId: string,
    taskId: string,
    data: UpdateTaskData,
  ): Promise<AxiosResponse<Task>> {
    return api.put(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}${Endpoint.TASKS}/${taskId}`, data);
  }

  static deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Promise<AxiosResponse> {
    return api.delete(`${Endpoint.BOARDS}/${boardId}${Endpoint.COLUMNS}/${columnId}${Endpoint.TASKS}/${taskId}`);
  }
}
