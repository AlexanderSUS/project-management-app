import { BoardState, BoardType } from '../types/boards';

export const DEFALULT_BOARD_ID = 'defalut';

export const DEFAULT_BOARD: BoardType = {
  id: DEFALULT_BOARD_ID,
  title: DEFALULT_BOARD_ID,
  description: DEFALULT_BOARD_ID,
  columns: [],
};

const initialState: BoardState = {
  boards: [],
  currentBoardId: '',
  board: DEFAULT_BOARD,
};

export default initialState;
