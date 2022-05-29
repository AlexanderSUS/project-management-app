import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Task } from '../types/tasks';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import {
  reasignTask, setTask, setTaskUserId, taskSelector,
  changeTaskPosition, setTaskColumnId, setTaskOrder,
} from '../store/taskSlice';
import { EDIT_TASK, REMOVE_TASK, SHOW_TASK } from '../constants/formfields';
import { setColumn } from '../store/columnSlice';
import { DEFAULT_COLUMN } from '../constants/columns';
import { DEFAULT_TASK } from '../constants/task';
import muiTheme from '../constants/muiTheme';
import UserSelect from './UserSelect';
import { ELIPSIS, SLICE_END, SLICE_START } from '../constants/text';
import ShowCaseButton from './ShowCaseButton';

type TaskProps = {
  task: Task;
};

const taskStyles = {
  padding: '0.5rem',
  borderRadius: '5px',
  background: `${muiTheme.palette.background.paper}`,
  border: `1px solid ${muiTheme.palette.divider}`,
  boxShadow: muiTheme.shadows[1],
  '&:not(:last-child)': {
    marginBottom: '1rem',
  },
};

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const { users } = useAppSelector(taskSelector);
  const { task: setedTask } = useAppSelector(taskSelector);
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

  const reasignUser = (id: string) => {
    dispatch(setTask(task));
    dispatch(setTaskUserId(id));
    dispatch(reasignTask());
  };

  const showTask = () => {
    // dispatch(setTask(task));
    dispatch(setDefaultValues([task.title, task.description]));
    dispatch(openModal(SHOW_TASK));
  };

  // DRAG & DROP
  const dragStartHandler = () => {
    dispatch(setTask(task));
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (setedTask.order !== task.order) {
      dispatch(setTaskOrder(task.order));
    }

    if (setedTask.columnId !== task.columnId) {
      dispatch(setTaskColumnId(task.columnId));
    }

    if (setedTask.order !== task.order || setedTask.columnId !== task.columnId) {
      dispatch(changeTaskPosition())
        .then(() => {
          dispatch(setTask(DEFAULT_TASK));
          dispatch(setColumn(DEFAULT_COLUMN));
        });
    }
  };
  // END DRAG & DROP

  return (
    <Box
      draggable
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      sx={taskStyles}
    >
      <Typography variant="h6" sx={{ display: 'inline', overflowWrap: 'break-word', lineSize: '280px' }}>{task.title}</Typography>
      <ShowCaseButton onClick={showTask} />
      <Typography variant="body2" sx={{ m: '0.5rem 0', overflowWrap: 'break-word', lineSize: '280px' }}>
        {task.description.length > SLICE_END
          ? task.description.slice(SLICE_START, SLICE_END).concat(ELIPSIS)
          : task.description}
      </Typography>
      <Grid container alignItems="flex-end">
        <Grid item flexGrow="1" sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{`${taskUser?.name} (${taskUser?.login})`}</Typography>
          <UserSelect userId={taskUser?.id as string} users={users} reasignUser={reasignUser} />
        </Grid>
        <Grid item display="flex" justifyContent="flex-end">
          <EditAndDeleteButtons
            editAction={editTaks}
            deleteAction={deleteTaks}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskCard;
