import React from 'react';
import {
  CardContent,
  makeStyles,
} from '@material-ui/core';
import AnswerPreviewRenderer from '../renderers/answer_preview';

const useStyles = makeStyles((theme) => ({
  content: {},
}));

export default (props) => {
  const {answer, on_flip, answer_type} = props;
  const classes = useStyles();
  return (
    <CardContent onClick={on_flip} className={classes.content}>
      <AnswerPreviewRenderer answer={answer} answer_type={answer_type}/>
    </CardContent>
  );
};
