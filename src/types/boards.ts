import type { Column } from './columns';

export interface NewBoardData {
  title: string
}

export interface IBoardPreview extends NewBoardData {
  id: string;
  title: string;
  description: string;
}

export interface IBoard extends IBoardPreview {
  id: string;
  title: string;
  description: string;
  columns: Column[]
}

export type BoardState = {
  boards: IBoard[];
  boardsPreview: IBoardPreview[];
  board: IBoard;
};
