import React from 'react';
import QuestionRenderer from '../../cards/renderers/question';
import AnswerPromptRenderer from './renderers/answer/prompt';
import Button from '@material-ui/core/Button';

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
  return (
    <React.Fragment>
      <QuestionRenderer question={question} question_type={question_type}/>
      {validation_required ?
        <AnswerPromptRenderer
          answer={answer}
          answer_type={answer_type}
          validation_value={validation_value}
          on_validation_value_changed={on_validation_value_changed}
        /> : null
      }
      <Button onPress={on_confirmed}>{validation_required ? 'Confirm' : 'Show answer'}</Button>
    </React.Fragment>
  );
};

export default FlashcardFront;
