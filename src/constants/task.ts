import { TaskState } from '../types/tasks';

const initialState: TaskState = {
  currentTaskId: '',
  currentTaskOrder: 0,
  tasks: [],
};

export default initialState;
