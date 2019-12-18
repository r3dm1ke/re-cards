import React from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
}));

const NotificationPermissionDialog = (props) => {
  const opened = useSelector((state) => state.widgets.streak.permission_dialog_opened);
  const classes = useStyles();
  return (
    <Dialog open={opened}>
      <DialogTitle>Please allow notifications</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To receive reminders, please allow us to send you notifications. I promise not to send anything else.
        </DialogContentText>
      </DialogContent>
      <Button size={'large'} className={classes.button}>Allow</Button>
    </Dialog>
  );
};

export default NotificationPermissionDialog;
