import React from 'react';
import { Button, Box } from '@mui/material';
import { modalText } from '../constants/text';

type Props = {
  confirm: VoidFunction;
  close: VoidFunction;
};

const ModalConfirmButtons: React.FC<Props> = ({ confirm, close }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-evenly', pt: '1rem' }}>
    <Button variant="contained" onClick={confirm}>{modalText.submit}</Button>
    <Button variant="contained" onClick={close}>{modalText.close}</Button>
  </Box>
);

export default ModalConfirmButtons;
