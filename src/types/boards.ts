export type BoardId = {
  id: string;
};
export type NewBoard = {
  title: string
};

export type BoardType = NewBoard & BoardId;

export type Boards = BoardType[];

export interface NewColumn {
  title: string;
  order: number;
}

export interface Column extends NewColumn {
  id: string;
}

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
};

export type VoidArgument = null;
