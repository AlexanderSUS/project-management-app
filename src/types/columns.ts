import type { Task } from './tasks';

export interface NewColumn {
  title: string;
  order: number;
}

export interface Column extends NewColumn {
  id: string;
  tasks: Task[]
}

export type ColumnState = {
  columns: Column[];
  currentColumnId: string;
  currentColumnOrder: number;
};
