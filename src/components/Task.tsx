import React from 'react';
import {
  Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,
} from '@mui/material';
import { Task } from '../types/tasks';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import {
  reasignTask, setTask, setTaskUserId, taskSelector,
} from '../store/taskSlice';
import { EDIT_TASK, REMOVE_TASK } from '../constants/formfields';

type TaskProps = {
  task: Task
};

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const { users } = useAppSelector(taskSelector);
  const dispatch = useAppDispatch();
  const taskUser = users.find((user) => user.id === task.userId);

  const deleteTaks = () => {
    dispatch(setTask(task));
    dispatch(openModal(REMOVE_TASK));
  };

  const editTaks = () => {
    dispatch(setTask(task));
    dispatch(setDefaultValues([task.title, task.description]));
    dispatch(openModal(EDIT_TASK));
  };

  const reasignUser = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    dispatch(setTask(task));
    dispatch(setTaskUserId(value));
    dispatch(reasignTask());
  };

  return (
    <Box>
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        {/* TODO move out                         this text */}
        <InputLabel id="select-label">Responsible</InputLabel>
        <Select
          labelId="select-label"
          value={taskUser?.id}
          // TODO MOVE OUT IT to const
          label="Responsible"
          onChange={reasignUser}
        >
          {users.map((user) => <MenuItem key={user.id} value={user.id}>{`${user.name} (${user.login})`}</MenuItem>)}
        </Select>
      </FormControl>
      <EditAndDeleteButtons
        editAction={editTaks}
        deleteAction={deleteTaks}
      />
    </Box>
  );
};

export default TaskCard;
