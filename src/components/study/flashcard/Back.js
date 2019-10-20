import React from 'react';
import AnswerDeltaRenderer from './renderers/answer/delta';
import AnswerPreviewRenderer from '../../cards/renderers/answer_preview';
import Button from '@material-ui/core/Button';

const FlashcardBack = (props) => {
  const {
    validation_required,
    answer,
    answer_type,
    validation_value,
    is_correct,
    on_finalize,
  } = props;

  return (
    <React.Fragment>
      {validation_required || is_correct ?
        <AnswerDeltaRenderer
          answer={answer}
          answer_type={answer_type}
          validation_value={validation_value}
        /> :
        <AnswerPreviewRenderer
          answer={answer}
          answer_type={answer_type}
        />
      }
      <Button onClick={on_finalize}>Next card</Button>
    </React.Fragment>
  );
};

export default FlashcardBack;
