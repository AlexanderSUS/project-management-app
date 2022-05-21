import { Column } from './columns';
import { BoardType } from './boards';

export type TaskId = {
  id: string;
};

export type NewTaskData = {
  title: string;
  order: number;
  description: string;
  userId: string;
};

export type Task = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: BoardType['id'];
  columnId: Column['id'];
};

export type UpdateTaskData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: BoardType['id'];
  columnId: Column['id'];
};
