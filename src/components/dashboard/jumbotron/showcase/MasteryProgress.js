import React from 'react';
import {useSelector} from 'react-redux';
import {Typography, makeStyles} from '@material-ui/core';
import {pick_random} from '../../../../utils/random';

const useStyles = makeStyles(() => ({
  root: {},
  text: {
    color: 'white',
    textAlign: 'center',
  },
}));

const MOTIVATIONAL_QUOTES = [
  'Good job!',
  'You are doing great!',
  'Keep up the good work!',
  'You are the best!',
  'I am proud of you!',
];

export default () => {
  const cards_count = useSelector((state) => state.cards.cards ? state.cards.cards.length : null);
  const mastered_cards_count = useSelector((state) => state.cards.mastered_cards);
  const classes = useStyles();
  if (cards_count) {
    const percentage = Math.round((mastered_cards_count / cards_count) * 100);
    const quote = pick_random(MOTIVATIONAL_QUOTES);
    return (
      <div className={classes.root}>
        <Typography variant={'h3'} className={classes.text}>
          You have mastered {percentage}% of you cards. {percentage > 1 ? quote : null}
        </Typography>
      </div>
    );
  }
  return null;
};
