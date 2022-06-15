import React, { useState } from 'react';
import {
  Typography, Tooltip, IconButton, Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Column } from '../types/columns';
import { setColumn } from '../store/columnSlice';
import { REMOVE_COLUMN } from '../constants/formfields';
import { openModal } from '../store/modalSlice';
import { AppDispatch } from '../store/store';
import muiTheme from '../constants/muiTheme';
import ListTitlteForm from './ListTitlteForm';

const listTilteWrapperStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  borderRadius: '5px',
  backgroundColor: muiTheme.palette.secondary.light,
};

const listTitleStyle = {
  maxWidth: '210px',
  ml: 'auto',
  pl: '40px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: 'white',
  wordWrap: 'break-word',
};

type ListTitleProps = {
  column: Column;
  dispatch: AppDispatch;
};

const ListTitle: React.FC<ListTitleProps> = ({ column, dispatch }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { t } = useTranslation();

  const showInput = () => {
    setIsEdit(true);
  };

  const hideInput = () => {
    setIsEdit(false);
  };

  const deleteColumn = () => {
    dispatch(setColumn(column));
    dispatch(openModal(REMOVE_COLUMN));
  };

  return (
    isEdit ? <ListTitlteForm hideInput={hideInput} dispatch={dispatch} column={column} />
      : (
        <Box sx={listTilteWrapperStyles}>
          <Tooltip title={t('boardPage.editBtn')} placement="right">
            <Typography
              onClick={showInput}
              variant="h6"
              sx={listTitleStyle}
            >
              {column.title}
            </Typography>
          </Tooltip>
          <MoreVertIcon
            onClick={showInput}
            color="action"
            sx={{ ml: '0.5rem', mr: 'auto' }}
          />
          <Tooltip title={t('boardPage.deleteBtn')} placement="right" sx={{ justifySelf: 'flex-end' }}>
            <IconButton onClick={deleteColumn}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
  );
};

export default ListTitle;
