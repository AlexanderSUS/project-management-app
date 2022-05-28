import React from 'react';
import { Grid, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

type Props = {
  editAction: VoidFunction;
  deleteAction: VoidFunction;
};

const EditAndDeleteButtons: React.FC<Props> = ({ editAction, deleteAction }) => {
  const { t } = useTranslation();

  return (
    <Grid container textAlign="center" width="auto">
      <Grid item xs={6}>
        <Tooltip title={t('boardPage.editBtn')}>
          <IconButton color="primary" onClick={editAction}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <Tooltip title={t('boardPage.deleteBtn')}>
          <IconButton color="error" onClick={deleteAction}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default EditAndDeleteButtons;
