import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '../types/tasks';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { setTask } from '../store/taskSlice';
import { EDIT_TASK, REMOVE_TASK } from '../constants/formfields';

type TaskProps = {
  task: Task
};

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const deleteTaks = () => {
    dispatch(setTask(task));
    dispatch(openModal(REMOVE_TASK));
  };

  const editTaks = () => {
    dispatch(setTask(task));
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
