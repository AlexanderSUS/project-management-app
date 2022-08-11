import React from 'react';
import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  confirm: VoidFunction;
  close: VoidFunction;
};

const ModalConfirmButtons: React.FC<Props> = ({ confirm, close }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', pt: '1rem' }}>
      <Button variant="contained" onClick={confirm}>{t('modal.submit')}</Button>
      <Button variant="contained" onClick={close}>{t('modal.close')}</Button>
    </Box>

  );
};

export default ModalConfirmButtons;
