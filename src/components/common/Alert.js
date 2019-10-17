import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import {hide_alert} from '../../actions/mics';

export default () => {
  const open = useSelector((state) => state.mics.alert);
  const title = useSelector((state) => state.mics.alertTitle);
  const description = useSelector((state) => state.mics.alertDescription);
  const dispatch = useDispatch();
  const on_close = () => dispatch(hide_alert());

  return (
    <Dialog
      open={open}
      onClose={on_close}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={'inherit'} onClick={on_close}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};
