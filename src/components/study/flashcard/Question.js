import React from 'react';
import {Typography} from '@material-ui/core';
import {Q_MATH, Q_TEXT} from '../../../const/cards';
import MathRenderer from '../../common/MathRenderer';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  question: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },
}));

export default () => {
  const card = useSelector((state) => state.study.study_cards[state.study.study_index]);
  const {question, question_type} = card;
  const classes = useStyles();
  if (question_type === Q_TEXT) {
    return <Typography variant={'h3'} className={classes.question}>{question}</Typography>;
  } else if (question_type === Q_MATH) {
    console.log('mathjax rendered!');
    return (
      <MathRenderer
        block
        content={question}
      />
    );
  }
};
