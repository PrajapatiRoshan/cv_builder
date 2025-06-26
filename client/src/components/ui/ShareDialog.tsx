import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const ShareDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const handleEmailShare = () => {
    window.location.href = `mailto:?subject=Shared PDF&body=Please find the attached PDF.`;
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent('Check out my CV!');
    const url = '';
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share your PDF</DialogTitle>
      <DialogActions>
        <Button onClick={handleEmailShare}>Email</Button>
        <Button onClick={handleTwitterShare}>Twitter</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
