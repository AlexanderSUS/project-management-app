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

export default initialState;
