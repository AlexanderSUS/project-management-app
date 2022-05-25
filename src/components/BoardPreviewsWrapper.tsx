import React from 'react';
import { Box, Grid } from '@mui/material';
import BoardPreview from './BoardPreview';
import { boardPage } from '../constants/text';
import { IBoardPreview } from '../types/boards';

type Props = {
  boardsPreview: IBoardPreview[];
};

const BoardPreviewsWrapper: React.FC<Props> = ({ boardsPreview }) => (
  <Box sx={{ width: '100%' }}>
    {boardsPreview.length ? (
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          {boardsPreview.map((preview) => (
            <Grid item xs={6} sm={4} md={2} key={preview.id}>
              <BoardPreview boardPreview={preview} />
            </Grid>
          ))}
        </Grid>
      </Box>
    ) : (
      <Box>{boardPage.noBoards}</Box>
    )}
  </Box>
);

export default BoardPreviewsWrapper;
