import type { Column } from './columns';

export type NewBoard = {
  title: string
};

export type BoardType = {
  id: string;
  title: string;
  description: string;
  columns: Column[]
};

export type Boards = BoardType[];

export type BoardState = {
  boards: Boards;
  currentBoardId: string;
  board: BoardType | null;
};
