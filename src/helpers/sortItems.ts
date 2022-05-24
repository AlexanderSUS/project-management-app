import { Column } from '../types/columns';
import { Task } from '../types/tasks';

export function sortColumns(items: Column[]): Column[] {
  return items.length > 1
    ? [...items].sort((a, b) => (a.order - b.order)) : items;
}

export function sortTask(items: Task[]): Task[] {
  return items.length > 1
    ? [...items].sort((a, b) => (a.order - b.order)) : items;
}
