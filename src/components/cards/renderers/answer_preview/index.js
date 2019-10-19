import React from 'react';
import MultipleChoiceRenderer from './MultipleChoiceRenderer';
import TextRenderer from './TextRenderer';
import {A_MULTIPLE_CHOICE, A_TEXT} from '../../../../const/cards';

export default (props) => {
  const {answer, answer_type} = props;
  switch (answer_type) {
  case A_TEXT:
    return <TextRenderer answer={answer}/>;
  case A_MULTIPLE_CHOICE:
    return <MultipleChoiceRenderer answer={answer}/>;
  default:
    return <TextRenderer answer={answer}/>;
  }
};
