import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { handlePrint } from '@/utility/helper';

const DummyPayment = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePay = () => {
    setTimeout(() => {
      setOpen(false);
      handlePrint();
    }, 1000);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Download
      </Button>

      <Dialog open={open} onClose={handleClose}>
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
    </>
  );
};

export default DummyPayment;

