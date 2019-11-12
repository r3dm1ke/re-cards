import React from 'react';
import AnswerDeltaRenderer from './renderers/answer/delta';
import AnswerPreviewRenderer from '../../cards/renderers/answer_preview';
import CardActions from '../../common/CardActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';

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
  card_content: {
    flex: 1,
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
      <CardContent className={classes.card_content}>
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
      </CardContent>
      <CardActions
        buttons={[
          {on_click: on_finalize, text: 'Next card'},
        ]}
        size={'large'}
      />
    </Wrapper>
  );
};

export default FlashcardBack;
