import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '../types/tasks';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { setCurrentTaskId, setCurrentTaskOrder } from '../store/taskSlice';
import { EDIT_TASK, REMOVE_TASK } from '../constants/formfields';
import { setCurrentColumnId } from '../store/columnSlice';

type TaskProps = {
  task: Task;
  columnId: string;
};

const TaskCard: React.FC<TaskProps> = ({ task, columnId }) => {
  const dispatch = useAppDispatch();

  const setIds = () => {
    dispatch(setCurrentColumnId(columnId));
    dispatch(setCurrentTaskId(task.id));
    dispatch(setCurrentTaskOrder(task.order));
  };

  const deleteTaks = () => {
    setIds();
    dispatch(openModal(REMOVE_TASK));
  };

  const editTaks = () => {
    setIds();
    dispatch(setDefaultValues([task.title, task.description]));
    dispatch(openModal(EDIT_TASK));
  };

  return (
    <Box>
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <EditAndDeleteButtons
        editAction={editTaks}
        deleteAction={deleteTaks}
      />
    </Box>
  );
};

export default TaskCard;
