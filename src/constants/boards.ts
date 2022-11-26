import { BoardState, IBoard } from '../types/boards';

export const DEFAULT_BOARD_ID: string = 'defalut-bord';

export const DEFAULT_BOARD: IBoard = {
  id: DEFAULT_BOARD_ID,
  title: DEFAULT_BOARD_ID,
  description: DEFAULT_BOARD_ID,
  columns: [],
};

const initialState: BoardState = {
  board: DEFAULT_BOARD,
  boardsPreview: [],
  boards: [],
};

export enum BoardModalTextEn {
  BOARD_TITLE = 'Add board',
  BOARD_TITLE_EDIT = 'Edit board',
  BOARD_TITLE_DELETE = 'Do you really want to delete board?',
  REQUIRED = 'This field is required',
  TITLE_LABEL = 'Board title',
  TITLE_PLACEHOLDER = 'Input board title',
  TITLE_PLACEHOLDER_EDIT = 'Input new board title',
  DESCRIPTION_LABEL = 'Board description',
  DESCRIPTION_PLACEHOLDER = 'Input board description',
  DESCRIPTION_PLACEHOLDER_EDIT = 'Input new board description',
}

export enum BoardModalTextRu {
  BOARD_TITLE = 'Добавить доску',
  BOARD_TITLE_EDIT = 'Редактировать доску',
  BOARD_TITLE_DELETE = 'Вы действительно хотите удалить доску?',
  REQUIRED = 'Это поле обязательное',
  TITLE_LABEL = 'Название доски',
  TITLE_PLACEHOLDER = 'Введите название доски',
  TITLE_PLACEHOLDER_EDIT = 'Введите новое название доски',
  DESCRIPTION_LABEL = 'Описание доски',
  DESCRIPTION_PLACEHOLDER = 'Введите описание доски',
  DESCRIPTION_PLACEHOLDER_EDIT = 'Введите новое описание доски',
}

export enum ListModalTextEn {
  LIST_TITLE = 'Add list',
  LIST_TITLE_EDIT = 'Edit list title',
  LIST_TITLE_DELETE = 'Do you really want to delete list?',
  TITLE_LABEL = 'List title',
  TITLE_PLACEHOLDER = 'Input list title',
  REQUIRED = 'This field is required',
}

export enum ListModalTextRu {
  LIST_TITLE = 'Добавить список',
  LIST_TITLE_EDIT = 'Редактировать список',
  LIST_TITLE_DELETE = 'Вы действительно хотите удалить список?',
  TITLE_LABEL = 'Название списка',
  TITLE_PLACEHOLDER = 'Введите название списка',
  REQUIRED = 'Это поле обязательное',
}

export enum TaskModalTextEn {
  TASK_TITLE = 'Add task',
  TASK_TITLE_EDIT = 'Edit task title',
  TASK_TITLE_DELETE = 'Do you really want to delete task?',
  TITLE_LABEL = 'Task title',
  TITLE_PLACEHOLDER = 'Input task title',
  TITLE_PLACEHOLDER_EDIT = 'Input new task title',
  DESCRIPTION_LABEL = 'Task description',
  DESCRIPTION_PLACEHOLDER = 'Input task description',
  DESCRIPTION_PLACEHOLDER_EDIT = 'Input new task description',
  REQUIRED = 'This field is required',
}

export enum TaskModalTextRu {
  TASK_TITLE = 'Добавить задачу',
  TASK_TITLE_EDIT = 'Редактировать задачу',
  TASK_TITLE_DELETE = 'Вы действительно хотите удалить задачу?',
  TITLE_LABEL = 'Название задачи',
  TITLE_PLACEHOLDER = 'Введите название задачи',
  TITLE_PLACEHOLDER_EDIT = 'Введите новое название задачи',
  DESCRIPTION_LABEL = 'Описание задачи',
  DESCRIPTION_PLACEHOLDER = 'Введите описание задачи',
  DESCRIPTION_PLACEHOLDER_EDIT = 'Введите новое описание задачи',
  REQUIRED = 'Это поле обязательное',
}

export default initialState;
