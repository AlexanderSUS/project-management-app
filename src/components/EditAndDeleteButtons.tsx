import React from 'react';
import { Grid, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { boardPage } from '../constants/text';

type Props = {
  editAction: VoidFunction;
  deleteAction: VoidFunction;
};

const EditAndDeleteButtons: React.FC<Props> = ({ editAction, deleteAction }) => (
  <Grid container>
    <Grid item xs={6}>
      <Tooltip title={boardPage.editBtn}>
        <IconButton color="success" onClick={editAction}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Grid>
    <Grid item xs={6}>
      <Tooltip title={boardPage.deleteBtn}>
        <IconButton color="error" onClick={deleteAction}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  </Grid>
);

export default EditAndDeleteButtons;
