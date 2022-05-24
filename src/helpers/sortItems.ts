import { Column } from '../types/columns';
import { Task } from '../types/tasks';

function sortItems(tasks: Task[]): Task[];
function sortItems(columns: Column[]): Column[];

function sortItems(items: Task[] | Column[]): Task[] | Column[] {
  return items.length > 1
    ? [...items].sort((a, b) => (a.order - b.order)) : items;
}

export default sortItems;
