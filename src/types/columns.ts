import type { TaskPreview } from './tasks';

export interface NewColumnData {
  title: string;
}

export interface EditColumnData extends NewColumnData {
  order: number;
}

export interface ColumnPreview extends EditColumnData {
  id: string;
}

export interface Column extends ColumnPreview {
  tasks: TaskPreview[]
}

export type ColumnState = {
  column: Column;
  columns: Column[];
  columnsPreview: ColumnPreview[];
};
