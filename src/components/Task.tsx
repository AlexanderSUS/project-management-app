import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '../types/tasks';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import {
  changeTaskPosition, setTask, setTaskColumnId, setTaskOrder,
} from '../store/taskSlice';
import { EDIT_TASK, REMOVE_TASK } from '../constants/formfields';
import { setColumn } from '../store/columnSlice';
import { DEFAULT_COLUMN } from '../constants/columns';

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

  // DRAG & DROP
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, dragTask: Task) => {
    dispatch(setTask(dragTask));
    dispatch(setColumn({ ...DEFAULT_COLUMN, id: task.columnId }));
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  // const dragLeaveHandler = (e: DragEvent) => {};
  // const dragStartHandler = (e: DragEvent) => {};
  // const dragEndHandler = (e: DragEvenet) => {};
  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    newOrder: number,
    newColumnId: string,
  ) => {
    e.preventDefault();
    dispatch(setTaskOrder(newOrder));
    dispatch(setTaskColumnId(newColumnId));
    dispatch(changeTaskPosition());
  };

  // END DRAG & DROP

  return (
    <Box
      component="div"
      className="task"
      draggable
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => (dragStartHandler(e, task))}
      onDragOver={dragOverHandler}
      // onDragLeave={dragLeaveHandler}
      // onDragEnd={dragEndHandler}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => (dropHandler(e, task.order, task.columnId))}
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
