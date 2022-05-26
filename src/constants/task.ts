import { TaskState } from '../types/tasks';
import { DEFAULT_BOARD_ID } from './boards';
import { DEFAULT_COLUMN_ID } from './columns';

export const DEFAULT_TASK_ID = 'default-task';
export const DEFAULT_TASK_ORDER = 1;

export const DEFAULT_TASK = {
  id: DEFAULT_TASK_ID,
  title: DEFAULT_TASK_ID,
  order: DEFAULT_TASK_ORDER,
  description: DEFAULT_TASK_ID,
  userId: DEFAULT_TASK_ID,
  boardId: DEFAULT_BOARD_ID,
  columnId: DEFAULT_COLUMN_ID,
  files: [],
};

const initialState: TaskState = {
  task: DEFAULT_TASK,
  tasks: [],
  users: [],
  tasksPreview: [],
};

export default initialState;
