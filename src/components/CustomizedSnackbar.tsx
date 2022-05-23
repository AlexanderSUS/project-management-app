import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useEffect } from 'react';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { notificationSelector } from '../store/notificationSlice';

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

const greeteng = { message: 'Hello user!', severity: Severity.info };

export default function CustomizedSnackbar() {
  const { error, info } = useAppSelector(notificationSelector);
  const [severity, setSeveriy] = React.useState<SeverityType>(Severity.success);
  const [open, setOpen] = React.useState(false);
  const [log, setLog] = React.useState<{ message: string, severity: SeverityType }[]>([greeteng]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      const notification = { message: error, severity: Severity.error };
      setLog((state) => [...state, notification]);
    }
    if (info) {
      const notification = { message: info, severity: Severity.info };
      setLog((state) => [...state, notification]);
    }
  }, [error, info]);

  useEffect(() => {
    setSeveriy(log[log.length - 1].severity);
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
        {log[log.length - 1].message}
      </Alert>
    </Snackbar>
  );
}
