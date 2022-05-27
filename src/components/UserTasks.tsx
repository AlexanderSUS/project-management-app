import React from 'react';
import {
  Box, Typography, Tooltip, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
      <Typography variant="h4">{t('profilePage.yourTasks')}</Typography>
      {dataArray.map((data) => (data.tasks.length ? (
        <Box key={data.boardId} sx={{ border: '1px solid blue', m: '1rem' }}>
          <Tooltip title={t('profilePage.toBoard')} placement="right">
            <Button
              variant="outlined"
              onClick={() => goToBoard(data.boardId)}
            >
              {data.boardTitle}
            </Button>
          </Tooltip>
          <Box sx={taskWrapperStyles}>
            {data.tasks.map(((task) => (
              <Box key={task.id} sx={{ border: '1px solid red' }}>
                <Typography variant="h6">
                  {task.title}
                </Typography>
                <Typography>
                  {task.description}
                </Typography>
                <Typography variant="subtitle2">
                  {t('profilePage.list')}
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
