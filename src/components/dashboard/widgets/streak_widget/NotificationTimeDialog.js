import React from 'react';
import {Dialog, DialogTitle} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {TimePicker} from '@material-ui/pickers';
import {close_time_for_notification_dialog, time_for_notification_changed} from '../../../../actions/widgets/streak';

const NotificationTimeDialog = (props) => {
  const dispatch = useDispatch();
  const dialog_opened = useSelector((state) => state.widgets.streak.dialog_opened);
  const time_to_notify = useSelector((state) => state.widgets.streak.time_to_notify);
  const on_time_to_notify_changed = (new_time_to_notify) => dispatch(time_for_notification_changed(new_time_to_notify));
  return (
    <Dialog
      open={dialog_opened}
      onClose={() => dispatch(close_time_for_notification_dialog())}
    >
      <DialogTitle>When do you want to be reminded?</DialogTitle>
      <TimePicker
        autoOk
        openTo={'hours'}
        variant={'static'}
        value={time_to_notify}
        onChange={on_time_to_notify_changed}
      />
    </Dialog>
  );
};

export default NotificationTimeDialog;
