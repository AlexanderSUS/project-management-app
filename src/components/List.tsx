import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Column } from '../types/columns';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { setCurrentColumnId, setCurrentColumnOrder } from '../store/columnSlice';
import { ADD_TASK, EDIT_COLUMN_TITLE, REMOVE_COLUMN } from '../constants/formfields';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { Task } from '../types/tasks';
import TaskCard from './Task';
import sortItems from '../helpers/sortItems';
import EditAndDeleteButtons from './EditAndDeleteButtons';

type ListProps = {
  column: Column;
  tasks: Task[];
};

const List: React.FC<ListProps> = ({ column, tasks }) => {
  const dispatch = useAppDispatch();

  const setCurrentColumn = () => {
    dispatch(setCurrentColumnId(column.id));
    dispatch(setCurrentColumnOrder(column.order));
  };

  const deleteColumn = () => {
    setCurrentColumn();
    dispatch(openModal(REMOVE_COLUMN));
  };

  const editColumn = () => {
    dispatch(setDefaultValues([column.title]));
    setCurrentColumn();
    dispatch(openModal(EDIT_COLUMN_TITLE));
  };

  const addTask = () => {
    setCurrentColumn();
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
        <EditAndDeleteButtons
          editAction={editColumn}
          deleteAction={deleteColumn}
        />
      </Box>
      <Box>
        {sortItems(tasks).map(
          (task) => <TaskCard key={task.id} task={task} columnId={column.id} />,
        )}
      </Box>
      <Button variant="outlined" onClick={addTask} startIcon={<AddIcon />}>Add task</Button>
    </Box>
  );
};

export default List;
