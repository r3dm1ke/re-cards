import React from 'react';
import AnswerDeltaRenderer from './renderers/answer/delta';
import AnswerPreviewRenderer from '../../cards/renderers/answer_preview';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  correctness_title: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  hidden: {
    visibility: 'hidden',
  },
  button: {
    'height': theme.spacing(6),
    'borderTopLeftRadius': 0,
    'borderTopRightRadius': 0,
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
}));

const FlashcardBack = (props) => {
  const {
    validation_required,
    answer,
    answer_type,
    validation_value,
    is_correct,
    on_finalize,
    confirmed,
  } = props;
  const classes = useStyles();
  const Wrapper = ({children}) => !confirmed ?
    <div className={classes.hidden}>{children}</div> :
    <>{children}</>;
  return (
    <Wrapper>
      {validation_required && is_correct ? (
        <Typography className={classes.correctness_title} variant={'h4'}>You are correct!</Typography>
      ) : null}
      {validation_required && !is_correct ? (
        <Typography className={classes.correctness_title} variant={'h4'}>Try again :)</Typography>
      ) : null}
      <Divider className={classes.divider} />
      <div className={classes.root}>
        {validation_required ?
          <AnswerDeltaRenderer
            answer={answer}
            answer_type={answer_type}
            validation_value={validation_value}
          /> :
          <AnswerPreviewRenderer
            answer={answer}
            answer_type={answer_type}
            block
          />
        }
      </div>
      <Divider className={classes.divider} />
      <Button onClick={on_finalize} className={classes.button}>Next card</Button>
    </Wrapper>
  );
};

export default FlashcardBack;
