import React from 'react';
import QuestionRenderer from '../../cards/renderers/question';
import AnswerPromptRenderer from './renderers/answer/prompt';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '../../common/CardActions';
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
  card_content: {
    flex: 1,
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
      <CardContent className={classes.card_content}>
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
      </CardContent>
      <CardActions
        size={'large'}
        buttons={[
          {on_click: on_confirmed, text: validation_required ? 'Confirm' : 'Show answer'}
        ]}
      />
    </React.Fragment>
  );
};

export default FlashcardFront;
