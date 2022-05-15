import { Box, Button } from '@mui/material';
import React from 'react';
import { EDIT_BOARD, REMOVE_BOARD } from '../constants/modal';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal } from '../store/modalSlice';
import { BoardType } from '../types/boards';

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board: { id, title } }) => {
  const dispatch = useAppDispatch();

  return (
    <Box key={id}>
      <Box>
        {title}
      </Box>
      <Button onClick={() => { dispatch(openModal({ form: REMOVE_BOARD, dataId: id })); }}>
        Delete
      </Button>
      <Button onClick={() => { dispatch(openModal({ form: EDIT_BOARD, dataId: id })); }}>
        Edit
      </Button>
    </Box>

  );
};

export default Board;
