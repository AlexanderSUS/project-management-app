import { Column, ColumnState } from '../types/columns';

export const DEFAULT_COLUMN_ID: string = 'default-column';
const DEFAULT_COLUMN_ORDER: number = 1;

export const DEFAULT_COLUMN: Column = {
  id: DEFAULT_COLUMN_ID,
  title: DEFAULT_COLUMN_ID,
  order: DEFAULT_COLUMN_ORDER,
  tasks: [],
};

const initialState: ColumnState = {
  column: DEFAULT_COLUMN,
  columns: [],
  columnsPreview: [],
};

export default initialState;
