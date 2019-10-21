import React from 'react';
import QuestionRenderer from '../../cards/renderers/question';
import AnswerPromptRenderer from './renderers/answer/prompt';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  question_renderer: {
    padding: theme.spacing(6),
  },
  mid_container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(6),
    alignItems: 'center',
    justifyContent: 'space-around',
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

const FlashcardFront = (props) => {
  const {
    question,
    question_type,
    validation_required,
    answer,
    answer_type,
    validation_value,
    on_validation_value_changed,
    on_confirmed,
  } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <QuestionRenderer
        className={classes.question_renderer}
        question={question}
        question_type={question_type}/>
      <Divider />
      <div className={classes.mid_container}>
        {validation_required ?
          <AnswerPromptRenderer
            answer={answer}
            answer_type={answer_type}
            validation_value={validation_value}
            on_validation_value_changed={on_validation_value_changed}
          /> : null
        }
      </div>
      <Button className={classes.button} onClick={on_confirmed}>{validation_required ? 'Confirm' : 'Show answer'}</Button>
    </React.Fragment>
  );
};

export default FlashcardFront;
