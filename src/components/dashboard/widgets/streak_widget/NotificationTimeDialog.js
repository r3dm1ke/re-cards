import React from 'react';
import {Dialog, Button, makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {TimePicker} from '@material-ui/pickers';
import {
  close_time_for_notification_dialog,
  time_for_notification_changed,
  time_for_notification_submitted,
} from '../../../../actions/widgets/streak';

const useStyles = makeStyles((theme) => ({
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
}));

const NotificationTimeDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dialog_opened = useSelector((state) => state.widgets.streak.time_dialog_opened);
  const time_to_notify = useSelector((state) => state.widgets.streak.time_to_notify);
  const on_time_to_notify_changed = (new_time_to_notify) => dispatch(time_for_notification_changed(new_time_to_notify));
  const on_submit = () => dispatch(time_for_notification_submitted());
  return (
    <Dialog
      open={dialog_opened}
      onClose={() => dispatch(close_time_for_notification_dialog())}
    >
      <TimePicker
        autoOk
        openTo={'hours'}
        variant={'static'}
        value={time_to_notify}
        onChange={on_time_to_notify_changed}
      />
      <Button
        className={classes.button}
        color={'primary'}
        size={'large'}
        variant={'contained'}
        onClick={on_submit}
      >Remind</Button>
    </Dialog>
  );
};

export default NotificationTimeDialog;
