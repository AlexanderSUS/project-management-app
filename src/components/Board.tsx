import { Box } from '@mui/material';
import React from 'react';
import { BoardType } from '../types/boards';

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board: { id, title } }) => (
  <Box key={id}>
    <Box>
      {title}
    </Box>
  </Box>
);

export default Board;
