import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function OkCancelDialogComponent(props) {
  const {id, title, description, open, onCancel, onConfirm} = props;

  const handleClose = (confirm) => {
    if (confirm && typeof onConfirm === "function") {
      onConfirm();
    } else if (typeof onCancel === "function") {
      onCancel()
    }
  };

  if (!!id) {
    return <div />;
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby={`alert-dialog-title-${id}`}
      aria-describedby={`alert-dialog-description-${id}`}
    >
      <DialogTitle id={`alert-dialog-title-${id}`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`alert-dialog-description-${id}`}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

OkCancelDialogComponent.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onConfirm: propTypes.func.isRequired
};

export default OkCancelDialogComponent;
