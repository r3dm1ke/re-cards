import React from 'react';
import {Typography} from "@material-ui/core";
import {Q_MATH, Q_TEXT} from "../../../const/cards";
import MathJax from "react-mathjax2";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  question: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
}));

export default props => {
  const {question, question_type} = props;
  const classes = useStyles();
  if (question_type === Q_TEXT) {
    return <Typography variant={'h3'} className={classes.question}>{question}</Typography>;
  } else if (question_type === Q_MATH) {
    console.log('mathjax rendered!');
    return (
      <MathJax.Context input={'tex'}>
        <MathJax.Node block>{question}</MathJax.Node>
      </MathJax.Context>
    )
  }
}