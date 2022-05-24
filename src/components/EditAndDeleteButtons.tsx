import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { boardPage } from '../constants/text';

type Props = {
  editAction: VoidFunction;
  deleteAction: VoidFunction;
};

const EditAndDeleteButtons: React.FC<Props> = ({
  editAction, deleteAction,
}) => (
  <>
    <Tooltip title={boardPage.editBtn}>
      <IconButton color="primary" onClick={editAction}>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title={boardPage.deleteBtn}>
      <IconButton color="primary" onClick={deleteAction}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </>

);

export default EditAndDeleteButtons;
