import React from 'react';
import {
  Box, Typography, Tooltip, Button, Card, CardContent, Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { taskSelector } from '../store/taskSlice';
import { boardSelector, getBoard, setBoardId } from '../store/boardSlice';
import { columnSelector } from '../store/columnSlice';
import AppRoutes from '../constants/routes';
import { cardPreviewWidth, transparentLayer } from '../constants/styles';
import ShowCaseButton from './ShowCaseButton';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { SHOW_TASK } from '../constants/formfields';
import restrictText, { restrictBoardDescription } from '../helpers/restrictText';

const taskWrapperStyles = {
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'stretch',
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
    dispatch(getBoard()).then(() => {
      navigate(`${AppRoutes.PROJECTS}/${boardId}`);
    });
  };

  const showTask = (title: string, description: string) => {
    dispatch(setDefaultValues([title, description]));
    dispatch(openModal(SHOW_TASK));
  };

  return (
    <>
      <Typography component="h2" variant="h2" color="white" align="center" sx={{ m: '1rem 0', fontWeight: '500' }}>
        {t('profilePage.yourTasks')}
      </Typography>
      {!usersTasks.length && (
      <Typography variant="h5" color="white" align="center">
        {t('profilePage.noTasks')}
      </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {dataArray.map((data) => (data.tasks.length ? (
          <Box
            key={data.boardId}
            sx={{ backgroundColor: transparentLayer, p: '1rem', boxShadow: 5 }}
          >
            <Tooltip title={t('profilePage.toBoard')} placement="bottom">
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => goToBoard(data.boardId)}
              >
                {data.boardTitle}
              </Button>
            </Tooltip>
            <br />
            <Box sx={taskWrapperStyles}>
              {data.tasks.map(((task) => (
                <Card key={task.id} sx={{ width: cardPreviewWidth }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ display: 'inline', overflowWrap: 'break-word', lineSize: '280px' }}>{restrictBoardDescription(task.title)}</Typography>
                    <ShowCaseButton onClick={() => (showTask(task.title, task.description))} />
                    <Typography variant="body2" sx={{ m: '0.5rem 0', overflowWrap: 'break-word', lineSize: '280px' }}>
                      {restrictText(task.description)}
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
          </Box>
        ) : null)) }
      </Box>
    </>
  );
};

export default UserTasks;
