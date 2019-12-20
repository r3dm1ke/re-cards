import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Widget from '../../../common/widget';
import NotificationTimeDialog from './NotificationTimeDialog';
import {makeStyles, Typography, Button} from '@material-ui/core';
import {pick_random} from '../../../../utils/random';
import {notification_requested, open_time_for_notification_dialog} from '../../../../actions/widgets/streak';
import NotificationPermissionDialog from './NotificationPermissionDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    marginBottom: theme.spacing(4),
  },
  description: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const streak = useSelector((state) => state.progress.streak);
  const studied_today = useSelector((state) => state.progress.studied_today);
  const notification_enabled = useSelector((state) =>
    state.auth.user_meta.notification_time && state.auth.user_meta.notification_registration_token,
  );
  const render_widget_content = () => {
    if (streak !== undefined) {
      return (
        <React.Fragment>
          <Typography variant={'h2'}>{streak}</Typography>
          <Typography variant={'overline'} className={classes.subtitle}>
            Day{streak > 1 ? 's' : ''} studying in a row
          </Typography>
          {render_subtitle()}
          <Button
            variant={'outlined'}
            color={'primary'}
            disabled={notification_enabled}
            onClick={() => dispatch(notification_requested())}>Remind me</Button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Typography variant={'body1'}>Not enough data. Study some cards first.</Typography>
      </React.Fragment>
    );
  };

  const render_subtitle = () => {
    if (studied_today) {
      return (
        <Typography variant={'body1'} className={classes.description}>
          You are doing {pick_random(['wonderful', 'great', 'awesome'])}.
          Set a reminder so you will not forget to study tomorrow.
        </Typography>
      );
    }
    if (streak === 0) {
      return (
        <Typography variant={'body1'} className={classes.description}>
          Those cards are not going to study themselves. Go get them. Or, set a reminder and do it later today.
        </Typography>
      );
    }
    return (
      <Typography variant={'body1'} className={classes.description}>
        You are doing {pick_random(['wonderful', 'great', 'awesome'])}.
        Keep going and study right now. Or, set a reminder to study later today.
      </Typography>
    );
  };

  return (
    <>
      <NotificationTimeDialog />
      <NotificationPermissionDialog />
      <Widget
        title={'Shaping your study habits'}
        containerClassName={classes.root}
      >
        {render_widget_content()}
      </Widget>
    </>
  );
};

