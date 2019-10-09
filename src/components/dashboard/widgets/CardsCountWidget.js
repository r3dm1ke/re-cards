import React from 'react';
import {useSelector} from 'react-redux';
import Widget from '../../common/widget';
import {makeStyles, Typography} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  numbers: {
    textAlign: 'center',
  },
  column: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  caption: {
    textAlign: 'center',
  },
}));

export default (props) => {
  const cards_count = useSelector((state) => state.cards.cards ? state.cards.cards.length : null);
  const mastered_cards_count = useSelector((state) => state.cards.mastered_cards);
  const decks_count = useSelector((state) => state.decks.decks ? state.decks.decks.length : null);
  const classes = useStyles();
  return (
    <Widget
      title={'At a glance'}
    >
      <div className={classes.root}>
        <div className={classes.column}>
          {cards_count ? (
            <Typography variant={'h2'} className={classes.numbers}>{cards_count}</Typography>
          ) : (
            <Skeleton variant={'rect'} width={50} height={50} />
          )}
          <Typography
            className={classes.caption}
            variant={'overline'}
            component={'div'}
          >Total cards</Typography>
        </div>
        <div className={classes.column}>
          {cards_count ? (
            <Typography variant={'h2'} className={classes.numbers}>{mastered_cards_count}</Typography>
          ) : (
            <Skeleton variant={'rect'} width={50} height={50} />
          )}
          <Typography
            className={classes.caption}
            variant={'overline'}
            component={'div'}
          >Mastered cards</Typography>
        </div>
        <div className={classes.column}>
          {decks_count ? (
            <Typography variant={'h2'} className={classes.numbers}>{decks_count}</Typography>
          ) : (
            <Skeleton variant={'rect'} width={50} height={50} />
          )}
          <Typography
            className={classes.caption}
            variant={'overline'}
            component={'div'}
          >Total decks</Typography>
        </div>
      </div>
    </Widget>
  );
};
