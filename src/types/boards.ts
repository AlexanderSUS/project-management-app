export type NewBoard = {
  title: string
};

export type BoardType = {
  id: string;
  title: string;
};

export type Boards = BoardType[];

export type BoardState = {
  boards: Boards;
  currentBoardId: string;
};
