import {
  Box, Button, ButtonGroup, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_COLUMN, EDIT_BOARD, REMOVE_BOARD } from '../constants/formfields';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import Loader from './Loader';
import AppRoutes from '../constants/routes';
import { boardSelector } from '../store/boardSlice';
import ListsWrapper from './ListsWrapper';
import { boardPage } from '../constants/text';
import { notificationSelector } from '../store/notificationSlice';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { board } = useAppSelector(boardSelector);
  const { isLoading } = useAppSelector(notificationSelector);

  const deleteBoard = () => {
    dispatch(openModal(REMOVE_BOARD));
  };

  const editBoard = () => {
    if (board?.title) {
      dispatch(setDefaultValues([board.title, board.description]));
    }
    dispatch(openModal(EDIT_BOARD));
  };

  const addColumn = () => {
    dispatch(openModal(ADD_COLUMN));
  };

  useEffect(() => {
    if (!board) {
      navigate(AppRoutes.PROJECTS);
    }
  }, [board, navigate]);

  return isLoading ? <Loader /> : (
    <>
      <ButtonGroup>
        <Typography variant="h4" component="h1" sx={{ mr: '2rem' }}>{board && board.title}</Typography>
        <Button onClick={editBoard}>
          {boardPage.editBtn}
        </Button>
        <Button onClick={deleteBoard}>
          {boardPage.deleteBtn}
        </Button>
        <Button onClick={addColumn}>
          {boardPage.addColunm}
        </Button>
      </ButtonGroup>
      <Typography>{board?.description}</Typography>
      <Box>
        {!isLoading && <ListsWrapper /> }
      </Box>
    </>
  );
};

export default Board;
