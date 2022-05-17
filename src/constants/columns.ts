import { ColumnState } from '../types/columns';

const initialState: ColumnState = {
  columns: [],
  currentColumnId: '',
  currentColumnOrder: 0,
  pending: false,
  error: '',
};

export default initialState;
