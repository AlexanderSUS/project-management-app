import { Column } from './columns';
import { IBoard } from './boards';
import { UserData } from './user';

export interface NewTaskData {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface EditTaskData extends NewTaskData {
  order: number;
  boardId: IBoard['id'];
  columnId: Column['id'];
}

export interface Task extends EditTaskData {
  id: string;
  files: File[];
}

export interface TaskPreview extends NewTaskData {
  id: string;
  files: File[]
}

export type TaskState = {
  task: Task;
  tasks: Task[];
  users: UserData[];
  tasksPreview: TaskPreview[];
};
