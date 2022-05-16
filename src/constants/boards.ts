import { BoardState } from '../types/boards';

const initialState: BoardState = {
  boards: [],
  pending: false,
  error: null,
  currentBoardId: '',
};

export default initialState;
