import React, { useState } from 'react';
import {
  Typography, TextField, Tooltip, IconButton,
} from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { Column } from '../types/columns';
import { editColumn, setColumn } from '../store/columnSlice';
import { REMOVE_COLUMN } from '../constants/formfields';
import { openModal } from '../store/modalSlice';
import { DEFAULT_COLUMN } from '../constants/columns';
import { boardPage, modalText } from '../constants/text';
import { AppDispatch } from '../store/store';

type ListTitleProps = {
  column: Column;
  dispatch: AppDispatch;
};

const ListTitle: React.FC<ListTitleProps> = ({ column, dispatch }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(column.title);

  const showInput = () => {
    setIsEdit(true);
  };

  const hideInput = () => {
    setIsEdit(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTitle(value);
  };

  const deleteColumn = () => {
    dispatch(setColumn(column));
    dispatch(openModal(REMOVE_COLUMN));
  };

  const editColumnTitle = () => {
    dispatch(setColumn({ ...column, title }));
    dispatch(editColumn())
      .then(() => {
        dispatch(setColumn(DEFAULT_COLUMN));
      });
  };

  if (isEdit) {
    return (
      <>
        {/* TODO MOVE OUT lable TITLE */}
        <TextField
          id="column-title"
          label="Edit column title"
          variant="standard"
          value={title}
          onChange={handleInput}
        />
        {/* TODO MOVE OUT TEXT */}
        <Tooltip title={modalText.close}>
          <IconButton onClick={editColumnTitle}>
            <DoneSharpIcon color="success" />
          </IconButton>
        </Tooltip>

        <Tooltip title={modalText.close}>
          <IconButton onClick={hideInput}>
            <CloseSharpIcon color="action" />
          </IconButton>
        </Tooltip>
      </>
    );
  }

  return (
    <>
      <Tooltip title={boardPage.editBtn} placement="right">
        <Typography onClick={showInput} variant="h5" sx={{ mr: 'auto', ml: 'auto' }}>
          {column.title}
        </Typography>
      </Tooltip>
      <Tooltip title={boardPage.deleteBtn} placement="right">
        <IconButton color="primary" onClick={deleteColumn}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ListTitle;
