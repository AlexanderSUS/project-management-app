import { AxiosResponse } from 'axios';
import api from '.';
import Endpoint from '../constants/endpoints';
import { Task, NewTaskData, EditTaskData } from '../types/tasks';

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

  static editTask(taskId: string, data: EditTaskData): Promise<AxiosResponse<Task>> {
    return api.put(`${Endpoint.BOARDS}/${data.boardId}${Endpoint.COLUMNS}/${data.columnId}${Endpoint.TASKS}/${taskId}`, data);
  }

  static chanteTaskPosition(
    columnId: string,
    taskId: string,
    data: EditTaskData,
  ): Promise<AxiosResponse<Task>> {
    return api.put(`${Endpoint.BOARDS}/${data.boardId}${Endpoint.COLUMNS}/${columnId}${Endpoint.TASKS}/${taskId}`, data);
  }

  static deleteTask(task: Task): Promise<AxiosResponse> {
    return api.delete(`${Endpoint.BOARDS}/${task.boardId}${Endpoint.COLUMNS}/${task.columnId}${Endpoint.TASKS}/${task.id}`);
  }
}
