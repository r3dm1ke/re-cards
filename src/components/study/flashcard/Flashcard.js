import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Slide,
  makeStyles,
} from '@material-ui/core';
import Question from './Question';
import Answer from './Answer';
import Actions from './Actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '25rem',
    },
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actions: {
    justifyContent: 'space-around',
  },

  answerField: {
    width: '100%',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Slide direction={'up'} in mountOnEnter unmountOnExit>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Question />
          <Answer />
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Actions />
        </CardActions>
      </Card>
    </Slide>
  );
};
