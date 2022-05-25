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
import EditAndDeleteButtons from './EditAndDeleteButtons';
import muiTheme from '../constants/muiTheme';

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

const BoardPreview: React.FC<BoardPreviewProps> = ({
  boardPreview: { id, title, description },
}) => {
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

  const { sm } = muiTheme.breakpoints.values;

  const Board = styled(Item)`
    display: flex;
    flex-direction: column;
    height: 100%;

    & > button {
      width: 100%;
      margin-bottom: 2rem;

      @media screen and (max-width: ${sm}px) {
        margin-bottom: 1rem;
      }
    }

    .MuiGrid-container {
      margin-top: auto;
    }

    p {
      margin-bottom: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-align: left;
    }
  `;

  return (
    <Board>
      <Button variant="contained" onClick={goToBoard}>
        {title}
      </Button>
      <Typography component="p">{description}</Typography>
      <EditAndDeleteButtons editAction={editItem} deleteAction={deleteItem} />
    </Board>
  );
};

export default BoardPreview;
