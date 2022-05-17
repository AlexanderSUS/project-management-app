import { Button, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { EDIT_BOARD, REMOVE_BOARD } from '../constants/modal';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal } from '../store/modalSlice';
import { BoardType } from '../types/boards';

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

  return (
    <Item key={id} sx={{ display: 'flex' }}>
      <Typography variant="h6">
        {title}
      </Typography>
      <Button onClick={() => { dispatch(openModal({ content: REMOVE_BOARD, dataId: id, action: 'removeBoard' })); }}>
        Delete
      </Button>
      <Button onClick={() => { dispatch(openModal({ content: EDIT_BOARD, dataId: id, action: 'editBoard' })); }}>
        Edit
      </Button>
    </Item>

  );
};

export default Board;
