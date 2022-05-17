export interface NewColumn {
  title: string;
  order: number;
}

export interface Column extends NewColumn {
  id: string;
}

export type ColumnState = {
  columns: Column[];
  currentColumnId: string;
  currentColumnOrder: number;
  pending: boolean;
  error: string;
};
