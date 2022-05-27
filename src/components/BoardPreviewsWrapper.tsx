import React from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import BoardPreview from './BoardPreview';
import { IBoardPreview } from '../types/boards';
import { openModal } from '../store/modalSlice';
import { NEW_BOARD } from '../constants/formfields';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
// import muiTheme from '../constants/muiTheme';

const wrapperStyles = {
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '1.5rem',
  justifyContent: 'center',
};

const buttonStyle = {
  width: '288px',
  height: '200px',
  fontSize: '2rem',
  // color: muiTheme.palette.primary.dark,
  // bgcolor: 'white',
};

type Props = {
  boardsPreview: IBoardPreview[];
};

const BoardPreviewsWrapper: React.FC<Props> = ({ boardsPreview }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Box sx={wrapperStyles}>
      {boardsPreview.map((preview) => (<BoardPreview boardPreview={preview} key={preview.id} />))}
      <Button
        variant="contained"
        sx={buttonStyle}
        // startIcon={}
        onClick={() => {
          dispatch(openModal(NEW_BOARD));
        }}
      >
        <AddIcon fontSize="inherit" />
        {t('navText.newBoard')}
      </Button>
    </Box>
  );
};
export default BoardPreviewsWrapper;
