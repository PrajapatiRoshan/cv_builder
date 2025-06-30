import { handlePrint } from '@/utility/helper';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';

const DialogBox = forwardRef((_, ref) => {
  const [openDialog, setOpenDialog] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpenDialog(true),
    close: () => setOpenDialog(false),
  }));

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handlePay = () => {
    setTimeout(() => {
      setOpenDialog(false);
      handlePrint();
      // handleRazorpayPayment();
    }, 1000);
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>Pay $5 to download your CV</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handlePay} color="primary" variant="contained">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogBox;

