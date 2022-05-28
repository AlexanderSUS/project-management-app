import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { notificationSelector } from '../store/notificationSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function CustomizedSnackbar() {
  const { log } = useAppSelector(notificationSelector);
  const [open, setOpen] = React.useState(false);
  const {
    message, severity, head, dataText,
  } = log[log.length - 1];
  const { t } = useTranslation();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [log]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {t(head || '')}
        {dataText ? `"${dataText}"` : ''}
        {t(message)}
      </Alert>
    </Snackbar>
  );
}
