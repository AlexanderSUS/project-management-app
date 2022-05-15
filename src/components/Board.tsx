import { Box, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { removeBoard } from '../store/boardSlice';
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
      <Button onClick={() => { dispatch(removeBoard(id)); }}>
        Delete
      </Button>
    </Box>

  );
};

export default Board;
