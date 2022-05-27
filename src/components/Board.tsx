import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ADD_COLUMN, EDIT_BOARD, REMOVE_BOARD } from '../constants/formfields';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import Loader from './Loader';
import AppRoutes from '../constants/routes';
import { boardSelector } from '../store/boardSlice';
import ListsWrapper from './ListsWrapper';
import { notificationSelector } from '../store/notificationSlice';
import { DEFAULT_BOARD_ID } from '../constants/boards';
import { getUsers } from '../store/taskSlice';

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

  const addColumn = () => {
    dispatch(openModal(ADD_COLUMN));
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
      <BoardWrapper>
        <BoardContainer>
          <Box sx={{ mb: '1rem' }}>
            <ButtonGroup>
              <Typography variant="h4" component="h1" sx={{ mr: '2rem' }}>
                {title}
              </Typography>
              <Button onClick={editBoard}>{t('boardPage.editBtn')}</Button>
              <Button onClick={deleteBoard}>{t('boardPage.deleteBtn')}</Button>
              <Button onClick={addColumn}>{t('boardPage.addColunm')}</Button>
            </ButtonGroup>
            <Typography>{description}</Typography>
          </Box>
          <Box sx={{ position: 'relative', flexGrow: 1 }}>{!isLoading && <ListsWrapper />}</Box>
        </BoardContainer>
      </BoardWrapper>
    </>
  );
};

export default Board;
