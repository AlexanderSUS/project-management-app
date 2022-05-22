import { Button } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { EDIT_BOARD, REMOVE_BOARD } from '../constants/formfields';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { openModal } from '../store/modalSlice';
import { BoardType } from '../types/boards';
import AppRoutes from '../constants/routes';
import { setCurrentBoardId } from '../store/boardSlice';
import { boardPage } from '../constants/text';

interface BoardPreviewProps {
  board: BoardType;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BoardPreview: React.FC<BoardPreviewProps> = ({ board: { id, title } }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteItem = () => {
    dispatch(setCurrentBoardId(id));
    dispatch(openModal(REMOVE_BOARD));
  };

  const editItem = () => {
    dispatch(setCurrentBoardId(id));
    dispatch(openModal(EDIT_BOARD));
  };

  const goToBoard = () => {
    dispatch(setCurrentBoardId(id));
    navigate(`${AppRoutes.PROJECTS}/${id}`);
  };

  return (
    <Item key={id} sx={{ display: 'flex' }}>
      <Button variant="contained" onClick={goToBoard}>
        {title}
      </Button>
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
