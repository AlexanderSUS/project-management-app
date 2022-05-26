import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '../types/tasks';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import {
  changeTaskPosition, setTask, setTaskColumnId, setTaskOrder, taskSelector,
} from '../store/taskSlice';
import { EDIT_TASK, REMOVE_TASK } from '../constants/formfields';
import { setColumn } from '../store/columnSlice';
import { DEFAULT_COLUMN } from '../constants/columns';
import { DEFAULT_TASK } from '../constants/task';

type TaskProps = {
  task: Task;
};

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const { task: setedTask } = useAppSelector(taskSelector);
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

  // DRAG & DROP
  const dragStartHandler = () => {
    dispatch(setTask(task));
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  // FOR DND STYLING
  // const dragLeaveHandler = (e: DragEvent) => {};
  // const dragStartHandler = (e: DragEvent) => {};
  // const dragEndHandler = (e: DragEvenet) => {};

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
      component="div"
      draggable
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      // onDragLeave={dragLeaveHandler}
      // onDragEnd={dragEndHandler}
      onDrop={dropHandler}
    >
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
