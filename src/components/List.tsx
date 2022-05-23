import React from 'react';
import {
  Box, Typography, Button, Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Column } from '../types/columns';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { setCurrentColumnId, setCurrentColumnOrder } from '../store/columnSlice';
import { EDIT_COLUMN_TITLE, REMOVE_COLUMN } from '../constants/formfields';
import { openModal } from '../store/modalSlice';
import { boardPage } from '../constants/text';

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
    <Box sx={{ display: 'flex', flexFlow: 'row no-wrap' }}>
      <Typography variant="h5">
        {/* ***!FOR TEST PURPOSE*** */}
        {column.order}
        {'. '}
        {/* ******** */}
        {column.title}
      </Typography>
      <Button variant="text" onClick={editColumn}>
        <Tooltip title={boardPage.editBtn}>
          <EditIcon />
        </Tooltip>
      </Button>
      <Button variant="text" onClick={deleteColumn}>
        <Tooltip title={boardPage.deleteBtn}>
          <DeleteIcon />
        </Tooltip>
      </Button>
    </Box>
  );
};

export default List;
