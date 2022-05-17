import { Column } from './columns';

export type NewBoard = {
  title: string
};

export type BoardType = {
  id: string;
  title: string;
};

export type Boards = BoardType[];

export interface NewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface Task extends NewTask {
  boardId: BoardType['id'];
  columnId: Column['id'];
  userId: string;
}

export type BoardState = {
  boards: Boards;
  pending: boolean;
  error: string | null;
  currentBoardId: string;
};

export type VoidArgument = null;
