import React, { useEffect } from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { boardPage } from '../constants/text';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { boardSelector, setCurrentBoardId } from '../store/boardSlice';
import { EDIT_BOARD, REMOVE_BOARD } from '../constants/modal';
import { openModal } from '../store/modalSlice';
import Loader from './Loader';
import AppRoutes from '../constants/routes';

const BoardWrapper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentBoardId, boards, pending } = useAppSelector(boardSelector);
  const currentBoard = boards.find((board) => board.id === currentBoardId);

  const deleteItem = () => {
    dispatch(setCurrentBoardId(currentBoardId));
    dispatch(openModal(REMOVE_BOARD));
  };

  const editItem = () => {
    dispatch(setCurrentBoardId(currentBoardId));
    dispatch(openModal(EDIT_BOARD));
  };

  useEffect(() => {
    if (!currentBoardId) {
      navigate(AppRoutes.PROJECTS);
    }
  }, [boards]);

  return pending ? <Loader /> : (
    <ButtonGroup>
      <Typography variant="h4" component="h1" sx={{ mr: '2rem' }}>{currentBoard && currentBoard.title}</Typography>
      <Button onClick={deleteItem}>
        {boardPage.deleteBtn}
      </Button>
      <Button onClick={editItem}>
        {boardPage.editBtn}
      </Button>
      <Button>
        {boardPage.addColunm}
      </Button>
    </ButtonGroup>
  );
};

export default BoardWrapper;
