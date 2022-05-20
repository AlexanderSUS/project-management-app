import { BoardState } from '../types/boards';

const initialState: BoardState = {
  boards: [],
  pending: false,
  error: '',
  currentBoardId: '',
};

export default initialState;
