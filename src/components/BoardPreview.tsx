import {
  Typography, Card,
  CardContent,
  Divider,
  Button,
  CardActions,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EDIT_BOARD, REMOVE_BOARD, SHOW_BOARD } from '../constants/formfields';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { IBoardPreview } from '../types/boards';
import AppRoutes from '../constants/routes';
import { getBoard, setBoardId } from '../store/boardSlice';
import muiTheme from '../constants/muiTheme';
import cardWidth from '../constants/styles';
import ShowCaseButton from './ShowCaseButton';
import restrictText from '../helpers/restrictText';

const cardStyle = {
  width: cardWidth,
  boxShadow: 12,
  '& :hover': {
    cursor: 'pointer',
  },
};

interface BoardPreviewProps {
  boardPreview: IBoardPreview;
}

const BoardPreview: React.FC<BoardPreviewProps> = ({
  boardPreview: { id, title, description },
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const deleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setBoardId(id));
    dispatch(openModal(REMOVE_BOARD));
  };

  const editItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDefaultValues([title, description]));
    dispatch(setBoardId(id));
    dispatch(openModal(EDIT_BOARD));
  };

  const goToBoard = () => {
    dispatch(setBoardId(id));
    dispatch(getBoard()).then(() => {
      navigate(`${AppRoutes.PROJECTS}/${id}`);
    });
  };

  const showBoardDescription = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setDefaultValues([title, description]));
    dispatch(openModal(SHOW_BOARD));
  };

  return (
    <Card sx={cardStyle} onClick={goToBoard}>
      <CardContent>
        <Tooltip title={t('profilePage.toBoard')}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              display: 'inline',
              color: muiTheme.palette.primary.dark,
              overflowWrap: 'break-word',
              lineSize: '280px',
            }}
          >
            {title}
          </Typography>
        </Tooltip>
        <ShowCaseButton onClick={showBoardDescription} />
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            overflowWrap: 'break-word',
            lineSize: '280px',
          }}
        >
          {restrictText(description)}
        </Typography>
        <Divider variant="middle" sx={{ m: '1rem' }} />
        <CardActions>
          <Button variant="contained" size="small" startIcon={<EditIcon />} color="warning" onClick={editItem}>{t('boardPage.editBtn')}</Button>
          <Button variant="contained" size="small" startIcon={<DeleteIcon />} color="warning" onClick={deleteItem}>{t('boardPage.deleteBtn')}</Button>
        </CardActions>
      </CardContent>
    </Card>

  );
};

export default BoardPreview;
