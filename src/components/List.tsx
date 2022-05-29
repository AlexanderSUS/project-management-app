import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Column } from '../types/columns';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import {
  changeColumnOrder,
  columnSelector,
  setColumn,
  setColumnOrder,
} from '../store/columnSlice';
import { ADD_TASK } from '../constants/formfields';
import { openModal } from '../store/modalSlice';
import TaskCard from './Task';
import { boardSelector } from '../store/boardSlice';
import { Task } from '../types/tasks';
import muiTheme from '../constants/muiTheme';
import scrollStyles from '../constants/scrollStyles';
import { sortTask } from '../helpers/sortItems';
import {
  changeTaskPosition,
  setTask,
  setTaskColumnId,
  setTaskOrder,
  taskSelector,
} from '../store/taskSlice';
import { DEFAULT_TASK, DEFAULT_TASK_ID, DEFAULT_TASK_ORDER } from '../constants/task';
import { DEFAULT_COLUMN } from '../constants/columns';
import ListTitle from './ListTitle';
import { break700, transparentLayer } from '../constants/styles';
import useWindowWidth from '../hooks/useWindowWidth';

type ListProps = {
  column: Column;
};

export const ColumnStyled = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  min-width: 320px;
  max-width: 320px;
  max-height: 100%;
  margin-bottom: 1rem;
  border-radius: 5px;
  background: ${transparentLayer};
  box-shadow: ${muiTheme.shadows[4]};
`;

const List: React.FC<ListProps> = ({ column }) => {
  const dispatch = useAppDispatch();
  const {
    board: { id: boardId },
  } = useAppSelector(boardSelector);
  const { t } = useTranslation();
  const { task: setedTask } = useAppSelector(taskSelector);
  const { column: setedColunm } = useAppSelector(columnSelector);
  const { tasks: tasksPreview, id: columnId } = column;
  const width = useWindowWidth();

  const tasks: Task[] = tasksPreview.length
    ? sortTask(tasksPreview.map((preview) => ({ ...preview, columnId, boardId })))
    : [];

  const addTask = () => {
    dispatch(setColumn(column));
    dispatch(openModal(ADD_TASK));
  };

  const columnBodyStyles = {
    flexGrow: '1',
    overflow: 'hidden auto',
    margin: '1rem -0.5rem 1rem 0',
    paddingRight: '0.5rem',
    [muiTheme.breakpoints.down('sm')]: {
      marginRight: '0.15rem',
      paddingRight: '0.45rem',
    },
    ...scrollStyles,
  };

  // *** DRAG & DROP ***
  const dragStartHandler = () => {
    dispatch(setColumn(column));
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // FOR COLUMN D&D HANDLING
    if (setedColunm.order !== column.order && setedTask.id === DEFAULT_TASK_ID) {
      dispatch(setColumnOrder(column.order));
      dispatch(changeColumnOrder()).then(() => {
        dispatch(setColumn(DEFAULT_COLUMN));
      });
    }

    // FOR TASK HANDLING if list is empty
    if (!tasks.length && setedTask.id !== DEFAULT_TASK_ID) {
      dispatch(setTaskOrder(DEFAULT_TASK_ORDER));
      dispatch(setTaskColumnId(column.id));
      dispatch(changeTaskPosition()).then(() => {
        dispatch(setTask(DEFAULT_TASK));
        dispatch(setColumn(DEFAULT_COLUMN));
      });
    }
  };
  // *** END DRAG & DROP ***

  return (
    <ColumnStyled
      sx={{ p: width > break700 ? '1rem' : '0.3rem' }}
      draggable
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'flex-end',
        }}
      >
        <ListTitle column={column} dispatch={dispatch} />
      </Box>
      <Box sx={columnBodyStyles}>
        {tasks.map((tsk) => (
          <TaskCard key={tsk.id} task={tsk} />
        ))}
      </Box>
      <Button variant="contained" onClick={addTask} startIcon={<AddIcon />}>
        {t('navText.newTask')}
      </Button>
    </ColumnStyled>
  );
};

export default List;
