import React from 'react';
import {useSelector} from 'react-redux';
import Widget from '../../common/widget';
import {makeStyles, Typography, Button} from '@material-ui/core';
import {pick_random} from '../../../utils/random';

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

export default (props) => {
  const classes = useStyles();
  const last_progress = useSelector((state) => state.progress.last_progress);

  const render_widget_content = () => {
    if (last_progress !== undefined) {
      return (
        <React.Fragment>
          <Typography variant={'h2'}>{last_progress.streak}</Typography>
          <Typography variant={'overline'} className={classes.subtitle}>
            Day{last_progress.streak > 1 ? 's' : ''} studying in a row
          </Typography>
          <Typography variant={'body1'} className={classes.description}>
            You are doing {pick_random(['wonderful', 'great', 'awesome'])}.
            Set a reminder so you will not forget to study tomorrow.
          </Typography>
          <Button variant={'outlined'} color={'primary'}>Remind me</Button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Typography variant={'body1'}>Not enough data. Study some cards first.</Typography>
      </React.Fragment>
    );
  };

  return (
    <Widget
      title={'Shaping your study habits'}
      containerClassName={classes.root}
    >
      {render_widget_content()}
    </Widget>
  );
};

