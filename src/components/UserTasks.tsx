import React from 'react';
import {
  Box, Typography, Tooltip, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { taskSelector } from '../store/taskSlice';
import { boardSelector, getBoard, setBoardId } from '../store/boardSlice';
import { columnSelector } from '../store/columnSlice';
import AppRoutes from '../constants/routes';

const taskWrapperStyles = {
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
  p: '1rem',
};

type Props = {
  userId: string;
};

const UserTasks: React.FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks } = useAppSelector(taskSelector);
  const { boards } = useAppSelector(boardSelector);
  const { columns } = useAppSelector(columnSelector);
  const usersTasks = tasks.filter((task) => task.userId === userId);
  const userBoards = boards.filter((board) => tasks.filter((task) => board.id === task.boardId));

  const dataArray = userBoards.map((board) => ({
    boardId: board.id,
    boardTitle: board.title,
    tasks: usersTasks.filter((task) => task.boardId === board.id),
  }));

  const goToBoard = (boardId: string) => {
    dispatch(setBoardId(boardId));
    // TODO FIX BLINKING!
    dispatch(getBoard()).then(() => {
      navigate(`${AppRoutes.PROJECTS}/${boardId}`);
    });
  };

  return (
    <Box sx={{ mt: '2rem' }}>
      <Typography variant="h4">Your Tasks: </Typography>
      {dataArray.map((data) => (data.tasks.length ? (
        <Box key={data.boardId} sx={{ border: '1px solid blue', m: '1rem' }}>
          <Typography variant="h5" sx={{ display: 'inline' }}>
            Board:
            {data.boardTitle}
          </Typography>
          <Tooltip title="Go to board">
            <Button variant="outlined" onClick={() => goToBoard(data.boardId)}>To board</Button>
          </Tooltip>
          <Box sx={taskWrapperStyles}>
            {data.tasks.map(((task) => (
              <Box key={task.id} sx={{ border: '1px solid red' }}>
                <Typography variant="h6">
                  Title:
                  {' '}
                  {task.title}
                </Typography>
                <Typography>
                  Description:
                  {' '}
                  {task.description}
                </Typography>
                <Typography>
                  <b>
                    List:
                  </b>
                  {columns.find((column) => column.id === task.columnId)?.title}
                </Typography>
              </Box>
            )))}
          </Box>
        </Box>
      ) : null)) }
    </Box>
  );
};

export default UserTasks;
