import React from 'react';
import {
  Box, Typography, Tooltip, Button, Card, CardContent, Divider, Stack, Paper, styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { taskSelector } from '../store/taskSlice';
import { boardSelector, getBoard, setBoardId } from '../store/boardSlice';
import { columnSelector } from '../store/columnSlice';
import AppRoutes from '../constants/routes';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey[100],
}));

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
    <>
      <Typography variant="h3" gutterBottom sx={{ ml: '2rem' }}>{t('profilePage.yourTasks')}</Typography>
      <Stack spacing={2}>
        {dataArray.map((data) => (data.tasks.length ? (
          <Item key={data.boardId}>
            <Tooltip title={t('profilePage.toBoard')} placement="right">
              <Button
                variant="text"
                onClick={() => goToBoard(data.boardId)}
              >
                {data.boardTitle}
              </Button>
            </Tooltip>
            <Box sx={taskWrapperStyles}>
              {data.tasks.map(((task) => (
                <Card key={task.id} sx={{ minWidth: '280px' }}>
                  <CardContent>
                    <Typography variant="h6">
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Divider variant="middle" sx={{ m: '0.5rem 0' }} />
                    <Typography variant="subtitle2">
                      {t('profilePage.list')}
                      {columns.find((column) => column.id === task.columnId)?.title}
                    </Typography>
                  </CardContent>
                </Card>
              )))}
            </Box>
          </Item>
        ) : null)) }
      </Stack>
    </>
  );
};

export default UserTasks;
