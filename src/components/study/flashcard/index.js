import React from 'react';
import FlipCard from '../../common/FlipCard';
import FlashcardFront from './Front';
import FlashcardBack from './Back';

const Flashcard = (props) => {
  const {
    className,
    answer,
    answer_type,
    question,
    question_type,
    validation_required,
    confirmed,
    on_confirmed,
    validation_value,
    on_validation_value_changed,
    is_correct,
    on_finalize,
  } = props;
  return (
    <FlipCard
      className={className}
      flipped={confirmed}
      front={
        <FlashcardFront
          question={question}
          question_type={question_type}
          validation_required={validation_required}
          answer={answer}
          answer_type={answer_type}
          validation_value={validation_value}
          on_validation_value_changed={on_validation_value_changed}
          on_confirmed={on_confirmed}
        />
      }
      back={
        <FlashcardBack
          answer={answer}
          answer_type={answer_type}
          validation_required={validation_required}
          validation_value={validation_value}
          is_correct={is_correct}
          on_finalize={on_finalize}
        />
      }
    />
  );
};

export default Flashcard;
