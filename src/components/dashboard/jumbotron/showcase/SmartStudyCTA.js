import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Typography, Button, makeStyles} from '@material-ui/core';
import {start_study} from '../../../../actions/study';
import {SMART_STUDY} from '../../../../const/study';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    borderColor: 'white',
    zIndex: 10000,
  },
}));

export default (props) => {
  const cards_count = useSelector((state) => state.cards.cards_due_for_smart_study).length;
  const classes = useStyles();
  const dispatch = useDispatch();
  const minutes = Math.max(1, Math.round(cards_count / 2));
  return (
    <div className={classes.root}>
      <Typography variant={'h5'} className={classes.text}>
        Right now is a good time to study some cards.
        I advise {cards_count} cards, which should take about {minutes} minutes
      </Typography>
      <Button
        className={classes.button}
        variant={'outlined'}
        onClick={() => dispatch(start_study(SMART_STUDY))}
      >Start</Button>
    </div>
  );
};
