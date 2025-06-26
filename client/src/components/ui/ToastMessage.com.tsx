import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { ToastMessageHandle } from '@/types/interface';

const ToastMessage = forwardRef<ToastMessageHandle>((_props, ref) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<AlertColor>('info');

  const handleToastClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setToastOpen(false);
  };

  const showToast = useCallback((message: string, severity: AlertColor = 'info') => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  }, []);

  useImperativeHandle(ref, () => ({ showToast }), [showToast]);

  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={4000}
      onClose={handleToastClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        minWidth: 400,
        minHeight: 200,
      }}
    >
      <Alert
        onClose={handleToastClose}
        severity={toastSeverity}
        sx={{ width: '100%', fontSize: '1.3rem', alignItems: 'center' }}
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  );
});

export default ToastMessage;

