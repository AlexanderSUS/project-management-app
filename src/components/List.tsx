import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Column } from '../types/columns';
import { boardPage } from '../constants/text';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { setCurrentColumnId, setCurrentColumnOrder } from '../store/columnSlice';
import { EDIT_COLUMN_TITLE, REMOVE_COLUMN } from '../constants/modal';
import { openModal } from '../store/modalSlice';

type ListProps = {
  column: Column;
};

const List: React.FC<ListProps> = ({ column }) => {
  const dispatch = useAppDispatch();

  const deleteColumn = () => {
    dispatch(setCurrentColumnId(column.id));
    dispatch(setCurrentColumnOrder(column.order));
    dispatch(openModal(REMOVE_COLUMN));
  };

  const editColumn = () => {
    dispatch(setCurrentColumnId(column.id));
    dispatch(setCurrentColumnOrder(column.order));
    dispatch(openModal(EDIT_COLUMN_TITLE));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h5">
        {column.order}
        {'. '}
        {column.title}
      </Typography>
      <Button variant="text" onClick={editColumn}>
        {boardPage.editBtn}
      </Button>
      <Button variant="text" onClick={deleteColumn}>
        {boardPage.deleteBtn}
      </Button>
    </Box>
  );
};

export default List;
