import React from 'react';
import MathRenderer from './MathRenderer';
import TextRenderer from './TextRenderer';
import {Q_MATH, Q_TEXT} from '../../../../const/cards';

export default (props) => {
  const {question, question_type, ...rest} = props;
  switch (question_type) {
  case Q_MATH:
    return <MathRenderer {...rest}>{question}</MathRenderer>;
  case Q_TEXT:
    return <TextRenderer {...rest}>{question}</TextRenderer>;
  default:
    return <TextRenderer {...rest}>{question}</TextRenderer>;
  }
};
