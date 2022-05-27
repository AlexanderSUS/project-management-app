import { IBoard } from '../types/boards';
import { Column } from '../types/columns';
import { Task } from '../types/tasks';

type BoardId = {
  boardId: string;
};

type ExtendedColumn = Column & BoardId;

const extractTasks = (boards: IBoard[]): Task[] => {
  const columns = boards.map((board) => {
    const extendedColumns: ExtendedColumn[] = board.columns.map(
      (column) => ({ ...column, boardId: board.id } as ExtendedColumn),
    );

    return extendedColumns;
  }).flat();

  return columns.map((column) => column.tasks.map(
    (task) => ({ ...task, columnId: column.id, boardId: column.boardId }
    ),
  )).flat();
};

export default extractTasks;
