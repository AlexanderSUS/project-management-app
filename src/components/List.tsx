import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Column } from '../types/columns';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { setColumn } from '../store/columnSlice';
import { ADD_TASK, EDIT_COLUMN_TITLE, REMOVE_COLUMN } from '../constants/formfields';
import { openModal, setDefaultValues } from '../store/modalSlice';
import TaskCard from './Task';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { boardSelector } from '../store/boardSlice';
import { Task } from '../types/tasks';

type ListProps = {
  column: Column;
};

const List: React.FC<ListProps> = ({ column }) => {
  const dispatch = useAppDispatch();
  const { board: { id: boardId } } = useAppSelector(boardSelector);
  const { tasks: tasksPreview, id: columnId } = column;

  const tasks: Task[] = tasksPreview.length
    ? tasksPreview.map((preview) => ({ ...preview, columnId, boardId }))
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

  return (
    <Box sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <Box sx={{
        display: 'flex', flexFlow: 'row nowrap', minWidth: '280px',
      }}
      >
        <Typography variant="h5" sx={{ mr: 'auto', ml: 'auto' }}>
          {/* ***!FOR TEST PURPOSE*** */}
          {column.order}
          {'. '}
          {/* ******** */}
          {column.title}
        </Typography>
        <EditAndDeleteButtons editAction={editColumn} deleteAction={deleteColumn} />
      </Box>
      <Box>
        {tasks.map((task) => (<TaskCard key={task.id} task={task} />))}
      </Box>
      <Button variant="outlined" onClick={addTask} startIcon={<AddIcon />}>Add task</Button>
    </Box>
  );
};

export default List;
