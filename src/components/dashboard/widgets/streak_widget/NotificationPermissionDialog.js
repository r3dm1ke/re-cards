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
import {
  close_notification_permission_dialog,
  request_notification_permission,
} from '../../../../actions/widgets/streak';

const useStyles = makeStyles((theme) => ({
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
}));

const NotificationPermissionDialog = (props) => {
  const dispatch = useDispatch();
  const opened = useSelector((state) => state.widgets.streak.permission_dialog_opened);
  const on_close = () => dispatch(close_notification_permission_dialog());
  const on_allow = () => dispatch(request_notification_permission());
  const classes = useStyles();
  return (
    <Dialog open={opened} onClose={on_close}>
      <DialogTitle>Please allow notifications</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To receive reminders, please allow us to send you notifications. I promise not to send anything else.
        </DialogContentText>
      </DialogContent>
      <Button
        size={'large'}
        className={classes.button}
        color={'primary'}
        variant={'contained'}
        onClick={on_allow}
      >Allow</Button>
    </Dialog>
  );
};

export default NotificationPermissionDialog;
