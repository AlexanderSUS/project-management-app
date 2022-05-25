import { TaskState } from '../types/tasks';
import { DEFAULT_BOARD_ID } from './boards';
import { DEFAULT_COLUMN_ID } from './columns';

const DEFAULT_TASK_ID = 'default-task';
const DEFAULT_TASK_ORDER = 1;

const DEFAULT_TASK = {
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
  tasksPreview: [],
};

export default initialState;
