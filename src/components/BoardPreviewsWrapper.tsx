import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import BoardPreview from './BoardPreview';
import { boardPage } from '../constants/text';
import { IBoardPreview } from '../types/boards';
import { openModal } from '../store/modalSlice';
import { NEW_BOARD } from '../constants/formfields';
import { useAppDispatch } from '../hooks/reduxTypedHooks';

type Props = {
  boardsPreview: IBoardPreview[];
};

const AddButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '100%',
}));

const BoardPreviewsWrapper: React.FC<Props> = ({ boardsPreview }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Box>
      {boardsPreview.length ? (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {boardsPreview.map((preview) => (
              <Grid item xs={6} sm={4} md={2} key={preview.id}>
                <BoardPreview boardPreview={preview} />
              </Grid>
            ))}
            <Grid item xs={12} sm={4} md={2}>
              <AddButton
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => {
                  dispatch(openModal(NEW_BOARD));
                }}
              >
                {t('navText.newBoard')}
              </AddButton>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>{boardPage.noBoards}</Box>
      )}
    </Box>
  );
};
export default BoardPreviewsWrapper;
