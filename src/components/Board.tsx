import {
  Box, Button, ButtonGroup, Container, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EDIT_BOARD, REMOVE_BOARD } from '../constants/formfields';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import Loader from './Loader';
import AppRoutes from '../constants/routes';
import { boardSelector } from '../store/boardSlice';
import ListsWrapper from './ListsWrapper';
import { notificationSelector } from '../store/notificationSlice';
import { DEFAULT_BOARD_ID } from '../constants/boards';
import { getUsers } from '../store/taskSlice';
import muiTheme from '../constants/muiTheme';

const BoardWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BoardContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    board: { title, description, id },
  } = useAppSelector(boardSelector);
  const { isLoading } = useAppSelector(notificationSelector);

  const deleteBoard = () => {
    dispatch(openModal(REMOVE_BOARD));
  };

  const editBoard = () => {
    dispatch(setDefaultValues([title, description]));
    dispatch(openModal(EDIT_BOARD));
  };

  useEffect(() => {
    if (id === DEFAULT_BOARD_ID) {
      navigate(AppRoutes.PROJECTS);
    }
  }, [id, navigate]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Loader isOpen={isLoading} />
      <BoardWrapper sx={{ bgcolor: muiTheme.palette.primary.light }}>
        <BoardContainer>
          <Box sx={{ dispaly: 'flex', m: '1rem 0' }}>
            <Typography component="h1" variant="h2" color="white" sx={{ fontWeight: '500' }}>
              {title}
            </Typography>
            <ButtonGroup sx={{ display: 'inline' }}>
              <Button variant="contained" startIcon={<EditIcon />} color="warning" onClick={editBoard}>{t('boardPage.editBtn')}</Button>
              <Button variant="contained" startIcon={<DeleteIcon />} color="warning" onClick={deleteBoard}>{t('boardPage.deleteBtn')}</Button>
            </ButtonGroup>
            <Typography variant="h5" component="p" color="white" gutterBottom>{description}</Typography>
          </Box>
          <Box sx={{ position: 'relative', flexGrow: 1 }}>
            <ListsWrapper />
          </Box>
        </BoardContainer>
      </BoardWrapper>
    </>
  );
};

export default Board;
