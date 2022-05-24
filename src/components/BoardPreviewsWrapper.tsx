import React from 'react';
import { Box, Stack } from '@mui/material';
import BoardPreview from './BoardPreview';
import { boardPage } from '../constants/text';
import { Boards } from '../types/boards';

type Props = {
  boards: Boards;
};

const BoardPreviewsWrapper: React.FC<Props> = ({ boards }) => (
  <Box sx={{ width: '100%' }}>
    {boards.length
      ? (
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {boards.map((board) => (
              <BoardPreview board={board} key={board.id} />
            ))}
          </Stack>
        </Box>
      )
      : <Box>{boardPage.noBoards}</Box>}
  </Box>
);

export default BoardPreviewsWrapper;
