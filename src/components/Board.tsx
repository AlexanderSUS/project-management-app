import { Button, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { EDIT_BOARD, REMOVE_BOARD } from '../constants/modal';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal } from '../store/modalSlice';
import { BoardType } from '../types/boards';
import AppRoutes from '../constants/routes';
import { setCurrentBoardId } from '../store/boardSlice';

interface BoardProps {
  board: BoardType;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Board: React.FC<BoardProps> = ({ board: { id, title } }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteItem = () => {
    dispatch(setCurrentBoardId(id));
    dispatch(openModal(REMOVE_BOARD));
  };

  const editItem = () => {
    dispatch(setCurrentBoardId(id));
    dispatch(openModal(EDIT_BOARD));
  };

  return (
    <Item key={id} sx={{ display: 'flex' }}>
      <Typography variant="h6" onClick={() => { navigate(`${AppRoutes.PROJECTS}/${id}`); }}>
        {title}
      </Typography>
      <Button onClick={deleteItem}>
        Delete
      </Button>
      <Button onClick={editItem}>
        Edit
      </Button>
    </Item>

  );
};

export default Board;
