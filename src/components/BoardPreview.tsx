import { Button, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { EDIT_BOARD, REMOVE_BOARD } from '../constants/formfields';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { IBoardPreview } from '../types/boards';
import AppRoutes from '../constants/routes';
import { getBoard, setBoardId } from '../store/boardSlice';
import { boardPage } from '../constants/text';

interface BoardPreviewProps {
  boardPreview: IBoardPreview;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BoardPreview: React.FC<BoardPreviewProps> = (
  { boardPreview: { id, title, description } },
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteItem = () => {
    dispatch(setBoardId(id));
    dispatch(openModal(REMOVE_BOARD));
  };

  const editItem = () => {
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

  return (
    <Item key={id} sx={{ display: 'flex' }}>
      <Button variant="contained" onClick={goToBoard}>
        {title}
      </Button>
      <Typography>{description}</Typography>
      <Button onClick={deleteItem}>
        {boardPage.deleteBtn}
      </Button>
      <Button onClick={editItem}>
        {boardPage.editBtn}
      </Button>
    </Item>
  );
};

export default BoardPreview;
