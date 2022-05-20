import React, { useEffect } from 'react';
import {
  Box, Button, ButtonGroup, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { boardPage } from '../constants/text';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { boardSelector, setCurrentBoardId } from '../store/boardSlice';
import { ADD_COLUMN, EDIT_BOARD, REMOVE_BOARD } from '../constants/formfields';
import { openModal } from '../store/modalSlice';
import Loader from './Loader';
import AppRoutes from '../constants/routes';
import { getColumns } from '../store/columnSlice';
import ListsWrapper from './ListsWrapper';
import { authSelector } from '../store/authSlice';

const BoardWrapper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentBoardId, boards } = useAppSelector(boardSelector);
  const { isLoading, error } = useAppSelector(authSelector);
  const currentBoard = boards.find((board) => board.id === currentBoardId);

  const deleteBoard = () => {
    dispatch(openModal(REMOVE_BOARD));
  };

  const editBoard = () => {
    dispatch(openModal(EDIT_BOARD));
  };

  const addColumn = () => {
    dispatch(openModal(ADD_COLUMN));
  };

  useEffect(() => {
    dispatch(setCurrentBoardId(currentBoardId));
    dispatch(getColumns());
  }, [dispatch, currentBoardId]);

  useEffect(() => {
    if (!currentBoardId) {
      navigate(AppRoutes.PROJECTS);
    }
  }, [currentBoardId, navigate]);

  return isLoading ? <Loader /> : (
    <>
      <ButtonGroup>
        <Typography variant="h4" component="h1" sx={{ mr: '2rem' }}>{currentBoard && currentBoard.title}</Typography>
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
      <Box>
        {!isLoading && error && <Typography>{error}</Typography> }
        {!isLoading && !error && <ListsWrapper /> }
      </Box>
    </>
  );
};

export default BoardWrapper;
