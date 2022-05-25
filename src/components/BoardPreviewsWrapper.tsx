import React from 'react';
import { Box, Stack } from '@mui/material';
import BoardPreview from './BoardPreview';
import { boardPage } from '../constants/text';
import { IBoardPreview } from '../types/boards';

type Props = {
  boardsPreview: IBoardPreview[];
};

const BoardPreviewsWrapper: React.FC<Props> = ({ boardsPreview }) => (
  <Box sx={{ width: '100%' }}>
    {boardsPreview.length
      ? (
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {boardsPreview.map((preview) => (
              <BoardPreview boardPreview={preview} key={preview.id} />
            ))}
          </Stack>
        </Box>
      )
      : <Box>{boardPage.noBoards}</Box>}
  </Box>
);

export default BoardPreviewsWrapper;
