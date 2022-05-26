import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  styled,
  Box,
  Typography,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Column } from '../types/columns';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import {
  changeColumnOrder, columnSelector, setColumn, setColumnOrder,
} from '../store/columnSlice';
import { ADD_TASK, EDIT_COLUMN_TITLE, REMOVE_COLUMN } from '../constants/formfields';
import { openModal, setDefaultValues } from '../store/modalSlice';
import TaskCard from './Task';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { boardSelector } from '../store/boardSlice';
import { Task } from '../types/tasks';
import muiTheme from '../constants/muiTheme';
import scrollStyles from '../constants/scrollStyles';
import { sortTask } from '../helpers/sortItems';
import {
  changeTaskPosition, setTask, setTaskColumnId, setTaskOrder, taskSelector,
} from '../store/taskSlice';
import { DEFAULT_TASK, DEFAULT_TASK_ID, DEFAULT_TASK_ORDER } from '../constants/task';
import { DEFAULT_COLUMN } from '../constants/columns';

type ListProps = {
  column: Column;
};

export const ColumnStyled = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  min-width: 272px;
  max-width: 272px;
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 1rem;
  background: ${muiTheme.palette.divider};
`;

const List: React.FC<ListProps> = ({ column }) => {
  const dispatch = useAppDispatch();
  const {
    board: { id: boardId },
  } = useAppSelector(boardSelector);
  const { t } = useTranslation();
  const { task: setedTask } = useAppSelector(taskSelector);
  const { column: setedColunm } = useAppSelector(columnSelector);
  const { board: { id: boardId } } = useAppSelector(boardSelector);
  const { tasks: tasksPreview, id: columnId } = column;

  const tasks: Task[] = tasksPreview.length
    ? sortTask(tasksPreview.map((preview) => ({ ...preview, columnId, boardId })))
    : [];

  const deleteColumn = () => {
    dispatch(setColumn(column));
    dispatch(openModal(REMOVE_COLUMN));
  };

  const editColumn = () => {
    dispatch(setDefaultValues([column.title]));
    dispatch(setColumn(column));
    dispatch(openModal(EDIT_COLUMN_TITLE));
  };

  const addTask = () => {
    dispatch(setColumn(column));
    dispatch(openModal(ADD_TASK));
  };
  
  const ColumnBody = styled(Box)`
    flex-grow: 1;
    overflow: hidden auto;
    margin: 1rem 0;
    ${scrollStyles}
  `;
  
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
      dispatch(changeColumnOrder())
        .then(() => {
          dispatch(setColumn(DEFAULT_COLUMN));
        });
    }

    // FOR TASK HANDLING if list is empty
    if (!tasks.length && setedTask.id !== DEFAULT_TASK_ID) {
      dispatch(setTaskOrder(DEFAULT_TASK_ORDER));
      dispatch(setTaskColumnId(column.id));
      dispatch(changeTaskPosition())
        .then(() => {
          dispatch(setTask(DEFAULT_TASK));
          dispatch(setColumn(DEFAULT_COLUMN));
        });
    }
  };
  // *** END DRAG & DROP ***

  return (
    <ColumnStyled
      sx={{ display: 'flex', flexFlow: 'column nowrap' }}
      draggable
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <Box sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
      }}
      >
        <Typography variant="h5" sx={{ mr: 'auto', ml: 'auto' }}>
          {column.title}
        </Typography>
        <EditAndDeleteButtons editAction={editColumn} deleteAction={deleteColumn} />
      </Box>
      <ColumnBody>
        {tasks.map((tsk) => (<TaskCard key={tsk.id} task={tsk} />))}
      </ColumnBody>
      <Button variant="contained" onClick={addTask} startIcon={<AddIcon />}>
        {t('navText.newTask')}
      </Button>
    </ColumnStyled>
  );
};

export default List;
