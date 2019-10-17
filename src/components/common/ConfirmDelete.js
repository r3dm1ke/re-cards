import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

export default (props) => {
  const classes = useStyles();
  const {on_ok, on_cancel, title, ok_text, cancel_text} = props;
  return (
    <Dialog className={classes.root} open onClose={on_cancel}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogActions>
        <Button color={'danger'} onClick={on_ok}>{ok_text}</Button>
        <Divider orientation={'vertical'}/>
        <Button onClick={on_cancel}>{cancel_text}</Button>
      </DialogActions>
    </Dialog>
  );
};
