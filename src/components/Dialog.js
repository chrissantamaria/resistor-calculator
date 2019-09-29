import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

export default ({ title, content, open, setOpen, onConfirm = () => {} }) => {
  const handleNo = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo} color="primary">
          No
        </Button>
        <Button onClick={handleYes} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
