import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { clearError, clearInfo, notificationSelector } from '../store/notificationSlice';

export enum Severity {
  info = 'info',
  success = 'success',
  error = 'error',
}

type SeverityType = keyof typeof Severity;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function CustomizedSnackbar() {
  const { error, info } = useAppSelector(notificationSelector);
  const [severity, setSeveriy] = React.useState<SeverityType>(Severity.success);
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (severity === Severity.error) {
      dispatch(clearError());
    }
    if (severity === Severity.success) {
      dispatch(clearInfo());
    }
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setSeveriy(Severity.error);
      setOpen(true);
    }
    if (info) {
      setSeveriy(Severity.success);
      setOpen(true);
    }
    // TODO check this logic adn find solulition do not show empty message??
    if (!error && severity === Severity.error) {
      setOpen(false);
    }
    if (!info && severity === Severity.success) {
      setOpen(false);
    }
  }, [error, info]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {error || info}
      </Alert>
    </Snackbar>
  );
}
