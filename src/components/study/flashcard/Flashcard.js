import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Slide,
  makeStyles,
} from '@material-ui/core';
import QuestionRenderer from '../../cards/renderers/QuestionRenderer';
import Answer from './Answer';
import Actions from './Actions';
import {useSelector} from 'react-redux';

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
  const card = useSelector((state) => state.study.study_cards[state.study.study_index]);
  const {question, question_type} = card;
  return (
    <Slide direction={'up'} in mountOnEnter unmountOnExit>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <QuestionRenderer question={question} question_type={question_type} />
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
